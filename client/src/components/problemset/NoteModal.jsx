import React from 'react';

const NoteModal = ({ note, setNote, saveNote }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Add Note</h3>
        <div className="modal-action flex flex-col">
          <div className='w-full'>
            <textarea 
              id="note" 
              className='h-28 w-full lg:w-10/12 p-2 resize-none' 
              value={note} 
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <form method="dialog" className='w-full'>
            <button 
              className="btn btn-secondary" 
              onClick={saveNote}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default NoteModal;