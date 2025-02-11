
fetch("https://www.charlie-marshall.dev/get-url")
    .then(response => response.json())
    .then(data => {
        document.getElementById("yourElement").innerText = data.url;
    })
    .catch(error => console.error("Error fetching URL:", error));

// File Download Button
document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
        fetch("../assets/documents/charlie_marshall.docx")
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "charlie_marshall.docx";
                a.type = 'application/pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
    });

document.addEventListener('DOMContentLoaded', () => {
    const tagFilter = document.getElementById('tag-filter');
    const projectItems = document.querySelectorAll('.project-item');
    console.log(projectItems);

    tagFilter.addEventListener('change', () => {
        const selectedOptions = Array.from(tagFilter.selectedOptions).map(option => option.value);
        const filter = selectedOptions.includes('all') ? ['all'] : selectedOptions;

        projectItems.forEach(item => {
            const itemTags = item.getAttribute('data-tags').split(',');
            const isVisible = filter.includes('all') || filter.some(tag => itemTags.includes(tag));

            item.style.display = isVisible ? 'block' : 'none';
        });
    });
});

// script.js
const phrases = [
    'data engineering',
    'data science',
    'python development',
    'artificial intelligence',
    'machine learning'
];

const swapInterval = 10; // Interval for letter swapping in milliseconds
const changePhraseInterval = 3000; // Interval for changing the entire phrase in milliseconds
const maxSwaps = 150; // Maximum number of swaps per character

let currentPhraseIndex = 0;
let currentPhrase = phrases[currentPhraseIndex];
let displayText = Array(currentPhrase.length).fill(' ').map(getRandomChar).join('');
let swapCounts = Array(currentPhrase.length).fill(0); // Array to keep track of swap counts for each character

const headerText = document.getElementById('header-text');
headerText.textContent = displayText;

function getRandomChar() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789 ';
    return chars[Math.floor(Math.random() * chars.length)];
}

function swapCharacter(index) {
    if (displayText[index] !== currentPhrase[index]) {
        if (swapCounts[index] < maxSwaps) {
            displayText = displayText.substring(0, index) + getRandomChar() + displayText.substring(index + 1);
            swapCounts[index]++;
        } else {
            displayText = displayText.substring(0, index) + currentPhrase[index] + displayText.substring(index + 1);
        }
        headerText.textContent = displayText;
    }
}

function swapLetters() {
    let completed = true;
    for (let i = 0; i < displayText.length; i++) {
        if (displayText[i] !== currentPhrase[i]) {
            swapCharacter(i);
            completed = false;
        }
    }
    if (completed) {
        clearInterval(swapIntervalId);
        setTimeout(changePhrase, changePhraseInterval);
    }
}

function changePhrase() {
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    currentPhrase = phrases[currentPhraseIndex];
    displayText = Array(currentPhrase.length).fill(' ').map(getRandomChar).join('');
    swapCounts = Array(currentPhrase.length).fill(0); // Reset swap counts for the new phrase
    headerText.textContent = displayText;
    swapIntervalId = setInterval(swapLetters, swapInterval);
}

let swapIntervalId = setInterval(swapLetters, swapInterval);

