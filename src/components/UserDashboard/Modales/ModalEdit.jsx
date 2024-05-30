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
import { MailIcon } from "../../../icons/MailIcon.jsx";
import ProfilePhotoUploader from "../ProfilePhotoUploader.jsx";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

const ModalEdit = ({ item, isOpen, onClose }) => {
  // Estado para manejar los valores de los campos de entrada
  const {
    _id,
    name,
    avatar: photo,
    numberDocument: docNumber,
    numberPhone: number,
    documentType: typeDocument,
    birthDay: date,
    gender: gen,
    email: mail,
  } = item.user;

  const nameArray = name.split(" ");

  const [firstName, setFirstName] = useState(nameArray[0]);
  const [errorFirstName, setErrorFirstName] = useState(false); // Estado para manejar errores de validación

  const [secondName, setSecondName] = useState(nameArray[1] || "");
  const [errorSecondName, setErrorSecondName] = useState(false); // Estado para manejar errores de validación

  const [lastName, setLastName] = useState(nameArray[2]);
  const [errorLastName, setErrorLastName] = useState(false); // Estado para manejar errores de validación

  const [email, setEmail] = useState(mail);
  const [errorEmail, setErrorEmail] = useState(false); // Estado para manejar errores de validación

  const [numberPhone, setNumberPhone] = useState(number);
  const [errorNumberPhone, setErrorNumberPhone] = useState(false); // Estado para manejar errores de validación

  const [gender, setGender] = useState(gen);
  const [errorGender, setErrorGender] = useState(false); // Estado para manejar errores de validación

  const [avatar, setAvatar] = useState(photo); // Estado para manejar la foto seleccionada

  const [documentType, setDocumentType] = useState(typeDocument);
  const [errorDocumentType, setErrorDocumentType] = useState(false); // Estado para manejar errores de validación

  const [numberDocument, setNumberDoc] = useState(docNumber);
  const [errorNumberDocument, setErrorNumberDocument] = useState(false); // Estado para manejar errores de validación

  const [birthDay, setBirthDay] = useState(null);
  const [errorBirthDay, setErrorBirthDay] = useState(false); // Estado para manejar errores de validación

  const [progress, setProgress] = useState(0);

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
      const response = await fetch(
        `http://localhost:3002/users/update/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modified: true,
          }),
        }
      );

      if (response.ok) {
        delete item.user._id;
        item.user.status = "edited";
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
        alert("User edited successfully");
      } else {
        console.error("Error:", response.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
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
  // Aquí puedes añadir la lógica de edición
  return (
    <form action="">
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit user details
              </ModalHeader>
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
                  defaultSelectedKeys={[gender]}
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
                <DatePicker
                  label="Birth date"
                  value={birthDay}
                  onChange={(value) => {
                    setBirthDay(value);
                  }}
                  isRequired
                  variant="bordered"
                  showMonthAndYearPickers
                  description={"This is my birth date."}
                  isInvalid={errorBirthDay}
                  maxValue={today(getLocalTimeZone())}
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
                  isInvalid={errorNumberPhone}
                  errorMessage="Please complete this field"
                />

                {/* Campo de selección para el tipo de documento */}
                <Select
                  label="Document Type"
                  value={documentType}
                  variant="bordered"
                  defaultSelectedKeys={[documentType]}
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
                      setNumberDoc(value);
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
              <ModalFooter>
                <Button auto onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="warning"
                  variant="bordered"
                  onClick={handleSubmit}
                >
                  update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};

export default ModalEdit;
