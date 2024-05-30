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
import { I18nProvider } from "@react-aria/i18n";
import { PlusIcon } from "../../icons/PlusIcon.jsx";
import { MailIcon } from "../../icons/MailIcon.jsx";
import ProfilePhotoUploader from "./ProfilePhotoUploader.jsx";
import { getLocalTimeZone, today } from "@internationalized/date";

// Definimos el componente de la aplicación
const UserForm = () => {
  // Estado para manejar los valores de los campos de entrada
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false); // Estado para manejar errores de validación

  const [secondName, setSecondName] = useState("");
  const [errorSecondName, setErrorSecondName] = useState(false); // Estado para manejar errores de validación

  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false); // Estado para manejar errores de validación

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false); // Estado para manejar errores de validación

  const [numberPhone, setNumberPhone] = useState("");
  const [errorNumberPhone, setErrorNumberPhone] = useState(false); // Estado para manejar errores de validación

  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false); // Estado para manejar errores de validación

  const [avatar, setAvatar] = useState(null); // Estado para manejar la foto seleccionada

  const [documentType, setDocumentType] = useState("");
  const [errorDocumentType, setErrorDocumentType] = useState(false); // Estado para manejar errores de validación

  const [numberDocument, setNumberDocument] = useState("");
  const [errorNumberDocument, setErrorNumberDocument] = useState(false); // Estado para manejar errores de validación

  const [birthDay, setBirthDay] = useState(null);
  const [errorBirthDay, setErrorBirthDay] = useState(false); // Estado para manejar errores de validación

  const [progress, setProgress] = useState(0);

  // Estado para manejar si el modal está abierto o cerrado
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!firstName) {
      setErrorFirstName(true);
      return;
    }
    setErrorFirstName(false);

    if (!lastName) {
      setErrorLastName(true);
      return;
    }
    setErrorLastName(false);

    if (!gender) {
      setErrorGender(true);
      return;
    }
    setErrorGender(false);

    if (!email) {
      setErrorEmail(true);
      return;
    }
    setErrorEmail(false);

    if (!birthDay) {
      setErrorBirthDay(true);
      return;
    }
    setErrorBirthDay(false);

    if (!numberPhone || numberPhone.length < 10) {
      setErrorNumberPhone(true);
      return;
    }
    setErrorNumberPhone(false);

    if (!documentType) {
      setErrorDocumentType(true);
      return;
    }
    setErrorDocumentType(false);

    if (!numberDocument) {
      setErrorNumberDocument(true);
      return;
    }
    setErrorNumberDocument(false);

    if (!avatar) {
      console.error("Please select an avatar");
      return;
    }

    const name = `${firstName} ${secondName} ${lastName}`.trim();

    // Verificar que birthDay sea un objeto de fecha y convertir si es necesario
    let formattedBirthDay = birthDay;
    if (birthDay instanceof Date) {
      formattedBirthDay = birthDay.toISOString();
    } else {
      try {
        formattedBirthDay = new Date(birthDay).toISOString();
      } catch (e) {
        console.error("Invalid birthDay format");
        setErrorBirthDay(true);
        return;
      }
    }

    const data = {
      avatar,
      name,
      email,
      birthDay: formattedBirthDay, // Usar el valor formateado
      numberPhone,
      documentType,
      numberDocument,
      gender,
    };

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        body: formData,
      });

      let result = await response.json();
      if (response.ok) {
        result.status = "created";
        const formData = new FormData();
        Object.keys(result).forEach((key) => {
          formData.append(key, result[key]);
        });
        await fetch("http://localhost:3005/SearchLogger", {
          method: "POST",
          body: formData,
        });
        console.log("User created successfully");
        onClose(); // Cerrar el modal si el usuario se creó exitosamente
        alert("User created successfully");
      } else {
        // Manejar errores del servidor
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
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
      if (avatar) completedFields++;
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
    avatar,
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

      <form action="">
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
              <ProfilePhotoUploader image={avatar} setImage={setAvatar} />

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
                isInvalid={errorFirstName}
                errorMessage="Please complete this field"
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
                isInvalid={errorSecondName}
                errorMessage="Please complete this field"
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
                isInvalid={errorLastName}
                errorMessage="Please complete this field"
              />

              {/* Campo de selección para el tipo de documento */}
              <Select
                label="Gender"
                value={gender}
                variant="bordered"
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(e.target.value);
                }}
                isRequired
                isInvalid={errorGender}
                errorMessage="Please complete this field"
              >
                <SelectItem key={"F"} value={"F"}>
                  Femenino
                </SelectItem>
                <SelectItem key={"M"} value={"M"}>
                  Masculino
                </SelectItem>
                <SelectItem key={"NB"} value={"NB"}>
                  No binario
                </SelectItem>
                <SelectItem key={"PNR"} value={"PNR"}>
                  Prefiero no responder
                </SelectItem>
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
                isInvalid={errorEmail}
                errorMessage="Please complete this field"
              />

              {/* Campo de entrada para la fecha de nacimiento */}
              <I18nProvider locale="es-CO">
                <DatePicker
                  label="Date of Birth"
                  value={birthDay}
                  onChange={(value) => {
                    setBirthDay(value);
                  }}
                  isRequired
                  dateFormat="dd-MM-yyyy"
                  variant="bordered"
                  placeholderText="dd / mm / yyyy"
                  showMonthAndYearPickers
                  description={"This is my birth date."}
                  isInvalid={errorBirthDay}
                  maxValue={today(getLocalTimeZone())}
                />
              </I18nProvider>
              
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
                isInvalid={errorNumberPhone}
                errorMessage="Please complete this field"
              />

              {/* Campo de selección para el tipo de documento */}
              <Select
                label="Document Type"
                value={documentType}
                variant="bordered"
                isRequired
                onChange={(e) => {
                  setDocumentType(e.target.value);
                  console.log(e.target.value);
                }}
                isInvalid={errorDocumentType}
                errorMessage="Please complete this field"
              >
                <SelectItem key={"TI"} value={"TI"}>
                  Tarjeta de Identidad
                </SelectItem>
                <SelectItem key={"CC"} value={"CC"}>
                  Cédula
                </SelectItem>
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
                isInvalid={errorNumberDocument}
                errorMessage="Please complete this field"
              />
            </ModalBody>

            {/* Pie del modal */}
            <ModalFooter>
              {/* Linea para "dar info" */}
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
                <p>Fields with * are required</p>
              </div>
              {/* Botón para cerrar el modal */}
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              {/* Botón para enviar el formulario */}
              <Button color="primary" onClick={handleSubmit} isDisabled={false}>
                Create User
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default UserForm;
