import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarTareaAPI, consultarAPI } from "../helpers/queries";

const ItemTarea = ({tarea, setTarea}) => {

  const borrarTarea = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar la tarea?",
      text: "No se puede revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTareaAPI(tarea._id).then((respuesta) => {
          if (respuesta.status === 200) {
            consultarAPI().then((respuesta) => {
              setTarea(respuesta);
            });

            Swal.fire(
              "Tarea eliminada!",
              "La tarea fue correctamnete eliminada.",
              "success"
            );
          } else {
            Swal.fire(
              "Se produjo un error!",
              "Intente realizar esta operacion mas tarde.",
              "error"
            );
          }
        });
      }
    });
  };
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {tarea.nombreTarea}
      <Button variant="danger" onClick={borrarTarea}>Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
