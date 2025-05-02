var url = "https://bikes-mysql-backend.onrender.com/api/bikes";

$(document).ready(function () {
  getBikes();

  $('#getBikesBtn').on('click', getBikes);

  $('#bikeForm').on('submit', function (e) {
    e.preventDefault();
    postBike();
  });

  $('#editForm').on('submit', function (e) {
    e.preventDefault();
    updateBike();
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

    let html = '<div class="card-grid">';
    bikes.forEach(bike => {
      const imgTag = bike.image
        ? `<img src="https://bikes-mysql-backend.onrender.com/uploads/${bike.image}" alt="${bike.model}">`
        : `<div style="height: 160px; background: #eee; display: flex; align-items: center; justify-content: center;">Sin imagen</div>`;

      html += `
        <div class="card">
          ${imgTag}
          <h3>${bike.brand} ${bike.model}</h3>
          <p><strong>Precio:</strong> $${bike.price}</p>
          <p><strong>Descripción:</strong> ${bike.description}</p>
          <div class="actions">
            <button onclick="openEditModal(${bike.id}, '${bike.brand}', '${bike.model}', '${bike.price}', '${bike.description}')">Editar</button>
            <button onclick="deleteBike(${bike.id})">Eliminar</button>
          </div>
        </div>
      `;
    });
    html += '</div>';

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

function openEditModal(id, brand, model, price, description) {
  $('#editId').val(id);
  $('#editBrand').val(brand);
  $('#editModel').val(model);
  $('#editPrice').val(price);
  $('#editDescription').val(description);
  $('#overlay').show();
  $('#editModal').show();
}

function closeModal() {
  $('#overlay').hide();
  $('#editModal').hide();
}

function updateBike() {
  const id = $('#editId').val();
  const brand = $('#editBrand').val();
  const model = $('#editModel').val();
  const price = $('#editPrice').val();
  const description = $('#editDescription').val();

  $.ajax({
    url: `${url}/${id}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ brand, model, price, description }),
    success: function () {
      alert("Bicicleta actualizada");
      closeModal();
      getBikes();
    },
    error: function () {
      alert("Error al actualizar la bicicleta");
    }
  });
}
