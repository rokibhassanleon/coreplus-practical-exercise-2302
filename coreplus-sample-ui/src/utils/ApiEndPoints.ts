const rootUrl ="https://localhost:5002"
export var APIEndPoints = {
    GetSupervisors: rootUrl+"/practitioners/supervisors",
    GetOthers: rootUrl+"/practitioners/others",
    GetAll: rootUrl+"/practitioners",
    GetAppointmentSummary: rootUrl+"/appointments/summary/?"
}