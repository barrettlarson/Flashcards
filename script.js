let numCards = 2;
let cardData = [];
let index = 0;
let flipped = false; 
const text = document.querySelector('.term-def');
const percent = document.querySelector('.percent');
const fraction = document.querySelector('.fraction');

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
    term.className = 'term';
    term.id = numCards + "";
    const definition = document.createElement('textarea');
    definition.placeholder = 'Enter definition';
    definition.className = 'definition';
    definition.id = `${numCards}`;
    const cards = document.querySelector('.cards');

    top.appendChild(num);
    top.appendChild(trash);
    bottom.appendChild(term);
    bottom.appendChild(definition);
    card.appendChild(top);
    card.appendChild(bottom);
    cards.appendChild(card);

    updateLocalStorage();
}

function removeCard(trash) {
    if(numCards > 2) {
        numCards--;
        const card = trash.closest('.card');
        card.remove();
        updateCards();
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const cards = document.querySelectorAll('.card');
    const cardData = Array.from(cards).map(card => {
        return {
            term: card.querySelector('.term').value || '', definition: card.querySelector('.definition').value || ''
        };
    });
    localStorage.setItem('numCards', numCards);
    localStorage.setItem('cardData', JSON.stringify(cardData));
}

function updateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const numberElement = card.querySelector('p');
        const definition = card.querySelector('.definition');
        const term = card.querySelector('.term');
        if(numberElement && definition && term) {
            numberElement.textContent = `${index + 1}.`;
            definition.id = `${(index + 1)}`;
            term.id = `${(index + 1)}`;
        }
    });
}

function init(percentElement, fractionElement, text) {
    percentElement.textContent = `${Math.trunc((1 / numCards) * 100)}%`;
    fractionElement.textContent = `1 of ${numCards}`;
    if(cardData.length > 0) {
        text.textContent = `${cardData[0].term}`;
    } else {
        text.textContent = "No cards available";
    }
}

function constructArrays() {
    const cards = document.querySelectorAll('.card');
    cardData = [];
    cards.forEach((card) => {
        const term = card.querySelector('.term').value || "No term";
        const definition = card.querySelector('.definition').value || "No def";
        cardData.push({term, definition});
    });
}

// On document load
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    if (currentPage.includes("create.html")) {
        initializeCreatePage();
    } else if (currentPage.includes("study.html")) {
        initializeStudyPage();
    }
});

function initializeCreatePage() {
    const createButton = document.querySelector('.create');

    if (createButton) {
        createButton.addEventListener('click', () => {
            const cards = document.querySelectorAll('.card');
            for(let i = 0; i < cards.length; i++) {
                const term = cards[i].querySelector('.term').value.trim();
                const def = cards[i].querySelector('.definition').value.trim();
                
                if(!term || !def) {
                    alert("Please fill out all terms and definitions before proceeding.");
                    return;
                }
            }
            constructArrays();
            localStorage.setItem('cardData', JSON.stringify(cardData));
            localStorage.setItem('numCards', cardData.length);
            window.location.href = 'study.html'; 
        });
    }
    const addButton = document.querySelector('#add-button');
    if(addButton) {
        addButton.addEventListener('click', addCard);
    }
}

function initializeStudyPage() {
    numCards = parseInt(localStorage.getItem('numCards'));
    cardData = JSON.parse(localStorage.getItem('cardData'));
    if (percent && fraction && text) {
        init(percent, fraction, text);
    } else {
        console.error("Required elements not found in the DOM.");
    }
}

function showAnswer(show) {
    if(flipped) {
        text.textContent = `${cardData[index].term}`;
        flipped = false; 
        return; 
    }
    text.textContent = `${cardData[index].definition}`;
    flipped = true;
}

function prevCard(prev) {
    if(index > 0) {
        index--;
        text.textContent = `${cardData[index].term}`;
        flipped = false; 
        percent.textContent = `${Math.trunc(((index + 1)/numCards) * 100)}%`;
        fraction.textContent = `${index + 1} of ${numCards}`;
    }
}

function nextCard(next) {
    if(index < numCards - 1) {
        index++;
        text.textContent = `${cardData[index].term}`;
        flipped = false; 
        percent.textContent = `${Math.trunc(((index + 1)/numCards) * 100)}%`;
        fraction.textContent = `${index + 1} of ${numCards}`;
    }
}






   