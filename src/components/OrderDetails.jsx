import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import EditItemModal from "./EditItemModal";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const {
    orderType,
    orderItems,
    subtotal,
    handleOrderTypeChange,
    handleUpdateItem,
    handleRemoveItem,
  } = useContext(OrderContext);
  const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();

  const calculateTotal = () => {
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    return subtotal + tax;
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (id, updatedDetails) => {
    handleUpdateItem(id, updatedDetails);
    setEditingItem(null);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItem = orderItems.find((item) => item.id === id);
    if (updatedItem) {
      // Calculate the new item total with the quantity change and topping prices
      const newItemTotal =
        quantity *
        (updatedItem.productPrice[updatedItem.customDetails.size] +
          updatedItem.customDetails.additionalToppings.reduce(
            (total, topping) => total + updatedItem.toppingPrice[topping],
            0
          ));
      handleUpdateItem(id, {
        quantity,
        itemTotal: newItemTotal,
      });
    }
  };

  const handleContinue = () => {
    if (orderType === "Dine in") {
      navigate("/Tables"); // Change this line
    } else {
      navigate("/payment"); // Change this line
    }
  };

  return (
    <div className="w-[300px] h-screen flex flex-col border-l justify-between pt-5">
      <div className="px-4">
        {/* Header Order */}
        <div className="h-14 border-b">
          <h2 className="text-3xl font-bold mb-4">Order Details</h2>
        </div>
        {/* Tombol Deliver */}
        <div className="flex justify-center rounded-full border mt-5">
          <button
            onClick={() => handleOrderTypeChange("Dine in")}
            className={
              orderType === "Dine in"
                ? "bg-green-600 px-3 py-2 cursor-pointer w-[200px] rounded-full"
                : "px-3 py-2 cursor-pointer w-[200px] rounded-full"
            }
          >
            Dine In
          </button>
          <button
            onClick={() => handleOrderTypeChange("Takeway")}
            className={
              orderType === "Takeway"
                ? "bg-green-600 px-3 py-2 cursor-pointer w-[200px] rounded-full"
                : "px-3 py-2 cursor-pointer w-[200px] rounded-full"
            }
          >
            Takeway
          </button>
        </div>
      </div>

      {/* Scroll Item */}
      <div className="mt-5 overflow-y-auto no-scrollbar h-screen px-4">
        <h5 className="font-semibold mt-2">Order details</h5>
        <div className="border p-2 my-2 rounded-lg text-xs">
          <p>
            Order ID <span>#1231231</span>
          </p>
          <hr />
          <p>
            Order ID <span>#1231231</span>
          </p>
        </div>
        <h5 className="font-semibold text-sm">
          Items
          <span className="bg-gray-400 rounded-full p-1">
            ({orderItems.length})
          </span>
        </h5>
        {orderItems.map((item) => (
          <div key={item.id} className="border rounded-lg mb-4">
            <div className="p-2">
              <div className="flex justify-between">
                <img src={`${item.image}`} className="w-20" alt="" />
                <div className="flex flex-col w-full h-full text-sm">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Size: {item.customDetails.size}</p>
                  <p>
                    Extra: {item.customDetails.additionalToppings.join(", ")}
                  </p>
                  <p>Note:{item.customDetails.note || "No note"}</p>
                </div>
                <div className="flex flex-col">
                  <button onClick={() => handleEditClick(item)}>✏️</button>
                  <button onClick={() => handleRemoveItem(item.id)}>🗑️</button>
                </div>
              </div>
              <div className="flex justify-between px-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                Rp. {item.itemTotal}; x {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer detail */}
      <div className="shadow-[0_-20px_50px_-1px_rgba(0,0,0,0.07)] text-sm p-4 rounded-t-xl">
        <div className="border rounded-lg">
          <div className="flex justify-between p-2">
            <span>Subtotal</span>
            <span>Rp.{subtotal}</span>
          </div>
          <div className="flex justify-between p-2">
            <span>Tax 5%</span>
            <span>Rp.{(subtotal * 0.05).toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between p-2">
            <span>Total amount</span>
            <span>Rp.{calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <button
          className="my-2 bg-green-700 w-full h-10 rounded-lg"
          onClick={handleContinue}
        >
          {orderType === "Dine in" ? "Continue" : "Payment"}
        </button>
      </div>
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default OrderDetails;
