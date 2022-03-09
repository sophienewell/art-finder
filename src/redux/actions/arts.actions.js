export const SET_SEARCH = "Set Search";
export const ADD_FAVORITE = "Add Favorite";
export const REMOVE_FAVORITE = "Remove Favorite";
export const SET_FAVORITES = "Set Favorites";
export const CLEAR_ARTS = "Clear Arts";

export const addFavorite = (art) => {
  return { type: ADD_FAVORITE, art };
};

export const setFavorites = (favorites) => {
  return { type: SET_FAVORITES, favorites };
};

export const removeFavorite = (art_id) => {
  return { type: REMOVE_FAVORITE, art_id };
};

export const setSearch = (results) => {
  return { type: SET_SEARCH, results };
};

export const clearArts = () => {
  return { type: CLEAR_ARTS };
};
