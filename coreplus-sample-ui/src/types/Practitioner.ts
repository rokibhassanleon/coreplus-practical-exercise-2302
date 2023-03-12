export interface Practitioner {
    id: number,
    name: number,
    results: PractitionerLevel
}

enum PractitionerLevel {
    OWNER,
    ADMIN,
    CASE_MANAGER,
    PRACTITIONER
}

export interface APIResponse {
    statusCode: number,
    message: string | null,
    data: any
}