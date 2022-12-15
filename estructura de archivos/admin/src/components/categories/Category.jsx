import React from "react";

export const Category = ({ name, totalProducts }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body category-Name-totalProduct">
                    <div>
                        {name}
                    </div>
                    {totalProducts}
                </div>
            </div>
        </div>
    );
};
