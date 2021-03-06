import {
  SET_SEARCH,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_ARTS,
  SET_FAVORITES,
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
        favorites: state.favorites.filter(
          (val) => val.art_id !== action.art_id
        ),
      };

    case SET_SEARCH:
      return { ...state, search: action.results };

    case CLEAR_ARTS:
      return { ...state, search: [], favorites: [] };

    case SET_FAVORITES:
      return { ...state, favorites: action.favorites };

    default:
      return state;
  }
}
