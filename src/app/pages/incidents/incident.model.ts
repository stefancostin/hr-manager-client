export interface IIncident {
    id: number;
    project_id: number;
    employee_id: number;
    code: string;
    subject: string;
    description: string;
}

export class Incident implements IIncident {
    id: number;
    project_id: number;
    employee_id: number;
    code: string;
    subject: string;
    description: string;

    public constructor() {
        this.id = null;
        this.project_id = null;
        this.employee_id = null;
        this.code = null;
        this.subject = null;
        this.description = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IIncident;
}
