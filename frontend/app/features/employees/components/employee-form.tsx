import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateEmployee } from "@/app/features/employees/hooks/use-create-employee";
import { useUpdateEmployee } from "@/app/features/employees/hooks/use-update-employee";
import { useEmployeeStore } from "@/app/features/employees/store/use-employee-store";
import type { EmployeeMutationInput } from "@/app/features/employees/types/employee";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function EmployeeForm() {
	const { activeEmployee: employee, closeForm } = useEmployeeStore();
	const createEmployee = useCreateEmployee();
	const updateEmployee = useUpdateEmployee();
	const isEditing = employee !== null;

	const { handleSubmit, register, reset } = useForm<EmployeeMutationInput>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			department: "",
		},
	});

	useEffect(() => {
		reset(
			employee
				? {
						firstName: employee.firstName,
						lastName: employee.lastName,
						email: employee.email,
						department: employee.department,
						salary: employee.salary,
					}
				: {
						firstName: "",
						lastName: "",
						email: "",
						department: "",
					},
		);
	}, [employee, reset]);

	const isSubmitting = createEmployee.isPending || updateEmployee.isPending;

	function onSubmit(values: EmployeeMutationInput) {
		if (isEditing && employee) {
			updateEmployee.mutate(
				{
					id: employee.id,
					input: values,
				},
				{
					onSuccess: closeForm,
				},
			);

			return;
		}

		createEmployee.mutate(values, {
			onSuccess: () => {
				reset();
				closeForm();
			},
		});
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
			<FieldSet className="gap-4" disabled={isSubmitting}>
				<div className="grid gap-4 sm:grid-cols-2">
					<Field orientation="vertical">
						<FieldLabel htmlFor="firstName">First name</FieldLabel>
						<FieldContent>
							<Input
								id="firstName"
								placeholder="Jane"
								{...register("firstName")}
							/>
						</FieldContent>
					</Field>

					<Field orientation="vertical">
						<FieldLabel htmlFor="lastName">Last name</FieldLabel>
						<FieldContent>
							<Input
								id="lastName"
								placeholder="Doe"
								{...register("lastName")}
							/>
						</FieldContent>
					</Field>
				</div>

				<Field orientation="vertical">
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<FieldContent>
						<Input
							id="email"
							type="email"
							placeholder="jane.doe@example.com"
							{...register("email")}
						/>
					</FieldContent>
				</Field>

				<Field orientation="vertical">
					<FieldLabel htmlFor="department">Department</FieldLabel>
					<FieldContent>
						<Input
							id="department"
							placeholder="Engineering"
							{...register("department")}
						/>
					</FieldContent>
				</Field>

				<Field orientation="vertical">
					<FieldLabel htmlFor="salary">Salary</FieldLabel>
					<FieldContent>
						<Input
							id="salary"
							type="number"
							min="0"
							step="0.01"
							placeholder="50000"
							{...register("salary", {
								valueAsNumber: true,
							})}
						/>
					</FieldContent>
				</Field>
			</FieldSet>

			<div className="flex items-center justify-end gap-3 pt-2">
				<Button onClick={closeForm} type="button" variant="outline">
					Cancel
				</Button>
				<Button disabled={isSubmitting} type="submit">
					{isSubmitting
						? isEditing
							? "Saving..."
							: "Creating..."
						: isEditing
							? "Update employee"
							: "Create employee"}
				</Button>
			</div>
		</form>
	);
}

export { EmployeeForm };
