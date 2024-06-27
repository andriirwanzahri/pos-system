import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const useOrder = () => {
  const {
    orderType,
    orderItems,
    subtotal,
    orderId,
    orderDate,
    handleOrderTypeChange,
    handleUpdateItem,
    handleRemoveItem,
  } = useContext(OrderContext);

  const calculateTotal = () => {
    const taxRate = 0;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return total;
  };

  return {
    orderType,
    orderItems,
    subtotal,
    orderId,
    orderDate,
    handleOrderTypeChange,
    handleUpdateItem,
    handleRemoveItem,
    calculateTotal,
  };
};

export default useOrder;
