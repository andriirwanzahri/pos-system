import Search from "../components/utils/Search";
import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";

const Orders = () => {
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
    if (currentPage < Math.ceil(paidOrders.length / itemsPerPage)) {
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
        <h1 className="text-2xl flex justify-center items-center font-bold mb-4">
          Tabel Orders
        </h1>
        <div className="p-4 overflow-y-auto">
          {/* Add your orders content here */}
          <div className="relative w-full shadow-md sm:rounded-lg">
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
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nomor Order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pembeli
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal/Jam
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto no-scrollbar">
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
                      {item.orderId}
                      {/* {item.orderItems.map((data) => (
                        <li key={data.id}>
                          {data.quantity} x {data.name} (
                          {data.customDetails.size}) -
                          {formatNumber(data.itemTotal)}
                        </li>
                      ))} */}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.orderDate}</td>
                    <td className="px-6 py-4">{formatNumber(item.subtotal)}</td>
                    <td className="px-6 py-4">
                      <button className="bg-green-600 rounded-full px-2 text-white">
                        Succes
                      </button>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Detail
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Hapus
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
                  {startIndex + 1}-{Math.min(endIndex, paidOrders.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {paidOrders.length}
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
                  ...Array(Math.ceil(paidOrders.length / itemsPerPage)).keys(),
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
                      Math.ceil(paidOrders.length / itemsPerPage)
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
    </>
  );
};

export default Orders;
