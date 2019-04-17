export interface ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
    projects?: any;
    employees?: any;
}

export class Team implements ITeam {
    id: number;
    competence_center_id: number;
    code: string;
    name: string;
    projects?: any;
    employees?: any;

    public constructor() {
        this.id = null;
        this.competence_center_id = null;
        this.code = null;
        this.name = null;
        this.projects = [];
        this.employees = [];
    }
}

export class TransferObject {
    formType: number;
    data?: ITeam;
}
