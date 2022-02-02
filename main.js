function preload(){

}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}
function draw(){
    image(video,0,0,300,300);
    classifier.classify(video,gotresult);
}
function modelLoaded(){
    console.log("model loaded");
}

previous_result="";

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
            console.log(results);
            previous_result=results[0].label;
            var synth=window.speechSynthesis;
            var speak_data="THE OBJECT IS " + results[0].label;
            var utter_this=new SpeechSynthesisUtterance(speak_data);
            synth.speak(utter_this);
            document.getElementById("objname").innerHTML= results[0].label;
            document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(3);
            }
    }
}