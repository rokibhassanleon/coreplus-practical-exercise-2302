export interface AppointmentSummary {
    year: number,
    month: number,
    revenue: number,
    cost: number
}

export interface AppointmentDetails {
    id: number,
    date: string,
    client_name: string,
    appointment_type: string,
    duration: number
}

export interface Appointment {
    id: number,
    practitioner_id: number,
    date: string,
    revenue: number,
    cost: number
}

export interface AppointmentSummaryList {
    practitioner_id: number,
    practitionerName: string,
    appointmentList: AppointmentSummary[]
}