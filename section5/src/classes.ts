abstract class Department {

    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) { }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    static createEmployee(name: string) {
        return { name: name };
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe(): void {
        console.log('IT Department - ID: ' + this.id);
    }
}

class AccountingDepartment extends Department {

    private lastReport: string;
    private static accountingDepartment: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report yet');
    }

    set mostRecentReport(report: string) {
        if (!report) {
            throw new Error('Please pass valid report');
        }
        this.addReports(report);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'ACCOUNTING');
        this.lastReport = reports[0];
    }

    addReports(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(employee: string) {
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    }

    describe(): void {
        console.log('Accounting department - ID: ' + this.id);
    }

    static getInstance() {
        if (this.accountingDepartment) {
            return this.accountingDepartment;
        }
        this.accountingDepartment = new AccountingDepartment('2', []);
        return this.accountingDepartment;
    }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1);
console.log(Department.fiscalYear);

const it = new ITDepartment('1', ['Max']);
it.describe();
it.addEmployee('Max');
it.addEmployee('Lando');
it.printEmployeeInformation();
console.log(it);

const accounting = AccountingDepartment.getInstance();
accounting.addEmployee('Max');
accounting.addEmployee('Lando');
accounting.addReports('Something went wrong');
accounting.describe();
accounting.printReports();
accounting.mostRecentReport = 'Another report';
console.log(accounting);
console.log(accounting.mostRecentReport);

