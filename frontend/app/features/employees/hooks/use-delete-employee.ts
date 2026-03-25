import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteEmployeeMutation } from "@/app/features/employees/queries/employees";

function useDeleteEmployee() {
	const queryClient = useQueryClient();

	return useMutation({
		...deleteEmployeeMutation(),
		onSuccess: async () => {
			toast.success("Employee deleted successfully");
			await queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
		onError: (error) => {
			toast.error(`Failed to delete employee: ${error.message}`);
		},
	});
}

export { useDeleteEmployee };
