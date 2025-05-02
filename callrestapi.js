var url = "https://bikes-mysql-backend.onrender.com/api/bikes";

$(document).ready(function () {
  getBikes();

  $('#getBikesBtn').on('click', getBikes);

  $('#bikeForm').on('submit', function (e) {
    e.preventDefault();
    postBike();
  });
});

function postBike() {
  const brand = $('#brand').val().trim();
  const model = $('#model').val().trim();
  const price = $('#price').val().trim();
  const description = $('#description').val().trim();
  const imageFile = $('#image')[0].files[0];

  if (!brand || !model || !price || !description || !imageFile) {
    alert("Todos los campos son obligatorios, incluyendo la imagen.");
    return;
  }

  const formData = new FormData();
  formData.append("brand", brand);
  formData.append("model", model);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("image", imageFile);

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function () {
      alert("Bicicleta guardada");
      getBikes();
      $('#bikeForm')[0].reset();
    },
    error: function () {
      alert("Error al guardar bicicleta");
    },
  });
}

function getBikes() {
  $.getJSON(url, function (response) {
    const bikes = Array.isArray(response) ? response : response.bikes;

    let html = `
      <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 1em;">
        <thead>
          <tr>
            <th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Description</th><th>Image</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
    `;

    bikes.forEach(bike => {
      const imgTag = bike.image
        ? `<img src="https://bikes-mysql-backend.onrender.com/uploads/${bike.image}" width="100">`
        : '-';

      html += `
        <tr>
          <td>${bike.id}</td>
          <td>${bike.brand}</td>
          <td>${bike.model}</td>
          <td>$${bike.price}</td>
          <td>${bike.description}</td>
          <td>${imgTag}</td>
          <td>
            <button onclick="editBike(${bike.id})">Editar</button>
            <button onclick="deleteBike(${bike.id})">Eliminar</button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    $('#resultado').html(html);
  }).fail((xhr) => {
    console.error("Error en el GET:", xhr);
    alert("Error al obtener bicicletas");
  });
}

function deleteBike(id) {
  if (!confirm("¿Estás seguro de que deseas eliminar esta bicicleta?")) return;

  $.ajax({
    url: `${url}/${id}`,
    type: "DELETE",
    success: function () {
      alert("Bicicleta eliminada");
      getBikes();
    },
    error: function () {
      alert("Error al eliminar la bicicleta");
    }
  });
}

function editBike(id) {
  const brand = prompt("Nuevo brand:");
  const model = prompt("Nuevo model:");
  const price = prompt("Nuevo price:");
  const description = prompt("Nueva descripción:");

  if (!brand || !model || !price || !description) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  $.ajax({
    url: `${url}/${id}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ brand, model, price, description }),
    success: function () {
      alert("Bicicleta actualizada");
      getB
