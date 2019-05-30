import { Init } from '../helper/helper.js';
import * as Easing from '../easing/easing.js';

const Motion = function (...arg) {
    // 기본값
    const plugin = new Init(arg);
    let targetNodes = Init.setTarget(plugin),
        options = Init.setOptions(plugin, {
        /* 기본 설정 시작 */
        'mode' : 'js',
        'type' : 'fadein',
        'easing' : 'easeLinear',
        'duration' : 800,
        'distance' : 5,
        'handle' : 'click',
        'loop' : false,
        'delay' : 500,
        'styleReset' : false,
        'btnTarget' : null,
        'callback' : null
        /* 기본 설정 끝 */
    });

    /* 공통으로 사용할 부분 시작 */
    // animate 그리기 공통
    const animate = (el, func) => {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timing = options.easing;
            let timeFraction = (time - start) / options.duration; // timeFraction = 0 ~ 1

            if (timeFraction > 1) timeFraction = 1;

            let progress = Easing[timing](timeFraction, options.distance); // easing 에 의한 계산된 값

            func(progress); // css 그리기
            if(typeof options.callback === 'function') {
                options.callback(progress);
            }

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }else {
                if (options.styleReset === false){
                    el.style.cssText = '';
                }
                if(options.loop) {
                    setTimeout(function() {
                        if(options.loop) {
                            motionType(el, options.type);
                        }
                    }, options.delay);
                }
            }
        });
    }

    // crossBrowser
    const crossStyleTransform = (el, crossStyle) => {
        const agent = navigator.userAgent.toLowerCase();
        if ( (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf("msie") !== -1) ) {
            return el.style.msTransform = (crossStyle);
        }else if (agent.indexOf("chrome") !== -1) {
            return el.style.webkitTransform = (crossStyle);
        }else if (agent.indexOf("safari") !== -1) {
            return el.style.webkitTransform = (crossStyle);
        } else if (agent.indexOf("firefox") !== -1) {
            return el.style.mozTransform = (crossStyle);
        }else {
            return el.style.transform = (crossStyle);
        }
    };

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

    // js 모드 시작
    const motionType = (el, name) => {
        switch (name) {
            case 'fadein':
                animate(el, (progress) => {
                    el.style.opacity = progress;
                });
                break;

            case 'fadeout':
                animate(el, (progress) => {
                    el.style.opacity = 1 - progress;
                });
                break;

            case 'shake':
                animate(el,  (progress) => {
                    el.style.position = 'relative';
                    const drawItem = 'translate(' + progress + 'px, 0)';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'jelly':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    const drawItem = 'scaleX(' + (1 - progress) + ')';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'bounce':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    const drawItem = 'translate(0, ' + progress + 'px)';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'tada':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    const drawItem = 'rotate(' + (1 - progress) + 'deg) scale(' + (1 + Math.abs(progress)/50) + ')';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'groove':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    const drawItem = 'skewY(' + (progress*1.5) + 'deg) rotateZ(' + (-progress) + 'deg)';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'swing':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    el.style.transformOrigin = 'center top';
                    const drawItem = 'rotateZ(' + (-progress) + 'deg)';
                    crossStyleTransform(el, drawItem);
                });
                break;

            case 'squeeze':
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    if (progress < .3) {
                        const drawItem = 'scaleY(' + Math.abs(1 - progress) + ')';
                        crossStyleTransform(el, drawItem);
                    } else {
                        const drawItem = 'scaleY(' + (progress + .5) + ')';
                        crossStyleTransform(el, drawItem);
                    }
                });
                break;

            case 'blink' :
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    if (progress < .25) {
                        const drawItem = 'scale(.95)';
                        crossStyleTransform(el, drawItem);
                    } else if (progress < .5) {
                        const drawItem = 'scale(.97)';
                        crossStyleTransform(el, drawItem);
                    } else if (progress < .75) {
                        const drawItem = 'scale(.93)';
                        crossStyleTransform(el, drawItem);
                    } else {
                        const drawItem = 'scale(1)';
                        crossStyleTransform(el, drawItem);
                    }
                });
                break;

            case 'pop' :
                animate(el, (progress) => {
                    el.style.position = 'relative';
                    if (progress < .20) {
                        const drawItem = 'scaleX(1.35) scaleY(.1)';
                        crossStyleTransform(el, drawItem);
                    } else if (progress < .45) {
                        const drawItem = 'scaleX(1.35) scaleY(.1)';
                        crossStyleTransform(el, drawItem);
                    } else if (progress < .65) {
                        const drawItem = 'scaleX(.8) scaleY(1.7)';
                        crossStyleTransform(el, drawItem);
                    } else if (progress < .80) {
                        const drawItem = 'scaleX(.6) scaleY(.85)';
                        crossStyleTransform(el, drawItem);
                    } else {
                        const drawItem = 'scale(1)';
                        crossStyleTransform(el, drawItem);
                    }
                    //console.log(progress);
                });
                break;

            default :
                alert('선택하신 motion type 은 찾을 수 없습니다.');
                break;
        }
    };

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

        if (options.mode === 'css') { // CSS 모드
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
        } else { // JS 모드
            if (options.loop === true) {
                motionType(el, options.type);
            } else {
                if (options.btnTarget !== null) {
                    let targetBtn = document.querySelector(options.btnTarget);
                    targetBtn.addEventListener(options.handle, function() {
                        motionType(el, options.type, options.loop);
                    });
                } else {
                    el.addEventListener(options.handle, function() {
                        motionType(el, options.type, options.loop);
                    });
                }
            }
        }
        /* 플러그인 내용 끝 */
    }
};
export default Motion;