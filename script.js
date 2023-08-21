document.addEventListener('DOMContentLoaded', () => {
    const rootNoteSelect = document.getElementById('rootNote');
    const chordStyleSelect = document.getElementById('chordStyle');
    const generateSoundButton = document.getElementById('generateSound');
    const fretboard = document.querySelector('.fretboard');
  
    // Initialize Tone.js
    Tone.start();
  
    generateSoundButton.addEventListener('click', updateChordVisualization);
  
    function updateChordVisualization() {
      const selectedRootNote = rootNoteSelect.value;
      const selectedChordStyle = chordStyleSelect.value;
  
      // Use Teoria to calculate chord notes
      const chord = new teoria.Chord(`${selectedRootNote}${selectedChordStyle}`);
      const chordNotes = chord.notes().map(note => note.name());
  
      // Clear the fretboard
      fretboard.innerHTML = '';
  
      // Add chord notes to the fretboard visualization
      chordNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('chord-note');
        noteElement.textContent = note;
        fretboard.appendChild(noteElement);
      });
  
      // Play the chord using Tone.js
      const synth = new Tone.PolySynth().toDestination();
      synth.triggerAttackRelease(chordNotes, '4n');
    }
  });
  