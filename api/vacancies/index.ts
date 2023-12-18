import { AxiosInstance } from "axios";
import VacancyDto from "./dto/VacancyDto";
import VacancyRequestDto from "./dto/VacancyRequestDto";
import VacancyUuidDto from "./dto/VacancyUuidDto"

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
        async delete(data: VacancyUuidDto) {
            return instance.delete('/vacancies/delete', { data: data })
        },
        async all(data?: any) {
            return instance.get<VacancyDto>('/vacancies/all', {
                 data
            })
        },
        async my() {
            return instance.get<VacancyDto>('/vacancies/my')
        },
        async getById(id: string) {
            return instance.get<VacancyDto>(`/vacancies/${id}`)
        }
    }
}