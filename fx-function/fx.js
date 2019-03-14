/* requestAnimationFrame Polyfill */
/* Polyfill.io 에서 제공하지 않음 */
!function(){for(var n=0,i=["ms","moz","webkit","o"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,e){var a=(new Date).getTime(),o=Math.max(0,16-(a-n)),t=window.setTimeout(function(){i(a+o)},o);return n=a+o,t}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}();

const FX = {
    init : function () {
        const clickEl = document.querySelectorAll('.motion-click');

        Array.from(clickEl).forEach(function (target) {
            target.addEventListener('click', function(e) {
                e.preventDefault();

                const motionData = target.getAttribute('data-motionJS');
                const option = new Array(motionData.split(', '));

                eval('FX.' + option[0] + '(target, 1000)');
                /*if (option[1] != undefined) {
                    // 옵션으로 함수 호출 (duration custom)
                    console.log('1');
                    eval('FX.' + option[0] + '(target, ' + option[1] + ')');
                } else {
                    // 옵션으로 함수 호출 (default)
                    console.log('2');
                    eval('FX.' + option[0] + '(target, 1000)');
                }*/
            });
        });
    },

    animate : function ({timing, draw, duration}) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            let progress = timing(timeFraction)

            draw(progress); // draw it

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    },

    easing : {
        swing: function (timeFraction) {
            return 0.5 - Math.cos(timeFraction * Math.PI) / 2;
        },
        back: function (x, timeFraction) {
            return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
        }
    },

    fade: function (element, options) {
        this.animate({
            duration: options,
            timing: FX.easing.swing.bind(1),
            draw: function (progress) {
                element.style.opacity = progress;
            }
        });
    }
};