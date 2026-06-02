import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import React, { useRef } from "react";
import { CloudUpload, FileIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

const ProductImageUpload = ({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoading,
  imageLoading,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  const handleImageFile = (event) => {
    const selectedfile = event.target.files?.[0];
    if (selectedfile) setFile(selectedfile);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const dropfile = e.dataTransfer.files?.[0];
    if (dropfile) setFile(dropfile);
  };
  const handleRemoveImage = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageCloudinary = async () => {
    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("my_file", file);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        formData,
      );
      console.log(response.data);
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result);
        setImageLoading(false);
      }
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (file !== null) uploadImageCloudinary();
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFile}
          disable={isEditMode}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col justify-center`}
          >
            <CloudUpload className=" w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or Click to upload image</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-gray-500 " />
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
