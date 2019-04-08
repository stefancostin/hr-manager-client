export interface ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
}

export class Team implements ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;

    public constructor() {
        this.id = null;
        this.competence_center_id = null;
        this.code = null;
        this.name = null;
    }
}

export class TransferObject {
    formType: number;
    data?: ITeam;
}
