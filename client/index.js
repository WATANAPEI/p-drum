import './style.css';
import BufferLoader from './BufferLoader';

var context;
var bufferLoader;
var source;

var loadButtonElem = document.getElementById('load-button');
loadButtonElem.addEventListener('click', () => {
    context = new AudioContext();
    bufferLoader = new BufferLoader(
        context,
        [
            'http://localhost:3000/audio/test.mp3'
        ],
        finishedLoading
    );
    bufferLoader.load();
});

// do nothing now
function finishedLoading(bufferList){

    source = context.createBufferSource();
    source.buffer = bufferList[0];
    source.connect(context.destination);
}

var peenutsImgElem = document.getElementById('peenuts-img');
peenutsImgElem.addEventListener('click', () => {
    rotate_control();
    audio_control();
});

function rotate_control(){

    let elem = document.getElementById('peenuts-img');
    if(elem.style.animationPlayState== 'paused'||
        elem.style.animationPlayState == ''){
        elem.style.animationPlayState='running'
    }else{
        elem.style.animationPlayState='paused'
    }

}
function audio_control(){
    console.log('playing')
    source.start(0);
}
