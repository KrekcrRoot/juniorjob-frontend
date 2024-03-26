import instance from "./instance";
import instanceChat from "./instance-chat";
import authModule from "./auth";
import citiesModule from "./cities";
import usersModule from "./users";
import rolesModule from "./roles";
import categoriesModule from "./categories";
import vacanciesModule from "./vacancies";
import professionModule from "./profession";
import chatModule from "./chat";

export default {
  auth: authModule(instance),
  cities: citiesModule(instance),
  users: usersModule(instance),
  roles: rolesModule(instance),
  categories: categoriesModule(instance),
  vacancies: vacanciesModule(instance),
  profession: professionModule(instance),
  chat: chatModule(instanceChat),
};
