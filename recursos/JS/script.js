window.addEventListener("load", initScene)

let orbits
let score = 0
let ultimoEl = -1
const nOrbitas = 6

function initScene(){
   
    crearDiana();
    
}

//Funcion para registrar un nuevo componente a nuestra escena: shootable
AFRAME.registerComponent("shootable",{
    init: function(){
        this.el.addEventListener("click", ()=>{
            this.el.parentNode.removeChild(this.el);
            if(score>9){
                terminarPartida();
                return;
            }
            crearDiana();
            document.querySelector("[text]").setAttribute("value", "OBJETIVOS GOLPEADOS: "+(++score))
            
        })
    }
})

function crearDiana(){
    let diana = document.createElement("a-sphere")
    orbits = document.querySelectorAll(".orbita")

    

    let rnd
    do{
        rnd  = getRandomIntInclusive(0,nOrbitas-1)
    }while(rnd==ultimoEl)

    
    console.log(rnd)
    let orbita = orbits[rnd]
    if(orbita.className.includes("circular")){
        console.log("circular")
        diana.setAttribute("position", "-5 0 0")
    }

    diana.setAttribute("src", "/recursos/imagenes/target.png")
    diana.setAttribute("class","diana")
    diana.setAttribute("shootable", "")

    orbita.appendChild(diana);
    ultimoEl = rnd
}

function terminarPartida(){

    //Mostrar mensaje de ganar
    document.querySelector("[text]").setAttribute("value", "Has eliminado todos los objetivos!<br>Se va a reiniciar la partida")

    //Recargar pagina + timer
    //Debería esperar 10 segundos pero no funciona no veo por que
    window.setTimeout(location.reload(), 10000)
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }