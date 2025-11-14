// src/app/contest/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function ContestPage() {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const formatUSD = (n) =>
        Number(n || 0).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        });

    const calcTickets = (price) => Math.floor((Number(price) || 0) / 100);

    // Load monthly prizes from /prizes.json in public
    useEffect(() => {
        fetch("/prizes.json")
            .then((res) => res.json())
            .then((data) => {
                setPrizes(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load prizes.json:", err);
                setError("Unable to load prizes right now.");
                setLoading(false);
            });
    }, []);

    return (
        <main>
            {/* ========================= HERO / TITLE ========================= */}
            <section className="how-to-enter">
                <div className="container">
                    <h2 className="title">
                        Dark Pino <span>Holiday Contest</span>
                    </h2>
                    <p className="subtitle">
                        Enter for a chance to win luxury art, custom fashion, and
                        once-in-a-lifetime prizes with every entry.
                    </p>
                </div>
            </section>

            {/* ========================= GRAND PRIZES ========================= */}
            <section className="grand-prizes">
                <div className="container">
                    <h2 className="title">Grand Prizes</h2>

                    <div className="grand-items">
                        {/* Lambo */}
                        <div className="grand-card">
                            <img src="/Image/lambo.jpg" alt="2022 Lamborghini Huracán" />
                            <h3>🎁 2022 Lamborghini Huracán</h3>
                            <p>Grand Draw: December 2026</p>
                            <p>Every eligible entry across the campaign counts toward this draw.</p>
                        </div>

                        {/* Rolex */}
                        <div className="grand-card">
                            <img src="/Image/rolex.jpg" alt="Rolex Daytona Rose Gold" />
                            <h3>⌚ Rolex Daytona Rose Gold</h3>
                            <p>Draw: August 2026</p>
                            <p>Entries from all qualifying purchases and quick entries are included.</p>
                        </div>
                    </div>

                    <p className="note">All other prizes are drawn monthly.</p>
                </div>
            </section>

            {/* ========================= HOW TO ENTER ========================= */}
            <section className="how-to-enter">
                <div className="container">
                    <h2 className="title">
                        How to Enter the <span>Dark Pino Holiday Contest</span>
                    </h2>
                    <p className="subtitle">
                        Follow these simple steps to earn tickets, enter contests, and win exclusive prizes.
                    </p>

                    <div className="steps">
                        {/* Step 1 */}
                        <div className="step">
                            <div className="step-image">
                                <img src="/Image/step1.png" alt="Purchase an item" />
                            </div>
                            <div className="step-content">
                                <h3>Step 1: Purchase an Item</h3>
                                <p>
                                    When you purchase any eligible item from our official store, you automatically earn{" "}
                                    <strong>one contest ticket</strong> for each $100 spent (rounded down).
                                </p>
                                <p className="note">
                                    No purchase necessary. See <a href="#rules">Official Rules</a> for alternate entry options.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step reverse">
                            <div className="step-image">
                                <img src="/Image/step2.png" alt="Explore prizes" />
                            </div>
                            <div className="step-content">
                                <h3>Step 2: Explore the Prizes Page</h3>
                                <p>
                                    Browse all available prizes and contests. Each prize has its own entry pool — you decide which
                                    prizes you’d like to enter for.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step">
                            <div className="step-image">
                                <img src="/Image/BuyTicket.png" alt="Enter contest" />
                            </div>
                            <div className="step-content">
                                <h3>Step 3: Enter a Contest</h3>
                                <p>
                                    Use your earned tickets to enter for the prize(s) you want. The more tickets you enter, the higher
                                    your chances of winning.
                                </p>
                                <p>You can manage and track your tickets from your account dashboard (coming soon).</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="step reverse">
                            <div className="step-image">
                                <img src="/Image/winbig.png" alt="Claim prize" />
                            </div>
                            <div className="step-content">
                                <h3>Step 4: Claim Your Prize</h3>
                                <p>
                                    When a winner is randomly selected and verified, they’ll receive an email or wallet/Telegram
                                    notification. Confirm your shipping details or token address to receive your prize.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================= MONTHLY PRIZES (FROM prizes.json) ========================= */}
            <section className="how-to-enter">
                <div className="container">
                    <h2 className="title">Monthly Prize Pool</h2>
                    <p className="subtitle">
                        These luxury art & fashion pieces are drawn monthly. Each ticket increases your odds.
                    </p>

                    {loading && <p className="subtitle">Loading prizes...</p>}
                    {error && <p className="subtitle" style={{ color: "#F8C200" }}>{error}</p>}

                    <div className="listProduct">
                        {prizes.map((prize) => {
                            const price = Number(prize.price) || 0;
                            const tickets = calcTickets(price);

                            // Ensure correct path: /img/1.jpeg instead of contest/img/1.jpeg
                            const imgSrc = prize.image.startsWith("/")
                                ? prize.image
                                : `/${prize.image.trim()}`;

                            return (
                                <a
                                    key={prize.id}
                                    href={`/prize-detail/${prize.id}`}
                                    className="item"
                                >
                                    <img src={imgSrc} alt={prize.name} />
                                    <h2>{prize.name}</h2>

                                    <div className="price-line">
                                        <div className="price">{formatUSD(price)}</div>
                                        <div className="tickets">
                                            🎟 {tickets} {tickets === 1 ? "Ticket" : "Tickets"}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================= RULES / DISCLAIMER ========================= */}
            <section id="rules" className="how-to-enter">
                <div className="container">
                    <h2 className="title">Official Rules & Eligibility</h2>
                    <p className="subtitle">
                        Please read this section carefully before entering Dark Pino contests.
                    </p>

                    <div className="pagep" style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
                        <ul>
                            <li>🧾 No purchase necessary to enter or win where legally applicable.</li>
                            <li>🎟 Purchases convert to contest tickets based on the displayed values on each product.</li>
                            <li>🌍 Open to eligible participants where such promotions are permitted by local law.</li>
                            <li>🔄 Monthly prizes are drawn at the end of each calendar month during the campaign period.</li>
                            <li>🏆 Grand prize draws (Lamborghini & Rolex) occur on their stated draw dates.</li>
                            <li>✅ Winners are selected randomly from all valid entries associated with that specific prize.</li>
                            <li>📩 Winners must respond to prize notification within the stated time window to remain eligible.</li>
                            <li>🚫 Any abuse, fraud, or automated entry behavior may result in disqualification.</li>
                        </ul>

                        <p style={{ marginTop: "1rem" }}>
                            By participating, you agree to the Dark Pino Contest Terms, privacy policy, and any additional
                            rules published on this site at the time of entry.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
