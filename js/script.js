/*
Set focus on the first text field
When the page first loads, the first text field should be in focus by default.
*/
$('#name').first().focus();

/*
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
 */
//     <option value="other">Other</option>
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
//id=colors-js-puns
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
 * ”Register for Activities” section
 Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop
 at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing
 time slot isn't available.
 When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
 As a user selects activities, a running total should display below the list of checkboxes.
 For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop,
 the total should change to Total: $300.
 */
//js-frameworks or express
//js-libs or node

let total=0;
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

/**
 * hide the activities
 */
// let diableConflicts = (name) => {
//     if (name === ''){
//
//     }
// };

//DOM add <p> Total Price: </p>
$('.activities').append(`<p class="total-price"><strong>Total Price: ${total}</strong></p>`);
let $total_price= $('.total-price');
// $('.total-price').hide();
$total_price.hide();

$(".activities input").change(function (event) {
    let $input=$(this);
    if ($input.prop("checked")){
        // console.log(event.target.name);
        // console.log(total);
        // console.log($input+" is checked");
        // console.log(event.target);
        let eventName=event.target.name;
        if (eventName==='js-frameworks'){
            $(".activities input").get(3).disabled = true;
        } else if(eventName==='express'){
            $(".activities input").get(1).disabled = true;
        } else if(eventName==='js-libs'){
            $(".activities input").get(4).disabled = true;
        } else if(eventName==='node'){
            $(".activities input").get(2).disabled = true;
        }
        total += getPrice(event.target.name);
        $total_price.show();
        $total_price.html(`<strong>Total Price: $${total}</strong>`);
    } else{
        let eventName=event.target.name;
        if (eventName==='js-frameworks'){
            $(".activities input").get(3).disabled = false;
        } else if(eventName==='express'){
            $(".activities input").get(1).disabled = false;
        } else if(eventName==='js-libs'){
            $(".activities input").get(4).disabled = false;
        } else if(eventName==='node'){
            $(".activities input").get(2).disabled = false;
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
let credit_card= $('#credit-card');
credit_card.hide();
credit_card.next().hide();
credit_card.next().next().hide();

$('#payment').change(function () {
    credit_card.hide();
    credit_card.next().hide();
    credit_card.next().next().hide();
    $("#payment option:selected").each(function () {
        let payment=$(this).val();
        // if($(this)value==='js puns'){
        if (payment === 'credit card'){
            credit_card.show();
        } else if(payment==='paypal'){
            console.log('Paypal selected');
            credit_card.next().show();
        } else if(payment==='bitcoin'){
            console.log('Bitcoin selected');
            credit_card.next().next().show();
        }
    });
});