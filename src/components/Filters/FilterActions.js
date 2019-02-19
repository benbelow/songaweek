export const ENABLE_FILTER = 'ENABLE_FILTER';
export const DISABLE_FILTER = 'DISABLE_FILTER';

export function enableFilter(filterName) {
  return {
    type: ENABLE_FILTER,
    filterName,
  };
}

export function disableFilter(filterName) {
  return {
    type: DISABLE_FILTER,
    filterName
  };
}
