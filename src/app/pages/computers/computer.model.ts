export interface IComputer {
    id: number;
    employee_id?: number;
    operating_system: string;
    cpu: string;
    ram: string;
    hdd: string;
}

export class TransferObject {
    formType: string;
    data?: IComputer;
}
