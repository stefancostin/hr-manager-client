export interface IEmployee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    hiring_date: string;
    role_id?: number;
    team_id?: number;
}

export class Employee implements IEmployee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    hiring_date: string;
    role_id?: number;
    team_id?: number;

    public constructor() {
        this.id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.hiring_date = null;
        this.role_id = null;
        this.team_id = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IEmployee;
}
