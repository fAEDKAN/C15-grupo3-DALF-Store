import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/UseFetch";

export const LastProduct = () => {
    const [product, setProduct] = useState({
        loading: true,
        error: null,
        data: [],
    });

    useEffect(() => {
        fetchWithoutToken("/reactProductsAndUsers/last").then((response) => {
            if (response.ok) {
                const { data } = response;
                setProduct({
                    ...product,
                    loading: false,
                    data: data,
                });
            } else {
                setProduct({
                    ...product,
                    error: response.error,
                });
            }
        });
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {product.data.name}
                    </div>
                </div>
            </div>
        </div>
    );
};
