import { AxiosInstance } from "axios";
import ProfessionRequestDto from "./dto/ProfessionRequestDto";
import ProfessionResponseDto from "./dto/ProfessionResponseDto";
import ProfessionCategoryRequestDto from "./dto/ProfessionCategoryRequestDto";
import ProfessionCategoryResponseDto from "./dto/ProfessionCategoryResponseDto";
import ProfessionImageRequestDto from "./dto/ProfessionImageResponseDto";

export default (instance: AxiosInstance) => {
  return {
    async create(data: ProfessionRequestDto) {
      return instance.post<ProfessionResponseDto>(
        "/professional-trials/store",
        data
      );
    },
    async uploadImage(data: ProfessionImageRequestDto) {
      return instance.post("/professional-trials/uploadImage", data);
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
