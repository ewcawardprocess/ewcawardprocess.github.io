document.addEventListener("DOMContentLoaded", () => {
    (function () {
        'use strict';
        // Get the current element
        var currentNode = document.querySelector('.ewc-logo');

        // Create a new element
        var newNode = document.createElement('img');
        newNode.src = 'https://www.eastwestcenter.org/themes/custom/ewc/images/EWCLOGO-new.svg';
        newNode.setAttribute("height", 80);

        // Add ID and content
        newNode.className = 'ewc-logo';

        // Replace the current node with the new node
        currentNode.parentNode.replaceChild(newNode, currentNode);
    })();

    // Customize the success message.
    var instanceNumberElement = document.querySelector('#pds-success .form-row.alert.alert-success p:first-child .font-weight-bold');
    try {
    instanceNumberElement.className = "mb-0";
    } catch {
    }
    var successMessage = document.querySelector('#pds-success .form-row.alert.alert-success');
    successMessage.innerHTML = `<div>
                                    <p>Your form has been successfully submitted.</p>
                                    <p>Please print this page for future reference. The unique access code allows you to securely upload your required documents to the East-West Center platform — your program will provide additional instructions if this step is needed. If you have any questions or concerns, please contact your appropriate EWC program staff to follow up.</p>
                                    <p class="mb-0">Your preferred email: <span class="font-weight-bold">${sessionStorage.e}</span></p>
                                    <p class="mb-0">Your mobile number: <span class="font-weight-bold">${sessionStorage.m}</span></p>
                                    <p class="mb-0">Your home city: <span class="font-weight-bold">${sessionStorage.h}</span></p>
                                    <p class="">Your unique access code: <span class="font-weight-bold">${sessionStorage.h.substring(0, 3).toLowerCase()}${sessionStorage.m.replaceAll(" ", "").replaceAll("+","")}</span></p>
                                    <p>Thank you.</p>
                                                <button class="btn btn-primary mb-3 " onclick="window.print()" style="
                                        display: flex;
                                        align-items: center;
                                        float: right;
                                    "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer mr-2" viewBox="0 0 16 16">
                                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"></path>
                                    </svg> PRINT</button>
                                                <p class="mb-0">(for internal use only:  instance #<span class="font-weight-bold">${instanceNumberElement.innerHTML}</span>)</p>
                                </div>`;
});

$(document).ready(function () {
    // Add css stylesheet url to head
    $("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/css/intlTelInput.css">');
    // // Add js script url to head
    // $("body").append('<script src=""></script>');

    const intlOption = {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        separateDialCode: true,
        initialCountry: "auto",
        preferredCountries: ["us"],
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
    }

    $("[type=tel]").each(function () {
        $(this).after(`<input class="phoneinput form_fields form-control" type="text" ${$(this).prop("required") == true ? "required=true" : ""} name="` + $(this).attr("name") + `-assist" id="` + $(this).attr("id") + `-full" value="">`);
        $(this).addClass("d-none");
    });

    var inputs = document.querySelectorAll('.phoneinput');
    var itis = [];
    $.getScript("https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/intlTelInput.min.js", function () {
        for (var i = 0; i < inputs.length; i++) {
            try {
                var iti = window.intlTelInput(inputs[i], intlOption);
                itis.push(iti);
            } catch (error) {
                console.log(error);
            }
        }
    });

    // Hide insurance questions
    $("#ins-opt-ewc").closest(".form-row").remove();

    // Change label of preferred email => preferred email (hawaii.edu, if available)
    $(".preferredEmailInput").siblings("label").html('Preferred Email (hawaii.edu, if available)<span class="required_field">*</span>');
    // Change label nickname
    $("[id='personalInfo.preferredNameNickname']").siblings("label").text("Nickname");

    // Rename gender option.
    $("label[for='genderOther']").text('I prefer to specify.');

    // Make sure secondary email type and secondary phone type are disabled when the secondary email and secondary phone are empty.
    $("#homeSecondEmailType").attr('disabled', true);
    $("#businessSecondEmailType").attr('disabled', true);
    $("#personal2").attr('disabled', true);
    $("#business2").attr('disabled', true);
    $("#homeSecondEmailType").closest('fieldset').addClass("text-muted");
    $("#homeSecondEmailType").closest('div.form-control').css("background-color", "#fafafa");
    $("#personal2").closest('fieldset').addClass("text-muted");
    $("#personal2").closest('div.form-control').css("background-color", "#fafafa");
    requiredStar = '<span class="required_field">*</span>';
    $("[name='contactInfo.secondEmail']").change(function () {
        if ($(this).val() != "") {
            $("#homeSecondEmailType").attr('disabled', false).prop('required', true);
            $("#businessSecondEmailType").attr('disabled', false);
            $("#homeSecondEmailType").closest('fieldset').removeClass("text-muted");
            $(requiredStar).appendTo($("#homeSecondEmailType").closest('fieldset').find("legend"));
            $("#homeSecondEmailType").closest('div.form-control').css("background-color", "#fff");
        } else {
            $("#homeSecondEmailType").attr('disabled', true).prop('required', false).prop('checked', false);
            $("#businessSecondEmailType").attr('disabled', true).prop('checked', false);
            $("#homeSecondEmailType").closest('fieldset').addClass("text-muted");
            $("#homeSecondEmailType").closest('fieldset').find("legend span").replaceWith("");
            $("#homeSecondEmailType").closest('div.form-control').css("background-color", "#fafafa");
        }
    });
    $("[name='emergencyContactInfo.secondaryTelephone-assist']").change(function () {
        if ($(this).val() != "") {
            $("#personal2").attr('disabled', false).prop('required', true);
            $("#business2").attr('disabled', false);
            $("#personal2").closest('fieldset').removeClass("text-muted");
            $(requiredStar).appendTo($("#personal2").closest('fieldset').find("legend"));
            $("#homeSecondEmailType").closest('div.form-control').css("background-color", "#fff");
        } else {
            $("#personal2").attr('disabled', true).prop('required', false).prop('checked', false);
            $("#business2").attr('disabled', true).prop('checked', false);
            $("#personal2").closest('fieldset').addClass("text-muted");
            $("#personal2").closest('fieldset').find("legend span").replaceWith("");
            $("#personal2").closest('div.form-control').css("background-color", "#fafafa");
        }
    });
    // Limit characters to English characters, numbers, space, and special characters; otherwise, remove the restricted characters as entered.
    $("input[type='text']").bind('keyup blur', function () {
        $(this).val($(this).val().replace(/[^0-9A-Za-z!;":?_@<>=#$%&'()*+,-./\[\]\ ]/g, ''))
    });
    //Names fields: Remove space before and after the values
    $("#FamilyName, #FirstName, [name='personalInfo.middleName']").change(function () {
        $(this).val($(this).val().trim());
    });
    // Names fields: Limit characters to English characters, numbers, space, and special characters; otherwise, remove the restricted characters as entered.
    $("#FamilyName, #FirstName, [name='personalInfo.middleName']").bind('keyup blur', function () {
        $(this).val($(this).val().replace(/[^0-9A-Za-z!;_@=#$%&'()+,-.\[\]\ ]/g, ''))
    });
    $("#FamilyName, #FirstName").on('change', function () {
        $(this).removeClass("is-invalid");
        $(this).next(".case").remove();
        if (($(this).val() == $(this).val().toUpperCase() || $(this).val() == $(this).val().toLowerCase()) && $(this).val() != "NLN" && $(this).val() != "NFN") {
            $(this).addClass("is-invalid");
            $(this).after(`<div class="invalid-feedback case">
                        Use title case (e.g. John Doe)
                     </div>`);
        }
    });
    //Prevent input characters other than numbers, plus, minus and space in the tel inputs.
    $("input.phoneinput").bind('keyup blur', function () {
        $(this).val($(this).val().replace(/[^0-9\+\ ]/g, ''));
        var input = document.querySelector(`[id="${$(this).attr("id")}"]`);
        var iti = window.intlTelInputGlobals.getInstance(input);
        var dialCode = iti.getSelectedCountryData().dialCode;
        var value = "+" + dialCode + " " + $(this).val().replace(/[^0-9]/g, '');
        if ($(this).val() == "") {
            $(`[id="${$(this).attr("id").replaceAll("-full","")}"]`).val(""); 
        } else {
            $(`[id="${$(this).attr("id").replaceAll("-full","")}"]`).val(value);            
            console.log(value);
        }
    });

    //validate mobile phone number to 8 characters minimum
    $(".mobileTelephone input").change(function () {
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
    $('[id="contactInfo.mobileTelephone"]').attr("data-original-title", "Include country and area codes.<br><b>Important:</b> Take note of this number as you will need it later.");
    $('[id="contactInfo.mobileTelephone"]').tooltip("enable");

    //change medical needs label
    $("label[for='healthDietaryInfo.medicalNeeds']").text("Please inform us of medical needs or other issues you have that could impact your participation in the program, and how we might assist you.");

    //change the description text
    $("#personal-info-section .alert.alert-primary").html("<p>Enter your name as it appears on your passport or government-issued ID. Please do not enter any special characters or diacritics, such as accent marks or symbols. Please do not use initials apart from \"NLN\" for \"No Last Name\" or \"NFN\" for \"No First Name\".</p>For any required fields that you cannot answer, please do not leave blank --- please type \"NA\" or \"Not Applicable\" instead.");
    $("#us-visa-section .alert.alert-primary").text("The \"U.S. Visa Information\" section is for non-US citizens and non-U.S. legal permanent residents traveling to the U.S. only. Please skip this section if this does not apply to you.");
    $(".form-row.info-block legend.form_labels").html("Are you or will you soon be an East-West Center/University of Hawaiʻi student?<span class=\"required_field\">*</span>");

    //form submit event
    $("#pds-page form").on("submit", function (e) {
        sessionStorage.setItem("e", $('.preferredEmailInput').val());
        sessionStorage.setItem("m", $('[id="contactInfo.mobileTelephone"]').val());
        sessionStorage.setItem("h", $('[id="contactInfo.homeCity"]').val());
    });

    $("select#ewcProgram").on("change", function () {
        if ($(this).val() == "AE") {
            $(".info-block#health-section h4").text("Dietary Restrictions");
            $(`[name="healthDietaryInfo.medicalNeeds"]`).parents(".form-row").hide();
            $(`[name="healthDietaryInfo.religiousConcerns"]`).parents(".form-row").hide();
            $(`[name="healthDietaryInfo.healthDietaryComments"]`).parents(".form-row").hide();
        } else {
            $(".info-block#health-section h4").text("Health/Dietary and Other Concerns");
            $(`[name="healthDietaryInfo.medicalNeeds"]`).parents(".form-row").show();
            $(`[name="healthDietaryInfo.religiousConcerns"]`).parents(".form-row").show();
            $(`[name="healthDietaryInfo.healthDietaryComments"]`).parents(".form-row").show();
        }
    });

    $(`[name="healthDietaryInfo.medicalNeeds"]`).parents(".form-row").after(`<div class="form-row">
    <div class="form-group col-md-12">
        <fieldset>
                        <legend class="form_labels">Do you have dietary restrictions?</legend>
                        <div class="form-control dietary-restriction">
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict2" name="Vegetarian">
                            <label class="custom-control-label" for="restrict2">Vegetarian</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict3" name="Gluten allergy">
                            <label class="custom-control-label" for="restrict3">Gluten allergy</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict4" name="Lactose allergy">
                            <label class="custom-control-label" for="restrict4">Lactose allergy</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict5" name="Nut allergy">
                            <label class="custom-control-label" for="restrict5">Nut allergy</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict6" name="Shellfish allergy">
                            <label class="custom-control-label" for="restrict6">Shellfish allergy</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check-inline">
                            <input type="checkbox" class="custom-control-input" id="restrict7" name="Other">
                            <label class="custom-control-label" for="restrict7">Other</label>
                            </div>
                        </div>
        </fieldset>
    </div>
    <div class="form-group col-md-4 d-none" id="otherDietaryRestrictions">
        <label>Other dietary restrictions</label>
        <input type="text" class="form-control" name="healthDietaryInfo.otherDietaryRestrictions">
    </div>
    </div>`);

    $('[name="healthDietaryInfo.dietaryRestrictions"]').parents(".form-row").hide();
    $('.form-control.dietary-restriction input[type="checkbox"], [name="healthDietaryInfo.otherDietaryRestrictions"]').on("change", function () {
        var dietaryRestrictions = [];
        $('.form-control.dietary-restriction input[type="checkbox"]:checked').each(function () {
            $(this).attr("name") != "Other" ? dietaryRestrictions.push($(this).attr("name")) : false;
        });
        if ($('.form-control.dietary-restriction input[type="checkbox"][name=Other]').is(":checked")) {
            $("#otherDietaryRestrictions").removeClass("d-none");
        } else {
            $("#otherDietaryRestrictions").addClass("d-none");
        };
        if ($('.form-control.dietary-restriction input[type="checkbox"][name=Other]').is(":checked") && $('[name="healthDietaryInfo.otherDietaryRestrictions"]').val() != "") {
            dietaryRestrictions.push('Other: ' + $('[name="healthDietaryInfo.otherDietaryRestrictions"]').val());
        }
        $('[name="healthDietaryInfo.dietaryRestrictions"]').val(dietaryRestrictions.join("; "));
    });
    $('#homePreferredPhoneType').parent().removeClass("form-check-inline").addClass("d-none");
    $('[name="contactInfo.homeTelephone-assist"]').on("keyup", function () {
        if ($(this).val() != "") {
            $('#homePreferredPhoneType').parent().removeClass("d-none").addClass("form-check-inline");
        } else {
            $('#homePreferredPhoneType').parent().removeClass("form-check-inline").addClass("d-none");
            $('#homePreferredPhoneType').prop("checked", false);
        }
    });
});
