import { AxiosInstance } from "axios";
import CategoryDto from "./dto/CategoryDto";

export default (instance: AxiosInstance) => {
    return {
        async all() {
            return instance.get<CategoryDto>('/vacancies/category/all')
        },
        async store(title: string) {
            return instance.post<CategoryDto>('/vacancies/category/store', title)
        }
    }
}