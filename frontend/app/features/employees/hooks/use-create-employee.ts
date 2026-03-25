import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createEmployeeMutation } from "@/app/features/employees/queries/employees";

function useCreateEmployee() {
	const queryClient = useQueryClient();

	return useMutation({
		...createEmployeeMutation(),
		onSuccess: async (employee) => {
			toast.success(`Created ${employee.firstName} ${employee.lastName}`);
			await queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
		onError: (error) => {
			toast.error(`Failed to create employee: ${error.message}`);
		},
	});
}

export { useCreateEmployee };
