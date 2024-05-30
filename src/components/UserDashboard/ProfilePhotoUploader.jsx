import React, { useRef, useState } from "react";
import { Button, Avatar } from "@nextui-org/react";
import { CameraIcon } from "../../icons/CameraIcon"; // Ajusta la ruta según sea necesario

const ProfilePhotoUploader = ({ image, setImage }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Verificar si el archivo supera los 2MB
        alert("The file exceeds the maximum file size of 2MB. Please select a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setPreview(reader.result);
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
            src={preview}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Button>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;