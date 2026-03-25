import { useDeleteEmployee } from "@/app/features/employees/hooks/use-delete-employee";
import { useEmployeeStore } from "@/app/features/employees/store/use-employee-store";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DeleteEmployeeDialog() {
	const { isPending, mutate: deleteEmployee } = useDeleteEmployee();
	const {
		activeEmployee: employee,
		closeDeleteDialog,
		isDeleteDialogOpen,
	} = useEmployeeStore();

	function handleDeleteConfirm() {
		if (!employee) {
			return;
		}

		deleteEmployee(employee.id, {
			onSuccess: closeDeleteDialog,
		});
	}

	return (
		<AlertDialog
			onOpenChange={(open) => {
				if (!open && !isPending) {
					closeDeleteDialog();
				}
			}}
			open={isDeleteDialogOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete employee?</AlertDialogTitle>
					<AlertDialogDescription>
						{employee
							? `This will permanently remove ${employee.firstName} ${employee.lastName}.`
							: "This action cannot be undone."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isPending}
						onClick={(event) => {
							event.preventDefault();
							handleDeleteConfirm();
						}}
						variant="destructive"
					>
						{isPending ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { DeleteEmployeeDialog };
