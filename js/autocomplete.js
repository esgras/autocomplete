var $autosuggest = $('.autosuggest');
var $field = $('#field');

$autosuggest.on('click', 'li', function(e) {
    success();
    clearSuggestions();
});

$autosuggest.on('mouseover', 'li', function(e) {
    $(this).addClass('active');
});

$autosuggest.on('mouseout', 'li', function(e) {
    $autosuggest.find('li.active').removeClass('active');
});

$field.on('keydown', keydownHandler);
$field.on('keypress', keypressHandler);
$field.on('keyup', keyupHandler);

function keydownHandler(e) {
    if (e.which === 38) {
        if (!$('.autosuggest li.active').length) {
            $('.autosuggest li:last').addClass('active');
        } else {
            $('.autosuggest li.active').removeClass('active').prev().addClass('active');
        }
    }

    if (e.which == 40) {
        if ($('.autosuggest li.active').length) {
            $('.autosuggest li.active').removeClass('active').next().addClass('active');
        } else {
            $('.autosuggest li:first').addClass('active');
        }
    }

    if (e.which == 13) {
        success();
        clearSuggestions();
    }
}

//на keyupHandler что бы очищать поле
function keyupHandler(e) {
    if (e.which == 27) {
        clearSuggestions();
        $(this).val('');
    }
}

function keypressHandler(e) {
    if ((e.charCode >= 65 && e.charCode <= 90 ||
         e.charCode >= 97 && e.charCode <= 122 || e.which === 8)  ===  false) {
        return;
    }

    var value = e.target.value;
    if (e.which !== 8) {
        value += String.fromCharCode(e.charCode);
    } else {
        value = value.slice(0, -1);
    }

    sendRequest(value);
}

function sendRequest(val) {
    clearSuggestions();
    if (!val.length) return;

    $('#ajax-loader').show();
    $.ajax({
        'url': '/index.php',
        'method': 'POST',
        'data': {'ajax': true, 'input': val},
        'dataType': 'json',
        'success': function(resp) {
            var li = '';
            for (var i = 0; i < resp.length; i++) {
                li += '<li>' + resp[i] + '</li>';
            }
            $('.suggestions').html(li);
            $('#ajax-loader').hide();
        }
    });
}

function success() {
    if ($('.suggestions li.active').length) {
        alert($('.suggestions li.active').html());
    } else {
        alert($field.val());
    }
}

function clearSuggestions() {
    $('.suggestions').html('');
}