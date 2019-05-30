import * as easing from "OLD/es6-module/easing";

export default function (element, options) {
    let cfg = {
        type: 'fade',
        easing: 'easeLinear',
        duration: '1000'
    };

    if('undefined' !== typeof options) {
        for(let i in options) {
            if('undefined' !== typeof options[i]) {
                cfg[i] = options[i];
            }
        }
    }

    Array.from(element).forEach(function (target) {
        /*eval('FX.' + cfg.type + '(' + target + ',' + cfg + ')');*/
        FX.fade(target, cfg);
    });

}

const FX = {
    animate : function ({timing, draw, duration}) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            let progress = timing(timeFraction);

            draw(progress); // draw it

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    },

    fade: function (element, options) {
        this.animate({
            duration: options,
            timing: easing.easeLinear(1),
            draw: function (progress) {
                element.style.opacity = progress;
            }
        });
    }
};