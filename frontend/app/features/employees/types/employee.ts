export interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	department: string;
	salary: number;
}

export interface EmployeeMutationInput {
	firstName: string;
	lastName: string;
	email: string;
	department: string;
	salary: number;
}

export interface UpdateEmployeeMutationInput {
	id: Employee["id"];
	input: EmployeeMutationInput;
}

export interface EmployeeErrorResponse {
	timestamp: string;
	message: string;
	details: string;
}
