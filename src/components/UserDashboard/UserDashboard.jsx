import React from "react";
import TableComponent from "./components/TableComponent";
import FilterSection from "./components/FilterSection";
import PaginationSection from "./components/PaginationSection";
import { columns, users, INITIAL_VISIBLE_COLUMNS } from "./data";

const UserDashboard = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const topContent = (
    <FilterSection
      filterValue={filterValue}
      setFilterValue={setFilterValue}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
      onSearchChange={onSearchChange}
      usersLength={users.length}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );

  const bottomContent = (
    <PaginationSection
      hasSearchFilter={hasSearchFilter}
      page={page}
      pages={pages}
      setPage={setPage}
      selectedKeys={selectedKeys}
      itemsLength={items.length}
    />
  );

  const classNames = React.useMemo(() => ({
    wrapper: ["max-h-[382px]", "max-w-3xl"],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: [
      "group-data-[first=true]:first:before:rounded-none",
      "group-data-[first=true]:last:before:rounded-none",
      "group-data-[middle=true]:before:rounded-none",
      "group-data-[last=true]:first:before:rounded-none",
      "group-data-[last=true]:last:before:rounded-none",
    ],
  }), []);

  return (
    <TableComponent
      headerColumns={headerColumns}
      sortedItems={sortedItems}
      selectedKeys={selectedKeys}
      setSelectedKeys={setSelectedKeys}
      sortDescriptor={sortDescriptor}
      setSortDescriptor={setSortDescriptor}
      classNames={classNames}
      topContent={topContent}
      bottomContent={bottomContent}
    />
  );
};

export default UserDashboard;
