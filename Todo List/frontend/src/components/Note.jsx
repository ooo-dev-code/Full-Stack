import React from 'react';

function Note({ note, onDelete }) {
    return (
        <div style={{ width: "90%", background: "white", padding: "20px", margin: "10px" }}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
}

export default Note;
