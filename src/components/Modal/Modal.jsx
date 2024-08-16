import React from 'react';
import styles from './styles.module.scss';
import { bindClassNames } from '@/utils';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

/**
 * Modal 컴포넌트
 * background 클릭해도 닫힘.
 * @param {string} text 내용
 * @param {boolean} isOpen
 * @param {Function} setIsOpen
 */
const Modal = ({
  className,
  isOpen,
  setIsOpen,
  children,
  button,
  closeButton,
  buttonsDirection = 'row',
}) => {
  const backgroundRef = React.useRef(null);

  const handleClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      setIsOpen(false);
    }
  };

  const handleButtonClick = (onClick) => {
    setIsOpen(false);
    onClick();
  };

  return (
    <>
      <div
        className={cn('modalContainer', isOpen ? '' : 'hide', className)}
        ref={backgroundRef}
        onClick={handleClickBackground}
      >
        <div className={cn('modalBox')}>
          {children}
          <div
            className={cn('buttonsBox')}
            style={
              buttonsDirection === 'row'
                ? {}
                : { flexDirection: 'column-reverse' }
            }
          >
            {closeButton && (
              <button
                className={cn('closeButton')}
                onClick={() => handleButtonClick(closeButton.onClick)}
              >
                {closeButton.text}
              </button>
            )}
            {button && (
              <button
                className={cn('normalButton')}
                onClick={() => handleButtonClick(button.onClick)}
              >
                {button.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
