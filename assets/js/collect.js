function collect() {
    var json = $("#questionnaire").serializeJSON({
        parseWithFunction: function(str) {return str||null;}
    });
    if (!validate_phone_number()) {
        alert("phone number is invalid");
        return false;
    }
    if (!validate_email(json['email'])) {
        alert("email address is invalid");
        return false;
    }

    var contact = new Array();
    if (json['phone']) {
        contact.push(
           {
               "type": "phone",
               "value": iti.getNumber(intlTelInputUtils.numberFormat.E164)
           }
        );
    }
    if (json['email']) {
        contact.push(
           {
               "type": "email",
               "value": json['email']
           }
        );
    }

    var res = {
        "name": json['name'],
        "contact": contact,
        "protocal": json['protocal'] == "true",
        "closing_time": json['closing_time'],
        "contact_preference": json['contact_preference'],
        "greenzone": json['greenzone'] || new Array(),
        "redzone": json['redzone'] || new Array(),
        "criteria": json['criteria'] || new Array(),
        "return_type": json['return_type']
    };

    // res = JSON.stringify(res);
    // res = JSON.parse(res);
    console.log(res);
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post("http://127.0.0.1:8080/buyers", res)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
    return true;
}

function validate_email(email_addr) {
    console.log(email_addr)
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email_addr);
}

function validate_phone_number() {
    if (iti.getNumber() == "") {
        console.log("Empty")
        return true;
    }
    return iti.isValidNumber();
}
