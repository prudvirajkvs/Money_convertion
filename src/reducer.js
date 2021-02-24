const init_state = {
  table_data: {},
  filter: 'all',
  user: null,
};
export const actionTypes = {
  SET_DATA: 'SET_DATA',
  SET_FILTER: 'SET_FILTER',
  SET_USER: 'SET_USER',
};

export const reducer = (state = init_state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA: {
      return {
        ...state,
        table_data: action.data,
      };
    }
    case actionTypes.SET_FILTER: {
      return {
        ...state,
        filter: action.filter,
      };
    }
    case actionTypes.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};
