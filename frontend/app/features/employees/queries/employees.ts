import { mutationOptions, queryOptions } from "@tanstack/react-query";

import type {
	Employee,
	EmployeeMutationInput,
	UpdateEmployeeMutationInput,
} from "@/app/features/employees/types/employee";
import { apiClient } from "@/lib/api-client";

const EMPLOYEES_ENDPOINT = "/api/employees";

export const employeesQuery = () =>
	queryOptions({
		queryKey: ["employees"],
		queryFn: async (): Promise<Employee[]> => {
			const response = await apiClient.get<Employee[]>(EMPLOYEES_ENDPOINT);
			return response.data;
		},
	});

export const createEmployeeMutation = () =>
	mutationOptions({
		mutationFn: async (input: EmployeeMutationInput): Promise<Employee> => {
			const response = await apiClient.post<Employee>(
				EMPLOYEES_ENDPOINT,
				input,
			);
			return response.data;
		},
	});

export const updateEmployeeMutation = () =>
	mutationOptions({
		mutationFn: async ({
			id,
			input,
		}: UpdateEmployeeMutationInput): Promise<Employee> => {
			const response = await apiClient.put<Employee>(
				`${EMPLOYEES_ENDPOINT}/${id}`,
				input,
			);
			return response.data;
		},
	});

export const deleteEmployeeMutation = () =>
	mutationOptions({
		mutationFn: async (id: Employee["id"]): Promise<void> => {
			await apiClient.delete(`${EMPLOYEES_ENDPOINT}/${id}`);
		},
	});
