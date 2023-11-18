import useGuestFetch from "~/plugins/useGuestFetch";
import {useAsyncData} from "nuxt/app";
import {$fetch} from "ofetch";

export interface LoginDto {
    email: string;
    password: string;
}


export default () => {
    return {

        async login(loginDto: LoginDto) {
            return $fetch('/auth/local/signin', {
                method: 'POST',
                baseURL: 'https://api.junior-job.ru',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: loginDto,
            });
        }

    }
}