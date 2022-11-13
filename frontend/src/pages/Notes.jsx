import { useState } from 'react';
import { useNotesContext } from '../hooks/useNotesContext';
import useFetch from '../hooks/useFetch';

import NotesDetails from '../component/NotesDetails';
import Loading from '../component/Loading';

import Searchbar from '../component/Searchbar'

const Notes = () => {
    const { notes, dispatch, isPending, error, setLoading, setError } = useNotesContext();
    const [popup, setPopup] = useState(false);
    const url = '/api/tasks';

    // <-- Unimplemented popup -->
    const togglePopup = () => {
        setPopup(!popup);
    }

    useFetch({ url, dispatch, setError, setLoading, type: 'GET_NOTES' });

    return (
        <div className="p-7 h-screen">
            <div className="container p-12 mx-auto">
                <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Write your note here! 📝</h1>
                <div className='justify-between flex'>
                    <button type="button" className="button mb-5" onClick={togglePopup}>Add Notes +</button>
                    <Searchbar/>
                </div>
                {error && <div>Somehing error is occured 🙀</div>}
                {isPending && <Loading />}
                {notes && <div className="mb-5 flex flex-wrap">{notes.map(note => (
                    <NotesDetails key={note._id} note={note} />
                ))}</div>}
            </div>
        </div>
    );
}

export default Notes;