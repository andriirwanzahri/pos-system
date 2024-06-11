import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderPayment from "../components/OrderPayment";
import { Link } from "react-router-dom";
import DiscountModal from "../components/utils/DiscountModal"; // Adjust the import path as needed

const Payment = () => {
  const {
    subtotal,
    discount,
    minOrderAmount,
    discountRate,
    maxDiscount,
    setMinOrderAmount,
    setDiscountRate,
    setMaxDiscount,
  } = useContext(OrderContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = () => {
    const taxRate = 0;
    const tax = subtotal * taxRate;
    const total = subtotal + tax - discount;
    return total;
  };

  const handlePayment = () => {
    // Handle payment logic here
    alert("Payment successful!");
  };

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Payment</h1>
            <div className="space-x-4 ">
              <Link to={"/"}>Choose Customer</Link>
            </div>
          </div>
        </nav>
        {/* flex   */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 w-full">
            <div className="border rounded-lg mt-5">
              <div className="p-5 px-10">
                <p className="flex justify-between my-1">
                  Subtotal <span>{formatNumber(subtotal)}</span>
                </p>
                <p className="flex justify-between my-1">
                  Tambah Diskon <span>- {formatNumber(discount)}</span>
                </p>
                {/* Discount settings button */}
                <div className="flex justify-between items-center mt-4">
                  <span>Discount Settings</span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="border p-2 rounded-lg bg-blue-600 text-white"
                  >
                    Ubah ({discountRate * 100}%)
                  </button>
                </div>
                <div className=" mt-8 border border-dashed border-opacity-50 border-gray-400 border-w-[6.5px]"></div>
                <p className="flex justify-between mt-3 text-4xl font-bold">
                  Jumlah Total
                  <span>{formatNumber(calculateTotal())}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 ">
            <button
              onClick={handlePayment}
              className="border rounded-lg mt-5 w-full p-5 bg-green-700 text-white"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
      <OrderPayment />
      <DiscountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        minOrderAmount={minOrderAmount}
        discountRate={discountRate}
        maxDiscount={maxDiscount}
        setMinOrderAmount={setMinOrderAmount}
        setDiscountRate={setDiscountRate}
        setMaxDiscount={setMaxDiscount}
      />
    </>
  );
};

export default Payment;
