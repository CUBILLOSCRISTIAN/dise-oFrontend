import React from "react";
import {
  Chip,
  User,
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { statusColorMap } from "../../data";
import ActionDropdown from "./ActionDropdown";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { UserPopoverCard } from "./UserPopoverCard";

const RenderCell = (user, columnKey) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <Popover placement="bottom" offset={20} showArrow>
          <PopoverTrigger>
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
          </PopoverTrigger>
          <PopoverContent>
            <UserPopoverCard user={user} />
          </PopoverContent>
        </Popover>
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
          <ActionDropdown user={user} />
        </div>
      );
    default:
      return cellValue;
  }
};

export default RenderCell;
