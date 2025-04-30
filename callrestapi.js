var url = "https://users-mysql-backend.onrender.com/api/bikes";

function postBike() {
  var brand = $('#brand').val().trim();
  var model = $('#model').val().trim();
  var price = parseFloat($('#price').val().trim());
  var description = $('#description').val().trim();

  if (!brand || !model || isNaN(price)) {
    alert('⚠️ Brand, Model and Price are required!');
    return;
  }

  var bike = {
    brand,
    model,
    price,
    description: description || null
  };

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(bike),
    success: function () {
      getBikes();
    },
    error: function () {
      alert('❌ Error al guardar bicicleta');
    }
  });
}

function getBikes() {
  $.getJSON(url, function (response) {
    var bikes = Array.isArray(response) ? response : response.bikes;

    var html = `
      <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 1em;">
        <thead style="background-color: #f0f0f0;">
          <tr>
            <th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Description</th>
          </tr>
        </thead><tbody>`;

    bikes.forEach(function (b) {
      html += `
        <tr>
          <td>${b.id}</td>
          <td>${b.brand || '-'}</td>
          <td>${b.model || '-'}</td>
          <td>${b.price || '-'}</td>
          <td>${b.description || '-'}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    $('#resultado').html(html);
  }).fail(function () {
    alert('❌ Error al obtener bicicletas');
  });
}
