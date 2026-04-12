import {API_CONFIG} from "../constants/api";


export function buildApiUrl(path: string):string{
    return `${API_CONFIG.BASE_URL}${path}`;
}