import React, { useState } from 'react';
import { useBusListStore } from '@/stores';
import { bindClassNames, displayDayKind } from '@/utils';
import { Modal } from '@/components/modal';
import { DAY_KIND } from '@/constants/day-kind';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const Header = () => {
  const { dayKind, setDayKind } = useBusListStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleDayKindChange = (newDayKind) => {
    setDayKind(newDayKind);
    setIsOpen(false);
  };

  return (
    <>
      <header className={cn('mainHeader')}>
        <h1>
          설악-잠실 버스
          <span className={cn('dayKind')} data-daykind={dayKind}>
            ({displayDayKind(dayKind)})
          </span>
        </h1>
        <button className={cn('dayKindChangeButton')} onClick={handleModalOpen}>
          다른 시간표 보기
        </button>
      </header>

      {/* modal */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={cn('dayKindButtonsBox')}>
          <button
            className={cn('dayKindButton')}
            onClick={() => handleDayKindChange(DAY_KIND.평일)}
            disabled={dayKind === DAY_KIND.평일}
          >
            평일 시간표
          </button>
          <button
            className={cn('dayKindButton')}
            onClick={() => handleDayKindChange(DAY_KIND.토요일공휴일)}
            disabled={dayKind === DAY_KIND.토요일공휴일}
          >
            토요일/공휴일 시간표
          </button>
          <button
            className={cn('dayKindButton')}
            onClick={() => handleDayKindChange(DAY_KIND.일요일)}
            disabled={dayKind === DAY_KIND.일요일}
          >
            일요일 시간표
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Header;
