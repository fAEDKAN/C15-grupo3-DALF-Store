import React from "react";

export const LastProduct = ({ name, image }) => {

    const img = image ? 'http://localhost:4000/api/products/image/' + image[0].file : '../../DEFAULT-IMAGE.jpg'

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        {name}
                    </div>
                    <div className="images-size">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </div>
        </div>
    );
};
