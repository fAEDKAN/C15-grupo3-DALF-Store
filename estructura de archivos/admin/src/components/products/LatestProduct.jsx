import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/UseFetch";
import { LastProduct } from "./LastProduct"

export const LatestProduct = () => {
    const [product, setProducts] = useState({
        loading: true,
        error: null,
        data: [],
    });

    useEffect(() => {
        fetchWithoutToken("/reactProductsAndUsers/last").then((response) => {
            if (response.ok) {
                const { data } = response;
                setProducts({
                    ...product,
                    loading: false,
                    data: data,
                });
            } else {
                setProducts({
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
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto Agregado</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                    {product.data.map((product, index) => (<LastProduct {...product} key={product.name + index} />))}
                    </div>
                </div>
            </div>
        </div>
    );
};
