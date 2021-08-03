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
pause_el.disabled =true;
download_el.disabled =true;

let mediaRecorder
 



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

   function stopState(stream){
      let checkStop =  new MediaRecorder(stream, {mimeType:"video/webm"});
      checkStop.ondataavailable =(e)=>{
        if(e.data && e.data.size > 0){
          checkStop.stop();
          play_el.disabled =false;
          pause_el.disabled =false;
          download_el.disabled =false; 
          console.log('hello');
        }
      }
    //  console.log(checkStop);
  }

  function displayCaptureStreamToCaptureVideoEl(mediaRecorder){
    screenRecording_vid_el.style.display ='block';
    screenRecording_vid_el.srcObject = mediaRecorder;
    
  }

  
  async function screenCapture(){
    
    try {
      mediaRecorder = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
      stopState(mediaRecorder);
      displayCaptureStreamToCaptureVideoEl(mediaRecorder);
     
    } catch (error) {
      message_el.textContent = error.message;
    }
    
    
  }

record_el.onclick = ()=>{
    blank_black_board_el.remove();
    record_wrapper_el.remove();
    // play_el.disabled =true
     screenCapture();
    
}

// console.log(mediaRecorder);
