#pragma strict

//Before the bone is moved, it should be this value
var defaultBonePos: float = 0.0;

//PLAYER TRACKERS
//L_Hand
static var RxValue: float;
static var RyValue: float;
//R_Hand
static var LxValue: float;
static var LyValue: float;
static var LzValue: float;
//Spine_1
static var xValue: float;
static var yValue: float;
static var zValue: float;
//R_Foot
static var LFxValue: float;
static var LFyValue: float;
static var LFzValue: float;
//L_Foot
static var RFxValue: float;
static var RFyValue: float;
static var RFzValue: float;
//L_Shoulder
static var RShxValue: float;
static var RShyValue: float;

//BOT TRACKERS
//bot 'LeftHand'
static var botLyValue: float;
//bot 'RightHand'
static var botRyValue: float;
//bot 'Chest'
static var botyValue: float;
static var botxValue: float;
//bot 'Left Foot'
static var botLFxValue: float;
static var botLFyValue: float;
//bot 'Right Foot'
static var botRFxValue: float;
static var botRFyValue: float;

//CALCULATIONS
//Distance for zoom
static var LzDifference: float;
//R_Arm Slope
static var RASlope:float;

function Start () {
	RxValue = defaultBonePos;
	RyValue = defaultBonePos;
	LxValue = defaultBonePos;
	LyValue = defaultBonePos;
	LzValue = defaultBonePos;
	xValue = defaultBonePos;
	yValue = defaultBonePos;
	zValue = defaultBonePos;
	LFxValue = defaultBonePos;
	LFyValue = defaultBonePos;
	LFzValue = defaultBonePos;
	RFxValue = defaultBonePos;
	RFyValue = defaultBonePos;
	RFzValue = defaultBonePos;
	RShxValue = defaultBonePos;
	RShyValue = defaultBonePos;
	botLyValue = defaultBonePos;
	botRyValue = defaultBonePos;
	botyValue = defaultBonePos;
	botxValue = defaultBonePos;
	botLFxValue = defaultBonePos;
	botLFyValue = defaultBonePos;
	botRFxValue = defaultBonePos;
	botRFyValue = defaultBonePos;
}

function Update () {

//Runs through each bone, sets x, y, z values based on the appropriate joint
	if (OpenNISingleSkeletonController.IsTracking) {
		if(name == "Spine_1"){
			xValue = transform.position.x;
			yValue = transform.position.y;
			zValue = transform.position.z;
			//Debug.Log("Base z position = " + zValue);
		}
		
		if(name == "L_Hand"){
			RxValue = transform.position.x;
			RyValue = transform.position.y;
			//Debug.Log("Right hand X position = " + RxValue);
		}
		
		if(name == "R_Hand"){
			LxValue = transform.position.x;	
			LyValue = transform.position.y;
			LzValue = transform.position.z;	
		}
		
		if(name == "Mia:LeftHand"){
			botLyValue = transform.position.y;
			//Debug.Log("this is the word ---------------- " + botLyValue);
			//Debug.Log("Left hand Z position = " + LzValue);
		}
		
		if(name == "Mia:RightHand"){
			botRyValue = transform.position.y;	
			//Debug.Log("Left hand Z position = " + LzValue);
		}
		
		if(name == "Mia:Spine2") {
			botyValue = transform.position.y;
			botxValue = transform.position.x;
		}
		
		if(name == "LFoot_NULL") {
			botLFxValue = transform.position.x;
			botLFyValue = transform.position.y;
		}
		
		if(name == "RFoot_NULL") {
			botRFxValue = transform.position.x;
			botRFyValue = transform.position.y;
		}
		
		if(name == "R_Ankle"){
			LFxValue = transform.position.x;
			LFyValue = transform.position.y;	
			LFzValue = transform.position.z;	
		}
		
		if(name == "L_Ankle"){
			RFxValue = transform.position.x;
			RFyValue = transform.position.y;	
			RFzValue = transform.position.z;	
		}
		
		if (name == "L_Shoulder") {
			RShxValue = transform.position.x;
			RShyValue = transform.position.y;
		}
		
		//This calculates the depth between the left hand and the chest
		//The value is used for the 'zoom' feature in navigation mode
		LzDifference = zValue - LzValue;
		
		//This calculates the slope created by the vector between the right shoulder and the right hand
		//The value is used to decide which menu item the user is selecting
		RASlope = ((((RyValue - RShyValue)/(RxValue - RShxValue))+1)*60);
		//Debug.Log("Slope angle of left arm = " + (RyValue - RShyValue)/(RxValue - RShxValue));
		
	} else {
		//Keep the variables clean, just for fun
		/*
		RxValue = defaultBonePos;
		RyValue = defaultBonePos;
		LxValue = defaultBonePos;
		LyValue = defaultBonePos;
		LzValue = defaultBonePos;
		xValue = defaultBonePos;
		yValue = defaultBonePos;
		zValue = defaultBonePos;
		LFxValue = defaultBonePos;
		LFyValue = defaultBonePos;
		LFzValue = defaultBonePos;
		RFxValue = defaultBonePos;
		RFyValue = defaultBonePos;
		RFzValue = defaultBonePos;
		RShxValue = defaultBonePos;
		RShyValue = defaultBonePos;
		botLyValue = defaultBonePos;
		botRyValue = defaultBonePos;
		*/

	}
}