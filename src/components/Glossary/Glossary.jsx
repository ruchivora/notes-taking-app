import styles from './Glossary.module.css';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { BUTTON_VARIANT } from '../../constants';
import { Button } from '../Button/Button';
import { useState, useEffect } from 'react';
import { getGlossaryData, highlightGlossaryTerms, convertHTMLStringToText } from './utils';

export function Glossary({noteContent}) {

  const [plainText, setPlainText] = useState('');
  const [isLoading, setIsloading] = useState();
  const [glosssaryText, setGlossaryText] = useState();

  useEffect(() => {
    const textNote = convertHTMLStringToText(noteContent);
    setPlainText(textNote);
  }, [noteContent])

  async function loadGlossaryContent() {
    setIsloading(true);
    try {
      const glossaryData = await getGlossaryData(plainText)
      const highlightedText = highlightGlossaryTerms(plainText, glossaryData);
      setGlossaryText(highlightedText);
    } catch(error) {
      setGlossaryText(`<div>${error}</div>`)
    }
    
    setIsloading(false);
  }
  
  return(
    <div className={styles.glossaryContainer}>
      <div className={styles.toggleButton}>
        <Button
          variant={BUTTON_VARIANT.GRADIENT}
          name={'Show Glossary'}
          onClick={loadGlossaryContent}
        />
      </div>

      {(glosssaryText || isLoading) && (
        <div className={styles.contentContainer}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>{parse(glosssaryText)}</div>
          )}
        </div>
      )}
    </div>
  )
}

Glossary.propTypes = {
  noteContent: PropTypes.string.isRequired,
};