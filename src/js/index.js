var BScroll = new BScroll('.list', {
    scrollX: true,
    click: true,
    probeType: 2
});
$.ajax({
    url: '/list',
    success: function(res) {
        var res = JSON.parse(res);
        var html = '';
        res.forEach(function(file) {
            html += '<li><a href="javascript:void(0)">' + file.tit + '</a></li>';
        })

        $('ul').html(html);
        $('.list ul li').on('click', 'a', function() {
            $(this).addClass('active').parent().siblings().children().removeClass('active');
        })
    }
})