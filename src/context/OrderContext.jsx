import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderType, setOrderType] = useState("Takeway");
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tableNumber, setTableNumber] = useState(null); // State for table number

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleAddItemToOrder = (product, size) => {
    const quantity = 1;
    const customDetails = { size, note: "", additionalToppings: [] };
    const additionalCost = 0;
    const itemTotal = quantity * product.productPrice[size];
    const newItem = {
      ...product,
      id: orderItems.length + 1,
      quantity,
      customDetails,
      additionalCost,
      itemTotal,
    };
    setOrderItems([...orderItems, newItem]);
    setSubtotal(subtotal + itemTotal);
  };

  const handleUpdateItem = (id, updatedDetails) => {
    const updatedItems = orderItems.map((item) =>
      item.id === id ? { ...item, ...updatedDetails } : item
    );
    setOrderItems(updatedItems);
    const newSubtotal = updatedItems.reduce(
      (acc, item) => acc + item.itemTotal,
      0
    );
    setSubtotal(newSubtotal);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = orderItems.filter((item) => item.id !== id);
    setOrderItems(updatedItems);
    const newSubtotal = updatedItems.reduce(
      (acc, item) => acc + item.itemTotal,
      0
    );
    setSubtotal(newSubtotal);
  };

  return (
    <OrderContext.Provider
      value={{
        orderType,
        orderItems,
        subtotal,
        tableNumber, 
        handleOrderTypeChange,
        handleAddItemToOrder,
        handleUpdateItem,
        handleRemoveItem,
        setTableNumber, 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
