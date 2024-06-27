const useFormat = () => {
  const formatNumber = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return {
    formatNumber,
  };
};

export default useFormat;
