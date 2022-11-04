import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTarea = ({ tarea, setTarea }) => {
  return (
    <ListGroup>
      {tarea.map((tarea) => (
        <ItemTarea
          key={tarea._id}
          tarea={tarea}
          setTarea={setTarea}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTarea;
