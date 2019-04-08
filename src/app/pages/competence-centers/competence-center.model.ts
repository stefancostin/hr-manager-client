export interface ICompetenceCenter {
    id: number;
    code: string;
    city: string;
    country: string;
}

export class CompetenceCenter implements ICompetenceCenter {
    id: number;
    code: string;
    city: string;
    country: string;

    public constructor() {
        this.id = null;
        this.code = null;
        this.city = null;
        this.country = null;
    }
}

export class TransferObject {
    formType: number;
    data?: ICompetenceCenter;
}
