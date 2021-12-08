import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import TrashBin from "./Components/TrashCan";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDreagEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    if (destination?.droppableId === "trashBin") {
      // delete toDo
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        sourceCopy.splice(source.index, 1);

        // save to local storage
        localStorage.setItem(
          "toDos",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceCopy,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
        };
      });
      return;
    }

    if (destination?.droppableId === source.droppableId) {
      // 같은 보드내에서 움직임
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);

        // save to local storage
        localStorage.setItem(
          "toDos",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          })
        );

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // 다른 보드로 움직임
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

        // save to local storage
        localStorage.setItem(
          "toDos",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          })
        );

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDreagEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashBin />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
