import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  User,
} from "@nextui-org/react";
import { UserIcon } from "../../../icons/UserIcon";

const ModalDelete = ({ item, isOpen, onClose }) => {
  const { name, avatar, numberDocument } = item.user;
  // Aquí puedes añadir la lógica de edición
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete user
            </ModalHeader>
            <ModalBody>
              {/* Aquí puedes añadir el formulario de edición */}
              <p>Are you sure you want to delete this user?</p>
              <User
                name={name}
                description={numberDocument}
                avatarProps={{
                  src: avatar,
                  size: "lg",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button auto onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="bordered"
                startContent={<UserIcon />}
              >
                Delete user
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
