import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon.jsx";
import { MailIcon } from "../icons/MailIcon.jsx";
import { LockIcon } from "../icons/LockIcon.jsx";

// Definimos el componente de la aplicación
const UserForm = () => {
  // Estado para manejar los valores de los campos de entrada
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // Estado para manejar la foto de perfil
  const [photo, setPhoto] = useState(null); // Estado para manejar la foto seleccionada
  const [photoError, setPhotoError] = useState(""); // Estado para manejar errores de la foto
  const [documentType, setDocumentType] = useState("");
  const [numberDocument, setNumberDocument] = useState("");
  // Función para manejar la selección de la foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      // Verificar si el tamaño supera los 2 MB
      setPhotoError("File size exceeds 2 MB limit");
    } else {
      setPhoto(file);
      setPhotoError("");
    }
  };

  // Estado para manejar si el modal está abierto o cerrado
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Realizar validaciones aquí
    // Si todas las validaciones son exitosas, realizar acción necesaria (por ejemplo, enviar datos al servidor)
    // Si hay errores de validación, mostrar mensajes de error apropiados
    // Por ahora, solo cerramos el modal
    onClose();
  };

  // Función para manejar el cambio del estado de "recordarme"
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button
        className="bg-foreground text-background"
        onPress={onOpen}
        endContent={<PlusIcon />}
        size="sm"
      >
        Add New
      </Button>

      {/* Modal para el formulario de inicio de sesión */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {/* Encabezado del modal */}
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>

          {/* Cuerpo del modal */}
          <ModalBody>
            {/* Campo de entrada personalizado para la foto */}
            <label className="file-input-label">
              <span className="file-input-button">
                {photo ? "Photo Selected" : "Photo"}
              </span>
              <input
                type="file"
                className="file-input"
                onChange={handlePhotoChange}
              />
            </label>
            {photoError && <p className="error-message">{photoError}</p>}

            {/* Campo de entrada para el primer nombre */}
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
              placeholder="Enter your first name"
              variant="bordered"
              maxLength={30}
              error={firstName.length > 30}
            />

            {/* Campo de entrada para el segundo nombre */}
            <Input
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              label="Second Name"
              placeholder="Enter your Second name"
              variant="bordered"
              maxLength={30}
              error={firstName.length > 30}
            />

            {/* Campo de entrada para el apellido */}
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last Name"
              placeholder="Enter your last name"
              variant="bordered"
              maxLength={60}
              error={lastName.length > 60}
            />

            {/* Campo de entrada para el correo electrónico */}
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              error={!/^\S+@\S+\.\S+$/.test(email)}
            />

            {/* Campo de entrada para la fecha de nacimiento */}
            <DatePicker label="Birth date" isRequired variant="bordered" />

            {/* Campo de entrada para el celular */}
            <Input
              value={numberPhone}
              type="number"
              onChange={(e) => setNumberPhone(e.target.value)}
              label="Number Phone"
              placeholder="Enter your number phone"
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">+57 </span>
                </div>
              }
            />

            {/* Campo de selección para el tipo de documento */}
            <Select
              label="Document Type"
              value={documentType}
              variant="bordered"
              onChange={(value) => setDocumentType(value)}
            >
              <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
              <SelectItem value="CC">Cédula</SelectItem>
            </Select>

            {/* Campo de entrada para el numero de documento */}
            <Input
              value={numberDocument}
              type="number"
              onChange={(e) => setNumberDocument(e.target.value)}
              label="Number Document"
              placeholder="Enter your number of document"
              variant="bordered"
              maxLength={5}
            />

            {/* Checkbox para "recordarme" */}
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              {/* Enlace para "¿Olvidó su contraseña?" */}
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </ModalBody>

          {/* Pie del modal */}
          <ModalFooter>
            {/* Botón para cerrar el modal */}
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            {/* Botón para enviar el formulario */}
            <Button
              color="primary"
              onClick={handleSubmit}
              isDisabled={
                !firstName ||
                !lastName ||
                !email ||
                !/^\S+@\S+\.\S+$/.test(email) ||
                firstName.length > 30 ||
                lastName.length > 60
              }
            >
              Create User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserForm;
