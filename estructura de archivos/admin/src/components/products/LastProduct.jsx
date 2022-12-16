import React from "react";

export const LastProd = ({ name, price, image }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        {name}
                    </div>
                    <div>
                        {price}
                    </div>
                    <div>
                        {image}
                    </div>
                </div>
            </div>
        </div>
    );
};
