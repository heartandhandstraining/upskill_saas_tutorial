/* global Stripe, $ */
// Document ready function
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn$ = $('#form-signup-btn');
  // Set Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit btn
  submitBtn.click(function(event){
    // Javascript prevent default submission to us behavior.
    event.preventDefault()
    submitBtn.val("Processing").prop('disabled', true);
    
    // Collect credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    // Use Stripe JS library to check for card errors. 
    var error = false;
    
    // Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card appears to be invalid.')
      
    }
    
    // Validate cvc number.
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The credit card appears to be invalid.')
      
    }
    
    // Validate exp date.
    
    if(!Stripe.card.validateExpiry(expMonth, expYear){
      error = true;
      alert('The expiration date appears to be invalid.')
      
    }
      
      if (error) {
      // don't send to Stripe, so customer can fix
      submitBtn.prop('disabled', false).val("Sign Up")
    } else {  
      // Send that info to Stripe and make function to send listed info, so cust can fix 
      Stripe.createToken({
        number: ccNum, cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
        // & define what we will do with card token Stripe will return, defined below
      }, stripeResponseHandler);
    }
    
      return false;
    });
  
  //Stripe will retur a card token
  function stripeResponseHandler(status, response) {
    //what Strip sends back will be converted to this token/id
    var token = response.id;
    // inject it as hidden field to form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Submit form to Rails app.
    theForm.get(0).submit();
    }
});