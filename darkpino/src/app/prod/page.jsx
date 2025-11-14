"use client";

import { useEffect, useState } from "react";

export default function ProdPage() {
    const [products, setProducts] = useState([]);

    // Formatters
    const formatUSD = (n) =>
        Number(n || 0).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        });

    const calcTickets = (price) => Math.floor((Number(price) || 0) / 100);

    // Load products.json from public folder
    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed loading JSON:", err));
    }, []);

    return (
        <div className="container">
            <div className="title">Dark Pino 1 of 1s</div>

            <div className="listProduct">
                {products.length === 0 && (
                    <p style={{ color: "#F8C200" }}>Loading products...</p>
                )}

                {products.map((prod) => {
                    const price = Number(prod.price);
                    const tickets = calcTickets(price);

                    return (
                        <a
                            key={prod.id}
                            href={`/detail/${prod.id}`}
                            className="item"
                        >
                            <img src={prod.image} alt={prod.name} />

                            <h2>{prod.name}</h2>

                            <div className="price-line">
                                <div className="price">{formatUSD(price)}</div>

                                <div className="tickets">
                                    🎟 {tickets}{" "}
                                    {tickets === 1 ? "Ticket" : "Tickets"}
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
