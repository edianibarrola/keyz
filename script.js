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
      return [
        root,
        getNoteByInterval(root, 4),
        getNoteByInterval(root, 7),
        getNoteByInterval(root, 10),
      ];
    case "maj7":
      return [
        root,
        getNoteByInterval(root, 4),
        getNoteByInterval(root, 7),
        getNoteByInterval(root, 11),
      ];
    case "min7":
      return [
        root,
        getNoteByInterval(root, 3),
        getNoteByInterval(root, 7),
        getNoteByInterval(root, 10),
      ];
    default:
      return [];
  }
}

function visualizeChord() {
  const rootNote = document.getElementById("rootNote").value;
  const chordStyle = document.getElementById("chordStyle").value;

  const notes = getChordNotes(rootNote, chordStyle);

  visualizeOnFretboard(notes);
}

function visualizeOnFretboard(notes) {
  const fretboardDiv = document.querySelector(".fretboard");
  fretboardDiv.innerHTML = ""; // Clear previous visualization

  const strings = ["E", "A", "D", "G", "B", "E"];

  strings.forEach((string, idx) => {
    const stringDiv = document.createElement("div");
    stringDiv.className = "string";

    for (let fret = 0; fret < 13; fret++) {
      const fretDiv = document.createElement("div");
      fretDiv.className = "fret";

      const noteOnThisFret = getNoteByInterval(string, fret);
      const rootNote = document.getElementById("rootNote").value;
      if (notes.includes(noteOnThisFret)) {
        fretDiv.classList.add("highlighted");
        fretDiv.textContent = noteOnThisFret; // Display the note name on the fret

        // Check if this is the root note
        if (noteOnThisFret === rootNote) {
          fretDiv.classList.add("root-note");
        }
      }

      stringDiv.appendChild(fretDiv);
    }

    fretboardDiv.appendChild(stringDiv);
  });
}

// Event Listener for the Button
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("generateSound")
    .addEventListener("click", visualizeChord);
});
