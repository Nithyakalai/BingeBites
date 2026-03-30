const { useState, useEffect } = React;

function MovieFilter() {
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    const cards = document.querySelectorAll(".movie-card");
    let visibleCount = 0;

    cards.forEach(card => {
      const genres = card.getAttribute("data-genre");

      if (genre === "All" || genres.includes(genre)) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Show message if no movies
    const msg = document.getElementById("no-movies-msg");
    msg.style.display = visibleCount === 0 ? "block" : "none";

  }, [genre]);

  const genres = ["All", "Action", "Comedy", "Romance", "Sci-Fi", "Fantasy"];

  return (
    <div className="filter-container">
      <h3>🎬 Filter Movies</h3>
      <div className="filter-buttons">
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={genre === g ? "active" : ""}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}

const filterEl = document.getElementById("react-filter");
if (filterEl) ReactDOM.createRoot(filterEl).render(<MovieFilter />);


// ===== CART COMPONENT =====

function Cart() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const load = () => {
    const saved = JSON.parse(localStorage.getItem("bb_cart") || "[]");
    setItems(saved);
  };

  React.useEffect(() => {
    load();
    window.addEventListener("bb_cart_update", load);
    return () => window.removeEventListener("bb_cart_update", load);
  }, []);

  const remove = (idx) => {
    const updated = items.filter((_, i) => i !== idx);
    localStorage.setItem("bb_cart", JSON.stringify(updated));
    setItems(updated);
    window.dispatchEvent(new Event("bb_cart_update"));
  };

  const clear = () => {
    localStorage.removeItem("bb_cart");
    setItems([]);
    window.dispatchEvent(new Event("bb_cart_update"));
  };

  const total = items.reduce((s, i) => s + (Number(i.price) || 0), 0);

  return (
    <>
      <button className="cart-btn" onClick={() => { load(); setOpen(true); }}>
        🛒 Cart {items.length > 0 && <span className="cart-badge">{items.length}</span>}
      </button>

      {open && (
        <div className="cart-overlay" onClick={() => setOpen(false)}>
          <div className="cart-panel" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>🛒 Your Cart</h3>
              <button className="cart-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>🛒 Your cart is empty!</p>
                <p>Add a movie, lounge or food to get started.</p>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {items.map((item, i) => (
                    <li key={i} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-type">{item.type}</span>
                        <span className="cart-item-name">{item.name}</span>
                        {item.detail && <span className="cart-item-detail">{item.detail}</span>}
                      </div>
                      <div className="cart-item-right">
                        {item.price > 0 && <span className="cart-item-price">₹{item.price}</span>}
                        <button className="cart-remove" onClick={() => remove(i)}>✕</button>
                      </div>
                    </li>
                  ))}
                </ul>
                {total > 0 && <div className="cart-total">Total: ₹{total}</div>}
                <button className="btn-primary cart-clear" onClick={clear}>Clear Cart</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

document.querySelectorAll(".cart-root").forEach(el => {
  ReactDOM.createRoot(el).render(<Cart />);
});
