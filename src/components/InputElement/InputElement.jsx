import styles from './InputElement.module.css';
import PropTypes from 'prop-types';


export function InputElement({ value='', type='text', onInputChange, isError=false, placeholder='', maxLength=30 }) {
  return(
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder} 
      className={isError ? styles.error : ''}
      onChange={onInputChange}/>
  )
}

InputElement.propTypes = {
  value: PropTypes.string, 
  type: PropTypes.string, 
  onInputChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
