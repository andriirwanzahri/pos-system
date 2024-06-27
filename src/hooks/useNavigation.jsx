import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

const useNavigation = () => {
  const navigate = useNavigate();
  const { handlePaidOrder } = useContext(OrderContext);

  const handleContinue = (orderType) => {
    if (orderType === "Dine in") {
      navigate("/Tables");
    } else {
      navigate("/payment");
    }
  };

  const handlePayment = () => {
    // Logika pembayaran Anda di sini
    // Misalnya, melakukan panggilan API untuk memproses pembayaran
    // ...

    // Setelah pembayaran berhasil
    handlePaidOrder();
    // Navigasi ke halaman konfirmasi atau beranda
    // navigate("/confirmation");
    alert("Payment successful!");
    navigate("/");
  };

  return {
    handleContinue,
    handlePayment,
  };
};

export default useNavigation;
