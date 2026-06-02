import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { addProductFormElements } from "../../config";
import CommonForm from "../../components/common/form.jsx";
import ProductImageUpload from "../../components/admin-view/image-upload.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct
} from "../../store/admin/product-slice/index.js";
import { toast } from "sonner";
import AdminProductTile from "../../components/admin-view/product-tile.jsx";

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const onSubmit = (e) => {
    e.preventDefault();
    currentEditedId !== null ? 
    dispatch(editProduct({id:currentEditedId, formData: {...formData, image: uploadedImageUrl}})).then((result) => {
      console.log(result, "editProduct")
      if(result?.payload?.success){
         dispatch(fetchAllProducts());
        setOpenCreateProduct(false);
        setCurrentEditedId(null)
        setFormData({
          image: null,
          title: "",
          description: "",
          category: "",
          brand: "",
          price: "",
          salePrice: "",
          totalStock: "",
        });
      }

    }) :

    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      }),
    ).then((result) => {
      if (result?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProduct(false);
        setImageFile(null);
        setFormData({
          image: null,
          title: "",
          description: "",
          category: "",
          brand: "",
          price: "",
          salePrice: "",
          totalStock: "",
        });
        toast("Product added successfully");
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const isFormValid = () => {
    return Object.keys(formData).every((key)=>{
      return formData[key] !== ""
          //  && formData[key] !== null;
    })
  }

  const handleDeleteProduct = (id) =>{
    dispatch(deleteProduct(id)).then((result)=>{
      console.log(result, "deleteProduct")
      if(result?.payload?.success){
        dispatch(fetchAllProducts());
        toast("Product deleted successfully")
      }
    })
  }
  return (
    <>
      <div className="flex w-full justify-end ml-5">
        <Button onClick={() => setOpenCreateProduct(true)}>Add Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                product={productItem}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData({
            image: null,
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
          });
        }}
      >
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle className="font-semibold mr-5">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              {currentEditedId !== null
                ? "Edit the details of the product and click on save changes"
                : "Fill in the details of the new product and click on add"}
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-5">
            <CommonForm
              disabled={!isFormValid()}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Save Changes" : "Add Product"}
           

            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
