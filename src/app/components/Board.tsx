import React, { useRef, useState } from "react";
import styles from "../app.module.css";
import { Button, Modal } from "react-bootstrap";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../interfaces/AppInterfaces";
import Popup from "./Popup";
import { saveUserName } from "../store/actions";

const selectColumnData = (state: any) => {
  return state;
};

export default function Board() {
  const dispatch= useDispatch();
  const [userName, setUserName] = useState("Не указано");
  const [isShow, setIsShow] = useState(true);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const columnData = useSelector(selectColumnData);

  function handleSaveUserName() {
    if (nameRef.current) {
      setUserName(nameRef.current.value);
      dispatch(saveUserName(nameRef.current.value))
    }
    setIsShow(false);
  }

  function handleClose() {
    setIsShow(false);
  }
  return (
    <>
      <div className={`d-flex flex-row gap-3 mb-3 ps-4 pe-4`}>
        {columnData.data.board.map(
          (
            item: { id: number; name: String; cards: CardType[] },
            index: number
          ) => {
            return (
              <Column
                key={`column-${index}`}
                data={{ item, index, userName }}
              />
            );
          }
        )}
      </div>

      <Popup>
        <Modal show={isShow} onHide={() => handleClose()}>
          <Modal.Header>
            <Modal.Title>Введите ваше имя</Modal.Title>
            <button className="border-0 bg-white" onClick={() => handleClose()}>
              <span className="fs-4">×</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              id="nameInput"
              placeholder="Ваше имя"
              ref={nameRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleSaveUserName}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Popup>
    </>
  );
}
