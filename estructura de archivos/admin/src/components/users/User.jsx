import React from "react";

export const User = ({ userName, email, firstName, lastName, avatar }) => {
    
    const img = avatar ? 'http://localhost:4000/api/users/avatar/' + avatar.file : '../../DEFAULT-IMAGE.jpg'

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        <p>{userName}</p>
                    </div>
                    <div>
                        {firstName + lastName}
                    </div>
                    <div>
                        <p>{email}</p>
                    </div>
                    <div className="avatar-size">
                        <img src={img} alt={userName} />
                    </div>
                </div>
            </div>
        </div>
    );
};