function voteTopic(id) {
    fetch(`/topics/${id}/vote`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function voteLink(id) {
    fetch(`/links/${id}/vote`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function sortTopics() {
    fetch('/topics/sort', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function sortLinks() {
    fetch('/links/sort', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}