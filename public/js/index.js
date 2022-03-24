const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA - INICIO
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount (email);


    if(!account) {
        alert("Opps! Verifique seu usuário e senha");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique seu usuário e senha");
            return;  
        }

        saveSession(email, checkSession);
        window.location.href ="home.html";

    }

    

});

//LOGAR NO SISTEMA - FIM


//Função de criar conta - inicio
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Por favor preencha com um e-mail válido");
        return;
    }

    if(password.length < 4){
        alert("Preencha uma senha com no mínimo 4 digitos"); 
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions:[]
    });

    myModal.hide();
    
    alert("Conta criada com sucesso.");

});
//Função de criar conta - final

//Função de salvar no Storage
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}//fim

function checkLogged() {
    if(session){
        sessionStorage.setItem("Logged", session);
        logged = session;
    }

    if(logged){
        saveSession (logged, session);

        window.location.href = "home.html";
    
    }
}


function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

