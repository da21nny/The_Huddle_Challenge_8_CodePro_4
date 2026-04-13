// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // Reordena los elementos de una lista por votos (mayor a menor)
    const reorderList = (list) => {
        const item = Array.from(list.children); // Convierte los hijos de la lista en un array
        item.sort((a, b) => (b.dataset.votes || 0) - (a.dataset.votes || 0)); // Ordena el array por votos
        item.forEach(item => list.appendChild(item)); // Añade los elementos ordenados a la lista
    };

    // Maneja el evento click en los botones de votar
    document.addEventListener('click', async (e) => {
        const button = e.target.closest(".vote-topic-btn, .vote-link-btn"); // Busca el botón más cercano
        if (!button) return; // Si no se encuentra el botón, sale de la función

        const id = button.dataset.id; // Obtiene el id del botón
        const topicId = button.dataset.topicId; // Obtiene el topicId del botón

        const url = topicId ? `/topics/${topicId}/links/${id}/vote` : `/topics/${id}/vote`; // Determina la URL según si es un link o un topic

        const spanId = topicId ? `vote-count-${id}` : `topic-votes-${id}`; // Determina el id del span según si es un link o un topic

        try {
            const response = await fetch(url, { method: 'POST' }); // Envía la solicitud POST
            const data = await response.json(); // Convierte la respuesta en JSON
            const voteSpan = document.getElementById(spanId); // Obtiene el span de votos

            if (voteSpan) {
                voteSpan.innerText = `Votos: ${data.votes}`; // Actualiza el contador de votos

                const listItem = button.closest("li"); // Obtiene el elemento de la lista

                if (listItem) {
                    listItem.dataset.votes = data.votes; // Actualiza los votos del elemento
                    reorderList(listItem.parentElement); // Reordena la lista
                }
            }
        }
        catch (error) {
            console.error("Error al votar:", error); // Muestra el error en la consola
        }
    })
});