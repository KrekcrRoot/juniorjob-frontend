// import {useTokenFetch} from "@/plugins/useTokenFetch";

// const createApi = (token: string) => {
//     //Функция для создания URL на основе имени resource
//     const createUrl = (resource: string) => `/api/${resource}`;

//     //Объект API 
//     const api = {
//         users() {
//             return {
//                 getAll() {
//                     const url = createUrl('users');
//                     return useTokenFetch(url, {method: 'GET', token});
//                 },
//                 getById(userId: number) {
//                     const url = createUrl(`users/${userId}`);
//                     return useTokenFetch(url, { method: 'GET', token });
//                 },
//             };
//         },
//     };
//     return api;
// };
// export default createApi;