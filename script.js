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

function visualizeChord() {
    const rootNote = document.getElementById("rootNote").value;
    const chordStyle = document.getElementById("chordStyle").value;
    const instrument = document.getElementById("instrument").value; // Get selected instrument

    const notes = getChordNotes(rootNote, chordStyle);

    visualizeOnFretboard(notes, instrument, rootNote); // Pass the rootNote as a parameter
}

function visualizeOnFretboard(notes, instrument, rootNote) {
    const fretboardDiv = document.querySelector(".fretboard");
    fretboardDiv.innerHTML = ''; // Clear previous visualization

    // Set the strings based on the instrument
    const strings = instrument === "guitar" ? ['E', 'A', 'D', 'G', 'B', 'E'] : ['E', 'A', 'D', 'G'];

    strings.forEach((string, idx) => {
        const stringDiv = document.createElement("div");
        stringDiv.className = "string";

        for (let fret = 0; fret < 13; fret++) {
            const fretDiv = document.createElement("div");
            fretDiv.className = "fret";

            const noteOnThisFret = getNoteByInterval(string, fret);
            if (notes.includes(noteOnThisFret)) {
                fretDiv.textContent = noteOnThisFret; // Display the note name on the fret
                fretDiv.classList.add(getIntervalClass(noteOnThisFret, rootNote));
            }

            stringDiv.appendChild(fretDiv);
        }

        fretboardDiv.appendChild(stringDiv);
    });
}

function getIntervalClass(note, root) {
  const noteDiff = (NOTES.indexOf(note) - NOTES.indexOf(root) + NOTES.length) % NOTES.length;
  switch (noteDiff) {
      case 0:
          return 'root';
      case 3:
          return 'minor-third';
      case 4:
          return 'major-third';
      case 7:
          return 'perfect-fifth';
      case 10:
          return 'minor-seventh';
      case 11:
          return 'major-seventh';
      default:
          return '';
  }
}

// Event Listener for the Button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generateSound").addEventListener("click", visualizeChord);
});
