export default interface RolesMyDto {
    "uuid": string,
    "current": string,
    "applicant": {
        "uuid": string,
        "name": string,
        "surname": string,
        "birthday": object,
        "study_place": string,
        "inn": string,
        "competitions": string,
        "summary": string,
        "created_at": string,
        "updated_at": string
    },
    "individual": {
        "uuid": string,
        "name": string,
        "surname": string,
        "patronymic": string,
        "summary": string
    },
    "legal_entity": {
        "uuid": string,
        "title": string,
        "inn": string,
        "contact_info": string,
        "summary": string
    },
    "moderator": {
        "uuid": string,
        "name": string,
        "surname": string
    }
}