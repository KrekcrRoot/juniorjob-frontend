import {AxiosInstance} from "axios";

import LoginDto from './dto/LoginDto'
import TokenDto from "~/api/auth/TokenDto";


export default (instance: AxiosInstance) => {

    return {
        async login(loginDto: LoginDto) {
            return instance.post<TokenDto>('/auth/local/signin', loginDto);
        }
    }

}