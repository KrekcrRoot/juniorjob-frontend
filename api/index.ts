
import instance from "./instance";
import authModule from './auth';
import citiesModule from "./cities";
import usersModule from './users';
import rolesModule from "./roles";

export default {
    auth: authModule(instance),
    cities: citiesModule(instance),
    users: usersModule(instance),
    roles: rolesModule(instance)
}