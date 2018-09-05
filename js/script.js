/*
Set focus on the first text field
When the page first loads, the first text field should be in focus by default.
*/
let $name=$('#name');
$name.first().focus();

/*
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
 */
let selected_option = $('#title option:selected');
// first, hide the input. Only display when other is selected.
$( '#other-title' ).hide();
//next, if option Other is selected, show the input with placeholder="Your JOb Role"
$( '#title' ).change(function() {
    $( "#title option:selected" ).each(function () {
        let title=$(this).text();
        if (title === 'Other'){
            console.log('Other is selected!');
            $( '#other-title' ).show();
        } else{
            $( '#other-title' ).hide();
        }
    });
});

//t-shirts
let colorDiv= $('#colors-js-puns');
colorDiv.hide();

$('#design').change(function () {
    colorDiv.hide();
    $('#color option').hide();
    $("#design option:selected").each(function () {
        let design=$(this).val();
        // if($(this)value==='js puns'){
        if (design === 'js puns'){
            colorDiv.show();
            $('#color option:lt(3)').show();
            //set default matching color
            $('#color').val('cornflowerblue');
        } else if(design==='heart js'){
            colorDiv.show();
            $('#color option:gt(2)').show();
            //set default matching color
            $('#color').val('tomato');
        }
    });
});

/**
 ”Register for Activities” section
 Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop
 at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing
 time slot isn't available.
 When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
 As a user selects activities, a running total should display below the list of checkboxes.
 */

//the total price of registered events. By default, no activity is selected, therefore, it is 0 .
let total=0;
/**
 * function getPrice takes a event name as parameter and return the price of the event
 * @param name
 * @returns {number}
 */
let getPrice= (name) => {
    let price=0;
    switch (name) {
        case 'all':
            price=200;
            break;
        case 'js-frameworks':
            price=100;
            break;
        case 'js-libs':
            price=100;
            break;
        case 'express':
            price=100;
            break;
        case 'node':
            price=100;
            break;
        case 'build-tools':
            price=100;
            break;
        case 'npm':
            price=100;
            break;
        default:
            price=0;
            console.log("Sorry, the option is not avaible.");
    }
    return price;
};


//DOM add <p> Total Price: </p>
let numOfCheckedActivities =0;
$('.activities').append(`<p class="total-price"><strong>Total Price: ${total}</strong></p>`);
let $total_price= $('.total-price');
// $('.total-price').hide();
$total_price.hide();
let registeredActivities=$('.activities input:checked');
$(".activities input").change(function (event) {
    let $input=$(this);
    if ($input.prop("checked")){
        numOfCheckedActivities++;
        //handle schedule time conflict
        let eventName=event.target.name;
        if (eventName==='js-frameworks'){
            $(".activities input").get(3).disabled = true;
            $(".activities label").eq(3).addClass("is-disabled");
        } else if(eventName==='express'){
            $(".activities input").get(1).disabled = true;
            $(".activities label").eq(1).addClass("is-disabled");
        } else if(eventName==='js-libs'){
            $(".activities input").get(4).disabled = true;
            $(".activities label").eq(4).addClass("is-disabled");
        } else if(eventName==='node'){
            $(".activities input").get(2).disabled = true;
            $(".activities label").eq(2).addClass("is-disabled");
        }
        total += getPrice(event.target.name);
        $total_price.show();
        $total_price.html(`<strong>Total Price: $${total}</strong>`);
    } else{
        numOfCheckedActivities--;
        let eventName=event.target.name;
        if (eventName==='js-frameworks'){
            $(".activities input").get(3).disabled = false;
            $(".activities label").eq(3).removeClass("is-disabled");
            // $(".activities input").get(3).css({});
        } else if(eventName==='express'){
            $(".activities input").get(1).disabled = false;
            $(".activities label").eq(1).removeClass("is-disabled");
        } else if(eventName==='js-libs'){
            $(".activities input").get(4).disabled = false;
            $(".activities label").eq(4).removeClass("is-disabled");
        } else if(eventName==='node'){
            $(".activities input").get(2).disabled = false;
            $(".activities label").eq(2).removeClass("is-disabled");
        }
        total -= getPrice(event.target.name);
        // console.log(total);
        $total_price.show();
        $total_price.html(`<strong>Total Price: $${total}</strong>`);
        if(total===0){
            $total_price.hide();
        }
    }
});


/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select menu.
The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal"
and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card
and “Bitcoin” information should be hidden.
When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card
and “PayPal” information should be hidden.
 */

//select credit card by default
$('#payment').val('credit card');
// hide paypal and bitcoin by default
let credit_card= $('#credit-card');
credit_card.next().hide();//hide paypal message
credit_card.next().next().hide();//hide bitcoin message
//event handler using jQuery when user changing payment option
$('#payment').change(function () {
    credit_card.hide();
    credit_card.next().hide();
    credit_card.next().next().hide();//hide the error message on credit card while users switch to other payments
    $('#payment-message').hide();
    $("#payment option:selected").each(function () {
        let payment=$(this).val();
        // if($(this)value==='js puns'){
        if (payment === 'credit card'){
            credit_card.show();
            $('#payment-message').show();//show the error message when user switch back to credit card
        } else if(payment==='paypal'){
            console.log('Paypal selected');
            credit_card.next().show();
        } else if(payment==='bitcoin'){
            console.log('Bitcoin selected');
            credit_card.next().next().show();
        }
    });
});

//Function checkNumber check if the value contains only numbers from 0-9 using regular expression
let checkNumber = (value) => {
    let valid=/^\d+$/.test(value);
    return valid;
};
//set up form validation when the register button is clicked
$('.activities legend').append(`<span id="activities-span"></span>`);
$('form').on('submit',function (event) {
    let elements=this.elements;
    event.preventDefault();
    //Register for Activities checkboxes (at least one must be selected)
    if (numOfCheckedActivities===0){
        $('.activities').css({ "border":"2px solid red"});
        $('#activities-span').text(" at least one must be selected").css({"color":"red"});

    } else{
        $('.activities').css({ "border":"2px solid lime"});
        $('#activities-span').text('');
    }
    //credit card payment validation
    $("#credit-card").before(`<p id="payment-message"></p>`);
    let $payment_msg= $('#payment-message');
    $payment_msg.css({"color":"red"});
    if ( $("#payment option:selected")[0].value === "credit card"){
        let cardNum= $('#cc-num')[0].value;
        let cardNumValid=checkNumber(cardNum);
        if (cardNum ===''){
            $payment_msg.text("Please enter a credit card number");
            $('#cc-num').css({"border-color":"red"});
        } else if(!cardNumValid){
            $payment_msg.text("You can only enter numbers, no letters or special characters.");
            $('#cc-num').css({"border-color":"red"});
        } else if(cardNum.length<13 || cardNum.length>16){
            $payment_msg.text("Please enter a number that is between 13 and 16 digits long.");
            $('#cc-num').css({"border-color":"red"});
        } else{
            $payment_msg.text("");
            $('#cc-num').css({"border-color":"lime"});
        }//end of card number validation

        // check the validation of zip code
        const $zipSpan=$('#payment-message').append(`<span id="zip-span"></span>`);
        let $zip_msg=$('#zip-span');
        let $zipCode= $('#zip');
        let zipCodeValue=$zipCode[0].value;
        let zipValid=checkNumber(zipCodeValue);
        if (zipCodeValue===''){
            $zip_msg.html(` <br>Please enter your zip code.`);
            $zipCode.css({"border-color":"red"});
        } else if (!zipValid){
            $zip_msg.html(`<br>You can only enter numbers, no letters or special characters.`);
            $zipCode.css({"border-color":"red"});
        } else if (zipCodeValue.length !==5){
            $zip_msg.html(`<br>The zip code must be a 5 digit number.`);
            $zipCode.css({"border-color":"red"});
        } else{
            $zip_msg.html(``);
            $zipCode.css({"border-color":"lime"});
        }// end of zip code validation

        // CVV validation
        const $cvvSpan=$('#payment-message').append(`<span id="cvv-span"></span>`);
        let $cvv_msg=$('#cvv-span');
        let $cvv= $('#cvv');
        let cvvValue=$cvv[0].value;
        let cvvValid=checkNumber(cvvValue);
        if (cvvValue===''){
            $cvv_msg.html(` <br>Please enter your CVV.`);
            $cvv.css({"border-color":"red"});
        } else if (!cvvValid){
            $cvv_msg.html(`<br>You can only enter numbers, no letters or special characters.`);
            $cvv.css({"border-color":"red"});
        } else if (cvvValue.length <3 || cvvValue.length>4){
            $cvv_msg.html(`<br>The CVV is either 3-digit or 4-digit.`);
            $cvv.css({"border-color":"red"});
        } else{
            $cvv_msg.html(``);
            $cvv.css({"border-color":"lime"});
        }//end of CVV valid

    }//end of the if credit card is selected

});

/**
 * Name and Email field uses te Real-time Error Messages
 */
// Name can not be empty, can not contain numbers or special characters /^[a-zA-Z]+$/
$("label[for='name']").append(`<span id="name-span"></span>`);
let name_msg=$('#name-span');
$name.on('change keypress keyup focusout',function () {
    let name=$name[0].value;
    // /^[a-zA-Z]+$/
    let valid = /^[a-zA-Z]+$/.test(name);
    if (!valid){
        // console.log("The name can not be empty");
        $('#name-span').text("      "+"Invalid Name!");
        name_msg.css({"color":"red", "border-color":"red"});
        $name.css({"border-color":"red"});
    } else{
        $('#name-span').text("      "+"Okay!");
        name_msg.css({"color":"lime", "border-color":"lime"});
        $name.css({"border-color":"lime"});
    }
});

// Check the email format using regular expression /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
$email=$('#mail');
// let email=document.querySelector('#mail');
$("label[for='mail']").append(`<span id="mail-span"></span>`);
let mail_msg=$('#mail-span');
$email.on('change keypress keyup focusout',function (event) {
    let emailVal = $email[0].value;
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal);
    // console.log(valid);
    if (!valid){
        // console.log("Please enter an valid email address.");
        mail_msg.text(" Please enter an valid email address");
        mail_msg.css({"color":"red", "border-color":"red"});
        $email.css({"border-color":"red"});
    } else{
        // console.log('The email is valid');
        $('#mail-span').text("  the email is valid");
        mail_msg.css({"color":"lime", "border-color":"lime"});
        $email.css({"border-color":"lime"});
    }
});

