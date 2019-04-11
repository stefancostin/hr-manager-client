export interface IProject {
    id: number;
    team_id?: number;
    code: string;
    name: string;
    teams?: any;
}

export class Project implements IProject {
    id: number;
    team_id?: number;
    code: string;
    name: string;

    public constructor() {
        this.id = null;
        this.team_id = null;
        this.code = null;
        this.name = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IProject;
}
