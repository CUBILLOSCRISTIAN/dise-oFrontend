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
  const { _id, name, avatar, numberDocument } = item.user;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/users/delete/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deleted: true,
            status: "inactive",
          }),
        }
      );

      if (response.ok) {
        delete item.user._id;
        item.user.status = "deleted";
        const formData = new FormData();

        Object.keys(item.user).forEach((key) => {
          formData.append(key, item.user[key]);
        });
        await fetch("http://localhost:3005/SearchLogger", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Success:", data);
        onClose();
        alert("User deleted successfully");
      } else {
        console.error("Error:", response.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

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
              <div className="">
                <p className="text-base font-semibold text-gray-700">
                  Are you sure you want to delete this user?
                </p>
                <p className="text-gray-500 mt-2">
                  This action cannot be undone.
                </p>
              </div>

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
                onClick={handleDelete}
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
