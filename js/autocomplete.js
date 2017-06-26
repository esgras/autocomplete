var $autosuggest = $('.autosuggest');
var $field = $('#field');

$autosuggest.on('click', 'li', function(e) {
    $autosuggest.find('li.active').removeClass('active');
    $(this).addClass('active');
});

$field.on('keydown', keydownHandler);
// $field.on('input', inputHandler);
$field.on('keypress', keypressHandler);
 $field.on('keyup', keyupHandler);

$autosuggest.on('keypress', 'input', function(e) {
    if (e.keyCode == 27) {
        // alert("COOL");
        // $field.val('');
    }
    // $autosuggest.find('li.active').removeClass('active');
    // $(this).addClass('active');
});

function keydownHandler(e) {
    // var val = this.value;

    // if (e.which == 8 && val.length) {
    //     sendRequest(val);
    // }

    if (e.which == 38) {
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

    }

    
}

function keyupHandler(e) {
    if (e.which == 27) {
        alert("HERE");
        // console.log('clear');
        $('.suggestions').html('');
        $(this).val('');
        // return false;
        // this.value = '';
        // $(this).val('');
    }
}

function keypressHandler(e) {

    if (
        !(e.charCode >= 65 && e.charCode <= 90 || e.charCode >= 97 && e.charCode <= 122 || e.which == 8)
    ) {
        return;
    }

    //var value = e.target.value + String.fromCharCode(e.charCode);


    var value = e.target.value;
    if (e.which !== 8) {
        value += String.fromCharCode(e.charCode);
    } else {
        value = value.slice(0, -1);
    }
    
    // console.log(value);
    // return;

    sendRequest(value);
}

// function keyupHandler() {
//     console.log('keyup');
// }



function inputHandler(e) {
    console.log('input');
}

function sendRequest(val) {
    $('.suggestions').html('');
    if (!val.length) return;

    $('#ajax-loader').show();
    $.ajax({
        'url': '/autocomplete.php',
        'method': 'POST',
        'data': {'ajax': true, 'input': val},
        'dataType': 'json',
        'success': function(resp) {
            console.log(resp.length);
            var li = '';
            for (var i = 0; i < resp.length; i++) {
                // console.log(resp[i])
                li += '<li>' + resp[i] + '</li>';

            }
            $('.suggestions').html(li);
            // var li = '';
            // for (var i = 0; i < resp.length; i++) {
            //     li += '<li>' + resp[i] + '</li>';
            // }
            // $('.suggestions').html(li);
            $('#ajax-loader').hide();
        }
    });
}

$('#clear').click(function() {
    
    $field.val('');
});