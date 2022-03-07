export const SET_SEARCH = "Set Search";
export const ADD_FAVORITE = "Add Favorite";
export const REMOVE_FAVORITE = "Remove Favorite";
export const CLEAR_ARTS = "Clear Arts";

export const addFavorite = (art) => {
  return { type: ADD_FAVORITE, art };
};

export const removeFavorite = (id) => {
  return { type: REMOVE_FAVORITE, id };
};

export const setSearch = (searchResults) => {
  return { type: SET_SEARCH, searchResults };
};

export const clearArts = () => {
  return { type: CLEAR_ARTS };
};
