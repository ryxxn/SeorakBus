import React from 'react'
import { KakaoAdfit } from '../../components/Ads/KakaoAdfit'
import { PWAInstallPrompt } from '../../components/PWAInstallPrompt/PWAInstallPrompt'

export const Container = ({ children }) => {
    return (
        <div className="container">
            {children}
            <div style={{ display: 'flex', gap: '64px', padding: '16px' }}>
                <iframe src="https://coupa.ng/cecqhR" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>
                <iframe src="https://coupa.ng/cd4L0R" width="120" height="240" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url"></iframe>
            </div>
            <KakaoAdfit />
            {/* <Adsense
        className="adsbygoogle"
        client="ca-pub-3148170035042702"
        slot="9529818426"
        format="auto"
        responsive={true}
      /> */}
            <PWAInstallPrompt />
            <footer>
                <p>Copyright © dochi</p>
                <address>사이트 문의 : dochi00@gmail.com</address>
            </footer>
        </div>
    )
}
