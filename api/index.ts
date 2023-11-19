
import instance from "./instance";
import authModule from './auth';
import citiesModule from "./cities";
import usersModule from './users';

export default {
    auth: authModule(instance),
    cities: citiesModule(instance),
    users: usersModule(instance)
}