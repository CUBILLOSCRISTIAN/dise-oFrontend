import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Progress,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon.jsx";
import { MailIcon } from "../icons/MailIcon.jsx";

// Definimos el componente de la aplicación
const UserForm = () => {
  // Estado para manejar los valores de los campos de entrada
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null); // Estado para manejar la foto seleccionada
  const [documentType, setDocumentType] = useState("");
  const [numberDocument, setNumberDocument] = useState("");
  const [birthDay, setBirthDay] = useState(null);

  const [progress, setProgress] = React.useState(0);
  const [photoError, setPhotoError] = useState(""); // Estado para manejar errores de la foto
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

  useEffect(() => {
    const calculateProgress = () => {
      let completedFields = 0;
      if (firstName) completedFields++;
      if (secondName) completedFields++;
      if (lastName) completedFields++;
      if (email) completedFields++;
      if (numberPhone) completedFields++;
      if (gender) completedFields++;
      if (photo) completedFields++;
      if (documentType) completedFields++;
      if (numberDocument) completedFields++;
      if (birthDay) completedFields++;
      setProgress(completedFields * 10);
    };
    calculateProgress();
  }, [
    firstName,
    secondName,
    lastName,
    email,
    numberPhone,
    gender,
    photo,
    documentType,
    numberDocument,
    birthDay,
  ]);

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

      {/* Modal para el formulario de crear usuario */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {/* Encabezado del modal */}
          <ModalHeader className="flex flex-col gap-1">
            Create User
            <Progress
              aria-label="Downloading..."
              size="md"
              value={progress}
              color="success"
              showValueLabel={true}
              className="max-w-md"
            />
          </ModalHeader>

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
                accept="image/*"
              />
            </label>
            {photoError && <p className="text-red-700">{photoError}</p>}

            {/* Campo de entrada para el primer nombre */}
            <Input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              label="First Name"
              placeholder="Enter your first name"
              variant="bordered"
              maxLength={30}
              isRequired
            />

            {/* Campo de entrada para el segundo nombre */}
            <Input
              value={secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
              label="Second Name"
              placeholder="Enter your Second name"
              variant="bordered"
              maxLength={30}
              isRequired
            />

            {/* Campo de entrada para el apellido */}
            <Input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label="Last Name"
              placeholder="Enter your last name"
              variant="bordered"
              maxLength={60}
              isRequired
            />

            {/* Campo de selección para el tipo de documento */}
            <Select
              label="Gender"
              value={gender}
              variant="bordered"
              onChange={(value) => {
                setGender(value);
              }}
              isRequired
            >
              <SelectItem value="F">Femenino</SelectItem>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="NB">No binario</SelectItem>
              <SelectItem value="PNR">Prefiero no reportar</SelectItem>
            </Select>

            {/* Campo de entrada para el correo electrónico */}
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              isRequired
            />

            {/* Campo de entrada para la fecha de nacimiento */}
            <DatePicker
              label="Birth date"
              value={birthDay}
              onChange={(value) => {
                setBirthDay(value);
              }}
              isRequired
              variant="bordered"
              showMonthAndYearPickers
            />

            {/* Campo de entrada para el celular */}
            <Input
              value={numberPhone}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setNumberPhone(value);
                }
              }}
              label="Number Phone"
              placeholder="Enter your number phone"
              variant="bordered"
              isRequired
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
              isRequired
              onChange={(value) => {
                setDocumentType(value);
              }}
            >
              <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
              <SelectItem value="CC">Cédula</SelectItem>
            </Select>

            {/* Campo de entrada para el numero de documento */}
            <Input
              value={numberDocument}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setNumberDocument(value);
                }
              }}
              isRequired
              label="Number Document"
              placeholder="Enter your number of document"
              variant="bordered"
            />
          </ModalBody>

          {/* Pie del modal */}
          <ModalFooter>
            {/* Checkbox para "dar info" */}
            <div
              className="flex items-center text-blue-500 text-sm font-bold px-4 py-3"
              role="alert"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
              <p>All fiels are required</p>
            </div>
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
                lastName.length > 60 ||
                !photo ||
                photoError ||
                !numberPhone ||
                numberPhone.length !== 10 ||
                !documentType ||
                !numberDocument
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
