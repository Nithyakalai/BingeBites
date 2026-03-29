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

ReactDOM.createRoot(document.getElementById("react-filter")).render(<MovieFilter />);