$(document).ready(function() {

    $('.navbar-toggle').click(function() {
        $('.menu-box').toggleClass('open');
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
        window.location.href = "/index.html"
    };

    this.cvVolunteerPost = function(event_name, event_location, event_date, event_host, event_participant, event_doc, event_dairy) {
        var authData = firebase.getAuth();
        usersRef.child(authData.uid)
            .child('Resume')
            .child('volunteer')
            .push({
                event_name: event_name,
                event_location: event_location,
                event_date: event_date,
                event_host: event_host,
                event_participant: event_participant,
                event_doc: event_doc,
                event_dairy: event_dairy
            });
        console.log('clicked cv')
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

                usersRef.child(authData.uid).child('Resume').on('value', function(snapshot) {
                    var volunteerEvents = snapshot.child('volunteer').val();
                    console.log(volunteerEvents);
                    var ResumeOfVolunteer = [];
                    for (var volunteerEvent in volunteerEvents) {
                        ResumeOfVolunteer.push(volunteerEvents[volunteerEvent]);
                    }
                    console.log(ResumeOfVolunteer);
                    instance.onVolunteerChanged(ResumeOfVolunteer);
                });
            } else {
                instance.onLogout();
            }
        });

    };

};


$(document).ready(function() {

    var YE = new YeahEducation('yeaheducation');

    YE.onLogin = function() {
        $('#userlog-y-out').show();
        $('#nav-list-login').show();
        $('#userlog-y').hide();
        $('#nav-list-logout').hide();
    };

    YE.onLogout = function() {
        $('#userlog-y').show();
        $('#nav-list-logout').show();
        $('#nav-list-login').hide();
        $('#userlog-y-out').hide();
    };

    YE.onVolunteerChanged = function(volunteerEvents) {
        $('.resume_list').empty();
        volunteerEvents.map(function(volunteerEvent) {
            console.log('dd');
            var volunteerEventElement = "<div class='resume_item'>" +
                "<name>" + volunteerEvent.event_name + "</name>" +
                "<date>" + volunteerEvent.event_date + "</date>" +
                "<br>" +
                "<location><i class='fa fa-map-marker'></i>&nbsp;" + volunteerEvent.event_location + "</location>" +
                "<organization><i class='fa fa-university'></i>&nbsp;" + volunteerEvent.event_host + "</organization>" +
                "<participant><i class='fa fa-user'></i>&nbsp;" + volunteerEvent.event_participant + "</participant>" +
                "<br>" +
                "<description>" + volunteerEvent.event_dairy + "</description>" + "<button class='resume_edit_tag'>更新信息</button>";
            $('.resume_list').append(volunteerEventElement);
        });
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

    $('#cv_volunteer_form form').submit(function(event) {
        var event_name = $(this).find('#event_name').val(),
            event_location = $(this).find('#event_location').val(),
            event_date = $(this).find('#event_date').val(),
            event_host = $(this).find('#event_host').val(),
            event_participant = $(this).find('#event_participant option:selected').val(),
            event_doc = $(this).find('#event_doc').val(),
            event_dairy = $(this).find('#event_dairy').val();
        console.log('ddd');
        YE.cvVolunteerPost(event_name, event_location, event_date, event_host, event_participant, event_doc, event_dairy);
        console.log(event_name, event_location, event_date, event_host, event_participant, event_doc, event_dairy);
        $('#cv_volunteer_form').find(':input').val('');
        $('#dashboard-more-trigger-div-cv-v').modal('hide');
        return false;
    });

});