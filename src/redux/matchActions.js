export const addMatch = match => ({
  type: 'ADD_MATCH',
  payload: match,
});

export const updateMatch = match => ({
  type: 'UPDATE_MATCH',
  payload: match,
});
export const viewMatch = () => ({
  type: 'VIEW_MATCH',
});
export const deleteMatch = (parentIndex,index) => ({
  type: 'DELETE_MATCH',
  payload: {parentIndex,index},
});
