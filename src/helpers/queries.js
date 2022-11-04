// const URL = "http://localhost:4000/apitareas/tareas"; //Json-server
const URL = process.env.REACT_APP_API_TAREAS;
console.log(URL)

export const consultarAPI = async () => {
  try {
    const respuesta = await fetch(URL);
    const listaTareas = await respuesta.json();
    return listaTareas;
  } catch (error) {
    console.log(error);
  }
};

export const crearTareaAPI = async (producto) => {
  try {
    const respuesta = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarTareaAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
