$(function() {
    $('[data-slideshow]').each(function() {
        var panel = $(this), child = 0, children = panel.children('div');
        children.hide().eq(0).show();
        function change() {
            children.eq(child).fadeOut('slow', function() {
                if (++child % children.length == 0) child = 0;
                children.eq(child).fadeIn('slow');
            });
        }
        setInterval(change, panel.attr('data-slideshow') * 1000);
    });
});
