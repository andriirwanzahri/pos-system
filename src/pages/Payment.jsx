import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderPayment from "../components/OrderPayment";
import { Link } from "react-router-dom";

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
      minimumFractionDigits: 2,
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
                  Add discount <span>- {formatNumber(discount)}</span>
                </p>
                {/* Discount settings inputs */}
                <div className="flex flex-col mt-4 space-y-2 text-xs">
                  <label htmlFor="minOrderAmount">
                    Minimum Order Amount (Rp)
                  </label>
                  <input
                    type="number"
                    id="minOrderAmount"
                    value={minOrderAmount}
                    onChange={(e) =>
                      setMinOrderAmount(parseInt(e.target.value))
                    }
                    className="border p-2 rounded-lg"
                  />
                  <label htmlFor="discountRate">Discount Rate</label>
                  <input
                    type="number"
                    id="discountRate"
                    value={discountRate}
                    onChange={(e) =>
                      setDiscountRate(parseFloat(e.target.value))
                    }
                    className="border p-2 rounded-lg"
                  />
                  <label htmlFor="maxDiscount">Maximum Discount (Rp)</label>
                  <input
                    type="number"
                    id="maxDiscount"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(parseInt(e.target.value))}
                    className="border p-2 rounded-lg"
                  />
                </div>
                <div className=" mt-8 border border-dashed border-opacity-50 border-gray-400 border-w-[6.5px]"></div>
                <p className="flex justify-between mt-3 text-4xl font-bold">
                  Total amount <span>{formatNumber(calculateTotal())}</span>
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
    </>
  );
};

export default Payment;
