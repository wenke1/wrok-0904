var better = new BScroll(".better");
$.ajax({
    url: "/api/data",
    type: "get",
    async: true,
    success: function(res) {
        var data = JSON.parse(res);
        if (data.code == "1") {
            el(data.mes);
        } else {
            console.error("请求错误");
        }
    }
})

function el(arr) {
    var html = "";
    arr.forEach(function(v) {
        html += `<dl>
                        <dt><img src="${v.img}"></dt>
                        <dd>
                            <p><span><i class="icon iconfont icon-tianmao"></i></span>${v.name}</p>
                            <p><b>￥<span>${v.new_prc}</span><span>${v.old_prc}</span></b><em>${v.sale}</em></p>
                            <p><span></span><span>${v.time}</span></p>
                        </dd>
                    </dl>`;
    })
    $(".list").html(html);
}