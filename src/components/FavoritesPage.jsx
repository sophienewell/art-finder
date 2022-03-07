import ArtDisplay from "./ArtDisplay";
import { removeFavorite } from "../redux/actions";
import { connect } from "react-redux";

function FavoritesPage({ favorites, removeFavorite }) {
  return (
    <div>
      <div className="flex-container">
        {favorites.map((val) => (
          <ArtDisplay
            key={val.id}
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
  removeFavorite,
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
