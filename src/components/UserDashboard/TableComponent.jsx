import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import RenderCell from "./RenderCell";
import { UserTwitterCard } from "./UserTwitterCard";

const TableComponent = ({
  headerColumns,
  sortedItems,
  selectedKeys,
  setSelectedKeys,
  sortDescriptor,
  setSortDescriptor,
  classNames,
  topContent,
  bottomContent,
}) => {
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = async (item) => {
    try {
      const response = await fetch(`http://localhost:3004/users/${item}`);
      const data = await response.json();
      console.log(data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
    onOpen();
  };

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Table for User management"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="single"
        selectionBehavior="replace"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        onRowAction={(key) => handleRowClick(key)}
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
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{RenderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          {(onClose) =>
            loading ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  View user details
                </ModalHeader>
                <ModalBody>
                  <Spinner label="Loading..." color="warning" />
                </ModalBody>
                <ModalFooter>
                  <Button auto onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  View user details
                </ModalHeader>
                <ModalBody>
                  <UserTwitterCard
                    user={user}
                    onClose={onClose}
                    loading={loading}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button auto onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
};
export default TableComponent;
