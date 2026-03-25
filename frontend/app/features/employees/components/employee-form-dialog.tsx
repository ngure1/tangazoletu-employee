import { EmployeeForm } from "@/app/features/employees/components/employee-form";
import { useEmployeeStore } from "@/app/features/employees/store/use-employee-store";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function EmployeeFormDialog() {
	const {
		activeEmployee: employee,
		closeForm,
		isFormOpen,
	} = useEmployeeStore();
	const isEditing = employee !== null;

	return (
		<Dialog
			onOpenChange={(open) => {
				if (!open) {
					closeForm();
				}
			}}
			open={isFormOpen}
		>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit employee" : "Create employee"}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? "Update the selected employee details."
							: "Add a new employee record."}
					</DialogDescription>
				</DialogHeader>

				<EmployeeForm />
			</DialogContent>
		</Dialog>
	);
}

export { EmployeeFormDialog };
