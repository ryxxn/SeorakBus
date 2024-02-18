import React, {Component} from 'react'

export class KakaoAdfit extends Component {


    componentDidMount() {
        let ins = document.createElement('ins');
        let scr = document.createElement('script');
        ins.className = 'kakao_ad_area';
        ins.style = "display:none;";
        scr.async = 'true';
        scr.type = "text/javascript";
        scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '50');
        ins.setAttribute('data-ad-unit', 'DAN-Mq7fiFB2GykErrBV');
        document.querySelector('.adfit').appendChild(ins);
        document.querySelector('.adfit').appendChild(scr);
    }

    render() {

        return (
            <div className="adfit" style={{width:"100%", height:"50px"}} ></div>
        )
    }
}