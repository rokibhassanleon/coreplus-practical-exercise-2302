import { APIResponse } from '../types/Practitioner';
import { fetch } from '../utils/Fetchers';

export const CallAPI = async (endPoint:string, queryParams:any|null) => {
    let apiUrl = endPoint

    if(queryParams) {
        apiUrl = endPoint + new URLSearchParams(queryParams).toString()
    }

    const { statusCode, message, data } = await fetch<APIResponse>(apiUrl);

    if(statusCode === 200) {
        return {data: data};
    }
    
    return {statusCode, message}
}