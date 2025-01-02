let numCards = 2;

function addCard(addButton) {
    numCards++;

    const card = document.createElement('div');
    card.className = 'card';

    const top = document.createElement('div');
    top.className = 'top';

    const num = document.createElement('p');
    num.id = 'num';
    num.textContent = numCards + ".";

    const trash = document.createElement('img');
    trash.src = 'images/trash.jpg';
    trash.id = 'trash';
    trash.onclick = () => removeCard(trash);

    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const term = document.createElement('textarea');
    term.placeholder = 'Enter term';
    term.id = 'term';

    const definition = document.createElement('textarea');
    definition.placeholder = 'Enter definition';
    definition.id = 'definition';

    const cards = document.querySelector('.cards');

    top.appendChild(num);
    top.appendChild(trash);

    bottom.appendChild(term);
    bottom.appendChild(definition);

    card.appendChild(top);
    card.appendChild(bottom);
    
    cards.appendChild(card);

}

function removeCard(trash) {
    if(numCards > 2) {
        numCards--;
        const card = trash.closest('.card');
        card.remove();
        updateCards();
    }
}

function updateCards() {
    // TODO: Update number on cards when another card is removed
}
    