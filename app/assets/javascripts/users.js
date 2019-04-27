/* global Stripe, $ */
// Document ready function
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn$ = $('#form-signup-btn');
  // Set Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit btn
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault()
    
    // Collect credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    // Send that info to Stripe and make function to send listed info & define what we will do with
    // card token Stripe will return
  Stripe.createToken({
    number: ccNum, cvc: cvcNum,
    exp_month: expMonth,
    exp_year: expYear
    
  },stripeResponseHandler);
  
  });

  
  // Collect credit card fields.
  // Send that info to stripe.
  // Stripe will return a card token 
  // that we need to inject as hidden field to form
  // Submit form to Rails app.
});