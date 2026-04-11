document.addEventListener("DOMContentLoaded", () => {
    const voteTopicButtons = document.querySelectorAll(".vote-topic-btn");
    const voteLinkButtons = document.querySelectorAll(".vote-link-btn");

    const reorderList = (listItem) => {
        const ul = listItem.parentElement;
        const items = Array.from(ul.children);
        items.sort((a, b) => {
            const votesA = parseInt(a.querySelector("span")?.innerText.replace("Votos: ", "")) || 0;
            const votesB = parseInt(b.querySelector("span")?.innerText.replace("Votos: ", "")) || 0;
            return votesB - votesA;
        });
        items.forEach(item => ul.appendChild(item));
    };

    voteTopicButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topicId = button.dataset.id;
            fetch(`/topics/${topicId}/vote`, { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    const voteSpan = document.getElementById(`topic-votes-${topicId}`);
                    if (voteSpan) {
                        voteSpan.innerText = `Votos: ${data.votes}`;
                        voteSpan.classList.add("voted-success");
                        reorderList(button.closest(".topic"));
                    }
                })
                .catch(error => {
                    console.error("Error al votar el tema:", error);
                });
        });
    });

    voteLinkButtons.forEach(button => {
        button.addEventListener("click", () => {
            const linkId = button.dataset.id;
            const topicId = button.dataset.topicId;
            fetch(`/topics/${topicId}/links/${linkId}/vote`, { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    const voteSpan = document.getElementById(`vote-count-${linkId}`);
                    if (voteSpan) {
                        voteSpan.innerText = `Votos: ${data.votes}`;
                        voteSpan.classList.add("voted-success");
                        reorderList(button.closest(".link"));
                    }
                })
                .catch(error => {
                    console.error("Error al votar el enlace:", error);
                });
        });
    });
});