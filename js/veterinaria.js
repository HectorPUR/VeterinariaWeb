const base=[
    {user: 'Administrador', pass:'1209', rol:'Administrador', url:'index.html', Paginas:['index.html','personal.html','citas.html','transporte.html', 'agendar.html', 'expediente.html']},
    {user: 'Veterinario', pass:'1209', rol:'Veterinarios', url:'agendar.html', Paginas:['agendar.html', 'index.html', 'citas.html', 'expediente.html']},
    {user: 'Recepcionista', pass:'1209', rol:'Recepcionistas', url:'citas.html', Paginas:['citas.html', 'index.html']},
    {user: 'Auxiliar', pass:'1209', rol:'Auxiliares', url:'transporte.html', Paginas:['transporte.html']}
];

//iniciar sesion
function iniciarSesion(e){
    e.preventDefault();
    const inputUser = document.getElementById('inputUser').value.trim();
    const inputPass = document.getElementById('inputPass').value.trim();

    const usuarioAutenticado=base.find(
        u=> u.user=== inputUser && u.pass === inputPass
    );

    if(usuarioAutenticado){
        //almacenar datos sessionstorage
        sessionStorage.setItem('sesionActiva', JSON.stringify(usuarioAutenticado));
        registrarAcceso();
        //redirijo la pagina
        window.location.href=usuarioAutenticado.url; 
    }else{
        document.getElementById('errorMsg').classList.remove('d-none');
    
    }
}
    function cerrarSesion(){
        if(confirm("¿Quieres salir de la sesion?")){
        sessionStorage.removeItem('sesionActiva');
        window.location.href="inicio.html"
    }
}


    function verificarAcceso(rolRequerido){
        const sesion=JSON.parse(sessionStorage.getItem('sesionActiva'));
        if(!sesion){
            //no hay sesion
            window.location.href="inicio.html";
        }else if(sesion.rol !== rolRequerido){
            //si hay sesion pero no es de su rol
            window.location.href=sesion.url;
        }else{
            //all ok
            document.getElementById('infoUsuario').textContent=`😊 ${sesion.user}`;
        }

    }

    function ValidarPerfil(paginaAct){
        const sesion=JSON.parse(sessionStorage.getItem('sesionActiva'));
        if(!sesion){
            //no hay sesion
            window.location.href="inicio.html";
            return;
        }

        if(!sesion.Paginas.includes(paginaAct)){
            alert("No tienes permiso para acceder a esta página.");
            window.location.href=sesion.url;
            return;
        }
    }

    function saltarLoginSiAutenticado(){
        const sesion=JSON.parse(sessionStorage.getItem('sesionActiva'));
        if(sesion){
            alert(`Ya hay una sesión iniciada como" ${sesion.rol}.`);
            window.location.href=sesion.url;
        }
    }

    function registrarAcceso(){
        let accesos=JSON.parse(sessionStorage.getItem('accesos')) || [];
        let horaf= new Date();
        let fechaHora = horaf.toLocaleString();
        let nuevoAcceso = "Acceso"+(accesos.length+1)+": "+fechaHora;
        accesos.push(nuevoAcceso);
        sessionStorage.setItem('accesos', JSON.stringify(accesos));
    }