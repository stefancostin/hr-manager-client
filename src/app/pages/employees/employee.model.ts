export interface IEmployee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    hiring_date: string;
    role_id?: number;
    team_id?: number;
}

export class TransferObject {
    formType: number;
    data?: IEmployee;
}
