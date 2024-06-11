import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditItemModal = ({ item, onSave, onClose }) => {
  const [size, setSize] = useState(item.customDetails.size);
  const [note, setNote] = useState(item.customDetails.note);
  const [additionalToppings, setAdditionalToppings] = useState(
    item.customDetails.additionalToppings || []
  );

  useEffect(() => {
    setSize(item.customDetails.size);
    setNote(item.customDetails.note);
    setAdditionalToppings(item.customDetails.additionalToppings || []);
  }, [item]);

  // Function to calculate the total price including base price and selected toppings
  const calculateTotalPrice = () => {
    const basePrice = item.productPrice[size]; // Base price based on the selected size
    const toppingsPrice = additionalToppings.reduce(
      (total, topping) => total + (item.toppingPrice[topping] || 0),
      0
    ); // Sum up the price of selected toppings
    return basePrice + toppingsPrice; // Total price is the sum of the base price and the toppings price
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      customDetails: { size, note, additionalToppings },
      price: calculateTotalPrice(), // Use the calculateTotalPrice function to set the price
      itemTotal: item.quantity * calculateTotalPrice(), // Update itemTotal to use the calculated total price
    };
    onSave(item.id, updatedItem);
  };

  const handleToppingChange = (topping) => {
    setAdditionalToppings(
      (prev) =>
        prev.includes(topping)
          ? prev.filter((t) => t !== topping) // Remove topping if already selected
          : [...prev, topping] // Add topping if not selected
    );
  };

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md w-[400px] max-w-[90%]">
        <label htmlFor="Name">
          <input
            type="text"
            value={item.name}
            className="bg-white text-2xl font-bold text-center"
            disabled
          />
        </label>
        <label className="block mb-3">
          Ukuran:
          <select
            className="w-[100%] p-2 mt-2 border rounded-md"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {Object.keys(item.productPrice).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-3">
          Note:
          <input
            className="w-[100%] p-2 mt-1 border rounded-md"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <div>
          <p>Tambahkan Topping:</p>
          {Object.keys(item.toppingPrice).map((topping) => (
            <label key={topping}>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={additionalToppings.includes(topping)}
                    onChange={() => handleToppingChange(topping)}
                  />
                  {topping} (+{formatNumber(item.toppingPrice[topping])})
                </li>
              </ul>
              {/* Display topping price */}
            </label>
          ))}
        </div>
        <p>Total Harga: {formatNumber(calculateTotalPrice())}</p>
        {/* Display the calculated total price */}
        <button
          className="w-full p-2 mt-2 bg-[#28a745] rounded-md"
          onClick={handleSave}
        >
          Simpan
        </button>
        <button
          className="w-full p-2 mt-2 bg-[#dc3545] rounded-md"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

EditItemModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    customDetails: PropTypes.shape({
      size: PropTypes.string.isRequired,
      note: PropTypes.string,
      additionalToppings: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    productPrice: PropTypes.objectOf(PropTypes.number).isRequired,
    toppingPrice: PropTypes.objectOf(PropTypes.number).isRequired, // Add validation for topping price
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditItemModal;
