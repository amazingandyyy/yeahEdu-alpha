$(document).ready(function() {

    $('.navbar-toggle').click(function() {
        $('.menu-box').toggleClass('open');
    });

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


	
//    $(window).scroll(function() {
//        if ($(document).scrollTop() > 50) {
//            $('.navbar-default').addClass('shrink');
//            $('.navbar-default .navbar-brand').css({
//                'font-size': '1.8em',
//                'color': '#34B3A0',
//                'letter-spacing': '3px'
//            });
//        } else {
//            $('.navbar-default').removeClass('shrink');
//            $('.navbar-default .navbar-brand').css({
//																'font-size': '2.5em',
//																'color': '#1F4056',
//																'letter-spacing': '0px'
//            });
//        }
//    });



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





    //	// Login & Sign up system
    //	var myFirebaseRef = new Firebase("https://yeaheducation2.firebaseio.com");
    //
    //            $('#signupForm').submit(function(event) {
    //                $('.signupForm_error').html('');
    //
    //                event.preventDefault();
    //                if ($('#signup_password').val() === $('#signup_password_confirmed').val()) {
    //                    var $signup_email = $('#signup_email').val();
    //                    var $signup_password = $('#signup_password').val();
    //                    myFirebaseRef.createUser({
    //                        email: $signup_email,
    //                        password: $signup_password
    //                    }, function(error, userData) {
    //                        if (error) {
    //                            $('.signupForm_error').show().html(error);
    //                            event.preventDefault();
    //                        } else {
    //                            console.log("Successfully created user account with uid:", userData.uid);
    //                            $('#logForm').modal('hide');
    //                        }
    //                    });
    //                } else if ($('#signup_password').val() !== $('#signup_password_confirmed').val()) {
    //
    //                    $('#signup_password_confirmed').css({
    //                        'border': '1px red solid'
    //                    });
    //                    $('.signupForm_error').show().html('两个密码不相同! :(');
    //                }
    //            });
    //
    //            $('#loginForm').submit(function(event) {
    //                    $('.signupForm_error').html('');
    //
    //                    event.preventDefault();
    //                    var $login_email = $('#login_email').val();
    //                    var $login_password = $('#login_password').val();
    //                    myFirebaseRef.authWithPassword({
    //                        email: $login_email,
    //                        password: $login_password
    //                    }, function(error, authData) {
    //                        if (error) {
    //                            $('.loginForm_error').show().html(error);
    //                            event.preventDefault();
    //                        } else {
    //                            console.log("Authenticated successfully with payload:", authData);
    //																									$('#logForm').modal('hide');
    //                        }
    //                    });
    //            });
    //	

});

function YeahEducation(fbname) {

    var firebase = new Firebase('https://' + fbname + '.firebaseio.com/');
    this.firebase = firebase;
    var linksRef = firebase.child('links');
    var usersRef = firebase.child('users');
    var instance = this;


    this.login = function(email, password) {
        firebase.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                $('.loginForm_error').show().html(error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $('#logForm').modal('hide');
            }
        });
    };

    this.signup = function(alias, email, password) {
        firebase.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                $('.signupForm_error').show().html(error);
            } else {
                console.log('Successfully created user account with uid:', userData.uid);
                $('#logForm').modal('hide');
                // instance.auth = userData;
                usersRef.child(userData.uid).set({
                    alias: alias
                }, function(error) {
                    if (error) {
                        instance.onError(error);
                    } else {
                        instance.login(email, password);
                    }
                });
            }
        });
    };

    this.logout = function() {
        firebase.unauth();
    };

    // overrideable event functions
    this.onLogin = function(user) {};
    this.onLogout = function() {};
    this.onError = function(error) {
        console.log('Errorrrr:', error);
    };

    //setup long-running firebase listeners 4-3 1:13
    this.start = function() {
        // onAuth is really inportant!!!
        firebase.onAuth(function(authData) {
            if (authData) {
                // usersRef = firebase.child('users');
                // firebase.child('users').child(authData.uid) -->
                usersRef.child(authData.uid).once('value', function(snapshot) {
                    instance.user = snapshot.val();
                    instance.onLogin(instance.user); // extremely important!!!
                });
            } else {
                instance.onLogout();
            }
        });
        // // LinksRef = firebase.child('links')
        //         linksRef.on('value', function(snapshot) {
        //             var links = snapshot.val();
        //             var preparedLinks = [];
        //             for (var url in links) {
        //                 if (links.hasOwnProperty(url)) {
        //                     preparedLinks.push({
        //                         title: links[url].title,
        //                         url: atob(url)
        //                     })
        //                     getSubmitters(url, links[url].users);
        //                 }
        //             }
        //             instance.onLinksChanged(preparedLinks);
        //         });

    };

};


$(document).ready(function() {

    var YE = new YeahEducation('yeaheducation');

    YE.onLogin = function() {
        $('#userMe').fadeIn();
        $('#userlog').hide();
    };

    YE.onLogout = function() {
        $('#userlog').fadeIn();
        $('#userMe').hide();
    };

    $('#userlogout').click(function() {
        YE.logout();
        console.log('Logged out');
        return false;
    });

    $('#loginForm form').submit(function(event) {
        var email = $(this).find('#login_email').val(),
            password = $(this).find('#login_password').val();
        YE.login(email, password);
        return false;
    });

    $('#signupForm form').submit(function(event) {
        var alias = $(this).find('#signup_name').val(),
            email = $(this).find('#signup_email').val(),
            password = $(this).find('#signup_password').val(),
            passwordConfirm = $(this).find('#signup_password_confirmed').val();
        if (password === passwordConfirm) {
            YE.signup(alias, email, password);
            console.log(alias, email, password);
        } else {
            $('#signup_password_confirmed').css({
                'border': '1px red solid'
            });
            $('.signupForm_error').show().html('两个密码不相同! :(');
        }
        return false;
    });

    YE.start();

});