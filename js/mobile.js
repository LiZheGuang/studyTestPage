function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
window.onload = function () {
    var htmlcodeInit = '<span class="closeBtn">'
    htmlcodeInit += '<img src="./img/close.png" alt="" />'
    htmlcodeInit += '</span>'
    htmlcodeInit += '<li class="navItem down" data-page="/m-down.html?type=down">'
    htmlcodeInit += '<a href="javascript:;">'
    htmlcodeInit += '<span class="Icon navDown">'
    htmlcodeInit += '<i></i>'
    htmlcodeInit += '</span>'
    htmlcodeInit += '<span class="txt">文库下载</span>'
    htmlcodeInit += '</a>'
    htmlcodeInit += '</li>'
    htmlcodeInit += '<li class="navItem person" data-page="/m-person.html?type=person">'
    htmlcodeInit += '<a href="javascript:;">'
    htmlcodeInit += '<span class="Icon navPerson">'
    htmlcodeInit += '<i></i>'
    htmlcodeInit += '</span>'
    htmlcodeInit += '<span class="txt">个人中心</span>'
    htmlcodeInit += '</a>'
    htmlcodeInit += '</li>'
    htmlcodeInit += '<li class="navItem invest" data-page="/m-invest.html?type=invest">'
    htmlcodeInit += '<a href="javascript:;">'
    htmlcodeInit += '<span class="Icon navInvest">'
    htmlcodeInit += '<i></i>'
    htmlcodeInit += '</span>'
    htmlcodeInit += '<span class="txt">充值兑换</span>'
    htmlcodeInit += '</a>'
    htmlcodeInit += '</li>'
    htmlcodeInit += '<li class="navItem wel" data-page="/m-wel.html?type=wel">'
    htmlcodeInit += '<a href="javascript:;">'
    htmlcodeInit += '<span class="Icon navWel">'
    htmlcodeInit += '<i></i>'
    htmlcodeInit += '</span>'
    htmlcodeInit += '<span class="txt">福利专区</span>'
    htmlcodeInit += '</a>'
    htmlcodeInit += '</li>'
    htmlcodeInit += '<a class="loginout" href="">退出登录</a>'

    $('#navDom').html(htmlcodeInit)
    var urlType = getQueryVariable('type')
    $('.' + urlType).addClass('active')

    $(".navItem").click(function () {
        var page = $(this).attr('data-page')
        window.location = page 
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
    });
    $('.openNav').click(function () {
        $(".nav").removeClass('close')
        $(".nav").addClass('open')
    })
    $('.closeBtn').click(function () {
        $(".nav").removeClass('open')
        $(".nav").addClass('close')
    })
}
