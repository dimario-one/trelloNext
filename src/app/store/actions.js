import * as Types from "./types";
export const saveUserName = (data) => ({ type: Types.SAVE_USER_NAME, data });
export const changeColumnName = (data) => ({ type: Types.CHANGE_COLUMN_NAME, data });
export const createCard = (data) => ({ type: Types.CREATE_NEW_CARD, data });
export const editCard = (data) => ({ type: Types.EDIT_CARD, data });
export const deleteCard = (data) => ({ type: Types.DELETE_CARD, data });

export const addNewComment = (data) => ({ type: Types.ADD_NEW_COMMENT, data });
export const deleteComment = (data) => ({ type: Types.DELETE_COMMENT, data });
export const editComment = (data) => ({ type: Types.EDIT_COMMENT, data });

