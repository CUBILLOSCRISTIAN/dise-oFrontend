import React from "react";
import {
  Avatar,
  Button,
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

export const UserPopoverCard = (user) => {
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
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={avatar} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              {email}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <div className="text-small pl-px text-default-500">
          <div className="gap gap-1">
            <div>
              <p className="flex items-center">
                <HiCalendar className="mr-1" />
                <strong className="mr-1">Fecha de nacimiento:</strong>
                {new Date(birthDay).toLocaleDateString()}
              </p>
              <p className="flex items-center">
                <FaRegAddressCard className="mr-1" />
                <strong className="mr-1">{doc}:</strong> {numberDocument}
              </p>

              <p className="flex items-center">
                <HiPhone className="mr-1" />
                <strong className="mr-1">Teléfono:</strong> {numberPhone}
              </p>
              <p className="flex items-center">
                <LiaTransgenderSolid className="mr-1" />
                <strong className="mr-1">Género:</strong> {sex}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <Chip
          className="capitalize"
          color={statusColorMap[status]}
          size="sm"
          variant="flat"
        >
          {status}
        </Chip>
      </CardFooter>
    </Card>
  );
};
