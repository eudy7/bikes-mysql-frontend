var url = "https://bikes-mysql-backend.onrender.com/api/bikes";

function postBike() {
  const brand = $('#brand').val().trim();
  const model = $('#model').val().trim();
  const price = $('#price').val().trim();
  const description = $('#description').val().trim();
  const imageFile = $('#image')[0].files[0];

  if (!brand || !model || !price || !description || !imageFile) {
    alert("⚠️ Todos los campos son obligatorios, incluyendo la imagen.");
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
      getBikes();
      $('#bikeForm')[0].reset(); // Limpia el formulario
    },
    error: function () {
      alert("❌ Error al guardar bicicleta");
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
            <th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Description</th><th>Image</th>
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
        </tr>
      `;
    });

    html += `</tbody></table>`;
    $('#resultado').html(html);
  }).fail(() => {
    alert("❌ Error al obtener bicicletas");
  });
}
