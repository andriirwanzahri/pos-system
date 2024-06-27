import useOrder from "../hooks/useOrder";
import useEditing from "../hooks/useEditing";
import useNavigation from "../hooks/useNavigation";
import useFormat from "../hooks/useFormat";
import EditItemModal from "./EditItemModal";

const OrderDetails = () => {
  const {
    orderType,
    orderItems,
    subtotal,
    orderId,
    orderDate,
    handleOrderTypeChange,
    handleUpdateItem,
    handleRemoveItem,
    calculateTotal,
  } = useOrder();

  // Memanggil Format Number 
  const {formatNumber}= useFormat();

  // Memanggil Hook Edit order product
  const { editingItem, handleEditClick, handleSaveEdit, handleCloseModal } =
    useEditing();

    
  const { handleContinue } = useNavigation();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 0) return;
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

  

  return (
    <div className="w-[400px] h-screen flex flex-col border-l justify-between pt-5">
      <div className="px-4">
        <div className="h-14 border-b">
          <h2 className="text-3xl font-bold mb-4">Order Details</h2>
        </div>
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

      {orderItems.length === 0 ? (
        <p className="flex text-center justify-center items-center h-full mt-5 text-gray-500">
          Order kosong
        </p>
      ) : (
        <>
          <div className="mt-5 overflow-y-auto no-scrollbar h-screen px-4">
            <h5 className="font-semibold mt-2">Order details</h5>
            <div className="border p-2 my-2 rounded-lg ">
              <p className="flex justify-between">
                Order ID <span>{orderId}</span>
              </p>
              <div className="my-2 border border-dashed" />
              <p className="flex justify-between">
                Date <span>{orderDate}</span>
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
                      <p>
                        Harga :
                        {formatNumber(
                          item.productPrice[item.customDetails.size]
                        )}
                      </p>
                      <p>Size: {item.customDetails.size}</p>
                      <p>
                        Extra:
                        {item.customDetails.additionalToppings.join(", ")}
                      </p>
                      <p>Note:{item.customDetails.note || "No note"}</p>
                    </div>
                    <div className="flex flex-col">
                      <button onClick={() => handleEditClick(item)}>✏️</button>
                      <button onClick={() => handleRemoveItem(item.id)}>
                        🗑️
                      </button>
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
                          value={item.quantity || 0}
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
                    <p className="text-sm flex flex-col">
                      {formatNumber(item.itemTotal)}; x {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shadow-[0_-20px_50px_-1px_rgba(0,0,0,0.07)] text-sm p-4 rounded-t-xl">
            <div className="border rounded-lg">
              <div className="flex justify-between p-2">
                <span>Subtotal</span>
                <span>Rp.{formatNumber(subtotal)}</span>
              </div>
              <hr />
              <div className="flex justify-between p-2">
                <span>Total amount</span>
                <span>Rp.{formatNumber(calculateTotal())}</span>
              </div>
            </div>
            <button
              className="my-2 bg-green-700 w-full h-10 rounded-lg"
              onClick={() => handleContinue(orderType)}
            >
              {orderType === "Dine in" ? "Continue" : "Payment"}
            </button>
          </div>
        </>
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={(id, updatedDetails) =>
            handleSaveEdit(id, updatedDetails, handleUpdateItem)
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default OrderDetails;
