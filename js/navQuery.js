function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}
var htmlcodeInit = '<li class="logo"><a href="javascript:;"><img src="./img/logo.png" alt=""></a></li>'
htmlcodeInit += '<li class="navItem  down" data-page="/down.html" data-type="down"><a href="javascript:;"><span class="Icon navDown"><i></i></span><span class="txt">文库下载</span></a></li>'
htmlcodeInit += '<li class="navItem person" data-page="/person.html" data-type="person"><a href="javascript:;"><span class="Icon navPerson"><i></i></span><span class="txt">个人中心</span></a></li>'
htmlcodeInit += '<li class="navItem invest" data-page="/invest.html" data-type="invest"><a href="javascript:;"><span class="Icon navInvest"><i></i></span><span class="txt">充值兑换</span></a></li>'
htmlcodeInit += '<li class="navItem wel" data-page="/wel.html" data-type="wel"><a href="javascript:;"><span class="Icon navWel"><i></i></span><span class="txt">福利专区</span></a></li>'

window.onload = function () {
  // 判断是否是移动端
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = "/m-down.html";
  } 
  $('#navLoad').html(htmlcodeInit)
  var urlType = getQueryVariable('type')
  $('.' + urlType).addClass('active')

  $("body .navItem").click(function () {
    console.log($(this).attr('data-page'))
    var page = $(this).attr('data-page')
    var type = $(this).attr('data-type')
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    window.location = page + '?type=' + type
  });
}

