import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function ProfilePhotoUpload({ userData, setProfilePhoto }) {
  const onDrop = async (acceptedFiles) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${API_URL}/profilePhotos/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProfilePhoto(response.data.profilePhoto);
      console.log("Profilfoto erfolgreich hochgeladen:", response.data);
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilfotos:", error);
    }
  };

  const deleteProfilePhoto = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/profilePhotos/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProfilePhoto("");
      console.log("Profilfoto erfolgreich gelöscht:", response.data);
    } catch (error) {
      console.error("Fehler beim Löschen des Profilfotos:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-1/3 md:w-1/4 border-dashed border-2 border-gray-400 rounded-[24px] cursor-pointer"
      >
        <input {...getInputProps()} name="file" />
        <p>Profilfoto hochladen</p>
      </div>
      <button
        onClick={deleteProfilePhoto}
        className="btn bg-red-500 text-white mt-4"
      >
        Profilfoto löschen
      </button>
    </div>
  );
}
