import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';

export default function Table({ users,handleSelectAllRows, handleRowSelection, handleEdit, handleDelete, selectedRows, currentUsers }) {
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedRows.length === currentUsers.length}
                            onChange={handleSelectAllRows}
                            className="checkbox-input"
                        />
                        <span className="checkbox-custom"></span>
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        user={user}
                        selected={selectedRows.includes(user.id)}
                        handleRowSelection={handleRowSelection}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}