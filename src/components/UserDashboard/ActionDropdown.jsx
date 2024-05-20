import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../icons/VerticalDotsIcon";
import { UserModalCard } from "./UserModalCard";

const ActionDropdown = (item) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleAction = async (key) => {
    console.log(item.user._id);
    if (key === "view") {
      try {
        const response = await fetch(
          `http://localhost:3004/users/${item.user._id}`
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      onOpen();
    }
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
      <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                View user details
              </ModalHeader>
              <ModalBody>
                <UserModalCard user={user} onClose={onClose} />
              </ModalBody>
              <ModalFooter>
                <Button auto onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionDropdown;
