import ListaTarea from "./ListaTarea";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const FormularioTarea = () => {
  // aca va la mayoria de la logica
  const [tarea, setTarea] = useState("");
  const [arregloTarea, setArregloTarea] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // no se puede hacer el .push directamente
    setArregloTarea([...arregloTarea, tarea]);
    // limpiar el input
    setTarea('');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <ListaTarea arregloTarea={arregloTarea} ></ListaTarea>
    </div>
  );
};

export default FormularioTarea;
