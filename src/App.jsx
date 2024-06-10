import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import ShiftSummary from "./pages/ShiftSummary";

const App = () => {
  return (
    <OrderProvider>
      <Router>
        <div className="h-screen flex font-poppins">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shift-summary" element={<ShiftSummary />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
};

export default App;
