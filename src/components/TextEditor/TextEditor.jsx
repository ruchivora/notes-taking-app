import styles from './TextEditor.module.css';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { saveCursorPosition, restoreCursorPosition} from './utils';
import { ALIGNMENT } from '../../constants';

export function TextEditor({handleNoteContentChange, isError, noteContent}) {
  
  const editorRef = useRef(null); 
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [alignment, setAlignment] = useState('');

  useEffect(() => {
    if (editorRef.current && noteContent !== undefined) {
      const cursorPosition = saveCursorPosition(editorRef);
      editorRef.current.innerHTML = noteContent; 
      if (cursorPosition !== null) {
        restoreCursorPosition(cursorPosition, editorRef);
      }
    }
  }, [noteContent]);

  const handleBold = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('bold', false, null);
      setIsBoldActive(!isBoldActive);
    }
  };

  const handleItalic = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('italic', false, null);
      setIsItalicActive(!isItalicActive);
    }
  };

  const handleUnderline = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('underline', false, null);
      setIsUnderlineActive(!isUnderlineActive);
    }
  };

  const handleTextAlign = (alignment) => {
    setAlignment(alignment)
    if (editorRef.current) {
      document.execCommand('justify' + alignment, false, null);
    }
  };

  const handleInputChange = () => {
    const content = editorRef.current.innerHTML;
    handleNoteContentChange(content)
  };

  return(

    <div className={styles.textEditor}>
      <div className={styles.textEditorToolBar}>

        <button 
          onClick={handleBold} 
          className={isBoldActive ? styles.active : ''}>B</button>

        <button 
          onClick={handleItalic} 
          className={isItalicActive ? styles.active : ''}><i>I</i></button>

        <button 
          onClick={handleUnderline} 
          className={isUnderlineActive ? styles.active : ''}><u>U</u></button>

        {/* Alignment Buttons */}
        <button 
          onClick={() => handleTextAlign(ALIGNMENT.LEFT)}
          className={alignment === ALIGNMENT.LEFT ? styles.active : ''}>Left</button>

        <button 
          onClick={() => handleTextAlign(ALIGNMENT.CENTER)} 
          className={alignment === ALIGNMENT.CENTER ? styles.active : ''}>Center</button>

        <button 
          onClick={() => handleTextAlign(ALIGNMENT.RIGHT)}
          className={alignment === ALIGNMENT.RIGHT ? styles.active : ''}>Right</button>
      </div>

      <div
        ref={editorRef}
        contentEditable="true"
        className={isError ? styles.error : ''}
        style={{minHeight: '200px', padding: '10px', fontSize: '14px', textAlign: alignment}}
        onInput={handleInputChange}
      ></div>
    </div>
  )
}

TextEditor.propTypes = {
  handleNoteContentChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,                     
  noteContent: PropTypes.string.isRequired,
};