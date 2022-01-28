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

    var actualDisplayTop = screenTop + $("#navbar-container").outerHeight();
    var about = $("#about").offset().top;
    var syllabus = $("#syllabus").offset().top;
    var apply = $("#apply").offset().top;
    var team = $("#team").offset().top;

    if (screenBottom > headerTop && screenTop < headerBottom) {
        // when the header logo is visible, hide the navbar logo
        $("#navbar-brand-logo").hide();
    } else {
        // when the header logo is not visible, show the navbar logo
        $("#navbar-brand-logo").show();
    }

    $(".nav-link.active").removeClass("active");
    if (actualDisplayTop > team) {
        $("#teamLink").addClass("active");
    } else if (actualDisplayTop > apply) {
        $("#applyLink").addClass("active");
    } else if (actualDisplayTop > syllabus) {
        $("#syllabusLink").addClass("active");
    } else if (actualDisplayTop > about) {
        $("#aboutLink").addClass("active");
    }
}
$(document).ready(displayNavLogo);
$(window).scroll(displayNavLogo);

// send form data
$("#applyForm").submit((event) => {
    event.preventDefault();
    let applyFormData = {
        first_name: "", // REQUIRED
        last_name: "", // REQUIRED
        umass_email: "", // REQUIRED
        github_link: "",
        linked_link: "",
        major: "", // REQUIRED, COMMA-SEPARATED
        grad_year: 0, // REQUIRED
        ans: "", // REQUIRED, answer to "Why are you interested in joining CICSoft?" should be passed
        ans2: "", // REQUIRED, answer to "How did you hear about us?" should be passed
        extra_field1: "", // FOR FUTURE (CURRENTLY UNUSED)
        extra_field2: "" // FOR FUTURE (CURRENTLY UNUSED)
    }
    applyFormData["first_name"] = $("#applyFirstName").val();
    applyFormData["last_name"] = $("#applyLastName").val();
    applyFormData["umass_email"] = $("#applyEmail").val();
    applyFormData["grad_year"] = parseInt($("#applyGraduationYear").val());
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
    applyFormData["linked_link"] = `https://linkedin.com/in/${$("#applyLinkedIn").val()}`;
    applyFormData["ans"] = $("#applyQuestion").val();
    applyFormData["ans2"] = $("[name='applyReferral']:checked").val();

    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    fetch("https://cicsoft-web-api.herokuapp.com/userregistration", {
        method: "POST",
        body: JSON.stringify(applyFormData),
        headers: requestHeaders,
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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
                    "color": "#000000"
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
                "color": "#ffffff",
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