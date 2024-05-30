import React from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { statusColorMap } from "../../data";
import { HiCalendar, HiPhone } from "react-icons/hi";
import { LiaTransgenderSolid } from "react-icons/lia";
import { FaRegAddressCard } from "react-icons/fa";
export const UserModalCard = (user) => {
  const {
    name,
    email,
    avatar,
    birthDay,
    documentType,
    gender,
    numberDocument,
    numberPhone,
    status,
  } = user.user;

  var doc = documentType;
  var sex = gender;

  switch (documentType) {
    case "CC":
      doc = "Cédula de ciudadanía";
      break;
    case "TI":
      doc = "Tarjeta de identidad";
      break;
    default:
      doc = "No tiene documento de identidad";
      break;
  }

  switch (gender) {
    case "M":
      sex = "Masculino";
      break;
    case "F":
      sex = "Femenino";
      break;
    case "NB":
      sex = "No binario";
      break;
    case "PNR":
      sex = "Prefiero no responder";
      break;
    default:
      sex = "No tiene género";
      break;
  }

  return (
    <Card shadow="none" className="max-w-[500px] border-none bg-transparent">
      <CardHeader className="justify-between bg-slate-200">
        <div className="flex gap-3">
          <Avatar
            isBordered
            showFallback
            name={name}
            src={avatar}
            radius="full"
            className="w-20 h-20 text-large"
            color={statusColorMap[status]}
          />
          <div className="flex flex-col gap-1 p-4">
            <div className="text-2xl">{name}</div>
            <div className="text-default-500 pl-4">{email}</div>
          </div>
        </div>

        <Chip
          className="capitalize"
          color={statusColorMap[status]}
          size="lg"
          variant="flat"
        >
          {status}
        </Chip>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <div className="max-w-4xl mx-auto p-6 ">
          <div className="gap gap-1">
            <div>
              <p className="flex items-center">
                <HiCalendar className="text-xl mr-1" />
                <strong className="mr-1">Fecha de nacimiento:</strong>
                {new Date(birthDay).toLocaleDateString()}
              </p>
              <p className="flex items-center">
                <FaRegAddressCard className="text-xl mr-2" />
                <strong className="mr-1">{doc}:</strong> {numberDocument}
              </p>

              <p className="flex items-center">
                <HiPhone className="text-xl mr-1" />
                <strong className="mr-1">Teléfono:</strong> {numberPhone}
              </p>
              <p className="flex items-center">
                <LiaTransgenderSolid className="text-xl mr-1" />
                <strong className="mr-1">Género:</strong> {sex}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3 "></CardFooter>
    </Card>
  );
};
