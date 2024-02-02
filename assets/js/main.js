// function to handle active navigation tab
$(".nav-link").on("click", function () {
    $(".nav-link.active").removeClass("active");
    $(this).addClass("active");
});

document.cookie = "name=applyForm; SameSite=None; Secure";

// script to handle scrolling changes to the navigation bar for the logo
const displayNavLogo = function () {
    var screenTop = $(window).scrollTop();
    var screenBottom = $(window).scrollTop() + $(window).innerHeight();
    var headerTop = $("#home-header").offset().top;
    var headerBottom = $("#home-header").offset().top + $("#home-header").outerHeight();

    if (screenBottom > headerTop && screenTop < headerBottom) {
        // when the header logo is visible, hide the navbar logo
        $("#navbar-brand-logo").hide();
    } else {
        // when the header logo is not visible, show the navbar logo
        $("#navbar-brand-logo").show();
    }

    var locationSplits = window.location.href.split('/');
    var locationId = locationSplits[locationSplits.length - 1];

    var actualDisplayTop = screenTop + $("#navbar-container").outerHeight();
    if (locationId.startsWith('core.html')) {
        var joinUs = $("#join-us").offset().top;
        $(".nav-link.active").removeClass("active");
        if (actualDisplayTop > joinUs) {
            $("#joinLink").addClass("active");
        }
    } else {
        var about = $("#about").offset().top;
        // var technologyPoll = $("#technology-poll").offset().top;
        var syllabus = $("#syllabus").offset().top;
        var team = $("#team").offset().top;
        var apply = $("#apply").offset().top;
        var labSuggestion = $("#lab-suggestion").offset().top;

        $(".nav-link.active").removeClass("active");
        if (actualDisplayTop > team) {
            $("#teamLink").addClass("active");
        } else if (actualDisplayTop > labSuggestion) {
            $("#labSuggestionLink").addClass("active");
        } else if (actualDisplayTop > apply) {
            $("#applyLink").addClass("active");
        } else if (actualDisplayTop > syllabus) {
            $("#syllabusLink").addClass("active");
            // } else if (actualDisplayTop > technologyPoll) {
            //     $("#technologyPollLink").addClass("active");
        } else if (actualDisplayTop > about) {
            $("#aboutLink").addClass("active");
        }
    }

}
$(document).ready(displayNavLogo);
$(window).scroll(displayNavLogo);

// send apply form data
$("#applyForm").submit((event) => {
    event.preventDefault();
    let applyFormData = {
        first_name: "", // REQUIRED
        last_name: "", // REQUIRED
        umass_email: "", // REQUIRED
        github_link: "",
        linkedin_link: "",
        major: "", // REQUIRED, COMMA-SEPARATED
        graduation_year: 0, // REQUIRED
        interest_response: "", // REQUIRED, answer to "Why are you interested in joining CICSoft?" should be passed
        referral_response: "", // REQUIRED, answer to "How did you hear about us?" should be passed
    }
    applyFormData["first_name"] = $("#applyFirstName").val();
    applyFormData["last_name"] = $("#applyLastName").val();
    applyFormData["umass_email"] = $("#applyEmail").val();
    applyFormData["graduation_year"] = parseInt($("#applyGraduationYear").val());
    [
        "#majorComputerScience",
        "#majorComputerEngineering",
        "#majorMathematics",
        "#majorInformatics",
        "#majorOther"
    ].forEach(major => {
        if ($(major).is(':checked')) {
            if (applyFormData["major"].length === 0) {
                applyFormData["major"] = $(major).val();
            } else {
                applyFormData["major"] = applyFormData["major"].concat(", ", $(major).val());
            }
        }
    })
    applyFormData["github_link"] = `https://github.com/${$("#applyGitHub").val()}`;
    applyFormData["linkedin_link"] = `https://linkedin.com/in/${$("#applyLinkedIn").val()}`;
    applyFormData["interest_response"] = $("#applyQuestion").val();
    applyFormData["referral_response"] = $("[name='applyReferral']:checked").val();

    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    $("#registerToast").toast({ autohide: true, delay: 3000 });

    $("#loading-spinner").addClass('show');
    fetch("https://cicsoft-web-api.onrender.com/user/register", {
        method: "POST",
        body: JSON.stringify(applyFormData),
        headers: requestHeaders,
    })
        .then(response => response.json())
        .then(result => {
            $("#registerToast").removeClass("bg-warning bg-success bg-danger");
            if (result["message"] === "Member registered successfully") {
                $("#registerToast").addClass("bg-success");
                $("#registerToastText").text("You have successfully registered!");
                $("#applyForm").trigger("reset");
            } else if (result["message"] === "Member already registered") {
                $("#registerToast").addClass("bg-warning");
                $("#registerToastText").text("You are already registered with us!");
                $("#applyForm").trigger("reset");
            } else {
                $("#registerToast").addClass("bg-danger");
                $("#registerToastText").text("Something went wrong! Try again later.");
            }
            $("#registerToast").toast("show");
        })
        .catch(error => console.log('error', error))
        .finally(() => {
            $("#loading-spinner").removeClass('show')
        });
});

$('#labSuggestionForm').submit((event) => {
    event.preventDefault();
    let suggestionData = {
        first_name: $("#labSuggestionFirstName").val(), // REQUIRED
        last_name: $("#labSuggestionLastName").val(), // REQUIRED
        email: $("#labSuggestionEmail").val(), // REQUIRED
        idea_text: $("#labSuggestionQuestion").val() // REQUIRED
    }
    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    $("#loading-spinner").addClass('show');
    fetch("https://cicsoft-web-api.onrender.com/lab_ideas", {
        method: "POST",
        body: JSON.stringify(suggestionData),
        headers: requestHeaders
    }).then(response => response.json())
        .then(result => {
            $("#suggestionToast").removeClass("bg-warning bg-success bg-danger");
            if (result["message"] === "Lab idea submitted successfully") {
                $("#suggestionToast").addClass("bg-success");
                $("#suggestionToastText").text(`Thank you for your suggestion!`);
                $("#labSuggestionForm").trigger("reset");
            } else {
                $("#suggestionToast").addClass("bg-danger");
                $("#suggestionToastText").text("Something went wrong! Try again later.");
            }
            $("#suggestionToast").toast("show");
        })
        .catch(error => console.log('error', error))
        .finally(() => {
            $("#loading-spinner").removeClass('show')
        });
});

// send Core Team application form data
$("#joinForm").submit((event) => {
    event.preventDefault();
    let joinFormData = {
        first_name: "", // REQUIRED
        last_name: "", // REQUIRED
        umass_email: "", // REQUIRED
        github_link: "",
        linkedin_link: "",
        team: "", // REQUIRED, COMMA-SEPARATED
        graduation_year: 0, // REQUIRED
        question_1_response: "", // REQUIRED, answer to "Why do you want to join CICSoft's Core Team? What do you expect to gain from this experience?" should be passed
        question_2_response: "", // REQUIRED, answer to "What are some of your skills and experiences that will be beneficial for the team?" should be passed
    }
    joinFormData["first_name"] = $("#joinFirstName").val();
    joinFormData["last_name"] = $("#joinLastName").val();
    joinFormData["umass_email"] = $("#joinEmail").val();
    joinFormData["graduation_year"] = parseInt($("#joinGraduationYear").val());
    [
        "#teamLogistics",
        "#teamSocialMedia",
        "#teamTeaching",
        "#teamUnsure"
    ].forEach(team => {
        if ($(team).is(':checked')) {
            if (joinFormData["team"].length === 0) {
                joinFormData["team"] = $(team).val();
            } else {
                joinFormData["team"] = joinFormData["team"].concat(", ", $(team).val());
            }
        }
    })
    joinFormData["github_link"] = `https://github.com/${$("#joinGitHub").val()}`;
    joinFormData["linkedin_link"] = `https://linkedin.com/in/${$("#joinLinkedIn").val()}`;
    joinFormData["question_1_response"] = $("#joinQuestion1").val();
    joinFormData["question_2_response"] = $("#joinQuestion2").val();

    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    $("#registerToast").toast({ autohide: true, delay: 3000 });

    $("#loading-spinner").addClass('show');
    fetch("https://cicsoft-web-api.onrender.com/core/apply", {
        method: "POST",
        body: JSON.stringify(joinFormData),
        headers: requestHeaders,
    })
        .then(response => response.json())
        .then(result => {
            $("#registerToast").removeClass("bg-warning bg-success bg-danger");
            if (result["message"] === "Candidate applied successfully") {
                $("#registerToast").addClass("bg-success");
                $("#registerToastText").text("You have successfully applied!");
                $("#joinForm").trigger("reset");
            } else if (result["message"] === "Candidate already applied") {
                $("#registerToast").addClass("bg-warning");
                $("#registerToastText").text("You have already applied!");
                $("#joinForm").trigger("reset");
            } else {
                $("#registerToast").addClass("bg-danger");
                $("#registerToastText").text("Something went wrong! Try again later.");
            }
            $("#registerToast").toast("show");
        })
        .catch(error => console.log('error', error))
        .finally(() => {
            $("#loading-spinner").removeClass('show')
        });
});

$('.submit-poll').click((event) => {
    event.preventDefault();
    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    let requestBody = {
        "poll_value": event.target.value
    }

    $('.modal').modal('hide');
    $("#pollToast").toast({ autohide: true, delay: 3000 });

    $("#loading-spinner").addClass('show');
    fetch("https://cicsoft-web-api.onrender.com/technology_poll", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: requestHeaders,
    }).then(response => response.json())
        .then(result => {
            $("#pollToast").removeClass("bg-warning bg-success bg-danger");
            if (result["message"] === "Technology poll submitted successfully") {
                $("#pollToast").addClass("bg-success");
                $("#pollToastText").text(`You have successfully voted for ${event.target.value}!`);
                $("#applyForm").trigger("reset");
            } else {
                $("#pollToast").addClass("bg-danger");
                $("#pollToastText").text("Something went wrong! Try again later.");
            }
            $("#pollToast").toast("show");
        })
        .catch(error => console.log('error', error))
        .finally(() => {
            $("#loading-spinner").removeClass('show')
        });
});

particlesJS(
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#ffffff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8c52ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);