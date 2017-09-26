import { DISABLE_FILTER, ENABLE_FILTER } from "./FilterActions";

const initialState = {};

const FilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_FILTER:
      return {...state, [action.filterName]: true};
    case DISABLE_FILTER:
      return {...state, [action.filterName]: false};
    default:
      return state;
  }
};

export default FilterReducer;