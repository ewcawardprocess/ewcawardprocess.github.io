document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World!");
    (function() {
           'use strict';
// Get the current element
var currentNode = document.querySelector('.ewc-logo');

// Create a new element
var newNode = document.createElement('img');
newNode.src = 'https://www.eastwestcenter.org/themes/custom/ewc/images/EWCLOGO-new.svg';
newNode.setAttribute("height",80);

// Add ID and content
newNode.className = 'ewc-logo';

// Replace the current node with the new node
currentNode.parentNode.replaceChild(newNode, currentNode);
         })();
  
var instanceNumberElement = document.querySelector('#pds-success .form-row.alert.alert-success p:first-child');
  instanceNumberElement.className = "mb-0";
  var successMessage = document.querySelector('#pds-success .form-row.alert.alert-success');
successMessage.innerHTML = `<div>
<p>Your form has been successfully submitted.</p>
<p>Please print this page for future reference. The unique access code allows you to securely upload your required documents to the East-West Center platform — your program will provide additional instructions if this step is needed. If you have any questions or concerns, please contact your appropriate EWC program staff to follow up.</p>
<p class="mb-0">Your preferred email: <span class="font-weight-bold">${sessionStorage.e}</span></p>
<p class="mb-0">Your mobile number: <span class="font-weight-bold">${sessionStorage.m}</span></p>
<p class="mb-0">Your home city: <span class="font-weight-bold">${sessionStorage.h}</span></p>
<p class="">Your unique access code: <span class="font-weight-bold">${sessionStorage.h.substring(0, 3).toLowerCase()}${sessionStorage.m.replaceAll(" ","")}</span></p>
<p>Thank you.</p>
            <button class="btn btn-primary" onclick="window.print()">PRINT</button>${instanceNumberElement.outerHTML}</div>`;
});

$(document).ready(function() {
    //replacing ewc logo
//     $("img.ewc-logo").replaceWith('<img class="ewc-logo" height="80" src="https://www.eastwestcenter.org/themes/custom/ewc/images/EWCLOGO-new.svg" alt="East-West center | www.eastwestcenter.org">')
    //hide insurance questions
    $("#ins-opt-ewc").closest(".form-row").remove();
    
    //change label of preferred email => preferred email (hawaii.edu, if available)
    $(".preferredEmailInput").siblings("label").html('Preferred Email (hawaii.edu, if available)<span class="required_field">*</span>');
    //change label nickname
    $("[id='personalInfo.preferredNameNickname']").siblings("label").text("Nickname");
    //hide first insurance question option if EWC Foundation
//     $("#ewcActivity").on("change", function() {
//         if ($("#ewcActivity").val()==="Foundation Student Scholarship"){
//             $("#ins-opt-ewc").parent().hide();
//         } else {
//             $("#ins-opt-ewc").parent().show();
//             $("#ins-opt-ewc").prop("checked",false);
//         }
//     });
    $("label[for='genderOther']").text('I prefer to specify.');
    //make sure secondary email type and secondary phone type are disabled when the secondary email and secondary phone are empty.
    $("#homeSecondEmailType").attr('disabled', true);
    $("#businessSecondEmailType").attr('disabled', true);
    $("#personal2").attr('disabled', true);
    $("#business2").attr('disabled', true);
    $("#homeSecondEmailType").closest('fieldset').addClass("text-muted");
    $("#homeSecondEmailType").closest('div.form-control').css( "background-color", "#fafafa" );
    $("#personal2").closest('fieldset').addClass("text-muted");
    $("#personal2").closest('div.form-control').css( "background-color", "#fafafa" );
    requiredStar = '<span class="required_field">*</span>';
    $("[name='contactInfo.secondEmail']").change(function() {
        if ($(this).val() != "") {
            $("#homeSecondEmailType").attr('disabled', false).prop('required', true);
            $("#businessSecondEmailType").attr('disabled', false);
            $("#homeSecondEmailType").closest('fieldset').removeClass("text-muted");
//            var requiredStar = '<span class="required_field">*</span>';
            $(requiredStar).appendTo($("#homeSecondEmailType").closest('fieldset').find("legend"));
            $("#homeSecondEmailType").closest('div.form-control').css( "background-color", "#fff" );
        } else {
            $("#homeSecondEmailType").attr('disabled', true).prop('required', false).prop('checked', false);
            $("#businessSecondEmailType").attr('disabled', true).prop('checked', false);
            $("#homeSecondEmailType").closest('fieldset').addClass("text-muted");
            $("#homeSecondEmailType").closest('fieldset').find("legend span").replaceWith("");
            $("#homeSecondEmailType").closest('div.form-control').css( "background-color", "#fafafa" );
        }
    });
    $("[name='emergencyContactInfo.secondaryTelephone']").change(function() {
        if ($(this).val() != "") {
            $("#personal2").attr('disabled', false).prop('required', true);
            $("#business2").attr('disabled', false);
            $("#personal2").closest('fieldset').removeClass("text-muted");
            $(requiredStar).appendTo($("#personal2").closest('fieldset').find("legend"));
            $("#homeSecondEmailType").closest('div.form-control').css( "background-color", "#fff" );
        } else {
            $("#personal2").attr('disabled', true).prop('required', false).prop('checked', false);
            $("#business2").attr('disabled', true).prop('checked', false);
            $("#personal2").closest('fieldset').addClass("text-muted");
            $("#personal2").closest('fieldset').find("legend span").replaceWith("");
            $("#personal2").closest('div.form-control').css( "background-color", "#fafafa" );
        }
    });
    // Limit characters to English characters, numbers, space, and special characters; otherwise, remove the restricted characters as entered.
    $("input[type='text']").bind('keyup blur',function() { 
            $(this).val($(this).val().replace(/[^0-9A-Za-z!;":?_@<>=#$%&'()*+,-./\[\]\ ]/g,''))
        });
    //Names fields: Remove space before and after the values
    $("#FamilyName, #FirstName, [name='personalInfo.middleName']").change(function() {
          $(this).val($(this).val().trim());
    });
    // Names fields: Limit characters to English characters, numbers, space, and special characters; otherwise, remove the restricted characters as entered.
    $("#FamilyName, #FirstName, [name='personalInfo.middleName']").bind('keyup blur',function() { 
            $(this).val($(this).val().replace(/[^0-9A-Za-z!;_@=#$%&'()+,-.\[\]\ ]/g,''))
        });
    $("#FamilyName, #FirstName").on('change',function() { 
        $(this).removeClass("is-invalid");
        $(this).next(".case").remove();
            if (($(this).val() == $(this).val().toUpperCase() || $(this).val() == $(this).val().toLowerCase()) && $(this).val() != "NLN" && $(this).val() != "NFN"){
                $(this).addClass("is-invalid");
                $(this).after(`<div class="invalid-feedback case">
                        Use title case (e.g. John Doe)
                     </div>`);
            }
        });
    //Prevent input characters other than numbers, plus, minus, brackets and space in the tel inputs.
    $("input[type='tel']").bind('keyup blur',function() { 
            $(this).val($(this).val().replace(/[^0-9 ]/g,''))
        });
    //validate mobile phone number to 8 characters minimum
    $(".mobileTelephone input").change(function() {
        if ($(this).val().length < 8) {
            $(this).val("");
            $(".mobileTelephone").append("<small class=\"form-text unmatch-mobile animated shake\" style=\"color: rgb(220, 53, 69); display: inline-block;\">Mobile number has to be at least 8 characters long. Try again.</small>");
        } else {
            $(".unmatch-mobile").remove();
        }
    });
    $('[id="contactInfo.businessFax"]').parent(".form-group").hide();
    //Remove tooltip for mobile phone field
    $('[id="contactInfo.mobileTelephone"]').tooltip("disable");
    $('[id="contactInfo.mobileTelephone"]').attr("data-original-title","Include country and area codes.<br><b>Important:</b> Take note of this number as you will need it later.");
    $('[id="contactInfo.mobileTelephone"]').tooltip("enable");
    
    //change medical needs label
    $("label[for='healthDietaryInfo.medicalNeeds']").text("Please inform us of medical needs or other issues you have that could impact your participation in the program, and how we might assist you.");
      
//change the description text
    $("#personal-info-section .alert.alert-primary").html("<p>Enter your name as it appears on your passport or government-issued ID. Please do not enter any special characters or diacritics, such as accent marks or symbols. Please do not use initials apart from \"NLN\" for \"No Last Name\" or \"NFN\" for \"No First Name\".</p>For any required fields that you cannot answer, please do not leave blank --- please type \"NA\" or \"Not Applicable\" instead.");
    $("#us-visa-section .alert.alert-primary").text("The \"U.S. Visa Information\" section is for non-US citizens and non-U.S. legal permanent residents traveling to the U.S. only. Please skip this section if this does not apply to you.");
    $(".form-row.info-block legend.form_labels").html("Are you or will you soon be an East-West Center/University of Hawaiʻi student?<span class=\"required_field\">*</span>");
    
    //form submit event
    $("#pds-page form").on("submit",function(e){
//         var required = false;
//         $(':input[required]:visible').each(function(){
//             $(this).val() == "" ? required = true : false;
//         });
//         if (!required) {
//             if (confirm(`Please verify and take note of this info.\n\nPrimary email: ${$('.preferredEmailInput').val()}\nMobile number: ${$('[id="contactInfo.mobileTelephone"]').val()}\nHome city: ${$('[id="contactInfo.homeCity"]').val()}\n\nClick "Cancel" to correct the info; otherwise, click "OK" to proceed.`) == false) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 $("div-progress").remove();
//             }
//         }
      sessionStorage.setItem("e", $('.preferredEmailInput').val());
      sessionStorage.setItem("m", $('[id="contactInfo.mobileTelephone"]').val());
      sessionStorage.setItem("h", $('[id="contactInfo.homeCity"]').val());
    })
});




