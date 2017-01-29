document.addEventListener('DOMContentLoaded', function() {
    var url = '/api/v1/signup';

    var form = document.querySelector('form.signup');
    var field = form.querySelector('input[type=email]');
    var button = form.querySelector('button');
    var icon = button.querySelector('.i');
    var errorMessage = form.querySelector('.errorMessage');

    form.onsubmit = function(e) {
        e.preventDefault();
        submit();
    }
    function submit() {
        var request = new XMLHttpRequest();
        icon.setAttribute('class', 'i i-loading');
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function() {
            var data = JSON.parse(request.responseText);
            icon.setAttribute('class', 'i i-newsletter');
            if (request.status >= 200 && request.status < 400) {
                form.parentNode.classList.add('success')
            } else {
                error(data.message);
                // TODO: Handle error
            }
        };

        request.onerror = function() {
            // TODO: Handle error
        };

        request.send(JSON.stringify({
            'email': field.value
        }));
    }

    function error(e) {
        errorMessage.innerHTML = e;
        field.parentNode.classList.remove('shake');
        setTimeout(function() {
            field.parentNode.classList.add('shake', 'error');
        }, 100)
    }
});
