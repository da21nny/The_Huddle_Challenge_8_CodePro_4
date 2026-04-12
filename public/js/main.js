// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // Reordena los elementos de una lista por votos (mayor a menor)
    const reorderList = (listItem) => {
        const ul = listItem.parentElement; // Obtiene el elemento padre (ul)
        const items = Array.from(ul.children); // Convierte los hijos en un array

        items.sort((a, b) => {
            // Extrae los votos de cada elemento y los convierte a número
            const votesA = parseInt(a.querySelector("span")?.innerText.replace("Votos: ", "")) || 0;
            const votesB = parseInt(b.querySelector("span")?.innerText.replace("Votos: ", "")) || 0;
            return votesB - votesA; // Ordena de mayor a menor
        });

        items.forEach(item => ul.appendChild(item)); // Reordena los elementos
    };

    // Envía voto al servidor, actualiza el DOM y reordena la lista
    const handleVote = (url, spanId, cardSelector, button) => {
        fetch(url, { method: "POST" }) // Envía voto al servidor
            .then(response => response.json()) // Convierte la respuesta a JSON
            .then(data => {
                const voteSpan = document.getElementById(spanId); // Obtiene el span de votos
                if (voteSpan) {
                    voteSpan.innerText = `Votos: ${data.votes}`; // Actualiza los votos
                    voteSpan.classList.add("voted-success"); // Agrega clase de éxito
                    reorderList(button.closest(cardSelector)); // Reordena la lista
                }
            })
            .catch(error => {
                console.error("Error al votar:", error); // Muestra error en consola
            });
    };

    // Listener para votar temas
    document.querySelectorAll(".vote-topic-btn").forEach(button => { // Itera sobre todos los botones de votar temas
        button.addEventListener("click", () => { // Agrega event listener para click
            const topicId = button.dataset.id; // Obtiene el ID del tema
            handleVote(
                `/topics/${topicId}/vote`, // URL para votar
                `topic-votes-${topicId}`, // ID del span de votos
                ".topic", // Selector de la tarjeta
                button // Botón que se hizo click
            );
        });
    });

    // Listener para votar enlaces
    document.querySelectorAll(".vote-link-btn").forEach(button => { // Itera sobre todos los botones de votar enlaces
        button.addEventListener("click", () => { // Agrega event listener para click
            const linkId = button.dataset.id; // Obtiene el ID del enlace
            const topicId = button.dataset.topicId; // Obtiene el ID del tema
            handleVote(
                `/topics/${topicId}/links/${linkId}/vote`, // URL para votar
                `vote-count-${linkId}`, // ID del span de votos
                ".link", // Selector de la tarjeta
                button // Botón que se hizo click
            );
        });
    });
});
