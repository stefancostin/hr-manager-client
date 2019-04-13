export interface IIncident {
    id: number;
    project_id: number;
    employee_id: number;
    code: string;
    subject: string;
    description: string;
    is_solved: boolean;
}

export class Incident implements IIncident {
    id: number;
    project_id: number;
    employee_id: number;
    code: string;
    subject: string;
    description: string;
    is_solved: boolean;

    public constructor() {
        this.id = null;
        this.project_id = null;
        this.employee_id = null;
        this.code = null;
        this.subject = null;
        this.description = null;
        this.is_solved = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IIncident;
}
