import {
  SET_SEARCH,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_ARTS,
} from "../actions";

const initialState = {
  search: [],
  favorites: [],
};

export default function artsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.art] };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((val) => val.id !== action.id),
      };

    case SET_SEARCH:
      return { ...state, search: action.searchResults };

    case CLEAR_ARTS:
      return { ...state, search: [], favorites: [] };

    default:
      return state;
  }
}
