export interface Appointment {
    id: number,
    name: number
}

export interface APIResponse {
    statusCode: number,
    message: string | null,
    data: Appointment[]
}

export interface SearchCriteria {
    practitionerId: number,
    dtStart: string,
    dtEnd: string
}