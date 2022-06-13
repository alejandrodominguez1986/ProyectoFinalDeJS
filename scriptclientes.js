const caja = document.querySelector("#caja");
fetch("./datos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let{index,balance, age, name, email, phone} = element
      caja.innerHTML += `
      <div class="card" id="caja" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Nombre:${name}</h5>
        <p class="card-text">Edad:${age}</p>
        <p class="card-text">$${balance}</p>
        <p class="card-text">Tel:${phone}</p>
        <p class="card-text">Email: ${email}</p>
        <p class="card-text">${index}</p>
        <button id="agregar${index}">Seleccionar cliente</button>
      </div>
    </div>
     `;
    });
    let btns = document.querySelectorAll(".btn");
    btns.forEach((e) =>
      e.addEventListener("click", () => console.log("click"))
    );
  });
