import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import RenderCell from "./RenderCell";

const TableComponent = ({ headerColumns, sortedItems, selectedKeys, setSelectedKeys, sortDescriptor, setSortDescriptor, classNames, topContent, bottomContent }) => (
  <Table
    isCompact
    removeWrapper
    aria-label="Example table with custom cells, pagination and sorting"
    bottomContent={bottomContent}
    bottomContentPlacement="outside"
    checkboxesProps={{
      classNames: {
        wrapper: "after:bg-foreground after:text-background text-background",
      },
    }}
    classNames={classNames}
    selectedKeys={selectedKeys}
    selectionMode="multiple"
    sortDescriptor={sortDescriptor}
    topContent={topContent}
    topContentPlacement="outside"
    onSelectionChange={setSelectedKeys}
    onSortChange={setSortDescriptor}
  >
    <TableHeader columns={headerColumns}>
      {(column) => (
        <TableColumn
          key={column.uid}
          align={column.uid === "actions" ? "center" : "start"}
          allowsSorting={column.sortable}
        >
          {column.name}
        </TableColumn>
      )}
    </TableHeader>
    <TableBody emptyContent={"No users found"} items={sortedItems}>
      {(item) => (
        <TableRow key={item.id}>
          {(columnKey) => <TableCell>{RenderCell(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default TableComponent;
