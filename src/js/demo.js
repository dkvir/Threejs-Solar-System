const audio = new Audio('/audio/Space-Oddity.mp3');

const loaderDiv = document.querySelector('.loader');
const musicDiv = document.querySelector('.music');
const musicToggler = document.querySelector('.music-toggle');
const musicText = document.querySelector('.music-text');
let playBowie = false;

musicDiv.addEventListener('click', ()=>{
    playBowie = !playBowie;

    if(playBowie){
        musicText.textContent = 'Pause Bowie';
        musicToggler.classList.remove('music-stopped')
        audio.play();
    } else{
        musicText.textContent = 'Play Bowie';
        musicToggler.classList.add('music-stopped')
        audio.pause();
    } 
})

setTimeout(() => {    
  loaderDiv.classList.remove('loading');
}, 4500);

window.addEventListener("load", (event) => {
    setTimeout(() => {
        document.documentElement.classList.add('loaded');
    }, 1000);
});
