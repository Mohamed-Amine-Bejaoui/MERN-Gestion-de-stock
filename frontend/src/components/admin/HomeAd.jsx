import React, { useEffect, useState } from 'react';
import SideAd from './SideAd';
import "../../styles/Adhome.css";

const HomeAd = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://mern-gestion-de-stock-production.up.railway.app/users");
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data.filter((user) => user.status === "approved" && user.name !== "admin"));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
    try {
        console.log("Attempting to delete user with ID:", id);
        const response = await fetch(`https://mern-gestion-de-stock-production.up.railway.app/deleteuser/${id}`, {
            method: "DELETE",
        });
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error("Failed to delete user");

        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

    return (
        <div style={{ display: "flex" }}>
            <SideAd />
            <div className="Users-content" style={{ marginLeft: "20px" }}>
                <h2 >Utilisateurs approuvé</h2>
                <div className="Users">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="UserCard">
                            <p title={user.name} className="truncate-text">
                                <strong>Nom:</strong> {user.name}
                            </p>
                            <p title={user.email} className="truncate-text">
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p title={user.phone_number} className="truncate-text">
                                <strong>Tel:</strong> {user.phone_number}
                            </p>
                            <button
                                className="buttonAR"
                                onClick={() => handleDeleteUser(user._id)}
                            >
                                Supprimer
                            </button>
                        </div>
                        ))
                    ) : (
                        <p>loading</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeAd;
