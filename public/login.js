
document.querySelector('#subThis').addEventListener('click', (event) => {
    // tømmer fejlbesked feltet, så der ikke står en forkert fejlbesked in case det hele nu virker
    document.getElementById('error').textContent = '';

    // henter værdierne fra felterne

    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // send til serveren, hvis der er data i begge felter eller send en fejlbesked
    if (username == '' || password == '') {
        document.getElementById('error').textContent = "Please fill out both email and password"
    } else { // fetch opsætning
        let submitSettings = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "email": username,
                "password": password,

            })
        }

        fetch(api_address + 'login', submitSettings)
            .then(response => {
                console.log(response);

                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error('wrong email or password');
                }
            }).then(json => {
                // serveren har genereret en token som er unik for dette login
                // som gemmes i sessionstorage['token']
                console.log(json)
                sessionStorage['token'] = json.token;
                window.location.replace('index.html')
            }).catch(error => {
                document.getElementById('error').textContent = error.message;
            })
    }
})




