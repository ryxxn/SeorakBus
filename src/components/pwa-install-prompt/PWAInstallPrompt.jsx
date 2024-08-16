import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { bindClassNames } from '@/utils';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // 설치
        } else {
          // 설치 안 함
        }

        setDeferredPrompt(null);
      });
    }
  };

  const [isScrolled, setIsScrolled] = useState(true); // 스크롤 상태를 관리하는 상태 변수

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 위치가 이전 스크롤 위치보다 작으면 스크롤 내리는 것으로 판단
      setIsScrolled(currentScrollY < lastScroll);
      // 마지막 스크롤 위치 저장
      lastScroll = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {deferredPrompt && (
        <div
          className={cn('pwaInstallPrompt', isScrolled ? 'visible' : 'hidden')}
        >
          <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
          <p onClick={handleInstallClick}>홈 화면에 바로가기 추가</p>
          <GrClose
            onClick={() => setDeferredPrompt(false)}
            style={{ color: 'black', width: '44px' }}
          />
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
