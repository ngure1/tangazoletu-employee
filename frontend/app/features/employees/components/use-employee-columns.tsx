import type { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { useEmployeeStore } from "@/app/features/employees/store/use-employee-store";
import type { Employee } from "@/app/features/employees/types/employee";
import { Button } from "@/components/ui/button";

function formatSalary(value: number) {
	return new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

function useEmployeeColumns(): ColumnDef<Employee>[] {
	const { openDeleteDialog, openEditForm } = useEmployeeStore();

	return [
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => (
				<span className="font-mono text-xs text-muted-foreground">
					{row.original.id}
				</span>
			),
		},
		{
			id: "name",
			header: "Name",
			cell: ({ row }) => (
				<div className="font-medium">
					{row.original.firstName} {row.original.lastName}
				</div>
			),
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => (
				<span className="text-muted-foreground">{row.original.email}</span>
			),
		},
		{
			accessorKey: "department",
			header: "Department",
			cell: ({ row }) => row.original.department,
		},
		{
			accessorKey: "salary",
			header: () => <div className="text-right">Salary</div>,
			cell: ({ row }) => (
				<div className="text-right font-mono tabular-nums">
					{formatSalary(row.original.salary)}
				</div>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-right">Actions</div>,
			cell: ({ row }) => {
				const employee = row.original;

				return (
					<div className="flex justify-end gap-2">
						<Button
							size="sm"
							variant="outline"
							onClick={() => openEditForm(employee)}
							type="button"
						>
							<PencilLine />
							Edit
						</Button>
						<Button
							size="sm"
							variant="destructive"
							onClick={() => openDeleteDialog(employee)}
							type="button"
						>
							<Trash2 />
							Delete
						</Button>
					</div>
				);
			},
		},
	];
}

export { useEmployeeColumns };
