import {AxiosInstance} from "axios";

import LoginDto from './dto/LoginDto'
import RegisterDto from "./dto/RegisterDto";
import TokenDto from "~/api/auth/TokenDto";


export default (instance: AxiosInstance) => {

    return {
        async login(loginDto: LoginDto) {
            return instance.post<TokenDto>('/auth/local/signin', loginDto);
        },
        async register(registerDto: RegisterDto) {
            return instance.post<TokenDto>('/auth/local/signup', registerDto);
        },
        async refresh(tokenDto: TokenDto) {
            return instance.post<TokenDto>('/auth/refresh', tokenDto);
        }
    }

}