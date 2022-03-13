import React from "react";
import ArtDisplayModal from "./Modal";

function ArtDisplay({ art, addFavorite, removeFavorite, isFavorite }) {
  return (
    <div className="flex-box center padding-10">
      <img
        src={`https://www.artic.edu/iiif/2/${art.imageId}/full/843,/0/default.jpg`}
        className="height-200"
      />

      <h4>{art.title}</h4>
      <h6 className="text-blue">
        {art.artist}
        <br />
        {art.date}
      </h6>
      <div className="lucida-sans text-red">
        {art.onView && "Currently on View!"}
      </div>
      <div className="on-view">{art.onView && art.gallery}</div>
      <ArtDisplayModal />
      {!isFavorite && (
        <button className="button-black" onClick={() => addFavorite(art)}>
          Add Favorite
        </button>
      )}
      {isFavorite && (
        <button
          className="button-black"
          onClick={() => removeFavorite(art.art_id)}
        >
          Remove Favorite
        </button>
      )}
    </div>
  );
}

export default ArtDisplay;
