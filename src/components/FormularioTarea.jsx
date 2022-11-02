import ItemTarea from "./ItemTarea";
import { Form, Button, ListGroup} from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useForm } from "react-hook-form";
import { consultarAPI, crearTareaAPI } from "../helpers/queries";

const FormularioTarea = () => {
  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    consultarAPI().then((respuesta) => {
      setTarea(respuesta);
    });
  }, [tarea]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombreTarea: "",
    },
  });

  const onSubmit = (datos) => {
    crearTareaAPI(datos).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Tarea creada",
          "La tarea fue creada correctamente",
          "success"
        );
        reset();
      } else {
        Swal.fire("Ocurrio un error", "Vuelva a intentarlo mas tarde", "error");
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            {...register("nombreTarea", {
              required: "Este dato es obligatorio",
              minLength: {
                value: 2,
                message: "Debe ingresar como minimo 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe ingresar como maximo 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreTarea?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
            Enviar
          </Button>
      </Form>
        <ListGroup>
      {tarea.map((tarea) => (
        <ItemTarea key={tarea._id} tarea={tarea} setTarea={setTarea}></ItemTarea>
      ))}
    </ListGroup>
    </div>
  );
};

export default FormularioTarea;
