import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartContent from './cart-content'
import { useNavigate } from 'react-router-dom'


const UserCartWrapper = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate()
  const cartTotal = cartItems?.reduce((sum, item) => {
    const unitPrice = item?.salePrice > 0 ? item.salePrice : item.price;
    const quantity = Number(item?.quantity || 0);
    return sum + unitPrice * quantity;
  }, 0);

  return (
    <SheetContent className="w-full sm:w-[420px] rounded-[28px] border border-slate-200/80 bg-slate-50/80 shadow-xl">
      <SheetHeader>
        <SheetTitle className="text-lg font-semibold text-slate-900">Your Cart</SheetTitle>
      </SheetHeader>

      <div className="px-4 pb-4">
        {cartItems?.length > 0 ? (
          <div className="space-y-4 mt-6">
            {cartItems.map((item) => (
              <UserCartContent
                key={item._id || item.productId || item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-500">
            Your cart is empty.
          </div>
        )}

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button onClick={()=>{
            navigate("/shop/checkout")
            setOpenCart(false)
          }} className="w-full mt-5">Checkout</Button>
        </div>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper
