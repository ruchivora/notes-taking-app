import styles from './NoteForm.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../../models/noteModel';
import { addToList, updateNote } from '../../store/slices/notesSlice';
import { NoteFormAction } from '../NoteFormAction/NoteFormAction';
import { hashPassword } from '../../utils/hashPassword';
import { decryptNoteContent, encryptNoteContent } from '../../utils/crypto';
import { InputElement } from '../InputElement/InputElement'
import { NotePasswordProtection } from '../NotePasswordProtection/NotePasswordProtection';
import { TextEditor } from '../TextEditor/TextEditor';

async function prepareNoteData(isPasswordProtected, password, noteContent, noteTitle, id) {

  let hashedPassword = password;

  if(isPasswordProtected && !id) {
    hashedPassword = await hashPassword(password);
  }

  const encryptedNote = isPasswordProtected ? await encryptNoteContent(noteContent, hashedPassword) : noteContent;

  return {
    title: noteTitle,
    note: encryptedNote,
    isPasswordProtected,
    password: hashedPassword,
  };
}

export function NoteForm({noteItem = {}}) {

  const {title = '', note: content = '', id = ''} = noteItem || {};

  /* States for note title */
  const [titleState, setTitleState] = useState({ value: title, error: false });

  /* States for note content */
  const [contentState, setContentState] = useState({value: content, error: false})

  /* States for password protection */
  const [passwordState, setPasswordState] = useState({
    value: noteItem.password || '',
    error: false,
  });

  const [isPasswordProtected, setIsPasswordProtected] = useState(noteItem.isPasswordProtected);

  /* Hooks */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function decryptNote() {
      if(id && isPasswordProtected) {
        const decryptedNote = await decryptNoteContent(contentState.value, passwordState.value);
        setContentState({value: decryptedNote, error: false})
      }
    }
    decryptNote();
  }, [id, isPasswordProtected, contentState.value, passwordState.value])

  function isNoteValid() {
    let isValid = true;
  
    if (titleState.value.trim() === '') {
      setTitleState((prevState) => ({ ...prevState, error: true }));
      isValid = false;
    }
  
    if (contentState.value.trim() === '') {
      setContentState((prevState) => ({ ...prevState, error: true }));
      isValid = false;
    }
  
    if (isPasswordProtected && passwordState.value.trim() === '') {
      setPasswordState((prevState) => ({ ...prevState, error: true }));
      isValid = false;
    }

    return isValid;
  }
  
  async function onSubmit() {
    if (!isNoteValid()) return;
  
    const noteData = await prepareNoteData(isPasswordProtected, passwordState.value, contentState.value, titleState.value, id);
    const newNote = createNote({ ...noteItem, ...noteData });

    if (id) {
      dispatch(updateNote({ id, note: newNote }));
    } else {
      dispatch(addToList(newNote));
    }
  
    navigate('/mynotes');
  }
  
  function handleNoteTitleChange(event) {
    const title = event.target.value;
    setTitleState({ value: title, error: false });
  }

  function handleNoteContentChange(content) {
    setContentState({value: content, error: false});
  }

  function handlePasswordChange(event) {
    const password = event.target.value.trim();
    setPasswordState({value: password, error: false});
    setIsPasswordProtected(true);
  }

  return(
    <>
      <div className={styles.noteForm}>
        <div className={styles.header}>{`${id ? 'Update Note' : 'Create Note'}`}</div>

        <InputElement 
          type={"text"}
          placeholder={"Note Title"}
          value={titleState.value}
          isError={titleState.error}
          onInputChange={handleNoteTitleChange}
        />

        <TextEditor 
          handleNoteContentChange={handleNoteContentChange}
          isError={contentState.error}
          noteContent={contentState.value}
        />

        {!id && 
          (<NotePasswordProtection
            isPasswordProtected={isPasswordProtected}
            passwordError={passwordState.error}
            handlePasswordChange={handlePasswordChange}
            handlePasswordToggle={(event) => setIsPasswordProtected(event.target.checked)}
          />)} 

        <NoteFormAction
          onSubmit={onSubmit}
          id={id}
        />
      </div>
    </>
  )
}

NoteForm.propTypes = {
  noteItem: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      isPasswordProtected: PropTypes.bool.isRequired,
      password: PropTypes.string.isRequired,
      metadata: PropTypes.shape({
        glossary: PropTypes.array.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }),
    }),
    PropTypes.shape({})
  ]),
};

