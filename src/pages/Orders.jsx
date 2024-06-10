const Orders = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* Navbar Home */}
        <nav className="border-b mx-4 py-4">
          <div className="container flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Orders</h1>
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
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            {/* Add your orders content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
