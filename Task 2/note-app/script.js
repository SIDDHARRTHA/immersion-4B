const noteBoxes = document.getElementById('noteBoxes');
const addBox = document.getElementById('addBox');

function createNoteBox() {
    const box = document.createElement('div');
    box.className = 'note-box';
    box.contentEditable = true;
    box.textContent = 'Write your note here...';

    box.addEventListener('focus', function() {
        if (box.textContent === 'Write your note here...') {
            box.textContent = '';
        }
    });

    box.addEventListener('dblclick', function() {
        box.textContent = '';
    });

    box.addEventListener('click', handleTripleClick);

    noteBoxes.insertBefore(box, addBox);
}

// Triple click handler
function handleTripleClick(e) {
    if (!this._clickCount) this._clickCount = 0;
    this._clickCount++;
    if (this._clickCount === 3) {
        this.remove();
        this._clickCount = 0;
    }
    clearTimeout(this._clickTimer);
    this._clickTimer = setTimeout(() => {
        this._clickCount = 0;
    }, 400);
}

addBox.addEventListener('click', function() {
    const currentNotes = noteBoxes.querySelectorAll('.note-box').length - 1; // exclude add box
    if (currentNotes < 9) { // 3 per row, 3 rows
        createNoteBox();
    }
});