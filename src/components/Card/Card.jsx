import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function CardPage() {

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[410px]"
      shadow="sm"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="text-2xl font-semibold leading-none text-default-600">
              Create Users
            </h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Create users and manage them with different functionalities we offer
          you!
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <Button
          color="primary"
          variant="bordered"
          radius="full"
          endContent={<HiArrowNarrowRight />}
        >
          See more!
        </Button>
      </CardFooter>
    </Card>
  );
}
