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
import { UserPopoverCard } from "./UserPopoverCard";
import { FaRegAddressCard } from "react-icons/fa";
import { HiCalendar, HiPhone } from "react-icons/hi";

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
    case "documentType": {
      if (cellValue === "CC") {
        return (
          <Chip startContent={<FaRegAddressCard size={18} />} variant="light">
            Cedula de ciudadanía
          </Chip>
        );
      } else {
        return (
          <Chip startContent={<FaRegAddressCard size={18} />} variant="light">
            Tarjeta de identidad
          </Chip>
        );
      }
    }
    case "gender": {
      if (cellValue === "M") {
        return <Chip variant="light">Masculino</Chip>;
      }
      if (cellValue === "F") {
        return <Chip variant="light">Femenino</Chip>;
      }
      if (cellValue === "NB") {
        return <Chip variant="light">No binario</Chip>;
      }
      if (cellValue === "PNR") {
        return <Chip variant="light">Prefiero no responder</Chip>;
      }
    }
    case "numberDocument": {
      if (user.documentType === "CC") {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Cedula de ciudadanía</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {cellValue}
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Tarjeta de identidad</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {cellValue}
            </p>
          </div>
        );
      }
    }
    case "birthDay":
      return (
        <Chip variant="light">{new Date(cellValue).toLocaleDateString()}</Chip>
      );

    default:
      return cellValue;
  }
};

export default RenderCell;
