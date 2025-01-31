import React from 'react';

const NoteModal = ({ note, setNote, saveNote }) => {
  return (
    <dialog id="problem_note_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Note</h3>
          <textarea
            className="textarea textarea-bordered w-full h-48 mt-4"
            placeholder="Add your notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={saveNote}>Save</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  );
};

export default NoteModal;