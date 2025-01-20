import PropTypes from 'prop-types';
import styles from './NotePasswordProtection.module.css';
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";


export function NotePasswordProtection({isPasswordProtected, passwordError, handlePasswordChange, handlePasswordToggle}) {
  
  return(
    <div className={styles.passwordContainer}>
      <div className={styles.toggle}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isPasswordProtected}
            onChange={handlePasswordToggle}
          />
        </div>
      
        <div className={styles.status}>
          <span>{isPasswordProtected ? <IoLockClosedOutline size={20} /> : <IoLockOpenOutline size={20} />}</span>
          <span>&nbsp; Password Protection</span>
        </div>
      </div>

      {isPasswordProtected && (
        <div className={styles.passwordField}>
          <input
            type={"password"}
            placeholder={"Enter Password"}
            onChange={handlePasswordChange}
            className={passwordError ? styles.error : ''}
          />
        </div>
      )}
    </div>
    
  )
}

NotePasswordProtection.propTypes = {
  isPasswordProtected: PropTypes.bool,  
  passwordError: PropTypes.bool,        
  handlePasswordChange: PropTypes.func, 
  handlePasswordToggle: PropTypes.func, 
};