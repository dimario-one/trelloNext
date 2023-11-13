"use client"

import Board from "./components/Board";
import { Provider } from "react-redux";
import { makeStore } from "./store/store";

const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={makeStore().store}>
      <Board />
    </Provider>
  );
};

export default Home;

