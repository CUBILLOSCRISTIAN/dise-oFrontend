import React, { useState, useRef } from "react";
import { Button, Avatar } from "@nextui-org/react";
import { CameraIcon } from "../../icons/CameraIcon"; // Asume que tienes este ícono

const ProfilePhotoUploader = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="items-center">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!image && (
        <Button
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            marginTop: "20px",
            marginLeft: "30%",
          }}
          onClick={handleButtonClick}
        >
          <Avatar
            showFallback
            fallback={
              <CameraIcon
                className="animate-pulse w-6 h-6 text-default-500"
                fill="currentColor"
                size={20}
              />
            }
          />
        </Button>
      )}
      {image && (
        <Button
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            marginTop: "20px",
            marginLeft: "30%",
            padding: "0",
          }}
          onClick={handleButtonClick}
          variant="bordered"
        >
          <Avatar
            isBordered
            color="primary"
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          
        </Button>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
