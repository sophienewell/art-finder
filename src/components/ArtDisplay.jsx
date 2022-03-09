import React from "react";

function ArtDisplay({ art, addFavorite, removeFavorite, isFavorite }) {
  return (
    <div className="flex-box center padding-10">
      <img
        src={`https://www.artic.edu/iiif/2/${art.imageId}/full/843,/0/default.jpg`}
        className="height-200"
      />
      <h3>{art.title}</h3>
      <h5 className="text-blue">
        {art.artist}
        <br />
        {art.date}
      </h5>
      <div className="on-view text-red">
        {art.onView && "Currently on View!"}
      </div>
      <div className="on-view">{art.onView && art.gallery}</div>
      {!isFavorite && (
        <button
          className="margin-20 fave-button :hover"
          onClick={() => addFavorite(art)}
        >
          Add Favorite
        </button>
      )}
      {isFavorite && (
        <button
          className="margin-20 fave-button"
          onClick={() => removeFavorite(art.art_id)}
        >
          Remove Favorite
        </button>
      )}
    </div>
  );
}

export default ArtDisplay;
