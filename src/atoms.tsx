import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

const localData = localStorage.getItem("toDos");

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: localData
    ? JSON.parse(localData)
    : {
        "To Do": [],
        Doing: [],
        Done: [],
      },
});
