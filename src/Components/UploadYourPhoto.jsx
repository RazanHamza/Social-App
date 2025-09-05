import React, { useState } from "react";
import { uploadProfilePhotoApi } from "../Services/authoservice";

const UploadPhoto = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a photo first!");

    try {
      const res = await uploadProfilePhotoApi(file);
      alert("Photo uploaded successfully!");
      console.log(res);
    } catch (err) {
      alert("Upload failed! Check console.");
    }
  };

  return (
    <div className="w-full flex justify-center py-10 px-6">
      <input type="file"   className=" cursor-pointer hover:text-blue-500 mx-12" onChange={handleFileChange} />
      <button  className="cursor-pointer hover:text-blue-500 mx-12" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPhoto;