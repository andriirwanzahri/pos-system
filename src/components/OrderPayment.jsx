import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import EditItemModal from "./EditItemModal";
import Dropdown from "./utils/Dropdown";

const OrderDetails = () => {
  const {
    orderItems,
    orderId,
    orderDate,
    tableNumber,
    handleUpdateItem,
    handleRemoveItem,
  } = useContext(OrderContext);
  const [editingItem, setEditingItem] = useState(null);

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
  const formatNumber = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const dropdownMenuItems = [
    { href: "#", label: "Print Order Check" },
    { href: "#", label: "Hold Order" },
    { href: "#", label: "Split Order" },
    { href: "/", label: "Cancel Order" },
  ];

  return (
    <div className="w-[500px] h-screen flex flex-col border-l justify-between pt-5">
      <div className="px-4">
        <div className="h-14 border-b flex justify-between">
          <h2 className="text-3xl font-bold mb-4">Order Details</h2>
          <Dropdown menuItems={dropdownMenuItems} />
        </div>
      </div>

      <div className="mt-5 overflow-y-auto no-scrollbar h-screen px-4">
        <div className="border p-2 my-2 rounded-lg text-xs">
          <p className="flex justify-between">
            Order ID <span>{orderId}</span>
          </p>
          <hr />
          <p className="flex justify-between">
            Date <span>{orderDate}</span>
          </p>
          <hr />
          <p className="flex justify-between">
            Table <span> {tableNumber}</span>
          </p>
        </div>
        <h5 className="font-semibold text-sm">
          Items
          <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {orderItems.length}
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
              <div className="flex justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>-
                  </button>
                  <div className="ms-3">
                    <input
                      type="text"
                      className="bg-gray-50 text-center w-10 border border-gray-300 text-gray-900 text-sm rounded-lg"
                      value={item.quantity || ""}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        handleQuantityChange(
                          item.id,
                          isNaN(newValue) ? 0 : newValue
                        );
                      }}
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>+
                  </button>
                </div>
                <p className="text-sm">
                  {formatNumber(item.itemTotal)}; x {item.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
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
