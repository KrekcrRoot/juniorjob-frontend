import { AxiosInstance } from "axios";
import RoleResultDto from "./RoleResultDto";
import RoleDto from "./dto/RoleDto";
import type RolesMyDto from "./dto/RolesMyDto";

export default (instance: AxiosInstance) => {
    return {
        async change(roleDto: RoleDto) {
            return instance.put<RoleResultDto>('/roles/change', roleDto)
        },
        async my() {
            return instance.get<RolesMyDto>('/roles/my')
        }
    }
}