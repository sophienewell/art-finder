import React, { useEffect, useMemo, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import ArtDisplay from "./ArtDisplay";
import { connect } from "react-redux";
import { setSearch, removeFavorite, addFavorite } from "../redux/actions";

function SearchPage({
  user,
  favorites,
  addFavorite,
  removeFavorite,
  setSearch,
  search,
}) {
  const searchInput = useRef(null);
  const [query, setQuery] = useState("");
  const [onView, setOnView] = useState("any");
  const { data, error, loading } = useFetch(query);
  const faveIds = useMemo(() => favorites.map((val) => val.id), [favorites]);
  useEffect(() => {
    if (data) {
      setSearch(data);
    }
  }, [data, setSearch]);

  return (
    <div>
      <h2> Welcome, {user}</h2>
      <div className="center margin-20">
        <input id="query" placeholder="search here" ref={searchInput} />
        <button
          className="margin-20"
          onClick={() => {
            setQuery(searchInput.current.value);
          }}
        >
          Search
        </button>

        <select
          id="onView"
          value={onView}
          onChange={(e) => setOnView(e.target.value)}
        >
          <option value="all">All</option>
          <option value="onview">On View Only</option>
        </select>
      </div>
      <div className="flex-container">
        {loading && <div>Loading</div>}
        {error && !loading && <h2>Something went wrong</h2>}
        {!error && search && (
          <>
            {search
              .filter((val) => {
                if (onView === "onview") {
                  return val.onView;
                }
                return val.onView || !val.onView;
              })

              .map((val) => (
                <ArtDisplay
                  key={val.id}
                  art={val}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  isFavorite={faveIds.includes(val.id)}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    favorites: state.arts.favorites,
    search: state.arts.search,
  };
};

const mapDispatchToProps = {
  setSearch,
  removeFavorite,
  addFavorite,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
