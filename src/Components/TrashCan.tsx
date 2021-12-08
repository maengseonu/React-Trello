import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IBinProps {
  isDraggingOver: Boolean;
}

const Bin = styled.div<IBinProps>`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDraggingOver ? "black" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  position: relative;
  bottom: -200px;
  transform: ${(props) => (props.isDraggingOver ? "scale(1.4)" : "none")};
  transition: all 0.3s ease;
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.2);
  div {
    color: ${(props) => (props.isDraggingOver ? "white" : "black")};
    transform: ${(props) => (props.isDraggingOver ? "scale(1.4)" : "none")};
    transition: all 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
`;

function TrashBin() {
  return (
    <Droppable droppableId="trashBin">
      {(magic, snapshot) => {
        return (
          <Bin
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={faTrashAlt} />
            </IconWrapper>
            {magic.placeholder}
          </Bin>
        );
      }}
    </Droppable>
  );
}

export default TrashBin;
