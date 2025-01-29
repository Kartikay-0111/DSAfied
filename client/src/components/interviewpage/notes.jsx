import React, { useState } from 'react';
import { X } from 'lucide-react';

const Note = ({ isOpen, onClose}) => {
  const [noteContent, setNoteContent] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-3xl rounded-lg shadow-xl border border-slate-800">
        <div className="flex justify-between items-center p-4 border-b border-slate-800">
          <h2 className="text-xl text-cyan-400">Save Notes</h2>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full h-96 p-4 bg-slate-800 text-gray-200 border border-slate-700 rounded-lg resize-none focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Write your notes here..."
          />
        </div>

        <div className="flex justify-end p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              console.log('Saving note:', noteContent);
              onClose();
            }}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;