import { ColumnProps, CardType } from "../interfaces/AppInterfaces";

export function generateSimpleId(): string {
  return (Math.random() * 1e32).toString(36).slice(0, 9);
}

export const handleCreateCard = (
  arr: ColumnProps[],
  id: number,
  obj: CardType
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  return _array.map((item: { id: number; cards: CardType[] }) => {
    if (item.id === id) {
      item.cards.push(obj);
    }
    return item;
  });
};

export const handleEditCard = (
  arr: ColumnProps[],
  idColumn: number,
  newValue: CardType
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  const _newArray = _array.map((item: { id: number; cards: CardType[] }) => {
    const columnIndex = arr.findIndex((col) => col.id === idColumn);
    if (columnIndex !== -1) {
      const cardIndex = item.cards.findIndex((card) => card.id === newValue.id);
      if (cardIndex !== -1) {
        item.cards[cardIndex] = newValue;
        return item;
      }
    }
    return item;
  });

  return _newArray;
};

export const handleChangeColumnName = (
  arr: ColumnProps[],
  id: number,
  name: string
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  return _array.map((item: { id: number; name: string; cards: CardType[] }) => {
    if (item.id === id) {
      item.name = name;
    }
    return item;
  });
};

export const handleCardDelete = (
  arr: ColumnProps[],
  idColumn: number,
  idCard: string
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  return _array.map((item: { id: number; name: string; cards: CardType[] }) => {
    if (item.id === idColumn) {
      item.cards = item.cards.filter((item) => item.id !== idCard);
    }
    return item;
  });
};

export const handleCreateComment = (
  arr: ColumnProps[],
  idColumn: number,
  idCard: string,
  comment: {
    id: string;
    author: string;
    text: string;
  }
) => {
  const _array = JSON.parse(JSON.stringify(arr));

  _array.forEach((item: { id: number; cards: CardType[] }) => {
    const columnIndex = arr.findIndex((col) => col.id === idColumn);

    if (columnIndex !== -1) {
      const cardIndex = item.cards.findIndex((card) => card.id === idCard);
      if (cardIndex !== -1) {
        _array[columnIndex].cards[cardIndex].comments.push(comment);
      }
    }
  });

  return _array;
};

export const handleDeleteComment = (
  arr: ColumnProps[],
  idColumn: number,
  idCard: string,
  commentId: string
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  _array.forEach((item: { id: number; cards: CardType[] }) => {
    const columnIndex = arr.findIndex((col) => col.id === idColumn);

    if (columnIndex !== -1) {
      const cardIndex = item.cards.findIndex((card) => card.id === idCard);
      if (cardIndex !== -1) {
        _array[columnIndex].cards[cardIndex].comments = _array[
          columnIndex
        ].cards[cardIndex].comments.filter(
          (item: { id: string }) => item.id !== commentId
        );
      }
    }
  });

  return _array;
};

export const handleEditComment = (
  arr: ColumnProps[],
  idColumn: number,
  idCard: string,
  comment: {
    id: string;
    author: string;
    text: string;
  }
) => {
  const _array = JSON.parse(JSON.stringify(arr));
  _array.forEach((item: { id: number; cards: CardType[] }) => {
    const columnIndex = arr.findIndex((col) => col.id === idColumn);
    if (columnIndex !== -1) {
      const cardIndex = item.cards.findIndex((card) => card.id === idCard);
      if (cardIndex !== -1) {
        _array[columnIndex].cards[cardIndex].comments = _array[
          columnIndex
        ].cards[cardIndex].comments.map((elem: { id: string }) => {
          if (elem.id === comment.id) {
            elem = { ...comment };
            return elem;
          }
          return elem;
        });
      }
    }
    return item;
  });
  return _array;
};
