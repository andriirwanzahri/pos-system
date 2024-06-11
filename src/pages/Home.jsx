import OrderDetails from "../components/OrderDetails";
import { OrderContext } from "../context/OrderContext";
import { useState, useContext } from "react";
const categories = ["Smoothies", "Alpukat Kocok", "Makanan"];

const products = [
  {
    id: 1,
    name: "Manggo Thai",
    productPrice: { Medium: 15000, Large: 20000 },
    toppingPrice: { Cheese: 3000, Milo: 3000, ChocoCrunts: 2000, Oreo: 2000 },
    image: "/images/MANGGA-THAI.png",
  },
  {
    id: 2,
    name: "Manggo Keju",
    productPrice: { Medium: 17000, Large: 22000 },
    toppingPrice: { Cheese: 3000, Milo: 3000, ChocoCrunts: 2000, Oreo: 2000 },
    image: "/images/MANGGA-THAI.png",
  },
  {
    id: 3,
    name: "Alpukat Thai",
    productPrice: { Medium: 13000, Large: 18000 },
    toppingPrice: { Cheese: 3000, Milo: 3000, ChocoCrunts: 2000, Oreo: 2000 },
    image: "/images/POKAT-KOCOK.png",
  },
];

const Home = () => {
  const { handleAddItemToOrder } = useContext(OrderContext);
  const [selectedSize, setSelectedSize] = useState("Medium");

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
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a
                    href="#"
                    onClick={() => handleAddItemToOrder(product, selectedSize)}
                  >
                    <img
                      className="p-2 rounded-t-lg"
                      src={product.image}
                      alt={product.name}
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a
                      href="#"
                      onClick={() =>
                        handleAddItemToOrder(product, selectedSize)
                      }
                    >
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.name}
                      </h5>
                    </a>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        Rp.{product.productPrice[selectedSize]}
                      </span>
                    </div>
                    <label className="block mb-2">Select Size:</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      {Object.keys(product.productPrice).map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                      {/* <option value="Large">Large</option> */}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {/* Table biasa untuk test */}
          </div>
        </div>
      </div>
      <OrderDetails />
    </>
  );
};

export default Home;
