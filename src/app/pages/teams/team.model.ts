export interface ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
    projects?: any;
}

export class Team implements ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
    projects?: any;

    public constructor() {
        this.id = null;
        this.competence_center_id = null;
        this.code = null;
        this.name = null;
        this.projects = [];
    }
}

export class TransferObject {
    formType: number;
    data?: ITeam;
}
