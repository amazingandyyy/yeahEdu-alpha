$(document).ready(function() {

    $('header').load('../header.html');
    $('footer').load('../footer.html');
    $('content').load('../welcome.html');

    //    $('#about').click(function() {
    ////        $('content').load('p/about.html');
    //     
    //     console.log('#about clicked');
    //     
    //        $("html, body").animate({
    //            scrollTop: 0
    //        }, 200);
    //        return false;
    //    });


    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.navbar-default').addClass('shrink');
            $('.navbar-default .navbar-brand').css({
                'font-size': '1.8em',
                'color': '#34B3A0',
                'letter-spacing': '3px'
            });
        } else {
            $('.navbar-default').removeClass('shrink');
            $('.navbar-default .navbar-brand').css({
                'font-size': '2.5em',
                'color': '#1F4056',
                'letter-spacing': '0px'
            });
        }
    });

    

    $.getJSON("js/json/advisors.json", function(json) {

        var html = "";

        for (var i = 0; i < 9; i++) {
            var val = json[Math.floor(Math.random() * json.length)];
            html += "<div class='card card-w card-advisor'><div class='profile-img'><img src='" + "css/images/team/advisors/default-profile" + Math.floor(Math.random() * 5 + 1) + ".jpg" + "'/></div><br><h3 class='adviser-name'>" + val.name + "</h3><h5 class='advisor-background'><i class='fa fa-map-marker'></i> " + val.background + "</h5></div>";

        }

        //        json.forEach(function(val) {});

        html += "<a href='#'><div class='card card-advisor-more'><div class='profile-img'><i class='fa fa-hand-peace-o card-advisor-more-i'></i></div><br><h3 class='adviser-name'>选择你的顾问</h3><h5 class='advisor-background'>你的目标学校</h5></div></a>"

        $('.advisor-row').html(html);

    });

    $.getJSON("js/json/team.json", function(json) {

        var html = "";

        for (var i = 0; i < 6; i++) {
            var val = json[i];
            var nameAbbr = val.name.toLowerCase().split(' ');
            html += "<div class='col-xs-12 col-sm-4 team-container'><div class='card-teamMember'><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><div class='profile-innerDiv'><h3>" + val.name + "</h3><p>" + val.introduction + "</p></div><div class='fa fa-share teamMember-more' title='查看更多关于我' data-toggle='modal' data-target='." + nameAbbr.join('-') + "-modal'></div></div><div class='modal fade " + nameAbbr.join('-') + "-modal'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal' aria-label='Close' aria-hidden='true'><span></span><span></span></button><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><p>" + val.story + "</p></div></div></div></div></div>";
        }

     for (var i = 6; i < json.length; i++) {
            var val = json[i];
            var nameAbbr = val.name.toLowerCase().split(' ');
            html += "<div class='col-xs-12 col-sm-3 team-container'><div class='card-teamMember'><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><div class='profile-innerDiv'><h3>" + val.name + "</h3><p>" + val.introduction + "</p></div><div class='fa fa-share teamMember-more' data-toggle='modal' data-target='." + nameAbbr.join('-') + "-modal'></div></div><div class='modal fade " + nameAbbr.join('-') + "-modal'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal' aria-label='Close' aria-hidden='true'><span></span><span></span></button><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><p>" + val.story + "</p></div></div></div></div></div>";
        }
     
        $('.team-row').html(html);
    });


    $('.more-advisor').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });



});