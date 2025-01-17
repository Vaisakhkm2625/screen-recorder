'use strict';
const record_el = document.getElementById('record');
const blank_black_board_el = document.getElementById('blank_black_board');
const record_wrapper_el= document.getElementById('record_wrapper');
const screenRecording_vid_el = document.getElementById('screenRecording_vid');
const recorded_vid_wrapperel_el =document.getElementById('recorded_vid_wrapper');
const message_el = document.getElementById('message');
const play_el = document.querySelector('.play');
const pause_el = document.querySelector('.pause');
const download_el = document.querySelector('.download');
play_el.disabled =true;
// pause_el.disabled =true;


let stream;
let audio;
let mediaRecorder;

 



const gdmOptions = {
    video: {
      cursor: "always"
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    }
  }

  //play the recorded video
    play_el.onclick=()=>{
      play_el.style.opacity =0;
      recorded_vid_wrapperel_el.play();
      pause_el.style.opacity = 1;
    }

    pause_el.onclick=()=>{
      play_el.style.opacity =1;
      recorded_vid_wrapperel_el.pause();
      pause_el.style.opacity = 0;
    }
 
  function displayCaptureStreamToCaptureVideoEl(mediaRecorder){
    screenRecording_vid_el.style.display ='block';
    screenRecording_vid_el.srcObject = mediaRecorder;
    
  }

  async function changeCapturedStreamToRecordedMedia(stream){
    let recordedObj =[];
    //keeping track recording stream for usage
      mediaRecorder = await new MediaRecorder(stream,{
  mimeType: 'video/webm;codecs=VP8',
});
      mediaRecorder.start();
     
      mediaRecorder.ondataavailable = (e)=>{
        if (e.data) {
          recordedObj.push(e.data);
        }
      }

      mediaRecorder.onstop =()=>{
        const blob = new Blob(recordedObj, {type:recordedObj[0].type})
        recorded_vid_wrapperel_el.src = URL.createObjectURL(blob);
        screenRecording_vid_el.style.display ='none';
        recorded_vid_wrapperel_el.style.display ='block';
        recorded_vid_wrapperel_el.style.display ='block';
        document.querySelector('.play_pause_downlaod_wrapper').style.display ='block';
        play_el.disabled =false;
        // pause_el.disabled =false;
       
      }

  }

  async function screenCapture(){
    
    try {
      stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
      displayCaptureStreamToCaptureVideoEl(stream);
      changeCapturedStreamToRecordedMedia(stream);
     
  }catch (error) {
    message_el.textContent = error.message;
  }
}

record_el.onclick = ()=>{
    blank_black_board_el.remove();
    record_wrapper_el.remove();
     screenCapture();
   
}

