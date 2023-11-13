import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Button, Modal } from "react-bootstrap";
import { ColumnData, CardType } from "../interfaces/AppInterfaces";
import Popup from "./Popup";
import { useSelector, useDispatch } from "react-redux";
import { changeColumnName, createCard } from "../store/actions";
import {
  generateSimpleId,
  handleChangeColumnName,
  handleCreateCard,
} from "../utils/HelperFunctions";

const selectColumnData = (state: any) => {
  return state.data.board;
};

export default function Column(props: ColumnData) {
  const [isShow, setIsShow] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<CardType[]>([]);
  const columnNameRef = useRef<HTMLInputElement | null>(null);
  const cardNameRef = useRef<HTMLInputElement | null>(null);
  const cardDescriptionRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const columnData = useSelector(selectColumnData);

  useEffect(() => {
    setData(props.data.item.cards);
  }, [columnData]);

  function handleSaveColumnName() {
    if (columnNameRef.current) {
      const res = handleChangeColumnName(
        columnData,
        props.data.index,
        columnNameRef.current.value
      );
      dispatch(changeColumnName(res));
      setIsShow(false);
    }
  }

  function handleClose(value: number) {
    switch (value) {
      case 1:
        setIsShow(false);
        break;
      case 2:
        setIsAdd(false);
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
        setIsAdd(true);
        break;
      default:
        break;
    }
  }

  function handleAddNewCard() {
    if (cardNameRef.current && cardDescriptionRef.current) {
      const res = handleCreateCard(columnData, props.data.index, {
        id:  `${generateSimpleId()}`,
        title: `${cardNameRef.current.value}`,
        description: `${cardDescriptionRef.current.value}`,
        comments: [],
        userName:props.data.userName as string,
      });
      dispatch(createCard(res));
    }
    handleClose(2);
  }

  function returnColor() {
    let res;
    switch (props.data.index) {
      case 0:
        res = "border-danger-subtle";

        break;
      case 1:
        res = "border-warning-subtle";

        break;
      case 2:
        res = "border-info-subtle";
        break;
      case 3:
        res = "border-success-subtle";
        break;

      default:
        res = "border-primary-subtle";
        break;
    }
    return res;
  }

  return (
    <>
      <div className={`col border column ps-0 pe-0 mb-5`}>
        <div className={`border-bottom border-5  ${returnColor()} w-100`}>
          <h1
          className="text-center"
            onClick={() => {
              showPopup(1);
            }}
          >
            {props.data.item.name}
          </h1>
          <button
            type="button"
            className="border-0 mt-5 mb-2"
            onClick={() => {
              showPopup(2);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-card-text"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>

        <div className="ps-2 pe-2">
          {data.map((item: CardType, index: number) => {
            return (
              <Card
                key={`card-${index}`}
                data={{
                  item,
                  columnData,
                  columnId: props.data.index,
                  cardId: item.id,
                  userName:props.data.userName as string,
                }}
              />
            );
          })}
        </div>
      </div>

      <Popup>
        <Modal show={isShow} onHide={() => handleClose(1)}>
          <Modal.Header>
            <Modal.Title>Редактирование названия колонки</Modal.Title>
            <button
              className="border-0 bg-white"
              onClick={() => handleClose(1)}
            >
              <span className="fs-4">×</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              id="nameInput"
              placeholder="название колонки"
              ref={columnNameRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(1)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleSaveColumnName}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
      <Popup>
        <Modal show={isAdd} onHide={() => handleClose(2)}>
          <Modal.Header>
            <Modal.Title>Создание карточки</Modal.Title>
            <button
              className="border-0 bg-white"
              onClick={() => handleClose(2)}
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
              className="mt-5"
              type="text"
              id="nameInput"
              placeholder="описание карточки"
              ref={cardDescriptionRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(2)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddNewCard}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
    </>
  );
}
