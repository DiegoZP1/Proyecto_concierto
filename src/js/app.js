document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra=document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll',function(){

        if(sobreFestival.getBoundingClientRect().top<0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });

}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    
    for (let i = 1; i <= 12; i++) {
        const imagen= document.createElement('picture');
        console.log(imagen); 
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id) {
    const imagen= document.createElement('picture');
        console.log(imagen); 
        imagen.innerHTML=`
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;

        //Crear overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        //Poder cerrar desde cualquier parte fuera de la imagen

        overlay.onclick=function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

            overlay.remove();
        }

        //Boton para cerrar el Modal
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent='X';
        cerrarModal.classList.add('btn-cerrar');

        cerrarModal.onclick=function(){

            //   Añadir la barra de scroll de nuevo
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

            overlay.remove();
        }

        overlay.appendChild(cerrarModal);

        //Añadir al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        //Añadir clase para quitar scroll
        body.classList.add('fijar-body');
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click',function(e){
            e.preventDefault();
            //Selecciona el valor del HREF de la etiqueta
            const seccionScroll =e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            //Hace que al seleccionar la etiqueta se deslize suavemente hasta su posicion
            seccion.scrollIntoView({behavior:"smooth"});
        });
    });
}
