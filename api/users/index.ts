import { AxiosInstance } from "axios";

import UserDto from "./dto/UserDto";

export default (instance: AxiosInstance) => {
    return {
        async my() {
            return instance.get<UserDto>('/users/my')
        },
        async getById(id: string) {
            return instance.get<UserDto>(`/users/${id}`)
        },
        async uploadImage(formData: FormData) {
            return instance.post('/users/uploadImage', formData, {
                headers: {
                    ...instance.defaults.headers, // сохраняем текущие заголовки
                    'Content-Type': 'multipart/form-data',
                },
              })
        }
    }
}