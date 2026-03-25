import { create } from "zustand";

import type { Employee } from "@/app/features/employees/types/employee";

interface EmployeeStatesStore {
	activeEmployee: Employee | null;
	closeDeleteDialog: () => void;
	closeForm: () => void;
	isDeleteDialogOpen: boolean;
	isFormOpen: boolean;
	openCreateForm: () => void;
	openDeleteDialog: (employee: Employee) => void;
	openEditForm: (employee: Employee) => void;
}

const useEmployeeStore = create<EmployeeStatesStore>((set) => ({
	activeEmployee: null,
	closeDeleteDialog: () =>
		set({
			activeEmployee: null,
			isDeleteDialogOpen: false,
		}),
	closeForm: () =>
		set({
			activeEmployee: null,
			isFormOpen: false,
		}),
	isDeleteDialogOpen: false,
	isFormOpen: false,
	openCreateForm: () =>
		set({
			activeEmployee: null,
			isDeleteDialogOpen: false,
			isFormOpen: true,
		}),
	openDeleteDialog: (employee) =>
		set({
			activeEmployee: employee,
			isDeleteDialogOpen: true,
			isFormOpen: false,
		}),
	openEditForm: (employee) =>
		set({
			activeEmployee: employee,
			isDeleteDialogOpen: false,
			isFormOpen: true,
		}),
}));

export { useEmployeeStore };
