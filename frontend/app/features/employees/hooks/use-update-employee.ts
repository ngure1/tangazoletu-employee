import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateEmployeeMutation } from "@/app/features/employees/queries/employees";

function useUpdateEmployee() {
	const queryClient = useQueryClient();

	return useMutation({
		...updateEmployeeMutation(),
		onSuccess: async (employee) => {
			toast.success(`Updated ${employee.firstName} ${employee.lastName}`);
			await queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
		onError: (error) => {
			toast.error(`Failed to update employee: ${error.message}`);
		},
	});
}

export { useUpdateEmployee };
