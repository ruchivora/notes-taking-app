import styles from './NoteFormAction.module.css';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BUTTON_VARIANT } from '../../constants';

export function NoteFormAction({onSubmit, id}) {

  const navigate = useNavigate();

  return (
    <div className={styles.formActions}>

      <Button
        onClick={onSubmit}
        variant={BUTTON_VARIANT.GRADIENT}
        name={`${id ? 'Update Note' : '+ Add Note'}`}
      />

      <Button 
        onClick={() => navigate('/mynotes')}
        variant={BUTTON_VARIANT.CANCEL}
        name={'Cancel'}
      />
              
    </div>
  )
}

NoteFormAction.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
  id: PropTypes.string.isRequired,
};