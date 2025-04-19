import { useState } from 'react';
import { Anchor, Stack, Table } from "@mantine/core";
import H4 from "../../../../components/H4";
import toolStyles from "../../Tool.module.css";
import { BranchInfoMap } from "../../../../interfaces/BlogVersionInterface";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

interface Props {
  data: BranchInfoMap[] | undefined;
}

const BlogVersion: React.FC<Props> = ({ data }) => {
  // ソート状態を格納 (デフォルトはbranchName)
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'branchName', desc: true },
  ]);

  const columnHelper = createColumnHelper<BranchInfoMap>();
  const columns = [
    columnHelper.accessor('branchName', {
      // header名定義
      header: 'Blog Version',
      // cellレンダリングDOM定義
      cell: info => (
        <Anchor href={info.row.original.fqdn} rel="noopener noreferrer">
          {info.getValue()}
        </Anchor>
      ),
      // sort有効化
      enableSorting: true,
    }),
    columnHelper.accessor('updateTime', {
      header: 'Update Time',
      cell: info => info.getValue() || 'Not Available',
      enableSorting: true,
      // 日時sort用関数独自定義
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.updateTime ? new Date(rowA.original.updateTime).getTime() : 0;
        const b = rowB.original.updateTime ? new Date(rowB.original.updateTime).getTime() : 0;
        return a - b;
      },
    }),
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: { sorting },
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Release" />
      <div className={toolStyles.listMarker}>
        <Table>
          <Table.Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const canSort = header.column.getCanSort();
                  return (
                    <Table.Th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      style={{ cursor: canSort ? 'pointer' : undefined }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Thead>

          <Table.Tbody>
            {table.getRowModel().rows.map(row => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Stack>
  );
};

export default BlogVersion;
