import ListaTarea from "./ListaTarea";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect} from "react";
import Swal from 'sweetalert2/dist/sweetalert2.all'


const FormularioTarea = () => {
  // busco los datos del localStorage
  const tareasLocalStorage = JSON.parse(localStorage.getItem('arregloTareaKey')) || []
  // aca va la mayoria de la logica
  const [tarea, setTarea] = useState("");
  const [arregloTarea, setArregloTarea] = useState(tareasLocalStorage);

  // ciclo de vida del componente
  
  useEffect(()=>{
    // console.log('prueba de ciclo de vida del componente')
    // guardar en localStorage
    localStorage.setItem('arregloTareaKey', JSON.stringify(arregloTarea))
  },[arregloTarea])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(tarea.trim() === ''){
      Swal.fire({
        icon: 'error',
        title: 'No se pudo enviar!',
        text: 'Completa el campo para poder enviar la tarea',
      })
    }else{
      // no se puede hacer el .push directamente
      setArregloTarea([...arregloTarea, tarea]);
      // limpiar el input
      setTarea('');
    }
  };

  const borrarTarea = (nombre)=>{
    let arregloModificado = arregloTarea.filter((item)=>(item !== nombre))
    // actualizo el state
    setArregloTarea(arregloModificado)
  }

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
      <ListaTarea arregloTarea={arregloTarea} borrarTarea={borrarTarea} ></ListaTarea>
    </div>
  );
};

export default FormularioTarea;
