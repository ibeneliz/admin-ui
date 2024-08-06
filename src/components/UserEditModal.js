import { useEffect } from "react";

export default function UserEditModal({ editRowData, setIsModalOpen }) {
    useEffect(() => {
        console.log('editRowData',editRowData);
    },[editRowData]);
    return (
        <>
            {editRowData && <div className="modal">
                <div className="modal-content">
                    <h3>Edit Row</h3>
                    <p>ID: {editRowData?.id}</p>
                    <p>Name: {editRowData?.name}</p>
                    <p>Email: {editRowData?.email}</p>
                    <p>Role: {editRowData?.role}</p>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>}
        </>

    );
}