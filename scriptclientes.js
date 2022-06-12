const formCaja = document.querySelector(".formCaja");
const inputNombre = document.querySelector("#busquedaNombre");
const inputId = document.querySelector("#busquedaId");
const caja = document.querySelector(".caja");

const escucharInputs = () => {
  inputId.oninput = () => {
    inputNombre.value = "";
  };
  inputNombre.oninput = () => {
    inputId.value = "";
  };
};
const buscarPorId = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          console.log(data);
          console.log(caja);
          caja.innerHTML = `<div>
          <img src="${data.image}">
          <h4>${data.name}</h4>
          <p>${data.status}</p>
          </div>`;
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  
  const buscarPorNombre = (nombre) => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
  };
  
  const escucharForm = () => {
    console.log(formCaja);
    formCaja.addEventListener("submit", (e) => {
      e.preventDefault();
      if (inputNombre.value === "") {
        buscarPorId(inputId.value);
      }
      if (inputId.value === "") {
        buscarPorNombre(inputNombre.value);
      }
    });
  };
  
  escucharInputs();
  escucharForm();
  