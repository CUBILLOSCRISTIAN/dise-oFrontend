import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const ModalEdit = ({ item, isOpen, onClose }) => {
  // Aquí puedes añadir la lógica de edición
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit user details
            </ModalHeader>
            <ModalBody>
              {/* Aquí puedes añadir el formulario de edición */}
              <p>Edit User Form goes here.</p>
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
  );
};

export default ModalEdit;
