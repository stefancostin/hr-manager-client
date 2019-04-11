export interface IComputer {
    id: number;
    employee_id?: number;
    operating_system: string;
    code: string;
    cpu: string;
    ram: string;
    hdd: string;
    employee?: any;
}

export class Computer implements IComputer {
    id: number;
    employee_id?: number;
    operating_system: string;
    code: string;
    cpu: string;
    ram: string;
    hdd: string;
    employee: any;

    public constructor() {
        this.id = null;
        this.employee_id = null;
        this.operating_system = null;
        this.code = null;
        this.cpu = null;
        this.ram = null;
        this.hdd = null;
        this.employee = {};
    }
}

export class TransferObject {
    formType: number;
    data?: IComputer;
}
