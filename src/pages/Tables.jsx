import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Change this line
import { OrderContext } from "../context/OrderContext";

const Tables = () => {
  const { setTableNumber } = useContext(OrderContext);
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate(); // Change this line

  const handleTableSelection = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleContinue = () => {
    setTableNumber(selectedTable);
    navigate("/payment"); // Change this line
  };
  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Tables</h1>
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
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tables Management</h1>
            <div className="select-table-container">
              <h2>Select Table</h2>
              <select value={selectedTable} onChange={handleTableSelection}>
                <option value="" disabled>
                  Select a table
                </option>
                <option value="1">Table 1</option>
                <option value="2">Table 2</option>
                <option value="3">Table 3</option>
                <option value="4">Table 4</option>
              </select>
              <button onClick={handleContinue} disabled={!selectedTable}>
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
