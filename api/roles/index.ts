import { AxiosInstance } from "axios";
import RoleResultDto from "./dto/RoleResultDto";
import RoleDto from "./dto/RoleDto";
import RolesMyDto from "./dto/RolesMyDto";
import ApplicantDto from "./dto/ApplicantDto";

export default (instance: AxiosInstance) => {
    return {
        async change(roleDto: RoleDto) {
            return instance.put<RoleResultDto>('/roles/change', roleDto)
        },
        async my() {
            return instance.get<RolesMyDto>('/roles/my')
        },
        async applicant<ApplicantDto>(id: string, applicantDto: ApplicantDto) {
            return instance.put(`/roles/applicant/${id}`, applicantDto)
        },
        async individual<IndividualDto>(id: string, individualDto: IndividualDto) {
            return instance.put(`/roles/individual/${id}`, individualDto)
        },
        async legal_entity<LegalEntityDto>(id: string, legalEntityDto: LegalEntityDto) {
            return instance.put(`/roles/legal-entity/${id}`, legalEntityDto)
        },
        async get_data(role: string, id: string) {
            role = role.replace(/_/g, '-')
            return instance.get(`/roles/${role}/${id}`)
        },
        async get_roles_data(id: string) {
            return instance.get(`/roles/${id}`)
        },
        async get_user_roles(userId: string) {
            return instance.get(`/roles/user/${userId}`)
        },
        async searchApplicant(params?: any) {
            return instance.get<ApplicantDto>('/roles/applicant/search', { params })
        }
    }
}