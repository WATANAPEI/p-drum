//reference: https://www.html5rocks.com/ja/tutorials/webaudio/intro/js/buffer-loader.js
export default class BufferLoader{

    constructor(context, urlList, callback){
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }
    loadBuffer(url, index){
        //Load Buffer Asynchronously
        fetch(url).then((response) => {return response.arrayBuffer();})
                  .catch((e) => {console.log(`error: $(e)`)})
                  .then((buffer) => {this.context.decodeAudioData(buffer)})
                      .then((decodeData) => {
                          this.bufferList[index] = decodeData;
                          if(++this.loadCount == this.urlList.length)
                              this.onload(this.bufferList);
                              console.log(`No. ${index} is loaded!`);
                      })
    }
    load(){
        for(let i=0; i< this.urlList.length; ++i){
            this.loadBuffer(this.urlList[i], i);
        }
    }
}

