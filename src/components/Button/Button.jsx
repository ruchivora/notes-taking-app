import styles from './Button.module.css';
import PropTypes from 'prop-types';
import { BUTTON_VARIANT } from '../../constants';

export function Button({name, onClick, variant}) {

  const buttonClass = `${styles.button} ${styles[`${variant}Button`]}`;

  return(
    <button 
      onClick={onClick}
      className={buttonClass}
    >{name}</button>
  )
}

Button.propTypes = {
  name: PropTypes.string.isRequired,       
  onClick: PropTypes.func.isRequired,      
  variant: PropTypes.oneOf([BUTTON_VARIANT.SIMPLE, BUTTON_VARIANT.GRADIENT, BUTTON_VARIANT.CANCEL])
};