import { AxiosInstance } from "axios";
import VacancyDto from "./dto/VacancyDto";
import VacancyRequestDto from "./dto/VacancyRequestDto";
import VacancyUuidDto from "./dto/VacancyUuidDto";
import VacancyResponseMessageDto from "./dto/VacancyResponseMessageDto";
import type VacancyResponseDto from "./dto/VacancyResponseDto";

export default (instance: AxiosInstance) => {
  return {
    async create(data: VacancyRequestDto) {
      return instance.post<VacancyDto>("/vacancies/create", data);
    },
    async ban(id: string) {
      return instance.post<VacancyDto>("/vacancies/ban");
    },
    async unban(id: string) {
      return instance.post<VacancyDto>("/vacancies/unban");
    },
    async edit(data: VacancyRequestDto) {
      return instance.put<VacancyDto>("/vacancies/edit", data);
    },
    async delete(data: VacancyUuidDto) {
      return instance.delete("/vacancies/delete", { data: data });
    },
    async all(params?: any) {
      return instance.get<VacancyDto>("/vacancies/all", { params });
    },
    async search(params?: any) {
      return instance.get<VacancyDto>("/vacancies/search", { params });
    },
    async my() {
      return instance.get<VacancyDto>("/vacancies/my");
    },
    async getById(id: string) {
      return instance.get<VacancyDto>(`/vacancies/${id}`);
    },
    async createResponse(data: VacancyResponseMessageDto) {
      return instance.post<VacancyResponseDto>(
        `/vacancies/response/create`,
        data
      );
    },
    async getResponsesApplicant(uuid: string) {
      return instance.get<VacancyResponseDto>(
        `/vacancies/response/applicant/${uuid}`
      );
    },
    async getCandidatsByVacancy(uuid: string) {
      return instance.get<VacancyResponseDto>(
        `/vacancies/response/vacancy/${uuid}`
      );
    },
    async selectResponse(uuid: string) {
      return instance.post<any>("/vacancies/selectResponse", {
        vacancy_response: uuid,
      });
    },
  };
};
