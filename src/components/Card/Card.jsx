import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function CardPage() {
  return (
    <Card
      isBlurred
      className="border-none bg-cyan-100 bg-background100/50"
      shadow="sm"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="text-2xl font-semibold leading-none text-default-600">
              What can you do?
            </h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex px-3 py-0 text-small text-default-400">
        <ul>
          <li> Create and modify records of individuals 📝</li>
          <Spacer x={4} />
          <li>Easily view and delete data 🔍</li>
          <Spacer x={4} />
          <li>Review activity history 📊</li>
        </ul>
      </CardBody>
      <CardFooter className="gap-3">
        <Button
          color="primary"
          variant="bordered"
          radius="full"
          endContent={<HiArrowNarrowRight />}
          href="#"
        >
          Get started today!
        </Button>
      </CardFooter>
    </Card>
  );
}
