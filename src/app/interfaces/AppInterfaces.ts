export interface Comment {
  id: string;
  author: string;
  text: string;
}

export interface CommentProps {
  data: {
    columnData: ColumnProps[];
    columnId: number;
    cardId: string;
    item: Comment;
    index: number;
    userName: string;
  }
}

export interface CardProps {
  data: {
    userName: string;
    item: CardType;
    columnData: ColumnProps[];
    columnId: number;
    cardId: string;
  };
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
  userName: string;
}

export interface ColumnProps {
  id: number;
  name: string;
  cards: CardType[];
}


export interface ColumnData {
  data: {
    item: {
      id: number;
      name: String;
      cards: CardType[];
    };
    index: number;
    userName: String;
  };
}

export interface BoardData {
  data: {};
}
