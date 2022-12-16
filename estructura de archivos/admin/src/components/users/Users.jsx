import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/UseFetch";
import { User } from "./User";

export const Users = () => {
    const [users, setUsers] = useState({
        loading: true,
        error: null,
        data: [],
    });

    useEffect(() => {
        fetchWithoutToken("/reactProductsAndUsers/userList").then((response) => {
            if (response.ok) {
                const { data } = response;
                setUsers({
                    ...users,
                    loading: false,
                    data: data,
                });
            } else {
                setUsers({
                    ...users,
                    error: response.error,
                });
            }
        });
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Usuarios</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                    {users.data.map((user, index) => (<User {...user} key={user.userName + index} />))}
                    </div>
                </div>
            </div>
        </div>
    );
};
