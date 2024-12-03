import React, { useEffect, useState } from 'react';
import SideAd from './SideAd';
import "../../styles/Adhome.css";

const PendingAd = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/users");
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data.filter((user) => user.status === "pending" && user.name !== "admin"));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteuser/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete user");

            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleValidateUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${selectedUser._id}/approve`, {
                method: "PATCH",
                body: JSON.stringify({ status: 'approved' }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error("Failed to validate user");
            
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error validating user:", error);
        }
    };

    const handleRefuseUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${selectedUser._id}/approve`, {
                method: "PATCH",
                body: JSON.stringify({ status: 'rejected' }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error("Failed to refuse user");

            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error refusing user:", error);
        }
    };

    return (
        <div className="pendingAd-container">
            <SideAd />
            <div className="Users-content" style={{marginLeft:"20px"}}>
                <h2>Utilisateurs en attente</h2>
                <div className="users">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="user-card">
                                <p title={user.name} className="truncate-text">
                                    <strong>Nom:</strong> {user.name}
                                </p>
                                <p title={user.email} className="truncate-text">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p title={user.phone_number} className="truncate-text">
                                    <strong>Tel:</strong> {user.phone_number}
                                </p>
                                <button className="button-ar" onClick={() => handleDeleteUser(user._id)}>
                                    Supprimer
                                </button>
                                <button className="button-ar view-button" onClick={() => handleViewUser(user)}>
                                    voir
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Pas de Utilisateurs trouvés</p>
                    )}
                </div>
            </div>

            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedUser.image} alt="User" className="user-image" />
                        <div className="modal-actions">
                            <button onClick={handleValidateUser} className="button-validate">
                                Valider
                            </button>
                            <button onClick={handleRefuseUser} className="button-refuse">
                                Refuser
                            </button>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="button-close">
                            fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingAd;
