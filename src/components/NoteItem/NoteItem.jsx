import styles from './NoteItem.module.css';
import PropTypes from 'prop-types';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteFromList } from '../../store/slices/notesSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLockClosedOutline } from "react-icons/io5";
import { verifyPassword } from '../../utils/hashPassword';
import { decryptNoteContent } from '../../utils/crypto';
import parse from 'html-react-parser';
import { Glossary } from '../Glossary/Glossary';


export function NoteItem({ noteItem }) {

  const [showContent, setShowContent] = useState(false);
  const [passwordState, setPasswordState] = useState({password: '', error: false,});
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [note, setNote] = useState(noteItem.note)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  function deleteNote(id) {
    dispatch(deleteFromList(id));
  }

  function toggleShowContent() {
    if (noteItem.isPasswordProtected && !isPasswordVerified) {
      setShowContent(false);
    } else {
      setShowContent(prevState => !prevState);
    }
  }

  function editNote(id) {
    navigate(`/editNote/${id}`);
  }

  function handlePasswordChange(event) {
    setPasswordState({...passwordState, password: event.target.value});
  }

  async function handleVerifyPassword() {
    const isVerified = await verifyPassword(noteItem.password, passwordState.password);

    if(!isVerified) {
      setIsPasswordVerified(false);
      setPasswordState({...passwordState, error: true});
      return;
    } 
    
    setPasswordState({...passwordState, error: false});
    setIsPasswordVerified(true);

    const decryptedNote = await decryptNoteContent(noteItem.note, noteItem.password)
    setNote(decryptedNote);

  }


  return (
    <div className={styles.noteContainer}>

      <div className={styles.noteCard}>
        <div className={styles.noteHeader}>
          <div
            className={styles.noteTitle}
            onClick={toggleShowContent}>{noteItem.title}
          </div>

          {(noteItem.isPasswordProtected && isPasswordVerified) || !noteItem.isPasswordProtected ? (
            <div className={styles.noteActions}>
              <MdOutlineEdit
                size={20}
                style={{color: '#667eea'}}
                onClick={() => editNote(noteItem.id)} 
              />
                &nbsp;&nbsp;
              <MdDeleteOutline
                size={20}
                style={{ color: '#e53e3e' }}
                onClick={() => deleteNote(noteItem.id)} 
              />
            </div> 
          ) : ''}

          {(noteItem.isPasswordProtected && !isPasswordVerified) && (
            <div className={styles.noteActions}>
              <input
                type={"password"}
                placeholder={"Enter Password"}
                onChange={handlePasswordChange}
                className={passwordState.error ? styles.error : ''}
              />
              <IoLockClosedOutline 
                size={20} 
                style={{ color: '#667eea' }}
                onClick={handleVerifyPassword}/>
            </div>
          )}
          
        </div>

        {showContent && (
          <div className={styles.noteContentContainer}>
            <div className={styles.noteContent}>
              {parse(note)}
            </div>
            <Glossary
              noteContent={note}
            />
          </div>

        )}
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  noteItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    isPasswordProtected: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      glossary: PropTypes.array.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}