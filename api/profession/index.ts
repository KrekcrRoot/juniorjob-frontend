import { AxiosInstance } from "axios";
import ProfessionRequestDto from "./dto/ProfessionRequestDto";
import ProfessionResponseDto from "./dto/ProfessionResponseDto";
import ProfessionCategoryRequestDto from "./dto/ProfessionCategoryRequestDto";
import ProfessionCategoryResponseDto from "./dto/ProfessionCategoryResponseDto";
import ProfessionImageRequestDto from "./dto/ProfessionImageResponseDto";

export default (instance: AxiosInstance) => {
  return {
    async all(params?: any) {
      return instance.get("/professional-trials/all", { params });
    },
    async my() {
      return instance.get("/professional-trials/my");
    },
    async getMyResponded(uuid: string) {
      return instance.get(`/professional-trials/users/${uuid}`);
    },
    async delete(data: ProfessionCategoryRequestDto) {
      return instance.delete("/professional-trials", { data: data });
    },
    async create(data: ProfessionRequestDto) {
      return instance.post<ProfessionResponseDto>(
        "/professional-trials/store",
        data
      );
    },
    async respond(prof_uuid: string) {
      return instance.post("/professional-trials/respond", {
        professional_trial_uuid: prof_uuid,
      });
    },
    async unregister(data: any) {
      return instance.delete("/professional-trials/respond", {
        data,
      });
    },
    async uploadImage(formData: FormData) {
      return instance.post("/professional-trials/uploadImage", formData, {
        headers: {
          ...instance.defaults.headers, // сохраняем текущие заголовки
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async allCategories() {
      return instance.get("/professional-trial-categories/all");
    },
    async createCategory(data: ProfessionCategoryRequestDto) {
      return instance.post<ProfessionCategoryResponseDto>(
        "/professional-trial-categories/store",
        data
      );
    },
  };
};
