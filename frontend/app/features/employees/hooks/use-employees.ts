import { useQuery } from "@tanstack/react-query";

import { employeesQuery } from "@/app/features/employees/queries/employees";

function useEmployees() {
	return useQuery(employeesQuery());
}

export { useEmployees };
