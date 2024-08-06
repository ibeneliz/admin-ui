import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import '../styles/Admin.css';
import Table from './Table';
import axios from "axios";
import UserEditModal from './UserEditModal';
import Pagination from './Pagination';
import DeleteSelectedButton from './DeleteSelectedButton';

export default function Admin() {
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [editRowData, setEditRowData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const itemsPerPage = 10;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetching user details");
            console.log(response);
            console.log(response.data);
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = event => {
        const query = event.target.value.toLowerCase();
        setSearchText(query);

        const filtered = users.filter(
            (user) =>
                user.id.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }

    const handleEdit = (id) => {
        console.log("Edit Id=", id);
        const rowToEdit = filteredUsers.find((user) => user.id === id);
        console.log(rowToEdit);
        setEditRowData(rowToEdit);
        setIsModalOpen(true);
    }

    const handleDelete = (id) => {
        console.log("Delete Id=", id);
        setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.filter((user) => user.id !== id)
        );
    }

    const handleRowSelection = (event, id) => {
        const { checked } = event.target;
        if (checked) {
          setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
        } else {
          setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((rowId) => rowId !== id)
          );
        }
      };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteSelected = () => {
        const updatedUsers = users.filter(
            (user) => !selectedRows.includes(user.id)
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setSelectedRows([]);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <div className='container'>
            <SearchBar searchText={searchText} handleSearch={handleSearch} />
            <Table users={currentUsers} handleEdit={handleEdit} handleDelete={handleDelete} handleRowSelection={handleRowSelection} currentUsers={currentUsers} selectedRows={selectedRows}/>
            <Pagination urrentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={filteredUsers.length} handlePagination={handlePagination} />
            <DeleteSelectedButton handleDeleteSelected={handleDeleteSelected} selectedRows={selectedRows}
            />
            {isModalOpen && <UserEditModal editRowData={editRowData} setIsModalOpen={setIsModalOpen} />}
        </div>
    );
}