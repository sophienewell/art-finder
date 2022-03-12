import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import useArticAPI from "../hooks/useArticAPI";
import ArtDisplay from "./ArtDisplay";
import { connect } from "react-redux";
import { setSearch, removeFavorite, addFavorite } from "../redux/actions";
import useAPI from "../hooks/useAPI";

function SearchPage({ user, favorites, add, remove, setSearch, search }) {
  const searchInput = useRef(null);
  const { addFave, delFave } = useAPI();
  const [query, setQuery] = useState("");
  const [onView, setOnView] = useState("any");
  const { data, error, loading } = useArticAPI(query);
  const faveIds = useMemo(
    () => favorites.map((val) => val.art_id),
    [favorites]
  );
  useEffect(() => {
    if (data) {
      setSearch(data);
    }
  }, [data, setSearch]);

  const addFavorite = useCallback(
    async (art) => {
      const json = await addFave({ ...art });
      if (json.success) {
        add(json.data);
      }
    },
    [add, addFave]
  );
  const removeFavorite = useCallback(
    async (art_id) => {
      const data = await delFave(art_id);
      if (data.success) {
        remove(art_id);
      }
    },
    [remove, delFave]
  );

  return (
    <div>
      <h2 className="center segoe"> Welcome, {user.username}</h2>
      <div className="center margin-20">
        <input id="query" placeholder="search here" ref={searchInput} />
        <button
          className="button-lpurple"
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
                  key={val.art_id}
                  art={val}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  isFavorite={faveIds.includes(val.art_id)}
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
  remove: removeFavorite,
  add: addFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
