const uname = document.getElementById('username');
const password = document.getElementById('password');

function submitLogin(){
    if(uname.value === '' || uname.value == 'null'
        || password.value == 'null' || password.value === ''){
        alert('Input Username/Password!');
        return;
    }
    window.location.href = "home.html";
}

function darkMode(){
    var color = document.body;
    color.classList.toggle("darkMode");
}
