song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rigthWristX = 0;
rigthwristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";
scoreRightWrist = 0;


function preload()
{
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");

}

function setup() {

    canvas = createCanvas(600,500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {

    image(video,0,0,600,500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "playing-peter pan song";
        }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rigthwristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "playing-harry potter theme song";
        }
    }
}

function play()
{
 song.play();   
 song.setVolume(1);
 song.rate(1);
 
}


function modelLoaded() {
    console.log('poseNet is Initialized');


}

function gotPoses(results)
{

    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = " + leftWristY)

        rightWristX =   results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY)

    }
}