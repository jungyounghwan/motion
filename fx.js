const FX = {
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