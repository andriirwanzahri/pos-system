import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const Payment = () => {
  const { orderType, orderItems, subtotal, tableNumber } =
    useContext(OrderContext);

  const calculateTotal = () => {
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    return subtotal + tax;
  };

  const handlePayment = () => {
    // Handle payment logic here
    alert("Payment successful!");
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Navbar Home */}
      <nav className="border-b mx-4 py-4">
        <div className="container flex justify-between items-center ">
          <h1 className="text-4xl font-bold">Payment</h1>
          <div className="space-x-4 ">
            <input
              className="w-96 h-10 rounded-full border p-5"
              type="text"
              placeholder="Search product"
            />
          </div>
        </div>
      </nav>
      {/* flex   */}
      <div className="flex-1 flex overflow-hidden">
        <div className="m-auto max-w-2xl p-4">
          <h1 className="text-3xl font-bold mb-4">Payment</h1>
          {orderType === "Dine in" && (
            <div className="border rounded-xl p-3 mb-4">
              <h2 className="text-2xl font-semibold">Table Number</h2>
              <p>Table {tableNumber}</p>
            </div>
          )}
          <div className="border rounded-lg p-5 mb-4">
            <h2 className="text-2xl mb-3 font-semibold">Order Summary</h2>
            <ul className="p-0 ">
              {orderItems.map((item) => (
                <li key={item.id} className="mb-2 border-b pb-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>Size: {item.customDetails.size}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                      <p>Rp. {item.itemTotal}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="subtotal flex justify-between mt-4">
              <span>Subtotal</span>
              <span>Rp. {subtotal.toFixed(2)}</span>
            </div>
            <div className="tax flex justify-between mt-2">
              <span>Tax 5%</span>
              <span>Rp. {(subtotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="total flex justify-between mt-4 font-bold text-lg">
              <span>Total</span>
              <span>Rp. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button
            className="bg-green-700 w-full h-10 rounded-lg text-white font-semibold"
            onClick={handlePayment}
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
