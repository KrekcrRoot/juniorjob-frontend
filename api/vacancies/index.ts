import { AxiosInstance } from "axios";
import VacancyDto from "./dto/VacancyDto";
import VacancyRequestDto from "./dto/VacancyRequestDto";

export default (instance: AxiosInstance) => {
    return {
        async create(data: VacancyRequestDto) {
            return instance.post<VacancyDto>('/vacancies/create', data)
        },
        async ban(id: string) {
            return instance.post<VacancyDto>('/vacancies/ban')
        },
        async unban(id: string) {
            return instance.post<VacancyDto>('/vacancies/unban')
        },
        async edit(data: VacancyRequestDto) {
            return instance.put<VacancyDto>('/vacancies/edit', data)
        },
        async delete(id: string) {
            return instance.delete<VacancyDto>('/vacancies/delete')
        },
        async all() {
            return instance.get<VacancyDto>('/vacancies/all')
        },
        async my() {
            return instance.get<VacancyDto>('/vacancies/my')
        },
        async getById(id: string) {
            return instance.get<VacancyDto>(`/vacancies/${id}`)
        }
    }
}