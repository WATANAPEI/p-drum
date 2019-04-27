import './style.css';
import BufferLoader from './BufferLoader';

var context;
var bufferLoader;
var sourceList = new Array();

var loadButtonElem = document.getElementById('load-button');
loadButtonElem.addEventListener('click', () => {
    context = new AudioContext();
    context.onstatechange = (e) => {
            console.log(`context.state:${context.state}`);
    }
    bufferLoader = new BufferLoader(
        context,
        [
            'http://localhost:3000/audio/test01.mp3',
            'http://localhost:3000/audio/test02.mp3',
            'http://localhost:3000/audio/test03.mp3',


        ],
        finishedLoading
    );
    bufferLoader.load();
});

// do nothing now
function finishedLoading(bufferList){

    console.log(`buffer loaded! buffer length:${bufferList.length}`);
    let source = context.createBufferSource();
    source.buffer = bufferList.shift();
    source.connect(context.destination);
    sourceList.push(source);
    console.log(`sourceList length: ${sourceList.length}`);
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
    console.log(`sourceList length: ${sourceList.length}`)
    console.log(`context.AudioContextState:${context.state}`);
    sourceList.shift().start(0);
}
