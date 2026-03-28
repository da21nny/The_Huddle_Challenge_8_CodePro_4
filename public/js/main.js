function voteTopic(id) {
    fetch('/topics/' + id + '/vote', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            document.getElementById('votes-topic-' + id).innerText = data.votes;
            sortList('topics-list', 'topic-card');
        });
}

function voteLink(topicId, linkId) {
    fetch('/topics/' + topicId + '/links/' + linkId + '/vote', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            document.getElementById('votes-link-' + linkId).innerText = data.votes;
            sortList('links-list', 'link-card');
        });
}

function sortList(containerId, cardClass) {
    let container = document.getElementById(containerId);
    if (!container) return;
    
    let cards = Array.from(container.getElementsByClassName(cardClass));
    
    cards.sort((a, b) => {
        let spanA = a.querySelector('.vote-count');
        let spanB = b.querySelector('.vote-count');
        let votesA = parseInt(spanA.innerText);
        let votesB = parseInt(spanB.innerText);
        return votesB - votesA;
    });
    
    cards.forEach(card => container.appendChild(card));
}