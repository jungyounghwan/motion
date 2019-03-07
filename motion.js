
// 즉시 실행 함수
const motion = (function() {
    return {
        // 클릭 이벤트 실행
        init : function () {
            const clickEl = document.querySelectorAll('.motion-click');

            Array.from(clickEl).forEach(function (target, index, array) {
                target.addEventListener('click', function(event) {
                    motion.el(event, target);
                    /*console.log(target, index, array);*/
                });
            });
        },
        // 기본 옵션 제공
        option : {
            type : '',
            timing : 'ease-in-out',
            duration : '0.5',
            loop : 0
        },
        // motion-type 을 추출 후 addMotion 으로 배열 넘김
        el : function (event, target) {
            const motionEl = target;
            const motionType = motionEl.getAttribute('motion-type');
            const optionArr = new Array(motionType.split(', '));

            motion.addMotion(event, optionArr);
        },
        // option 들을 비교 하여 undefined 일 경우 default option 으로 대체
        addMotion : function (el, option) {
            const addMotionType = function () {
                if (option[0][1] !== null) {
                    return 'motion-' + option[0][1];
                } else {
                    return motion.option.type;
                }
            }

            const addMotionTiming = function () {
                if (option[0][2] !== undefined) {
                    return option[0][2];
                } else {
                    return motion.option.timing;
                }
            }

            const addMotionDuration = {
                durationNum : '',
                durationStyle : function() {
                    if (option[0][3] !== undefined) {
                        addMotionDuration.durationNum = option[0][3];
                    } else {
                        addMotionDuration.durationNum = motion.option.duration;
                    }
                    return 'animation-duration:' + addMotionDuration.durationNum + 's';
                }
            }

            const removeMotion = function () {
                el.target.classList.remove(addMotionType());
                el.target.classList.remove(addMotionTiming());
            }
            /*const addMotionLoop = function () {
             if (motion.el()[0][4] === 'loop') {
             return true;
             } else {
             return false;
             }
             }*/

            // motion 실행
            el.target.classList.add(addMotionType());
            el.target.classList.add(addMotionTiming());
            el.target.setAttribute('style', addMotionDuration.durationStyle());

            // motion 실행 후 실행 시간 이후 리셋
            setTimeout(function() {
                removeMotion();
            }, addMotionDuration.durationNum * 1000);
        }
    }
})();
