export interface IIncident {
    id: number;
    project_id: number;
    employee_id: number;
    code: string;
    subject: string;
    description: string;
}

export class TransferObject {
    formType: string;
    data?: IIncident;
}
