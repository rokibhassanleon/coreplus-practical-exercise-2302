import { APIEndPoints } from '../utils/ApiEndPoints';
import { CallAPI } from '../utils/ApiClient';
import { SearchCriteria } from '../types/Appointment';

export const getAppointmentSummary = async (searchCriteria:any) => {
    return CallAPI(APIEndPoints.GetAppointmentSummary, searchCriteria)
}
export const getAppointmentList = async (searchCriteria: SearchCriteria) => {
    return CallAPI(APIEndPoints.GetAppointmentList, searchCriteria);
}

export const getAppointmentDetails = async (appointmentId: number) => {
    return CallAPI(APIEndPoints.GetAppointmentDetails, { appointmentId: appointmentId });
}