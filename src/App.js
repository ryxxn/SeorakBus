import './App.scss';
import { Header, Footer } from '@/layouts';
import { KakaoAdfit, CoupangAds } from '@/components/ads';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { BusListSection, RealTimeInfoSection, StationInfoSection } from '@/sections';

function App() {

  return (
    <div className='container'>
      <Header />

      {/* content */}
      <StationInfoSection />
      <RealTimeInfoSection />
      <BusListSection />

      <ScrollToTopButton />

      {/* ads */}
      <CoupangAds />
      <KakaoAdfit />
      {/* 
        <Adsense
          className="adsbygoogle"
          client={process.env.REACT_APP_ADSENSE_CLIENT}
          slot="9529818426"
          format="auto"
          responsive
        /> 
      */}
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
