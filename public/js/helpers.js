const api_address = 'http://localhost:3000/api/';

function get_User_Data() {
    if (sessionStorage["token"] != undefined) {
        let fetchAddress = ''

        let submitSettings = {
            method: `GET`,
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': sessionStorage['token']
            })
        }

        fetch(api_address + "profile", submitSettings)
            .then((response) => {
                if (response.status == 200) {
                    return response.json();

                } else {
                    throw new Error("Response status not 200")
                }
            })
            .then((json) => {
                console.log(json.profile_name)
                sessionStorage["profile_name"] = json.profile_name
                sessionStorage["profile_email"] = json.profile_email
            })

    }
}
