import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = (props) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {props.nombreTarea}
      <Button variant="danger">Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
