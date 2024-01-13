import { AxiosInstance } from "axios";

import UserDto from "./dto/UserDto";

export default (instance: AxiosInstance) => {
  return {
    async my() {
      return instance.get<UserDto>("/users/my");
    },
    async getById(id: string) {
      return instance.get<UserDto>(`/users/${id}`);
    },
    async changePassword(previous_password: string, new_password: string) {
      return instance.post<Boolean>(`/users/changePassword`, {
        previous_password: previous_password,
        new_password: new_password,
      });
    },
    async uploadImage(formData: FormData) {
      return instance.post("/users/uploadImage", formData, {
        headers: {
          ...instance.defaults.headers, // сохраняем текущие заголовки
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };
};
