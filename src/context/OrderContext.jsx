import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderType, setOrderType] = useState("Takeway");
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tableNumber, setTableNumber] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Discount settings
  const [minOrderAmount, setMinOrderAmount] = useState(40000);
  const [discountRate, setDiscountRate] = useState(0.2);
  const [maxDiscount, setMaxDiscount] = useState(30000);

  // Order ID and Date
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    calculateDiscount();
    if (!orderId) {
      generateOrderId();
    }
    getCurrentDate();
  }, [subtotal, minOrderAmount, discountRate, maxDiscount]);

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

  const calculateDiscount = () => {
    if (subtotal >= minOrderAmount) {
      const potentialDiscount = subtotal * discountRate;
      setDiscount(Math.min(potentialDiscount, maxDiscount));
    } else {
      setDiscount(0);
    }
  };

  const generateOrderId = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setOrderId(id);
  };

  const getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    setOrderDate(date);
  };

  return (
    <OrderContext.Provider
      value={{
        orderType,
        orderItems,
        subtotal,
        tableNumber,
        discount,
        minOrderAmount,
        discountRate,
        maxDiscount,
        orderId,
        orderDate,
        handleOrderTypeChange,
        handleAddItemToOrder,
        handleUpdateItem,
        handleRemoveItem,
        setTableNumber,
        setMinOrderAmount,
        setDiscountRate,
        setMaxDiscount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
