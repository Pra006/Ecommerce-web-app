import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { sortOptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  clearProductDetails,
} from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/prdouct-details";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "../../components/ui/index";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { productList, productdetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userId = user?.id || user?._id || user?.Id;
  const handleSorting = (value) => {
    setSort(value);
  };

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
      }
    }

    return queryParams.join("&");
  }

  function handleFilter(getSectionId, getCurrentoption) {
    let cpyFilters = { ...filter };

    if (!cpyFilters[getSectionId]) {
      cpyFilters[getSectionId] = [getCurrentoption];
    } else {
      const index = cpyFilters[getSectionId].indexOf(getCurrentoption);

      if (index === -1) {
        cpyFilters[getSectionId].push(getCurrentoption);
      } else {
        cpyFilters[getSectionId].splice(index, 1);

        if (cpyFilters[getSectionId].length === 0) {
          delete cpyFilters[getSectionId];
        }
      }
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(product) {
    setSelectedProduct(product);
    setOpenDialog(true);

    dispatch(clearProductDetails());

    if (product?._id) {
      dispatch(fetchProductDetails(product._id));
    }
  }

  function handleAddtoCart(productId) {
    dispatch(
      addToCart({
        userId,
        productId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Product added to cart");
      }
    });
  }

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("filters");
    setFilter(savedFilters ? JSON.parse(savedFilters) : {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const query = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(query));
    }
  }, [filter]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: filter,
        sortParams: sort,
      }),
    );
  }, [dispatch, sort, filter]);

  useEffect(() => {
    if (productdetails) {
      setSelectedProduct(productdetails);
    }
  }, [productdetails]);
console.log(productList)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />

      <div className="bg-background rounded-lg shadow-sm p-4">
        <div className="p-4 flex items-center border-b justify-between">
          <h1 className="font-semibold text-lg">All Products</h1>

          <div className="flex items-center gap-3">
            <span className="text-gray-700">
              {productList?.length ?? 0} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowDownUp className="w-4 h-4 mr-1" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSorting}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList?.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
      </div>

      {/* PRODUCT DIALOG */}
      <ProductDetailsDialog
        open={openDialog}
        setOpen={(val) => {
          setOpenDialog(val);

          if (!val) {
            setSelectedProduct(null);
            dispatch(clearProductDetails()); 
          }
        }}
        productdetails={selectedProduct}
      />
    </div>
  );
};

export default ShoppingList;
