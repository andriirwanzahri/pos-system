import Search from "../components/utils/Search";
import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";

const Orders = () => {
  const tableData = [
    {
      id: 1,
      productName: 'Apple MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      id: 2,
      productName: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      id: 3,
      productName: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      id: 4,
      productName: "Apple Watch",
      color: "Black",
      category: "Watches",
      price: "$199",
    },
    {
      id: 5,
      productName: "Apple iMac",
      color: "Silver",
      category: "PC",
      price: "$2999",
    },
    {
      id: 6,
      productName: "Apple AirPods",
      color: "White",
      category: "Accessories",
      price: "$399",
    },
    {
      id: 7,
      productName: "iPad Pro",
      color: "Gold",
      category: "Tablet",
      price: "$699",
    },
    {
      id: 8,
      productName: "Magic Keyboard",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      id: 9,
      productName: "Smart Folio iPad Air",
      color: "Blue",
      category: "Accessories",
      price: "$79",
    },
    {
      id: 10,
      productName: "AirTag",
      color: "Silver",
      category: "Accessories",
      price: "$29",
    },
    {
      id: 11,
      productName: "New Product 1",
      color: "Red",
      category: "New Category",
      price: "$100",
    },
    {
      id: 12,
      productName: "New Product 2",
      color: "Green",
      category: "New Category",
      price: "$200",
    },
    // Add more data as needed
  ];
  const { paidOrders } = useContext(OrderContext);

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tableData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = paidOrders.slice(startIndex, endIndex);
  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Orders</h1>
            <div className="space-x-4 ">
              {/* Bagian Search */}
              <Search placeholder="Cari Order" />
            </div>
          </div>
        </nav>
        {/* flex   */}
        <div className="flex-1 flex overflow-hidden ">
          <div className="p-4 overflow-auto no-scrollbar ">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            {/* Add your orders content here */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr
                      key={item.orderId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${item.orderId}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${item.orderId}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.orderItems.map((data) => (
                          <li key={data.id}>
                            {data.quantity} x {data.name} (
                            {data.customDetails.size}) -
                            {formatNumber(data.itemTotal)}
                          </li>
                        ))}
                        {formatNumber(item.subtotal)}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {startIndex + 1}-{Math.min(endIndex, tableData.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tableData.length}
                  </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                  </li>
                  {[
                    ...Array(Math.ceil(tableData.length / itemsPerPage)).keys(),
                  ].map((pageNumber) => (
                    <li key={pageNumber + 1}>
                      <button
                        onClick={() => setCurrentPage(pageNumber + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentPage === pageNumber + 1
                            ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                      >
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(tableData.length / itemsPerPage)
                      }
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            {/* <div className="flex-1 ">
              {paidOrders.length === 0 ? (
                <p>No paid orders available.</p>
              ) : (
                <div className="space-y-4">
                  {paidOrders.map((order) => (
                    <div key={order.orderId} className="border p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Order ID: {order.orderId}
                      </h3>
                      <p className="mb-2">Date: {order.orderDate}</p>
                      <p className="mb-2">
                        Table Number: {order.tableNumber || "0"}
                      </p>
                      <div className="mb-2">
                        <h4 className="font-semibold">Items:</h4>
                        <ul className="list-disc list-inside">
                          {order.orderItems.map((item) => (
                            <li key={item.id}>
                              {item.quantity} x {item.name} (
                              {item.customDetails.size}) -
                              {formatNumber(item.itemTotal)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="flex justify-between">
                        Subtotal: <span>{formatNumber(order.subtotal)}</span>
                      </p>
                      <p className="flex justify-between">
                        Discount: <span>-{formatNumber(order.discount)}</span>
                      </p>
                      <p className="flex justify-between font-semibold">
                        Total: <span>{formatNumber(order.total)}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
