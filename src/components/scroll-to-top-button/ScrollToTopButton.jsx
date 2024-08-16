import React from 'react';
import { bindClassNames, scrollToTop } from '../../utils';
import { GoMoveToTop } from 'react-icons/go';
import styles from './styles.module.scss';

const cn = bindClassNames(styles);

const ScrollToTopButton = () => {
  return (
    <button
      className={cn('scrollToTopButton')}
      onClick={() => scrollToTop({ behavior: 'smooth' })}
    >
      <GoMoveToTop size={20} fontWeight={600} />
    </button>
  );
};

export default ScrollToTopButton;
