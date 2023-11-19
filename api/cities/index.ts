import {AxiosInstance} from "axios";

import CitiesDto from "./dto/CitiesDto"
import CityDto from "./CityDto";

export default (instance: AxiosInstance) => {
    return {
        async all() {
            return instance.get<CityDto>('/cities')
        }
    }
}