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
