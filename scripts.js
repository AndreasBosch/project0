function uploadData() {

    let form = document.querySelector('#upBut');
    let data = new FormData(form)

    let submitSettings = {
        method: 'POST',
        body: data,

        headers: new Headers({
            'Content-Type': 'multipart/form-data',

        })
    }
    fetch(api_adress + 'upload' + submitSettings)
    console.log(data)

        .then((response) => {

        })
}

let button = document.querySelector('#subThis');
button.addEventListener('submit', uploadData)