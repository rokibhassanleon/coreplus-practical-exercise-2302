import { APIEndPoints } from '../utils/ApiEndPoints';
import { CallAPI } from '../utils/ApiClient';

export const getSupervisorPractitioners = async () => {
    return CallAPI(APIEndPoints.GetSupervisors, null)
}

export const getOtherPractitioners = async () => {
    return CallAPI(APIEndPoints.GetOthers, null)
}

export const getAllPractitioners = async () => {
    return CallAPI(APIEndPoints.GetAll, null)
}