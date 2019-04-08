export interface IComputer {
    id: number;
    employee_id?: number;
    operating_system: string;
    cpu: string;
    ram: string;
    hdd: string;
}

export class Computer implements IComputer {
    id: number;
    employee_id?: number;
    operating_system: string;
    cpu: string;
    ram: string;
    hdd: string;

    public constructor() {
        this.id = null;
        this.employee_id = null;
        this.operating_system = null;
        this.cpu = null;
        this.ram = null;
        this.hdd = null;
    }
}

export class TransferObject {
    formType: number;
    data?: IComputer;
}
