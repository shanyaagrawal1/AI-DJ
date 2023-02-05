song="";
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristx= 0;
leftWristy= 0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,500,500);
    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2){
        
    circle(leftWristx-85, leftWristy, 20);

    InNumberleftwristy=Number(leftWristy);
    remove_decimal=floor(InNumberleftwristy);
    volume=remove_decimal/500;

    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }


    if(scoreRightWrist > 0.2){
        
        circle(rightWristx-45, rightWristy, 20);

        if(rightWristy>0 && rightWristy<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        if(rightWristy>100 && rightWristy<=200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        if(rightWristy>200 && rightWristy<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        if(rightWristy>300 && rightWristy<=400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        if(rightWristy>400){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("PoseNet has been initialized!");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristx+ "Right Wrist Y = "+rightWristy);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristx+ "Left Wrist Y = "+leftWristy);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = "+scoreLeftWrist+" Right Wrist Score = "+scoreRightWrist);
    }
}