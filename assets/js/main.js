// function to handle active navigation tab
$(".nav-link").on("click", function () {
    $(".nav-link.active").removeClass("active");
    $(this).addClass("active");
});

// script to handle scrolling changes to the navigation bar for the logo
$(window).scroll(function () {
    var top_of_element = $("#home-header").offset().top;
    var bottom_of_element = $("#home-header").offset().top + $("#home-header").outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    if (bottom_of_screen > top_of_element && top_of_screen < bottom_of_element) {
        // when the header logo is visible, hide the navbar logo
        $("#navbar-brand-logo").hide();
    } else {
        // when the header logo is not visible, show the navbar logo
        $("#navbar-brand-logo").show();
    }
});