// JS puro del cliente: maneja votos y reordenamiento dinámico del DOM

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

  // --- Votos de Topics ---

  // Selecciona todos los botones de votar topics
  const topicVoteBtns = document.querySelectorAll('.vote-btn--topic');

  topicVoteBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const topicId = btn.dataset.id; // obtiene el ID del topic del atributo data
      voteForTopic(topicId, btn);
    });
  });

  // Envía el voto de un topic al servidor y actualiza el DOM
  function voteForTopic(topicId, btn) {
    btn.disabled = true; // deshabilita el botón mientras procesa

    // Llama al endpoint de votación con fetch (sin recargar la página)
    fetch('/vote/topic/' + topicId, { method: 'POST' })
      .then(function (response) {
        return response.json(); // parsea la respuesta como JSON
      })
      .then(function (data) {
        // Actualiza el contador de votos en el DOM
        const countEl = document.getElementById('count-topic-' + topicId);
        if (countEl) {
          countEl.textContent = data.votes; // muestra el nuevo conteo
          animateCount(countEl);            // anima el cambio visual
        }

        // Reordena las tarjetas en el contenedor si estamos en la lista principal
        const container = document.getElementById('topics-container');
        if (container && data.topicsOrder) {
          reorderCards(container, data.topicsOrder, 'topic'); // reordena las cards
        }

        btn.disabled = false; // re-habilita el botón
      })
      .catch(function (err) {
        console.error('Error al votar por el topic:', err);
        btn.disabled = false; // re-habilita aunque haya error
      });
  }

  // --- Votos de Links ---

  // Selecciona todos los botones de votar links
  const linkVoteBtns = document.querySelectorAll('.vote-btn--link');

  linkVoteBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const topicId = btn.dataset.topicId; // ID del topic padre
      const linkId  = btn.dataset.linkId;  // ID del link a votar
      voteForLink(topicId, linkId, btn);
    });
  });

  // Envía el voto de un link al servidor y actualiza el DOM
  function voteForLink(topicId, linkId, btn) {
    btn.disabled = true; // deshabilita el botón mientras procesa

    // Llama al endpoint de votación de links
    fetch('/vote/topic/' + topicId + '/link/' + linkId, { method: 'POST' })
      .then(function (response) {
        return response.json(); // parsea la respuesta como JSON
      })
      .then(function (data) {
        // Actualiza el contador de votos del link
        const countEl = document.getElementById('count-link-' + linkId);
        if (countEl) {
          countEl.textContent = data.votes; // muestra el nuevo conteo
          animateCount(countEl);            // anima el cambio visual
        }

        // Reordena los links en el contenedor
        const container = document.getElementById('links-container');
        if (container && data.linksOrder) {
          reorderCards(container, data.linksOrder, 'link'); // reordena las tarjetas de links
        }

        btn.disabled = false; // re-habilita el botón
      })
      .catch(function (err) {
        console.error('Error al votar por el link:', err);
        btn.disabled = false; // re-habilita aunque haya error
      });
  }

  // --- Función de Reordenamiento del DOM ---

  // Reordena los elementos hijo de un contenedor según un array de IDs
  function reorderCards(container, idsOrder, prefix) {
    idsOrder.forEach(function (id) {
      const card = document.getElementById(prefix + '-' + id); // busca la card por su ID en el DOM
      if (card) {
        container.appendChild(card); // mueve la card al final (preserva el orden del array)
      }
    });
  }

  // --- Animación del Contador ---

  // Aplica una animación CSS breve al elemento del contador
  function animateCount(el) {
    el.classList.add('vote-count--updated');           // agrega la clase de animación
    setTimeout(function () {
      el.classList.remove('vote-count--updated');      // quita la clase al terminar la animación
    }, 600);
  }

});
