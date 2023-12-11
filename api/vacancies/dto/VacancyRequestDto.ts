export default interface VacancyRequestDto {
  "title": string,
  "category_uuid": string,
  "time": string,
  "place": string,
  "description": string,
  "required_experience": boolean,
  "several_applicants": boolean
}