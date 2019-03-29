export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hiringDate: string;
    role_id?: number;
    team_id?: number;
}

export class TransferObject {
    formType: string;
    data?: IEmployee;
}

export enum Actions {
    Create,
    Edit,
    Delete
}
