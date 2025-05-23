import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-32 rounded-full bg-yellow-50 px-4 py-2 text-sm font-medium transition-all duration-300 placeholder:font-normal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-64 sm:focus:w-80"
      />
    </form>
  );
}

export default SearchOrder;
