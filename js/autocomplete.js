(function($) {
    function keydownHandler(e) {
        if (e.which === 38) {
            if (!$(autosuggestSelector+' li.'+activeClass).length) {
                $(autosuggestSelector+' li:last').addClass(activeClass);
            } else {
                $(autosuggestSelector+' li.'+activeClass).removeClass(activeClass).prev().addClass(activeClass);
            }
        }

        if (e.which == 40) {
            if ($(autosuggestSelector+' li.'+activeClass).length) {
                $(autosuggestSelector+' li.'+activeClass).removeClass(activeClass).next().addClass(activeClass);
            } else {
                $(autosuggestSelector+' li:first').addClass(activeClass);
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

        $(loaderSelector).show();

        var data = {};

        //Заполняем значение в параметр который пойдет в базу, остальные параметры от пользователя не меняем
        for (var key in options.requestParams) {
            if (key == options.valueParam) {
                data[options.valueParam] = val;
            } else {
                data[key] = options.requestParams[key];
            }
        }
        if (options.valueParam && !(options.valueParam in Object.keys(options.requestParams))) {
            data[options.valueParam] = val;
        }

        $.ajax({
            url: options.url,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(resp) {
                var li = '';
                for (var i = 0; i < resp.length; i++) {
                    li += '<li>' + resp[i] + '</li>';
                }
                $(suggestionsSelector).html(li);
                $(loaderSelector).hide();
            }
        });
    }

    function success() {
        if ($(suggestionsSelector+' li.'+activeClass).length) {
            
            var value = $(suggestionsSelector+' li.'+activeClass).html();
            $field.data('result', {value: value});
            // $(options.fieldSelector).data('result', {value: value});
            options.successFunction();
            // alert($(suggestionsSelector+' li.'+activeClass).html());
        } else {
            console.dir(options);
            value = $(options.fieldSelector).val();
            $field.data('result', {value: value});
            // $(options.fieldSelector).data('result', {value: value});
            options.successFunction();
            // alert($field.val());
        }
    }

    function clearSuggestions() {
        $(suggestionsSelector).html('');
    }

    //служебные параметры плагина
    var autosuggestSelector = '.autosuggest';
    var activeClass = 'active';
    var suggestionsSelector = '.suggestions';
    var loaderSelector = '#ajax-loader';
    var $autosuggest = $(autosuggestSelector);
    var namespace = 'autocomplete';

    //Здесь через замыкание так как нужно иметь доступ к функции success
    var options;
    var $field

    var defaults = {
        fieldSelector: '#field',
        url: '/index.php',
        requestParams: {},
        valueParam: 'input',
        successFunction: function(){
            var result = $field.data('result');
            // var result = $(options.fieldSelector).data('result');
            // var result = $('#field').data('result');
            alert(result.value);
        }
    };

    var methods = {
        init: function(params) {
            options = $.extend({}, defaults, params || {});
            $field = $(this);
            // $field = $(options.fieldSelector);
            
            $autosuggest.on('click.'+namespace, 'li', function(e) {
                success();
                clearSuggestions();
            });

            $autosuggest.on('mouseover.'+namespace, 'li', function(e) {
                $(this).addClass(activeClass);
            });

            $autosuggest.on('mouseout.'+namespace, 'li', function(e) {
                $autosuggest.find('li.' + activeClass).removeClass(activeClass);
            });

            $field.on('keydown.'+namespace, keydownHandler);
            $field.on('keypress.'+namespace, keypressHandler);
            $field.on('keyup.'+namespace, keyupHandler);
            
            return this;
        }
    };

    $.fn[namespace] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, [].slice.call(1));
        } else if (typeof method == 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('The method "' + method + '" doesn\'t exist in the plugin jQuery.' + namespace);
        }
    };


    //Главное поле здесь указываеться элемент input
    // var $field = $('#field');

    // //Url для AJAX
    // var url = '/index.php';

    // //параметры которые нужно передавать на сервер в AJAX запросе
    // var requestParams = {ajax: true, input: ''};

    // //параметр в запросе в который передаеться значение введеное пользовтелем в input
    // var valueParam = 'input';

    // //callback выполняемый при выборе пользователя
    // var successFunction = function(){
    //     var result = $('#field').data('result');
    //     alert(result.value);
    // };

    

    

    // $autosuggest.on('click.'+namespace, 'li', function(e) {
    //     success();
    //     clearSuggestions();
    // });

    // $autosuggest.on('mouseover.'+namespace, 'li', function(e) {
    //     $(this).addClass(activeClass);
    // });

    // $autosuggest.on('mouseout.'+namespace, 'li', function(e) {
    //     $autosuggest.find('li.' + activeClass).removeClass(activeClass);
    // });

    // $field.on('keydown.'+namespace, keydownHandler);
    // $field.on('keypress.'+namespace, keypressHandler);
    // $field.on('keyup.'+namespace, keyupHandler);

})(jQuery);

//Главное поле здесь указываеться элемент input
    // var $field = $('#field');

    // //Url для AJAX
    // var url = '/index.php';

    // //параметры которые нужно передавать на сервер в AJAX запросе
    // var requestParams = {ajax: true, input: ''};

    // //параметр в запросе в который передаеться значение введеное пользовтелем в input
    // var valueParam = 'input';

    $('#field').autocomplete({
        requestParams: {ajax: true}
    });