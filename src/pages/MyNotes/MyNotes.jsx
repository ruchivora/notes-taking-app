import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoteItem } from '../../components/NoteItem/NoteItem';
import { Button } from '../../components/Button/Button';
import { BUTTON_VARIANT } from '../../constants';

export function MyNotes() {

  const navigate = useNavigate();
  const notesList = useSelector((state) => state.notesListReducer.notesList);

  function handleButtonClick() {
    navigate('/createNote');
  }

  return(
    <>
      <Button
        name="+ Create New Note"
        onClick={handleButtonClick}
        variant={BUTTON_VARIANT.SIMPLE}
      />

      {notesList.map((noteItem, index) => {
        return (
          <NoteItem
            key={index}
            noteItem={noteItem} />
        )
      })}
    </>
  )
}