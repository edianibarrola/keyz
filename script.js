const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getNoteByInterval(root, interval) {
    const rootIndex = NOTES.indexOf(root);
    const noteIndex = (rootIndex + interval) % NOTES.length;
    return NOTES[noteIndex];
}

function getChordNotes(root, chordType) {
    switch (chordType) {
        case "maj":
            return [root, getNoteByInterval(root, 4), getNoteByInterval(root, 7)];
        case "min":
            return [root, getNoteByInterval(root, 3), getNoteByInterval(root, 7)];
        case "7":
            return [root, getNoteByInterval(root, 4), getNoteByInterval(root, 7), getNoteByInterval(root, 10)];
        case "maj7":
            return [root, getNoteByInterval(root, 4), getNoteByInterval(root, 7), getNoteByInterval(root, 11)];
        case "min7":
            return [root, getNoteByInterval(root, 3), getNoteByInterval(root, 7), getNoteByInterval(root, 10)];
        default:
            return [];
    }
}

function getScaleNotes(root, scaleType) {
    let intervals = [];
    switch (scaleType) {
        case "major":
            intervals = [0, 2, 4, 5, 7, 9, 11];
            break;
        case "minor":
            intervals = [0, 2, 3, 5, 7, 8, 10];
            break;
        case "dorian":
            intervals = [0, 2, 3, 5, 7, 9, 10];
            break;
        case "blues":
            intervals = [0, 3, 5, 6, 7, 10];
            break;
        default:
            return [];
    }
    return intervals.map(i => getNoteByInterval(root, i));
}


function visualize() {
    const rootNote = document.getElementById("rootNote").value;
    const chordStyle = document.getElementById("chordStyle").value;
    const scaleType = document.getElementById("scaleType").value;
    const instrument = document.getElementById("instrument").value;

    let notes;

    if (scaleType !== "none") {
        notes = getScaleNotes(rootNote, scaleType);
    } else {
        notes = getChordNotes(rootNote, chordStyle);
    }

    visualizeOnFretboard(notes, instrument, rootNote);
}

function visualizeOnFretboard(notes, instrument, rootNote) {
    const fretboardDiv = document.querySelector(".fretboard");
    fretboardDiv.innerHTML = '';

    const strings = instrument === "guitar" ? ['E', 'A', 'D', 'G', 'B', 'E'] : ['E', 'A', 'D', 'G'];

    strings.forEach((string, idx) => {
        const stringDiv = document.createElement("div");
        stringDiv.className = "string";

        for (let fret = 0; fret < 13; fret++) {
            const fretDiv = document.createElement("div");
            fretDiv.className = "fret";

            const noteOnThisFret = getNoteByInterval(string, fret);
            if (notes.includes(noteOnThisFret)) {
                fretDiv.textContent = noteOnThisFret;
                const intervalClass = getIntervalClass(noteOnThisFret, rootNote, notes);
                
                if (intervalClass) {
                    fretDiv.classList.add(intervalClass);
                }
            }

            stringDiv.appendChild(fretDiv);
        }

        fretboardDiv.appendChild(stringDiv);
    });
}

function getIntervalClass(note, root, allNotes) {
    if (note === root) {
        return 'root';
    }
    
    if (!allNotes.includes(note)) {
        return '';
    }

    const noteDiff = (NOTES.indexOf(note) - NOTES.indexOf(root) + NOTES.length) % NOTES.length;
    if (allNotes.includes(note)) {
        switch (noteDiff) {
            case 0:
                return 'root';
            case 2:
                return 'major-second';
            case 3:
                return 'minor-third';
            case 4:
                return 'major-third';
            case 5:
                return 'perfect-fourth';
            case 6:
                return 'diminished-fifth';
            case 7:
                return 'perfect-fifth';
            case 8:
                return 'minor-sixth';
            case 9:
                return 'major-sixth';
            case 10:
                return 'minor-seventh';
            case 11:
                return 'major-seventh';
        }
    }
    return '';
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generateSound").addEventListener("click", visualize);
});