import { AxiosInstance } from "axios";

import UserDto from "./dto/UserDto";

export default (instance: AxiosInstance) => {
    return {
        async my() {
            return instance.get<UserDto>('/users/my')
        }
    }
}