import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../icons/VerticalDotsIcon";
import ModalView from "./Modales/ModalView";
import ModalEdit from "./Modales/ModalEdit";
import ModalDelete from "./Modales/ModalDelete";

const ActionDropdown = (item) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);

  const handleAction = (key) => {
    setActiveModal(key);
    onOpen();
  };

  return (
    <>
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event"
          onAction={(key) => handleAction(key)}
        >
          <DropdownItem key="view">View</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete" color="danger" className="text-danger">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {activeModal === "view" && (
        <ModalView item={item} isOpen={isOpen} onClose={onClose} />
      )}
      {activeModal === "edit" && (
        <ModalEdit item={item} isOpen={isOpen} onClose={onClose} />
      )}
      {activeModal === "delete" && (
        <ModalDelete item={item} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default ActionDropdown;
