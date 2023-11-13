
const initialState = {
  user:"",
  board: [
    {
      id: 0,
      name: "TODO",
      cards: [],
    },
    { id: 1, name: " In Progress", cards: [] },
    { id: 2, name: "Testing", cards: [] },
    { id: 3, name: "Done", cards: [] },
  ],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER_NAME":
      return { ...state, user: action.data };

    case "CHANGE_COLUMN_NAME":
      return { ...state, board: action.data };

    case "CREATE_NEW_CARD":
      return { ...state, board: action.data };

    case "EDIT_CARD":
      return { ...state, board: action.data };

    case "DELETE_CARD":
      return { ...state, board: action.data };

    case "ADD_NEW_COMMENT":
      return { ...state, board: action.data };

    case "DELETE_COMMENT":
      return { ...state, board: action.data };

    case "EDIT_COMMENT":
      return { ...state, board: action.data };

    default:
      return state;
  }
};

export default cardReducer;
