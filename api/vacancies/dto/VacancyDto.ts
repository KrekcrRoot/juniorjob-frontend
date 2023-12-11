export default interface VacancyDto {
        "uuid": string,
        "employer": string,
        "title": string,
        "category": {
          "uuid": string,
          "title": string
        },
        "time": string,
        "place": string,
        "description": string,
        "required_experience": boolean,
        "several_applicants": boolean,
        "deleted": boolean,
        "banned": boolean
}