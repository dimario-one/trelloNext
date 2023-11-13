import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CardProps, CardType } from "../interfaces/AppInterfaces";
import {
  handleCardDelete,
  handleCreateComment,
  handleEditCard,
  generateSimpleId,
} from "../utils/HelperFunctions";
import { deleteCard, editCard } from "../store/actions";
import { useDispatch } from "react-redux";
import Popup from "./Popup";
import Comment from "./Comment";

export default function Card(props: CardProps) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  const cardNameRef = useRef<HTMLInputElement | null>(null);
  const cardDescriptionRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLInputElement | null>(null);

  function removeCard() {
    const res = handleCardDelete(
      props.data.columnData,
      props.data.columnId,
      props.data.cardId
    );

    dispatch(deleteCard(res));
  }

  function handleClose(value: number) {
    switch (value) {
      case 1:
        setIsShow(false);
        break;
      case 2:
        setIsAddComment(false);
        break;
      default:
        break;
    }
  }

  function showPopup(value: number) {
    switch (value) {
      case 1:
        setIsShow(true);
        break;
      case 2:
        setIsAddComment(true);
        break;
      default:
        break;
    }
  }

  function addNewValueCard() {
    let result: CardType | undefined;
  
    if (cardNameRef.current && cardDescriptionRef.current) {
      result = {
        ...props.data.item, 
        userName: props.data.item.userName as string, 
        title: cardNameRef.current.value,
        description: cardDescriptionRef.current.value,
      };
    }
  
    return result;
  }
  

  function updateCard() {
    const obj = addNewValueCard();
    if (obj) {
      const updatedArray = handleEditCard(
        props.data.columnData,
        props.data.columnId,
        obj
      );
      dispatch(editCard(updatedArray));
      setIsShow(false);
    } else {
      alert("Нет данных");
    }
  }

  function addNewComment() {
    if (commentRef.current) {
      const newComment: {
        id: string;
        author: string;
        text: string;
      } = {
        id: `${generateSimpleId()}`,
        author: props.data.userName,
        text: commentRef.current.value,
      };

      const updatedCard = handleCreateComment(
        props.data.columnData,
        props.data.columnId,
        props.data.cardId,
        newComment
      );
      dispatch(editCard(updatedCard));
      commentRef.current.value = "";
    }
  }

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
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
            <p className="small mb-0 ms-2">{props.data.item.userName}</p>
          </div>
          <h5 className="card-title mt-3">{props.data.item.title}</h5>
          <p className="card-text">{props.data.item.description}</p>
          <div className="d-flex flex-column"></div>
        </div>
        <div className="d-flex flex-row">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              showPopup(1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pen-fill"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              removeCard();
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
            className="btn btn-light d-flex flex-row align-items-center"
            onClick={() => {
              showPopup(2);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-dots-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <span className="ms-1">{props.data.item.comments.length}</span>
          </button>
        </div>
      </div>
      <Popup>
        <Modal show={isShow} onHide={() => handleClose(1)}>
          <Modal.Header>
            <Modal.Title>Редактирование карточки</Modal.Title>
            <button
              className="border-0 bg-white"
              onClick={() => handleClose(1)}
            >
              <span className="fs-4">×</span>
            </button>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <input
              type="text"
              id="nameInput"
              placeholder="название карточки"
              ref={cardNameRef}
            />
            <input
            className="mt-3"
              type="text"
              id="nameInput"
              placeholder="описание карточки"
              ref={cardDescriptionRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(1)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={updateCard}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
      <Popup>
        <Modal show={isAddComment} onHide={() => handleClose(2)}>
          <Modal.Header>
            <Modal.Title>Коментарии</Modal.Title>
            <button
              className="border-0 bg-white"
              onClick={() => handleClose(2)}
            >
              <span className="fs-4">×</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className=" d-flex flex-rowform-outline mb-4">
              <input
                type="text"
                id="addANote"
                className="form-control"
                placeholder="+ Добавить коментарий"
                ref={commentRef}
              />
              <Button variant="primary ms-1" onClick={addNewComment}>
                Сохранить
              </Button>
            </div>
            <div className="d-flex flex-column gap-2">
              {props.data.item.comments.map((item, index: number) => {
                return (
                  <Comment
                    key={`comment-${index}`}
                    data={{
                      columnData: props.data.columnData,
                      columnId: props.data.columnId,
                      cardId: props.data.cardId,
                      item,
                      index,
                      userName: props.data.userName,
                    }}
                  />
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(2)}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
    </>
  );
}
