import { Init } from '../helper/helper.js';

const Motion = function (...arg) {
    // 기본값
    const plugin = new Init(arg);
    let targetNodes = Init.setTarget(plugin),
        options = Init.setOptions(plugin, {
        /* 기본 설정 시작 */
        'mode' : 'js',
        'type' : null,
        'time' : 1000,
        'aniName' : null,
        'keyframes' : null,
        'keyframesArr' : [],
        'duration' : 1000,
        'handle' : 'click',
        'loop' : false,
        'delay' : 500,
        'styleReset' : false,
        'btnTarget' : null,
        'callback' : null
        /* 기본 설정 끝 */
    });

    /* IE 버전 체크 */
    function get_info_of_IE () {
        let word;
        const agent = navigator.userAgent.toLowerCase();
        let info = {  name: "N/A" , version: -1  };
        if ( navigator.appName == "Microsoft Internet Explorer" ){    // IE old version ( IE 10 or Lower )
            word = "msie ";
        }
        else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:";    // IE 11
        else if ( agent.search( "edge/" ) > -1  ) word = "edge/";        // Microsoft Edge
        else  {
            return info;    // etc. ( If it's not IE or Edge )
        }
        let reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
        if (  reg.exec( agent ) != null  ){
            info.version = parseFloat( RegExp.$1 + RegExp.$2 );
            info.name = ( word == "edge/" ) ? "Edge" : "IE";
        }
        return info;
    }


    /* 공통으로 사용할 부분 시작 */
    // animate 그리기 공통
    const animate = (el, func) => {
        let num = 0;
        let arrNum = 0;
        let start = null;
        let sec = options.time/1000;

        requestAnimationFrame(function animate(time) {
            if (!start) start = time;
            let timeFraction = Math.abs(time - start) / options.time;

            if (timeFraction > sec) timeFraction = sec;

            function timing (timeFraction) {
                let perNum = Number(options.keyframesArr[0][arrNum + 1]);
                let currNum = Number(options.keyframesArr[1][arrNum][1]);
                let nextNum = Number(options.keyframesArr[1][arrNum + 1][1]);
                let section = sec * (perNum / 100);

                if (section < timeFraction) { arrNum++;}
                return ((nextNum - currNum) * timeFraction) + currNum;
            };

            const style = 'opacity:' + (timing(timeFraction / sec));
            console.log(timeFraction, timing(timeFraction));

            func(style);

            if (timeFraction < sec) {
                requestAnimationFrame(animate);
                num++;
                //console.log(time, start, timeFraction, num);
            }else {

            }
        });
    }

    // css 모드 시작
    const goCssMotion = (el) => {
        if (options.loop) {
            setInterval(function() {
                el.classList.add('motion-' + options.type);
                el.style.animationDuration = (options.duration / 1000) + 's';

                setTimeout(function() {
                    el.classList.remove('motion-' + options.type);
                    el.style.cssText = '';
                }, options.duration);
            }, options.duration + options.delay);
        } else {
            el.classList.add('motion-' + options.type);
            el.style.animationDuration = (options.duration / 1000) + 's';

            setTimeout(function() {
                if (options.styleReset === false){
                    el.classList.remove('motion-' + options.type);
                    el.style.cssText = '';
                }
            }, options.delay);
        }
    }

    Array.from(targetNodes).forEach(exec);

    function exec (el, idx, arr) {
        /*
         플러그인 내용 시작
         사용할수 있는 인자
         el : 플러그인 적용할 엘리먼트 (현재)
         arr : 플러그인 적용할 엘리먼트 (전체)
         idx : 현재/전체 인덱스
         options : 사전정의 + 호출시 정의한 옵션 항목들
         dataContainer : 호출시 정의한 데이터셋
         */

        const ieCheck = get_info_of_IE();
        const browserName = ieCheck.name;
        const browserVersion = ieCheck.version;

        const browserText = document.getElementById('browserText');
        browserText.innerHTML = browserName + ' : '+ browserVersion;

        const css = window.document.styleSheets[0]
        css.insertRule(options.aniName, css.cssRules.length);
        css.insertRule(options.keyframes, css.cssRules.length);
        //console.log(css);

        const keyframeArrFn = () => {
            let keyframesCut = options.keyframes.split(/[\{\}]/g);
            keyframesCut.splice(0, 1);
            keyframesCut.splice(keyframesCut.length - 2, 2);
            console.log(keyframesCut)

            options.keyframesArr[0] = [];
            options.keyframesArr[1] = [];

            for (let i = 0; i < keyframesCut.length; i++) {
                let num = i%2;
                if (num === 0) {
                    let extraction = keyframesCut[i].replace(/[^0-9]/g, '');
                    options.keyframesArr[num].push(extraction);
                } else {
                    let extraction = keyframesCut[i].split(/[\:\(\)]/g);
                    options.keyframesArr[num].push(extraction);
                }
            }
            return options.keyframesArr;
        }
        keyframeArrFn();

        if (browserName === 'IE' && browserVersion === 11) {
            if (options.loop === true) {
                animate(el, (progress) => {
                    el.setAttribute('style', progress);
                });
            } else {
                if (options.btnTarget !== null) {
                    let targetBtn = document.querySelector(options.btnTarget);
                    targetBtn.addEventListener(options.handle, function() {
                        animate(el, (progress) => {
                            el.setAttribute('style', progress);
                        });
                    });
                } else {
                    el.addEventListener(options.handle, function() {
                        animate(el, (progress) => {
                            el.setAttribute('style', progress);
                        });
                    });
                }
            }
        } else {
            if (options.loop === true) {
                goCssMotion(el);
            } else {
                if (options.btnTarget !== null) {
                    let targetBtn = document.querySelector(options.btnTarget);
                    targetBtn.addEventListener(options.handle, function() {
                        goCssMotion(el);
                    });
                } else {
                    el.addEventListener(options.handle, function() {
                        goCssMotion(el);
                    });
                }
            }
        }
        /* 플러그인 내용 끝 */
    }
    console.log('options.keyframesArr', options.keyframesArr);
};
export default Motion;