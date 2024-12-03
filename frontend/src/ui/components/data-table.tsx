import { Flex, Table, chakra } from "@chakra-ui/react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export interface DataTableProps<Data extends object> {
  data: Data[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  columns: ColumnDef<Data, any>[];
}

export const DataTable = <Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  return (
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // const meta = header.column.columnDef.meta;
              return (
                <Table.ColumnHeader
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  // isNumeric={!isNaN(Number(meta))}
                >
                  <Flex align="center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    <chakra.span pl="2">
                      {header.column.getIsSorted() &&
                        (header.column.getIsSorted() === "desc" ? (
                          <AiFillCaretDown aria-label="sorted descending" />
                        ) : (
                          <AiFillCaretUp aria-label="sorted ascending" />
                        ))}
                    </chakra.span>
                  </Flex>
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // const meta = cell.column.columnDef.meta;
              return (
                <Table.Cell
                  key={cell.id}
                  style={{
                    width:
                      cell.column.getSize() !== 0
                        ? cell.column.getSize()
                        : undefined,
                  }}
                  // isNumeric={!isNaN(Number(meta))}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
