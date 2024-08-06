import React from "react";

export default function DeleteSelectedButton({ handleDeleteSelected, selectedRows }) {
    return (
        <button
            className="delete-selected-button"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
        >
            Delete Selected
        </button>
    );
}