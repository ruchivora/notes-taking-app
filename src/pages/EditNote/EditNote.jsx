import { useParams } from "react-router-dom";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import styles from './EditNote.module.css';
import { useSelector } from 'react-redux';
import { selectNoteById } from '../../store/slices/notesSlice';

export function EditNote() {

  let {id} = useParams();
  const note = useSelector((state) => selectNoteById(state, id));

  return (
    <div className={styles.editNoteWrapper}>
      <NoteForm noteItem={note}/>
    </div>
  );
}