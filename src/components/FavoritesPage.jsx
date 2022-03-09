import React, { useCallback } from "react";
import ArtDisplay from "./ArtDisplay";
import { removeFavorite } from "../redux/actions";
import { connect } from "react-redux";
import useAPI from "../hooks/useAPI";

function FavoritesPage({ favorites, remove, user }) {
  const { delFave } = useAPI();
  const removeFavorite = useCallback(
    async (art_id) => {
      const data = await delFave(art_id, user.id);
      if (data.success) {
        remove(art_id);
      }
    },
    [remove, delFave]
  );
  return (
    <div>
      <div className="flex-container">
        {favorites.map((val) => (
          <ArtDisplay
            key={val.art_id}
            art={val}
            removeFavorite={removeFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user, favorites: state.arts.favorites };
};

const mapDispatchToProps = {
  remove: removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
