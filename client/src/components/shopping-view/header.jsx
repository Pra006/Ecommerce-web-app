import React from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  HousePlug,
  Menu,
  ShoppingCart,
  CircleUser,
  UserStar,
  LogOut,
  User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { logoutUser } from "../../store/auth-slice";
import { toast } from "sonner";
import UserCartWrapper from "./cart-wrapper";
import { useState, useEffect } from "react";
import { fetchCartItems } from "../../store/shop/cart-slice";
import { Label } from "../ui/label";


const MenuItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentItem) {
    sessionStorage.removeItem("filters");
    const currentfilters =
      getCurrentItem.id !== "home" && getCurrentItem.id !== "products" && getCurrentItem.id !== "search"
        ? { category: [getCurrentItem.id] }
        : {};
    sessionStorage.setItem("filters", JSON.stringify(currentfilters));
    location.pathname.includes('listing') && currentfilters !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)):
    navigate(getCurrentItem.path);
  }

  return (
    <nav className="flex flex-col gap-5 lg:flex-row lg:items-center">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          onClick={() => handleNavigate(item)}
          key={item.id}
          className="text-sm cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCart, setOpenCart] = useState(false);

  const handleLogOut = () => {
    dispatch(logoutUser());
    toast.success("Logout successfully");
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems({ userId: user.id }));
    }
  }, [dispatch, user?.id]);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Sheet open={openCart} onOpenChange={(open) => setOpenCart(open)}>
        <Button
          onClick={() => setOpenCart(true)}
          variant="outline"
          size="icon"
          className="relative rounded-full"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute top-[-5px] right-[-2px] font-medium text-sm">{cartItems?.length || 0}</span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            Array.isArray(cartItems) && cartItems.length > 0 ? cartItems : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-sm font-medium">
            Logged in as <span className="font-semibold">{user?.userName}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <UserStar className="mr-2 h-4 w-4" />

            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogOut}
            className="cursor-pointer text-red-500 focus:text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" />

            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />

          <span className="text-lg font-bold">Ecommerce</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />

              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px] p-6">
            <div className="mb-8">
              {isAuthenticated ? <HeaderRightContent user={user} /> : null}
            </div>

            <MenuItem />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden flex-1 items-center justify-between lg:flex">
          <div className="flex justify-center flex-1">
            <MenuItem />
          </div>

          {isAuthenticated ? <HeaderRightContent user={user} /> : null}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
