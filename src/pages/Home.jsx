import OrderDetails from "../components/OrderDetails";
import { OrderContext } from "../context/OrderContext";
import { useState, useContext } from "react";
const categories = ["Smoothies", "Alpukat Kocok", "Makanan"];

const products = [
  {
    id: 1,
    name: "Manggo Thai",
    productPrice: { Small: 10000, Medium: 15000, Large: 20000 },
    toppingPrice: { Cheese: 2000, Lettuce: 1500, Tomato: 1000, Onion: 1200 },
    image: "/images/MANGGA-THAI.png",
  },
  {
    id: 2,
    name: "Manggo Keju",
    productPrice: { Small: 80, Medium: 120, Large: 160 },
    toppingPrice: { Cheese: 2000, Lettuce: 1500, Tomato: 1000, Onion: 1200 },
    image: "/images/MANGGA-THAI.png",
  },
  {
    id: 3,
    name: "Alpukat Thai",
    productPrice: { Small: 90, Medium: 130, Large: 180 },
    toppingPrice: { Cheese: 2000, Lettuce: 1500, Tomato: 1000, Onion: 1200 },
    image: "/images/POKAT-KOCOK.png",
  },

];

const Home = () => {
  const { handleAddItemToOrder } = useContext(OrderContext);
  const [selectedSize, setSelectedSize] = useState("Small");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Home</h1>
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
          <div className="flex-1 overflow-auto p-4 no-scrollbar">
            {/* Category */}
            <div className="w-full  mb-5 rounded-lg">
              <h1 className="font-bold ">Category</h1>
              <ul className="flex gap-4 mt-2">
                <li className="bg-green-600 text-sm py-3 px-6 rounded-full">
                  All
                </li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 text-sm py-3 px-6 rounded-full hover:bg-green-300 cursor-pointer"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b mb-5"></div>
            {/* Produk */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg hover:bg-blue-600 "
                >
                  <img
                    onClick={() => handleAddItemToOrder(product, selectedSize)}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 cursor-pointer object-cover rounded-md"
                  />
                  <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                  <p className="mt-1 text-gray-600">
                    Rp.{product.productPrice[selectedSize]}
                  </p>
                  <div className="mt-4">
                    <label className="block mb-2">Select Size:</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OrderDetails />
    </>
  );
};

export default Home;
