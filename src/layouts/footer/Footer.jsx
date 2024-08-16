import { bindClassNames } from '@/utils';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const Footer = () => {
  return (
    <footer className={cn('footer')}>
      <p>Copyright © dochi</p>
      <address>사이트 문의 : dochi00@gmail.com</address>
    </footer>
  );
};

export default Footer;
