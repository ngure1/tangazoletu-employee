import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEmployeeColumns } from "@/app/features/employees/components/use-employee-columns";
import { useEmployees } from "@/app/features/employees/hooks/use-employees";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function EmployeeTable() {
	const {
		data: employees = [],
		error,
		isError,
		isPending,
		refetch,
	} = useEmployees();
	const columns = useEmployeeColumns();

	const table = useReactTable({
		data: employees,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const columnCount = table.getAllLeafColumns().length;

	return (
		<div className="overflow-hidden rounded-lg border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isPending ? (
						<TableRow>
							<TableCell
								className="h-32 text-center text-muted-foreground"
								colSpan={columnCount}
							>
								Loading employees...
							</TableCell>
						</TableRow>
					) : isError ? (
						<TableRow>
							<TableCell className="h-32" colSpan={columnCount}>
								<div className="flex flex-col items-center gap-3 text-center">
									<p className="text-sm text-destructive">
										{error instanceof Error
											? error.message
											: "Failed to load employees"}
									</p>
									<Button
										onClick={() => {
											void refetch();
										}}
										size="sm"
										variant="outline"
									>
										Try again
									</Button>
								</div>
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								className="h-32 text-center text-muted-foreground"
								colSpan={columnCount}
							>
								No employees found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export { EmployeeTable };
