import React, { useState, useEffect } from "react";
import ProductImageUpload from "../../components/admin-view/image-upload.jsx";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import {
  addFeatureImage,
  getFeatureImage,
  deleteFeatureImage,
} from "../../store/common-slice/index.js";
import { toast } from "../../components/ui/index";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const handleUploadFeatureImage = async () => {
    console.log("Uploading with URL:", uploadedImageUrl);
    if (!uploadedImageUrl) {
      console.log("No URL to upload");
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      console.log("Upload response:", data);
      if (data?.payload?.success) {
        setUploadedImageUrl("");
        dispatch(getFeatureImage());
      }
    });
  };

  const handleDeleteFeatureImage = (featureImageId) => {
    dispatch(deleteFeatureImage(featureImageId)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image deleted successfully");
        dispatch(getFeatureImage());
      } else {
        toast.error(data?.payload?.message || "Failed to delete image");
      }
    });
  };
  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      console.log("First item:", featureImageList[0]);
      console.log("Image field:", featureImageList[0]?.image);
    }
  }, [featureImageList]);

  console.log(featureImageList, "featureImageList");
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Upload Section */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <ProductImageUpload
          file={imageFile}
          setFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoading={setImageLoading}
          imageLoading={imageLoading}
          isCustomStyling={true}
        />

        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 w-full"
          disabled={imageLoading}
        >
          {imageLoading ? "Uploading..." : "Submit Image"}
        </Button>
      </div>

      {/* Feature Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((item) => (
            <div className="relative group" key={item._id}>
              <img
                src={item?.image}
                alt="feature"
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <Button
                onClick={() => handleDeleteFeatureImage(item._id)}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No feature images found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
