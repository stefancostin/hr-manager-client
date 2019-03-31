export interface ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
}

export class TransferObject {
    formType: string;
    data?: ITeam;
}
