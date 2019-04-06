export interface IProject {
    id: number;
    team_id?: number;
    code: string;
    name: string;
}

export class TransferObject {
    formType: string;
    data?: IProject;
}
