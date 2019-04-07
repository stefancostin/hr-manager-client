export interface IRole {
    id: number;
    code: string;
    name: string;
    description: string;
    is_management: boolean;
}

export class TransferObject {
    formType: number;
    data?: IRole;
}
