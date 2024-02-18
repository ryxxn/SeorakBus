import React, { useEffect } from "react";

export const Adsense = ({
    className = "adsbygoogle",
    client = "",
    slot = "",
    format = "",
    responsive = "",
    layoutKey = ""
}) => {
    useEffect(() => {
        //production인 경우만 광고 요청
        //어차피 로컬에서는 광고가 표시되지 않는다
        if (process.env.NODE_ENV === "production")
            try {
                const pushAd = () => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        console.log("Advertise is pushed");
                    } catch (e) {
                        console.error(e)
                    }
                }

                let interval = setInterval(() => {
                    // Check if Adsense script is loaded every 300ms
                    if (window.adsbygoogle) {
                        pushAd()
                        // clear the interval once the ad is pushed so that function isn't called indefinitely
                        clearInterval(interval)
                    }
                }, 300)

                return () => {
                    clearInterval(interval)
                }
            } catch (e) {
                console.error("AdvertiseError", e);
            }
    }, []);

    //production이 아닌 경우 대체 컴포넌트 표시
    if (process.env.NODE_ENV !== "production")
        return (
            <div
                style={{
                    background: "transparent",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px",
                    minWidth: "320px"
                }}
            >
                광고 영역
            </div>
        );
    //production인 경우 구글 광고 표시
    return (
        <div>
            <ins
                className={className}
                style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    display: "block",
                    textAlign: "center",
                    minWidth: "320px"
                }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
                data-ad-layout-key={layoutKey}
            />
        </div>
    );
};