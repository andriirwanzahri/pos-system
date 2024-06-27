import { useState } from "react";

const useEditing = () => {
  const [editingItem, setEditingItem] = useState(null);

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (id, updatedDetails, handleUpdateItem) => {
    handleUpdateItem(id, updatedDetails);
    setEditingItem(null);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
  };

  return {
    editingItem,
    handleEditClick,
    handleSaveEdit,
    handleCloseModal,
  };
};

export default useEditing;
