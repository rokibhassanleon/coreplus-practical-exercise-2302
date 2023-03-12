import { APIEndPoints } from '../utils/ApiEndPoints';
import { CallAPI } from '../utils/ApiClient';

export const getAppointmentSummary = async (searchCriteria:any) => {
    return CallAPI(APIEndPoints.GetAppointmentSummary, searchCriteria)
}