#pragma strict

// This script is used to construct a circlular menu around a specified radius.

private var menuRadius: float = 1;
var menuButton : Transform; // MenuItem_v03

var menuOriginX: float;
var menuOriginY: float;

private var menuOffsetX:float;
private var menuOffsetY:float;

// The number of degrees that I'm working with out of 360 for this menu
static var menuDegrees:float = 120;

//Which button is the user pointing at?
static var targetZone:String = "";

//Changing numMenuItems will work, but the selection does not change as you would expect
static var numMenuItems: int = 4;
private var menuSpacing:float = menuDegrees/(numMenuItems - 1);

static var menuValuePos:float;

//This names the buttons 0, 1, 2, 3, etc.
//For some reason, the first button is 3...
private var menuItemName:String = "";
static var menuBuilt:boolean = false;

static var backToMain:boolean = false;

//This 
static var inGameMenuUp:boolean = false;
static var activateInGame:boolean = false;

//Allows this script to access functions in timeArray script attached to "timer_GO"
var timerScriptOBJ : GameObject;
timerScriptOBJ = GameObject.Find("timer_GO");
var timerScriptOBJScript : timerArray;
timerScriptOBJScript = timerScriptOBJ.GetComponent(typeof(timerArray)) as timerArray;

//Let's us know whether the buttons should be there or not
//Debug.Log("hideBtns Checkpoint 1");
static var hideBtns:boolean = false;

//These four variables determine which buttons should be disabled.
//Ideally, this would be handled with an array of booleans down the road.
static var item1Disabled:boolean = false;
static var item2Disabled:boolean = false;
static var item3Disabled:boolean = false;
static var item4Disabled:boolean = false;

//Prints the current frames per second for the current frame
var fps;

function Update () {
	
	//Debug.Log("progress?? = " + MenuBtn_Script.progress);
	
	fps = 1.0/Time.deltaTime;
	//Debug.Log("fps = " + fps);
	if(timerArray.navTimerActivated == true){
		//Debug.Log("Timer activated = " + timerArray.navTimerActivated);
	}
	
	//Debug.Log("PLAYER CHEST");
	//Debug.Log("x value = " + HandTracker.xValue);
	//Debug.Log("y value = " + HandTracker.yValue);
	
	//Debug.Log("--------------------------------------------");
	//Debug.Log("mainMenu = " + MenuBtn_TextScript.mainMenu);
	//Debug.Log("whiteBelt = " + MenuBtn_TextScript.whiteBelt);
	//Debug.Log("inGame = " + MenuBtn_TextScript.inGame);
	//Debug.Log("inGameMenuUp = " + inGameMenuUp);
	//Debug.Log("Spinnerz.backFromNav = " + !Spinnerz.backFromNav);
	
	if((tutorialScreen.introTutOver == true && menuBuilt == false) || (tutorialScreen.DebugMode == true && menuBuilt == false)) {
		// These variables ensure that the circle will be built around the manipulator, regardless of where the menu is in 3D space.
		menuOriginX = transform.localPosition.x;
		menuOriginY = transform.localPosition.y;
		
		for (var i:int = 0; i < numMenuItems; i++){
			//Debug.Log("i = " + i);
			/*
			Calculate the angle in radians
			for i = 0, menuValuePos = 1.02
			for i = 1, menuValuePos = .34
			for i = 2, menuValuePos = -.34
			for i = 3, menuValuePos = -1.02
			*/
			menuValuePos = ((menuDegrees/2) - (menuSpacing * i))*.01745329;
			//Debug.Log("menuValuePos = " + menuValuePos);
			
			menuItemName = (i+1).ToString();
			//Debug.Log("menuItemName = " + menuItemName);
			//Debug.Log("Angle = " + menuDegrees + " - (" + menuSpacing + " * " + i + ") = " + menuValuePos);
			//Debug.Log("1.25sin(Q) = " + (menuRadius * Mathf.Sin(20)));
			//Debug.Log((menuRadius + "sin(" + menuValuePos + ") = " + (menuRadius * Mathf.Sin(menuValuePos))));
			
			menuOffsetX = Mathf.Cos(menuValuePos) * menuRadius;
			//Debug.Log("menuOffsetX = " + menuOffsetX);
			menuOffsetY = Mathf.Sin(menuValuePos) * menuRadius;
			//Debug.Log("menuOffsetY = " + menuOffsetY);
			
			menuButton.name = "item_" + menuItemName;
			
			Instantiate (menuButton, Vector3(menuOriginX + menuOffsetX, menuOriginY + menuOffsetY, 0), Quaternion.identity);
		}
		
		menuBuilt = true;
		
	} else if (menuBuilt == true) {
	
		// THIS IS BUTTON SELECTION BASED ON ANGLES
		if(HandTracker.RASlope > 90 && HandTracker.RASlope < 140) {
			targetZone = "item_1";
			
		} else if(HandTracker.RASlope <= 90 && HandTracker.RASlope > 60) {
			targetZone = "item_2";
			
		} else if(HandTracker.RASlope <= 60 && HandTracker.RASlope > 30) {
			targetZone = "item_3";
			
		} else if(HandTracker.RASlope <= 30 && HandTracker.RASlope > -10) {
			targetZone = "item_4";
			
		} else if((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && !tutorialScreen.activeTut && !backToMain) {
			//If the user raises their left hand, we activate the 'back' gesture
			targetZone = "";
			//Debug.Log("Activated");
			if(MenuBtn_TextScript.whiteBelt == true && !backToMain){
				timerScriptOBJScript.hoverStartTimer();
				timerScriptOBJScript.hoverLabelTimer();
				backToMain = true;
			}
		} else if((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && !tutorialScreen.activeTut && backToMain){
			//If the user raises holds their left hand out, we activate the 'hover' command
			targetZone = "";
			//Debug.Log("Hovering");
		} else if(backToMain){
		//If the user lowers their left hand, we deactivate the 'back' gesture
			targetZone = "";
			backToMain =false;
			timerScriptOBJScript.clearAllTimers();
			//Debug.Log("Deactivated");
		} else {
			targetZone = "";
			
		}
	}
}