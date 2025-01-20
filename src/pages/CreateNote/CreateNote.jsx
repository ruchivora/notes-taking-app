import styles from './CreateNote.module.css';
import { NoteForm } from '../../components/NoteForm/NoteForm';

export function CreateNote() {


  return (
    <div className={styles.noteFormContainer}>
      <NoteForm/>
    </div>
  );
}