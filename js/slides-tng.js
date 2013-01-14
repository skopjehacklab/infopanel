$(function() {
    $('[data-slideshow]').each(function() {
        var panel = $(this), child = 2, children = panel.children('div');
        children.hide().eq(child).show();
        function change() {
            children.eq(child).fadeOut('slow', function() {
                if (++child % children.length == 0) child = 0;
                children.eq(child).fadeIn('slow');
            });
        }
        setInterval(change, panel.attr('data-slideshow') * 1000);
    });
});
