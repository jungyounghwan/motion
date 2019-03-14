import fx from './fx'; fx();

document.addEventListener('click', function() {
    e.preventDefault();

    fx('.motionJS-click', {
        type: 'fade',
        duration: '1000'
    });
});

