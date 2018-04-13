document.querySelector('#subThis').addEventListener('click', (event) => {
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let passwordRepeat = document.getElementById('passwordRepeat').value;
    event.preventDefault();



    if (username == '' || password == '' || email == '') {
        document.querySelector('#error').textContent = 'Please fill out all the fields!'
    } else {
        if (password != passwordRepeat) {
            document.querySelector('#error').textContent = 'Passwords do not match!'
        } else {

            document.querySelector('#error').textContent = '';
            let submitSettings = {
                method: 'POST',
                headers: new Headers({
                    'content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                })
            }
            fetch(api_adress + 'register', submitSettings)
                .then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw new Error('wrong email or password');
                    }
                }).then(json => {
                    window.location.replace('login.html')
                })
        }
    }
})