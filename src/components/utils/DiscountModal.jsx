import PropTypes from "prop-types";

const DiscountModal = ({
  isOpen,
  onClose,
  minOrderAmount,
  discountRate,
  maxDiscount,
  setMinOrderAmount,
  setDiscountRate,
  setMaxDiscount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Discount Settings</h2>
        <div className="flex flex-col space-y-2 text-xs">
          <label htmlFor="minOrderAmount">Minimum Order Amount (Rp)</label>
          <input
            type="number"
            id="minOrderAmount"
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(parseInt(e.target.value))}
            className="border p-2 rounded-lg"
          />
          <label htmlFor="discountRate">Discount Rate</label>
          <div className="flex items-center">
            <input
              type="number"
              id="discountRate"
              value={discountRate * 100}
              onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
              className="border p-2 rounded-lg flex-1"
            />
            <span className="ml-2">%</span>
          </div>
          <label htmlFor="maxDiscount">Maximum Discount (Rp)</label>
          <input
            type="number"
            id="maxDiscount"
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(parseInt(e.target.value))}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

DiscountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  minOrderAmount: PropTypes.number.isRequired,
  discountRate: PropTypes.number.isRequired,
  maxDiscount: PropTypes.number.isRequired,
  setMinOrderAmount: PropTypes.func.isRequired,
  setDiscountRate: PropTypes.func.isRequired,
  setMaxDiscount: PropTypes.func.isRequired,
};

export default DiscountModal;
