// components/DeleteButton.jsx
import React from 'react';

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      className="button small delete"
      title="Izbriši"
      onClick={onClick}
    >
      🗑️
    </button>
  );
}

export default DeleteButton;
