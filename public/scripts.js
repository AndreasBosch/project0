



document.querySelector('#logOut').addEventListener('click', () => {
    delete (sessionStorage['token']);
    delete (sessionStorage['username']);
    window.location.replace('login.html')
})


get_User_Data();
if (sessionStorage["profile_name"] != undefined) {
    let PageContainer = document.querySelector('#PageContainer')




    let nameBox = document.createElement('div');
    PageContainer.appendChild(nameBox);

    let username = document.createElement('h2');
    username.textContent = sessionStorage["profile_name"];
    nameBox.appendChild(username)
}
