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
  const [discountRate, setDiscountRate] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(30000);

  // Order ID and Date
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  // Paid Orders
  const [paidOrders, setPaidOrders] = useState([]);

  // Order counter for generating unique order IDs
  const [orderCounter, setOrderCounter] = useState(1);

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
    // const id = Math.random().toString(36).substr(2, 9);
    // setOrderId(id);
    const id = `ORDER-${orderCounter.toString().padStart(5, "0")}`;
    setOrderId(id);
    setOrderCounter(orderCounter + 1);
  };

  const getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    setOrderDate(date);
  };

  const handlePaidOrder = () => {
    const newOrder = {
      orderId,
      orderDate,
      tableNumber,
      orderItems,
      subtotal,
      discount,
      total: subtotal - discount,
    };
    setPaidOrders([...paidOrders, newOrder]);
    clearOrder();
  };

  const clearOrder = () => {
    setOrderItems([]);
    setSubtotal(0);
    setDiscount(0);
    setTableNumber(null);
    generateOrderId();
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
        paidOrders,
        handleOrderTypeChange,
        handleAddItemToOrder,
        handleUpdateItem,
        handleRemoveItem,
        setTableNumber,
        setMinOrderAmount,
        setDiscountRate,
        setMaxDiscount,
        handlePaidOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
