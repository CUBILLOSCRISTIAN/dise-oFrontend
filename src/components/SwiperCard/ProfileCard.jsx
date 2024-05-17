import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export function ProfileCard({ userName, description }) {
  return (
    <Card className="m-4 max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={`https://unavatar.io/${userName}`}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{userName}</p>
          <p className="text-small text-default-500">@{userName}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={`https://github.com/${userName}`}>
          Visit me GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
