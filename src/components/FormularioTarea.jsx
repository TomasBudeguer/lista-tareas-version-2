import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useForm } from "react-hook-form";
import { consultarAPI, crearTareaAPI } from "../helpers/queries";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {
  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    consultarAPI().then((respuesta) => {
      setTarea(respuesta);
    });
  }, []);

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
        consultarAPI().then((respuesta) => {
          setTarea(respuesta);
        });
      } else {
        Swal.fire("Ocurrio un error", "Vuelva a intentarlo mas tarde", "error");
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group
          className="mb-3 row justify-content-center"
          controlId="formBasicEmail"
        >
          <aside className="col-sm-12 col-md-8 col-lg-4">
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
          </aside>
          <aside className="col-sm-12 col-md-4 col-lg-2">
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </aside>
        </Form.Group>
      </Form>
      <ListaTarea tarea={tarea} setTarea={setTarea}></ListaTarea>
    </div>
  );
};

export default FormularioTarea;
