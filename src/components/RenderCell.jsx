import React from "react";
import { Chip, User, Button } from "@nextui-org/react";
import { statusColorMap } from "../data";
import ActionDropdown from "./ActionDropdown";

const RenderCell = (user, columnKey) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
          classNames={{
            description: "text-default-500",
          }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[user.status]}
          size="sm"
          variant="dot"
        >
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <ActionDropdown />
        </div>
      );
    default:
      return cellValue;
  }
};

export default RenderCell;
