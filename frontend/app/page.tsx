"use client";

import { DeleteEmployeeDialog } from "@/app/features/employees/components/delete-employee-dialog";
import { EmployeeFormDialog } from "@/app/features/employees/components/employee-form-dialog";
import { EmployeeTable } from "@/app/features/employees/components/employee-table";
import { useEmployeeStore } from "@/app/features/employees/store/use-employee-store";
import { Button } from "@/components/ui/button";

export default function Page() {
	const { openCreateForm } = useEmployeeStore();

	return (
		<main className="min-h-svh">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
				<div className="flex items-center justify-between gap-4">
					<h1 className="text-2xl font-semibold">Manage your employees</h1>
					<Button onClick={openCreateForm} type="button">
						Create employee
					</Button>
				</div>

				<EmployeeTable />
			</div>

			<EmployeeFormDialog />

			<DeleteEmployeeDialog />
		</main>
	);
}
