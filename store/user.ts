import {defineStore} from "pinia";
import api from "~/api";
import base64url from "base64url";

export const useUserStore = defineStore('user', {
    state() {
        return {
            user: {
                userData: {},
            },
            payload: '',
            roles: {},
            access_token: '',
            refresh_token: '',
        }
    },
    actions: {
        async refresh() {
            const response = await api.auth.refresh({
                access_token: this.access_token, 
                refresh_token: this.refresh_token
            })
            if(response.access_token) {
                this.access_token = response.access_token
            }
            if(response.refresh_token) {
                this.refresh_token = response.refresh_token
            }
        },
        async fetchUser() {
            const response = await api.users.my()
            this.user = response
        },
        //get payload from access token
        async getPayload() {
            await this.fetchUser();
            const tokenParts = this.access_token.split('.');
            if (tokenParts.length !== 3) {
                throw new Error('Invalid JWT format');
              }
            
              const payload = tokenParts[1];
                const decodedPayload = atob(payload);
                console.log(decodedPayload)
                try {
                    this.payload = JSON.parse(decodedPayload);
                } catch (error: any) {
                    console.error('Error decoding JWT payload:', error.message);
                    throw new Error('Error decoding JWT payload');
                }
        },
        async setRole(role: string) {
            try {
                await api.roles.change({role: role})
                await this.refresh()
                await this.fetchRoles()
            }
            catch(error: any) {
                console.log(error)
            }            
        },
        async fetchRoles() {
            try {
                const response = await api.roles.my()
                this.roles = response
                await this.getPayload()
            }
            catch(error: any) {
                console.log(error)
            }
        },
        async logout() {
            try {
                api.auth.logout()
                this.access_token = '';
                this.refresh_token = '';
                this.user = null;
            } catch (error: any) {
                console.log(error)
            }
            
        },
        async login(data: any) {
            try {
                const r = await api.auth.login(data)
                console.log(r)
            } catch(e) {
                console.log(e)
            }
        },
        async getUserById(id: string) {
            try {
                const user = await api.users.getById(id);

                const userRoles = await api.roles.get_user_roles(user.uuid)


                const response = await api.roles.get_data(user.role.current, userRoles[user.role.current].uuid)

                console.log(response)
                user.userData = response
                return user
            } catch(error: any) {
                return error
            }
        }
    },
    persist: true,
    getters: {
        currentRoleId() {
            return this.roles[this.payload.role].uuid
        },
        loggedId() {
            if(this.access_token && this.user) {
                return true
            }
            return false
        }
    }
})