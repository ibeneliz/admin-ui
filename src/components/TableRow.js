import React, { useState, useEffect } from 'react';

export default function TableRow({ user, handleRowSelection , selected, handleEdit, handleDelete}) {

    useEffect(() => {
        console.log("Reached TableRow component");
        console.log(user);
    },[user]);
    return (
        <tr className={selected ? "selected" : ""}>
            <td>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={(event) => handleRowSelection(event, user.id)} />
            </td>
            <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
            <td className="btn-container">
                <button onClick={() => handleEdit(user.id)}>
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(user.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    );
}