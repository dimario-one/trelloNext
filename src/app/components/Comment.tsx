import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { CommentProps } from "../interfaces/AppInterfaces";
import {
  handleDeleteComment,
  handleEditComment,
} from "../utils/HelperFunctions";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../store/actions";
import Popup from "./Popup";

export default function Comment(props: CommentProps) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const commentRef = useRef<HTMLInputElement | null>(null);
  function removeComment() {
    const array = handleDeleteComment(
      props.data.columnData,
      props.data.columnId,
      props.data.cardId,
      props.data.item.id
    );
    dispatch(deleteComment(array));
  }

  function handleClose() {
    setIsShow(false);
  }

  function showPopup() {
    setIsShow(true);
  }

  function commentEdit() {
    if (commentRef.current) {
      const array = handleEditComment(
        props.data.columnData,
        props.data.columnId,
        props.data.cardId,
        {
          id: props.data.item.id,
          author: props.data.userName,
          text: commentRef.current.value,
        }
      );
      dispatch(editComment(array));
    }
    handleClose();
  }

  return (
    <>
      <div className="card border border-info-subtle p-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <p className="small mb-0 ms-2">{props.data.item.author}</p>
          </div>
          <div className="d-flex flex-row align-items-center">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                removeComment();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                showPopup();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          </div>
        </div>
        <span className="">{props.data.item.text}</span>
      </div>

      <Popup>
        <Modal show={isShow} onHide={() => handleClose()}>
          <Modal.Header>
            <Modal.Title>Редактирование коментария</Modal.Title>
            <button className="border-0 bg-white" onClick={() => handleClose()}>
              <span className="fs-4">×</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              id="nameInput"
              placeholder="коментарий"
              ref={commentRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={commentEdit}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
    </>
  );
}


