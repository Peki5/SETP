// components/EditButton.jsx
import React from 'react';

function EditButton({ onClick }) {
  return (
    <button className="button small edit" title="Uredi" onClick={onClick}>
      ✏️
    </button>
  );
}

export default EditButton;
