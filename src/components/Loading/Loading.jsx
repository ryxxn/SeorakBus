import { bindClassNames } from '@/utils';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const Loading = ({ width }) => {
  return <div className={cn('loading')} style={{ width: width }}></div>;
};

export default Loading;
