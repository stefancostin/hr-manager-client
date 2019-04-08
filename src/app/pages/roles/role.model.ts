export interface IRole {
    id: number;
    code: string;
    name: string;
    description: string;
    is_management: boolean;
}

export class Role implements IRole {
    id: number;
    code: string;
    name: string;
    description: string;
    is_management: boolean;

    public constructor() {
        this.id = null;
        this.code = null;
        this.name = null;
        this.description = null;
        this.is_management = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IRole;
}
