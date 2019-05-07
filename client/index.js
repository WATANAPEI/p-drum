import './style.css';
import BufferLoader from './BufferLoader';

var context;
var bufferLoader;
var sourceList = new Array();
var playList = new Array();
var loadButtonElem = document.getElementById('load-button');

var peenutsImgElem = document.getElementById('peenuts-img');
peenutsImgElem.addEventListener('click', peenutsClicked);
var elem = document.getElementById('peenuts-img');


function erasePopup(){
    let popupElems = document.getElementsByClassName('popup');
    for(let i=0; i<popupElems.length; i++){
        popupElems[i].style.display = 'none'
    }
}
async function getUrlList(){
    let response = await fetch('./audio/audioList.json');
    let json = await response.json();
    let urlList = [];
    for(let ele of json.audios){
        urlList.push(ele.path)
    }
    console.log(`urlList: ${urlList}`)
    return urlList;
}
//.catch((error) => console.error(error))
        /*    return(
        [
            'http://localhost:3000/audio/test01.mp3',
            'http://localhost:3000/audio/test02.mp3',
            'http://localhost:3000/audio/test03.mp3',

        ]
    )*/
//}
loadButtonElem.addEventListener('click',clickLoadButton);

async function clickLoadButton(){

    erasePopup();
    let urlList = await getUrlList();
    context = new AudioContext();
    console.log(`urlList2: ${urlList}`)
    context.onstatechange = (e) => {
            console.log(`context.state:${context.state}`);
    }
    bufferLoader = new BufferLoader(
        context,
        urlList,
        finishedLoading
    );
    bufferLoader.load();
};

function finishedLoading(bufferList, index){

    console.log(`buffer loaded! buffer num:${index}`);
    let source = context.createBufferSource();
    source.buffer = bufferList.shift();
    source.addEventListener("ended", finishedPlaying(index));
    source.connect(context.destination);
    sourceList.push({
        source: source,
        index: index
    });
    console.log(`sourceList length: ${sourceList.length}`);
}

function finishedPlaying(index){

    function isOnlyPlaying(element){
        return element.index === index
    }
    return function(e){
        if(playList.every(isOnlyPlaying) && playList.length == 1){
            console.log("this is the last voice!");
            rotate_end();
        }
        console.log(`buffer${index} finished!`);
        playList.shift();
    }
}

function peenutsClicked(){
    rotate_start();
    audio_control();
};

function rotate_start(){

    /*elem.classList.add("do-rotate");
    elem.classList.remove("stop-rotate");*/
        if((elem.style.animationPlayState== 'paused'||
            elem.style.animationPlayState == '') &&
        sourceList.length != 0){
        elem.style.animationPlayState='running'
    }
}
function rotate_end(){
    elem.style.animationPlayState='paused';
    /*    elem.classList.remove("do-rotate");
    elem.classList.add("stop-rotate");*/
}
function audio_control(){
    console.log('playing')
    console.log(`sourceList length: ${sourceList.length}`)
    console.log(`context.AudioContextState:${context.state}`);
    if(sourceList.length != 0){
        let targetSource = sourceList.shift();
        playList.push(targetSource);
        targetSource.source.start(0);
        console.log(`startPlaying: ${targetSource.index}`);
    }
}
