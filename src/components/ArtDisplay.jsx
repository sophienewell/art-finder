import React from "react";
import ArtDisplayModal from "./Modal";

function ArtDisplay({ art, addFavorite, removeFavorite, isFavorite }) {
  const imageUrl = !art.imageId
    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
    : `https://www.artic.edu/iiif/2/${art.imageId}/full/843,/0/default.jpg`;

  return (
    <div className="flex-box center padding-10">
      <img src={imageUrl} className="height-200 padding-10" />

      <h5>{art.title}</h5>
      <h6>{art.artist}</h6>
      <div className="lucida-sans text-red">
        {art.onView && "Currently on View!"}
      </div>
      <div className="on-view">{art.onView && art.gallery}</div>
      <ArtDisplayModal art={art} />
      {!isFavorite && (
        <button className="button-red" onClick={() => addFavorite(art)}>
          Add Favorite
        </button>
      )}
      {isFavorite && (
        <button
          className="button-red"
          onClick={() => removeFavorite(art.art_id)}
        >
          Remove Favorite
        </button>
      )}
    </div>
  );
}

export default ArtDisplay;
