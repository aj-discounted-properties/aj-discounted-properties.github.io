function add_fields(class_name) {
    var c_name = "." + class_name;
    console.log(c_name);
	var wrapper = $(c_name); //Fields wrapper
    var input_field = '<div><input class="text" type="text" name="' + class_name + '[]"/><a href="javascript:void(0)" class="remove_field" >Remove</a></div>';
    $(input_field).insertBefore(c_name + " .add_field_button");
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove field
        e.preventDefault(); $(this).parent('div').remove();
    });
}

