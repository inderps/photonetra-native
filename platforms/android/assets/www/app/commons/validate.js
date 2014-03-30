var Validate = (function() {

    var setup = function(id, rules) {
        $(id).validate({
            rules: rules,
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success: function (element) {
                element.closest('.form-group').find(".error").remove();
                element.closest('.form-group').removeClass('has-error');
            }
        });
    };

    return {
        setup: setup
    };

})();