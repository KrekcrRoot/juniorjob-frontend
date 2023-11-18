import {AvailableRouterMethod} from "nitropack";
import {$fetch} from "ofetch";

export default (request: string, method: AvailableRouterMethod<string>, body: object) => {

    const config = useRuntimeConfig();

    return $fetch(request, {
        method: method,
        baseURL: 'https://api.junior-job.ru',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    })

}