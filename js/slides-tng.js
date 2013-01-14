$(function() {
    setInterval(function() {
        $('[data-slideshow]').each(function() {
            var panel = $(this), 
                delay = parseInt(panel.attr('data-slideshow'), 10),
                children = panel.children(), 
                data = panel.data('slideshow-state') || {},
                counter = (data.counter || 0) + 1,
                change = !(counter % delay);
            if (!data.init) 
                data.init = children.hide().eq(0).show() && 1;
            if (change) { 
                var child = Math.floor((counter - 1) / delay);
                if (child >= children.length - 1) counter = 0;
                children.eq(child).fadeOut(1500, function() {
                    if (++child >= children.length) child = 0;
                    children.eq(child).fadeIn('slow');
                });
            }
            data.counter = counter;
            panel.data('slideshow-state', data);
        });
    }, 1000);
});
