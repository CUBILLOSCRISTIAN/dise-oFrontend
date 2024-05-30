import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { UserModalCard } from "../UserModalCard";

const ModalView = ({ item, isOpen, onClose }) => {
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchUser = async () => {
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
    };

    if (isOpen) {
      fetchUser();
    }
  }, [isOpen, item.user._id]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              View user details
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <UserModalCard user={user} onClose={onClose} />
              )}
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

export default ModalView;
