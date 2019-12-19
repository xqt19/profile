$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});




// Adding more stuff
// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.col-md-6');
var mastheadavatar = document.querySelectorAll('.masthead-avatar');
var topstar = document.querySelectorAll('#topstar');
var gradcap = document.querySelectorAll('#gradcap');
var education = document.querySelectorAll('#education');
var workexperience = document.querySelectorAll('#workexperience');

function loop() {

    Array.prototype.forEach.call(education, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('slideInLeft');
      } else {
        element.classList.remove('slideInLeft');
      }
    });

    Array.prototype.forEach.call(workexperience, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('slideInRight');
      } else {
        element.classList.remove('slideInRight');
      }
    });

    Array.prototype.forEach.call(gradcap, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('slideInRight');
      } else {
        element.classList.remove('slideInRight');
      }
    });

    Array.prototype.forEach.call(topstar, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('slideInLeft');
      } else {
        element.classList.remove('slideInLeft');
      }
    });

    Array.prototype.forEach.call(mastheadavatar, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('bounceInRight');
      } else {
        element.classList.remove('bounceInRight');
      }
    });

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('animated');
        element.classList.add('bounceIn');
      } else {
        element.classList.remove('animated');
        element.classList.remove('bounceIn');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}
