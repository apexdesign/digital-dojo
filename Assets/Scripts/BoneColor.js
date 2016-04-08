#pragma strict

//Materials
var greenMat : Material;
var redMat : Material;

//The joint on the PLAYER that the script is paying attention to.
var targetJoint: Transform;

//The number in degrees that the player can be wrong and still be acceptable
var angleTolerance: float;
//The number in meters that the player can be wrong and still be acceptable
var heightTolerance: float; //was 0.3
var widthTolerance: float;

//The rotation of the Player's joint
static var playerOffset:float;
var playerError:float;
//The rotation of the bot's joint
var botOffset:float;
//The difference between the height of the player's limb and the height of the bot's
var heightError:float;
//The difference between the width of the player's limb and the height of the bot's
var widthError:float;

//PROBABLY TIME TO REMOVE
var botTemp:float;
var tempError:float;

private var botPlayerReCalibration:float = 55;

//Debug GUI strings
var botString: String;
var playerString: String;
var errorString:String;
var handString:String;
var botHandString:String;
var heightErrorString:String;
static var LArmAngleString:String;

//DEBUG bot values
static var lelbow:int;
static var relbow:int;
static var lknee:float;
static var rknee:float;

//player values
static var plelbow:int;
static var prelbow:int;
static var plknee:int;
static var prknee:int;

//Locate the marker game objects so that we can change their colors
static var markerLeftElbow:GameObject;
static var markerRightElbow:GameObject;
static var markerLeftKnee:GameObject;
static var markerRightKnee:GameObject;

//These booleans help Lesson_Script know whether or not each limb is lined up.

static var LeftElbowLocked:boolean = false;
static var RightElbowLocked:boolean = false;
static var LeftKneeLocked:boolean = false;
static var RightKneeLocked:boolean = false;

static var feedBackDiff:float;

function Start () {

	markerLeftElbow = GameObject.Find("LE_Marker");
	markerRightElbow = GameObject.Find("RE_Marker");
	markerLeftKnee = GameObject.Find("LK_Marker");
	markerRightKnee = GameObject.Find("RK_Marker");
}

function Update () {
	
	//feedBackDiff = Mathf.Abs((Mathf.Abs(HandTracker.botRFxValue - HandTracker.botxValue)) - (Mathf.Abs(HandTracker.LFxValue - HandTracker.xValue)));
	
	if(name == "L_Elbow_Rotation"){
		angleTolerance = 20;
		heightTolerance = .13;
		playerOffset = targetJoint.eulerAngles.y -180;
		botOffset = transform.eulerAngles.z;
		lelbow = botOffset;
		
		if(playerOffset < 0) {
			playerOffset = 0;
		}
		
		//Debugging
		//Debug.Log("player hand height = " + HandTracker.RyValue);
		//Debug.Log("bot hand height = " + HandTracker.botLyValue);
		//Debug.Log("difference = " + Mathf.Abs(HandTracker.RyValue - .2 - HandTracker.botLyValue));
		//Debug.Log("---------------------------------------------------");
		//Debug.Log("playerOffset = " + playerOffset);
		//Debug.Log("playerError = " + playerError);
		//Debug.Log("botOffset = " + botOffset);
		//Debug.Log("botOffset check up = " + transform.eulerAngles.z);
		if(MenuBtn_TextScript.inGame){
			markerLeftElbow.transform.renderer.enabled = true;
			//Measuring the players RIGHT hand
			if(/*(playerOffset <= (botOffset) + angleTolerance && playerOffset >= (botOffset) - angleTolerance) && */(Mathf.Abs((HandTracker.RyValue - .2) - HandTracker.botLyValue) < heightTolerance)) {
				markerLeftElbow.transform.renderer.material = greenMat;
				transform.renderer.material.color = Color.green;
				LeftElbowLocked = true;
			} else {
				markerLeftElbow.transform.renderer.material = redMat;
				transform.renderer.material.color = Color.red;	
				LeftElbowLocked = false;	
			}
		} else {
			markerLeftElbow.transform.renderer.enabled = false;
		}
	} else if(name == "R_Elbow_Rotation"){
		angleTolerance = 20;
		heightTolerance = .13;
		//------------------------------------------THE KEY TO THE PUZZLE
		playerOffset = targetJoint.eulerAngles.y;
		//Debug.Log("targetJoint name = " + targetJoint.name);
		botOffset = transform.eulerAngles.z;
		//Debug.Log("bot part name = " + transform.name);
		relbow = botOffset;
		
		if(playerOffset > 270) {
			playerOffset = 270 - (playerOffset - 270);
		}
		
		if(MenuBtn_TextScript.inGame){
			markerRightElbow.transform.renderer.enabled = true;
			if(/*(playerOffset <= (botOffset) + angleTolerance && playerOffset >= (botOffset) - angleTolerance) && */(Mathf.Abs((HandTracker.LyValue - .2) - HandTracker.botRyValue) < heightTolerance)) {
				markerRightElbow.transform.renderer.material = greenMat;
				transform.renderer.material.color = Color.green;
				RightElbowLocked = true;
			} else {
				markerRightElbow.transform.renderer.material.color = Color.red;
				transform.renderer.material = redMat;	
				RightElbowLocked = false;
			}
		} else {
			markerRightElbow.transform.renderer.enabled = false;
		}
	} else if(name == "L_Knee_Rotation"){
		//angleTolerance = 180;
		widthTolerance = .18;
		heightTolerance = .18;
		
		playerOffset = targetJoint.eulerAngles.z;
		botOffset = transform.eulerAngles.z;
		lknee = botOffset;
		/*
		if(playerOffset > 270) {
			playerOffset = 270 - (playerOffset - 270);
		}
		*/
		
		//Debugging
		//Debug.Log("---------------------------------------------------");
		//Debug.Log("BOT CHEST");
		//Debug.Log("x value = " + HandTracker.botxValue);
		//Debug.Log("y value = " + HandTracker.botyValue);
		//Debug.Log("");
		//Debug.Log("PLAYER CHEST");
		//Debug.Log("x value = " + HandTracker.xValue);
		//Debug.Log("y value = " + HandTracker.yValue);
		//Debug.Log("player foot height = " + HandTracker.RFyValue);
		//Debug.Log("x value player foot = " + HandTracker.RFxValue);
		//Debug.Log("bot foot height = " + HandTracker.botLFyValue);
		//Debug.Log("x value bot foot = " + HandTracker.botLFxValue);
		//Debug.Log("player difference = " + Mathf.Abs(HandTracker.RFxValue - HandTracker.xValue));
		//Debug.Log("bot difference = " + Mathf.Abs(HandTracker.botLFxValue - HandTracker.botxValue));
		//Debug.Log("---------------------------------------------------");
		//Debug.Log("playerOffset = " + playerOffset);
		//Debug.Log("playerError = " + playerError);
		//Debug.Log("botOffset = " + botOffset);
		//Debug.Log("botOffset check up = " + transform.eulerAngles.z);
		
		/*
		//CHECK TO SEE IF CHESTS ARE MATCHING
		//WORKING!!!!
		if(Mathf.Abs(HandTracker.yValue - HandTracker.botyValue) < heightTolerance) {
		
		}
		*/
		if(MenuBtn_TextScript.inGame){
			markerLeftKnee.transform.renderer.enabled = true;
			if((Mathf.Abs(((Mathf.Abs(HandTracker.botLFxValue - HandTracker.botxValue)) - .45) - (Mathf.Abs(HandTracker.RFxValue - HandTracker.xValue))) < widthTolerance) && (Mathf.Abs(HandTracker.RFyValue - HandTracker.botLFyValue) < heightTolerance)) {
				markerLeftKnee.transform.renderer.material = greenMat;
				transform.renderer.material.color = Color.green;
				LeftKneeLocked = true;
			} else {
				markerLeftKnee.transform.renderer.material = redMat;
				transform.renderer.material.color = Color.red;
				LeftKneeLocked = false;
			}
		} else {
			markerLeftKnee.transform.renderer.enabled = false;
		}
		/*
		if((Mathf.Abs(HandTracker.RFyValue - HandTracker.botLFyValue) < heightTolerance)) {
			transform.renderer.material.color = Color.green;
		} else {
			transform.renderer.material.color = Color.red;
		}
		*/
	} else if(name == "R_Knee_Rotation"){
		//angleTolerance = 180;
		widthTolerance = .18;
		heightTolerance = .18;
		//------------------------------------------THE KEY TO THE PUZZLE
		playerOffset = targetJoint.eulerAngles.z;
		//Debug.Log("targetJoint name = " + targetJoint.name);
		botOffset = transform.eulerAngles.z;
		//Debug.Log("bot part name = " + transform.name);
		rknee = botOffset;
		/*
		if(playerOffset > 270) {
			playerOffset = 270 - (playerOffset - 270);
		}
		*/
		//Debug.Log("---------------------------------------------------");
		//Debug.Log("BOT CHEST");
		//Debug.Log("x value = " + HandTracker.botxValue);
		//Debug.Log("y value = " + HandTracker.botyValue);
		//Debug.Log("");
		//Debug.Log("PLAYER CHEST");
		//Debug.Log("x value = " + HandTracker.xValue);
		//Debug.Log("y value = " + HandTracker.yValue);
		//Debug.Log("player foot height = " + HandTracker.RFyValue);
		//Debug.Log("x value player foot = " + HandTracker.RFxValue);
		//Debug.Log("bot foot height = " + HandTracker.botLFyValue);
		//Debug.Log("x value bot foot = " + HandTracker.botLFxValue);
		//Debug.Log("player difference = " + Mathf.Abs(HandTracker.LFxValue - HandTracker.xValue));
		//Debug.Log("bot difference = " + Mathf.Abs(HandTracker.botRFxValue - HandTracker.botxValue));
		//Debug.Log("---------------------------------------------------");
		//Debug.Log("playerOffset = " + playerOffset);
		//Debug.Log("playerError = " + playerError);
		//Debug.Log("botOffset = " + botOffset);
		//Debug.Log("botOffset check up = " + transform.eulerAngles.z);
		
		/*
		//CHECK TO SEE IF CHESTS ARE MATCHING
		//WORKING!!!!
		if(Mathf.Abs(HandTracker.yValue - HandTracker.botyValue) < heightTolerance) {
		
		}
		*/
		if(MenuBtn_TextScript.inGame){
			markerRightKnee.transform.renderer.enabled = true;
			if((Mathf.Abs(((Mathf.Abs(HandTracker.botRFxValue - HandTracker.botxValue)) - .75) - (Mathf.Abs(HandTracker.LFxValue - HandTracker.xValue))) < widthTolerance) && (Mathf.Abs(HandTracker.LFyValue - HandTracker.botRFyValue) < heightTolerance)) {
				markerRightKnee.transform.renderer.material = greenMat;
				transform.renderer.material.color = Color.green;
				RightKneeLocked = true;
			} else {
				markerRightKnee.transform.renderer.material = redMat;
				transform.renderer.material.color = Color.red;
				RightKneeLocked = false;
			}
		} else {
			markerRightKnee.transform.renderer.enabled = false;
		}
		/*
		if((Mathf.Abs(HandTracker.RFyValue - HandTracker.botLFyValue) < heightTolerance)) {
			transform.renderer.material.color = Color.green;
		} else {
			transform.renderer.material.color = Color.red;
		}
		*/
	}
	
	//DEBUGGING

	//Debug.Log("Demo Angles = " + transform.parent.eulerAngles.x);
	//Debug.Log("My Angles = " + targetJoint.eulerAngles.x);
}

function OnGUI (){
	
	//DEBUGGING GUI
	//botString = "Instructor angle = " + Mathf.RoundToInt(botValue);
	//botString = "Instructor angle = " + Mathf.RoundToInt(transform.parent.eulerAngles.x);
	//botString = "Instructor angle = " + Mathf.RoundToInt(botTemp);
	//playerString = "Player angle = " + Mathf.RoundToInt(playerError);
	//playerString = "Player angle = " + Mathf.RoundToInt(targetJoint.eulerAngles.x);
	//playerString = "Player angle = " + Mathf.RoundToInt(playerOffset);
	//errorString = "Total error = " + Mathf.RoundToInt(totalError);
	//handString = "Hand y pos = " + HandTracker.RyValue;
	//botHandString = "Bot hand y pos = " + HandTracker.botLyValue;
	//heightErrorString = "Height Error = " + heightError; 
	//LArmAngleString = "Slope angle of left arm = " + HandTracker.RASlope;
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 160, 200, 30), botString);
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 180, 200, 30), playerString);
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 200, 200, 30), errorString);
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 220, 200, 30), handString);
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 240, 200, 30), botHandString);
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 260, 200, 30), heightErrorString);	
	//GUI.Label (Rect (Screen.width/4 - 150, Screen.height/2 - 280, 1000, 30), LArmAngleString);
	
}
