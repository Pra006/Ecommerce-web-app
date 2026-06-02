import React from "react";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const adminMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },

  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <Package />,
  },

  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <ShoppingCart />,
  },
];

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);

    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="flex items-center gap-2 font-bold text-xl">
                <ChartNoAxesCombined size={25} />
                Admin Panel
              </SheetTitle>
              <SheetDescription>
                Admin sidebar navigation menu
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-5 flex flex-col gap-2 p-4">
              {adminMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-200 hover:text-black"
                >
                  {item.icons}

                  <span className="text-lg font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />

          <h1 className="text-2xl font-extrabold">
            Admin Panel
          </h1>
        </div>

        <nav className="mt-8 flex flex-col gap-3">
          {adminMenuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-200 hover:text-black"
            >
              {item.icons}

              <span className="text-lg font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;