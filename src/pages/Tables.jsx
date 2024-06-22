import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import Search from "../components/utils/Search";

const tables = ["1", "2", "3", "4", "5"];

const Tables = () => {
  const { setTableNumber } = useContext(OrderContext);
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  const handleTableSelection = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  const handleContinue = () => {
    setTableNumber(selectedTable);
    navigate("/payment");
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Tables</h1>
            <div className="space-x-4 ">
              {/* Bagian Search */}
              <Search placeholder="Cari Table" />
            </div>
          </div>
        </nav>
        {/* flex */}
        <div className="flex-1 flex overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tables Management</h1>
            <div className="select-table-container">
              <h2>Select Table</h2>
              <ul className="gap-4 flex">
                {tables.map((table) => (
                  <li
                    key={table}
                    className={`cursor-pointer rounded-lg p-2 border w-56 h-56 flex justify-center items-center text-white ${
                      selectedTable === table
                        ? "bg-blue-500"
                        : "bg-gray-300 text-black"
                    }`}
                    onClick={() => handleTableSelection(table)}
                  >
                    Meja {table}
                  </li>
                ))}
              </ul>
              <button
                className="bg-green-700 text-white w-full mt-10 rounded-xl p-5"
                onClick={handleContinue}
                disabled={!selectedTable}
              >
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
