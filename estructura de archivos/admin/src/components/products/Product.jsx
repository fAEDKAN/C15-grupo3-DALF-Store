import React from "react";

export const Product = ({ name, price }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        {name}
                    </div>
                    <div>
                        <p>{`$`} {price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
