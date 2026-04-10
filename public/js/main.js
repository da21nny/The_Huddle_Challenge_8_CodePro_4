document.addEventListener("DOMContentLoaded", () => {
    const voteTopicButtons = document.querySelectorAll(".vote-topic-btn");
    const voteLinkButtons = document.querySelectorAll(".vote-link-btn");

    voteTopicButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topicId = button.dataset.id;
            fetch(`/topics/${topicId}/vote`, { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    const voteSpan = document.getElementById(`topic-votes-${topicId}`);
                    if (voteSpan) {
                        voteSpan.innerText = `Votos: ${data.votes}`;
                        voteSpan.classList.add("voted-success"); // Usar clase definida en CSS
                    }
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
                        voteSpan.classList.add("voted-success"); // Usar clase definida en CSS
                    }
                });
        });
    });
});