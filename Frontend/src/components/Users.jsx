import React, { useEffect, useState } from "react";
import API from "../api";

const CurrentUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        API.get("/auth/users", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setUser(res.data))
            .catch(() => alert('Unauthorized'));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h3>Logged-in User</h3>
            <p>{user.name} - {user.email}</p>
        </div>
    );
};

export default CurrentUser;
