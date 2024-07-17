import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn
} from "@/shared";
import { useState } from "react";
import { DataTablePagination } from "./dataTablePagination";
import { DataTableViewOptions } from "./dataTableViewOptions";
import { GlobalFilter } from "./globalFilter";
import { useDispatch } from "react-redux";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../custom";
import { Loader2 } from "lucide-react";
import { AppDispatch, useAppSelector, utilityActions } from "@/app";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titleButton?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  titleButton
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useAppSelector((state) => state.utility.getLoading);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  // const getSelectedRows = () => {
  //   const selectedRows = table
  //     .getSelectedRowModel()
  //     .flatRows.map((row) => row.original);
  //   console.log("Selected Rows: ", selectedRows);
  //   return selectedRows;
  // };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <GlobalFilter table={table} />
        <DataTableViewOptions table={table} />
        {titleButton && (
          <Button
            // variant="outline"
            size="sm"
            onClick={() =>
              dispatch(
                utilityActions.showModal({
                  isModalShow: true,
                  isEdit: false,
                  data: [],
                  namaForm: "LoginForm"
                })
              )
            }
            className="h-8 ml-2 lg:flex"
          >
            <PlusIcon className="mr-2" />
            {titleButton}
          </Button>
        )}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading.table ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  <div className="flex justify-center">
                    <Loader2
                      className={cn(
                        "h-5 w-5 text-primary/60 animate-spin mr-2"
                      )}
                    />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
