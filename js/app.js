// Inicialización de datos
if(!localStorage.getItem("saldo")){
    localStorage.setItem("saldo",1000);
}

if(!localStorage.getItem("transacciones")){
    localStorage.setItem("transacciones", JSON.stringify([]));
}

// Login con jQuery
$("#loginForm").submit(function(e){
    e.preventDefault();

    let user = $("#user").val();
    let pass = $("#pass").val();

    if(user==="admin" && pass==="1234"){
        localStorage.setItem("usuario",user);
        window.location.href="menu.html";
    }else{
        alert("Credenciales incorrectas");
    }
});

// Mostrar saldo
function mostrarSaldo(){
    let saldo = localStorage.getItem("saldo");
    $("#saldo").text("$ " + saldo);
}
mostrarSaldo();

// Logout
function logout(){
    localStorage.removeItem("usuario");
    window.location.href="login.html";
}

// Depositar dinero
function depositar(){
    let monto = Number($("#monto").val());

    if(monto <= 0){
        alert("Monto inválido");
        return;
    }

    let saldo = Number(localStorage.getItem("saldo"));
    saldo += monto;

    localStorage.setItem("saldo", saldo);

    guardarTransaccion("Depósito +$"+monto);

    alert("Depósito exitoso");
    window.location.href="menu.html";
}

// Transferir dinero
function transferir(){
    let contacto = $("#contacto").val();
    let monto = Number($("#monto").val());

    let saldo = Number(localStorage.getItem("saldo"));

    if(monto > saldo){
        alert("Saldo insuficiente");
        return;
    }

    saldo -= monto;

    localStorage.setItem("saldo", saldo);

    guardarTransaccion("Transferencia a "+contacto+" -$"+monto);

    alert("Transferencia realizada");
    window.location.href="menu.html";
}

// Guardar transacciones
function guardarTransaccion(texto){
    let historial = JSON.parse(localStorage.getItem("transacciones"));

    historial.push({
        descripcion:texto,
        fecha:new Date().toLocaleString()
    });

    localStorage.setItem("transacciones", JSON.stringify(historial));
}

// Mostrar historial
function cargarTransacciones(){
    let historial = JSON.parse(localStorage.getItem("transacciones"));

    historial.reverse().forEach(t => {
        $("#lista").append(`
            <li class="list-group-item">
            ${t.descripcion}
            <span class="float-end text-muted">${t.fecha}</span>
            </li>
        `);
    });
}
cargarTransacciones();
