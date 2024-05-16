import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { VerticalDotsIcon } from "../../icons/VerticalDotsIcon";

const ActionDropdown = () => (
  <Dropdown className="bg-background border-1 border-default-200">
    <DropdownTrigger>
      <Button isIconOnly radius="full" size="sm" variant="light">
        <VerticalDotsIcon className="text-default-400" />
      </Button>
    </DropdownTrigger>
    <DropdownMenu>
      <DropdownItem>View</DropdownItem>
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Delete</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default ActionDropdown;
