const fs = require('fs');
const chalk = require('chalk');

const getNotes = _ => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log('Nota añadida:', title);
    } else {
        console.log('Titulo de la nota repetido');
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToSave = notes.filter(note => note.title !== title);

    if (notesToSave.length !== 0) {
        saveNotes(notesToSave);
        console.log('Nota eliminada:', title);
    } else {
        console.log('Titulo de la nota no encontrado');
    }
}

const printNotes = _ => {
    const notes = loadNotes();

    notes.map(note => console.log('Nota:', note.title));
}

const readNote = title => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);

    if (noteToRead) {
        console.log(chalk.bold('Titulo de la nota:', noteToRead.title));
        console.log('Descripcion:', noteToRead.body);
    } else {
        console.log(chalk.red('Titulo de la nota no encontrado'));
    }
}

const loadNotes = _ => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    printNotes,
    readNote
};