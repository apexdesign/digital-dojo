#pragma strict

//VARS
//startTime keeps track of the time as soon as the build runs.
//textTime is the string value that prints in the GUI
private var startTime:int;
var textTime : String;

//DEBUGGING VARS
var iString : String;
var timerString : String;
var baseString : String;
var tLengthString : String;
var bLengthString : String;
var timerLabel : String;

//mainTimer keeps track of the time since the application started
//baseTimesArr holds the time values when the mouse is clicked (the 'latestTime')
var mainTimer:int; 
var baseTimesArr = new Array ();

//this array will run parallel with baseTimesArr
//however, it will be filled with strings that keep track of each timer.
var labelTimesArr = new Array ();

//The time value for the moment the timer is started
var latestTime:int;
//The label given to the newest timer
var latestLabel:String;

//The specific time value, fetched from baseTimesArr
var thisBase:int;

private var guiSpacer: int = 20;

var minutes: int;
var seconds: int;
var totalSec: int;

private var killTime:int = 3;
static var navTimerActivated:boolean = false;

static var navRightOrLeft : String = "";
static var whichSlide: int;
static var hand:String;

//These two sections attach variables to gameobjects so that we can use their scripts
//Specifically tutorialIngSwap and tutorial Screen 
var tutImgScriptOBJ : GameObject;
tutImgScriptOBJ = GameObject.Find("imgPlane");
var tutImgScriptOBJScript : tutorialImgSwap;
tutImgScriptOBJScript = tutImgScriptOBJ.GetComponent(typeof(tutorialImgSwap)) as tutorialImgSwap;

var tutScriptOBJ : GameObject;
tutScriptOBJ = GameObject.Find("textBox");
var tutScriptOBJScript : tutorialScreen;
tutScriptOBJScript = tutScriptOBJ.GetComponent(typeof(tutorialScreen)) as tutorialScreen;

//GameObjects
var mainCam:GameObject;
static var tutBG:GameObject;
static var tutTEXT:GameObject;
var feedbackTEXT:GameObject;

function Awake () {

	mainCam = GameObject.Find("Main Camera");
   (mainCam.GetComponent(Camera) as Camera).enabled = true;
		
	//As soon as the program starts, set startTime and latestTime to Time.time
	startTime = Mathf.RoundToInt(Time.time);
	latestTime = Mathf.RoundToInt(Time.time);
	
	tutBG = GameObject.Find("TutorialPlane");
	tutTEXT = GameObject.Find("textBox");
	feedbackTEXT = GameObject.Find("Feedback");
}

function OnGUI () {
	//Updates the timer
	mainTimer = Mathf.RoundToInt(Time.time) - startTime;
	
	for(var i:int = 0; i < baseTimesArr.length; i++) {		
		//Set i's 'basetime'
		thisBase = baseTimesArr[i];
		
		//Calculate minutes and seconds
		minutes = (mainTimer - thisBase) / 60;
		seconds = (mainTimer - thisBase) % 60;
		
		totalSec = (minutes * 60) + seconds;
		
		//If a timer reaches it limit
		if(totalSec >= killTime){
			//remove the timer from the array
			baseTimesArr.RemoveAt(i);
			if (!tutorialScreen.activeTut){
				if(MenuBuilder.backToMain){
					backToMainMenu();
				} else if(cornerIcon_Script.inGameMenu){
					inGameMenuSystem();
				} else if(MenuBuilder.inGameMenuUp){
					fromGame();
					/*
					if(MenuBuilder.targetZone == "item_1"){
						Debug.Log("One");	
						MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play(MenuBtn_Script.currentTechnique);
						MenuBtn_Script.characterMesh.transform.renderer.enabled = true;
						MenuBuilder.inGameMenuUp = false;
						MenuBtn_TextScript.inGame = true;
						Debug.Log("hideBtns Checkpoint 3");
						MenuBuilder.hideBtns = true;	
						MenuBtn_Script.progress = false;	
					} else if(MenuBuilder.targetZone == "item_2"){
						Debug.Log("Two");
					} else if(MenuBuilder.targetZone == "item_3"){
						Debug.Log("Three");
					} else if(MenuBuilder.targetZone == "item_4"){
						backToMainMenu();
						Debug.Log("Four");
					}*/
					//Debug.Log("Before = " + MenuBtn_TextScript.inGame);
				} else if(!Spinnerz.backFromNav){
					inGameMenuSystem();
					Spinnerz.navigationMode = false;
					
					//Debugging
					//Debug.Log("original pos = " + cameraOrbit.originalPos);
					
					mainCam.transform.position = cameraOrbit.originalPos;
					mainCam.transform.eulerAngles.x = cameraOrbit.originalRotX;
					mainCam.transform.eulerAngles.y = cameraOrbit.originalRotY;
					mainCam.transform.eulerAngles.z = cameraOrbit.originalRotZ;
					
					Spinnerz.backFromNav = true;
					//MenuBtn_TextScript.inGame = true;
				} else {
					//Debug.Log("It's working, it's working!");
					navTimerActivated = true;
				}
			} else if (tutorialScreen.activeTut){
			//If the tutorial screen is up
				tutorialScreen.activeTut = false;
				
				if(hand == "right" && tutorialScreen.resultsMenu){
					Debug.Log("Is there any body out there?!!?!??!1");
					tutorialScreen.navUp = false;
					Feedback_txt.showFeedBack = false;
					
					toWhiteBelt();
					
					MenuBtn_Script.characterMesh.renderer.enabled = false;
					MenuBuilder.hideBtns = false;
					
					tutBG.transform.renderer.enabled = false;
					tutTEXT.transform.renderer.enabled = false;
					
					tutorialScreen.manualNavigation = false;
					tutorialScreen.resultsMenu = false;
					
					Lessons_Script.stopAnimation = false;
					
					if(mainCam.transform.position != cameraOrbit.originalPos){
						mainCam.transform.position = cameraOrbit.originalPos;
						mainCam.transform.eulerAngles.x = cameraOrbit.originalRotX;
						mainCam.transform.eulerAngles.y = cameraOrbit.originalRotY;
						mainCam.transform.eulerAngles.z = cameraOrbit.originalRotZ;
					}
				} else if(hand == "right" && tutorialScreen.imgCounter == 8) {
				
					tutorialScreen.manualNavigation = false;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
					tutorialScreen.navUp = false;
					//tutorialScreen.introTutOver = true;
					
					if(Lessons_Script.currentLesson != "bows"){
						MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play(MenuBtn_Script.currentTechnique);
					}
					MenuBtn_Script.characterMesh.transform.renderer.enabled = true;
					MenuBuilder.inGameMenuUp = false;
					MenuBtn_TextScript.inGame = false;
					//MenuBuilder.hideBtns = true;
					Spinnerz.navigationMode = true;
					
				} else if(hand == "right" && tutorialScreen.imgCounter == 7) {
					tutorialScreen.imgCounter ++;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
				
				} else if(hand == "right" && (tutorialScreen.imgCounter == 4)) {
				
					tutorialScreen.manualNavigation = false;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
					tutorialScreen.navUp = false;
					tutorialScreen.introTutOver = true;
				} else if(hand == "right" && tutorialScreen.imgCounter <=4){
				
					tutorialScreen.imgCounter ++;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
				} else if (hand == "left" && (tutorialScreen.imgCounter >= 2 && tutorialScreen.imgCounter <= 4)) {
				
					tutorialScreen.imgCounter --;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
				} else if(hand == "left" && tutorialScreen.imgCounter == 8) {
					tutorialScreen.imgCounter --;
					tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[tutorialScreen.imgCounter]);
					tutImgScriptOBJScript.swapTutImage(tutorialScreen.imgCounter);
					
				}
			}
		}
		
		//Fill textTime string and print i's value
		textTime = String.Format ("{0:00}:{1:00}", minutes, seconds);
		GUI.Label (Rect (300, (25 + (i * guiSpacer)), 100, 30), textTime);
		
		//DEBUGGING
		
		iString = "i = " + i; // this incriments by 1 from 0 w/ each new timer
		timerString = "mainTimer = " + mainTimer; //this remains constant w/ each new timer
		baseString = "thisBase = " + thisBase; // this incriments by 1 from 0 w/ each new timer
		timerLabel = "timer label = " + latestLabel;
		GUI.Label (Rect (380, (25 + (i * guiSpacer)), 100, 30), iString);
		GUI.Label (Rect (460, (25 + (i * guiSpacer)), 100, 30), timerString);
		GUI.Label (Rect (560, (25 + (i * guiSpacer)), 100, 30), baseString);
		GUI.Label (Rect (660, (25 + (i * guiSpacer)), 140, 30), timerLabel);
				
	}
	//DEBUGGING
	
	bLengthString = "Size of the array = " + baseTimesArr.length;
	GUI.Label (Rect (560, 10, 200, 30), bLengthString);
	
}

function clearAllTimers () {
	
	baseTimesArr.Clear();
	labelTimesArr.Clear();
}

function hoverStartTimer () {
	
	baseTimesArr.Clear();
	latestTime = Mathf.RoundToInt(Time.time);
	baseTimesArr.Push(latestTime);
}

function hoverLabelTimer () {

	labelTimesArr.Clear();
	latestLabel = MenuBuilder.targetZone;
}

function navStartTimer (navRightOrLeft) {

	hand = navRightOrLeft;
	baseTimesArr.Clear();
	latestTime = Mathf.RoundToInt(Time.time);
	baseTimesArr.Push(latestTime);
}

function backToMainMenu () {

	//Brings you from white belt menu, back to main menu
	MenuBuilder.backToMain = false;
	MenuBtn_TextScript.mainMenu = true;
	MenuBtn_TextScript.whiteBelt = false;
	MenuBtn_TextScript.inGame = false;
	MenuBuilder.inGameMenuUp = false;

	//Resets all disabled buttons to default 'white' color
	MenuBuilder.item1Disabled = false;
	MenuBuilder.item2Disabled = false;
	MenuBuilder.item3Disabled = false;
	MenuBuilder.item4Disabled = false;
	
	MenuBtn_Script.currentTechnique = "";
	Lessons_Script.currentLesson = "";
}

function toWhiteBelt () {

	//Brings you from white belt menu, back to main menu
	MenuBuilder.backToMain = false;
	MenuBtn_TextScript.mainMenu = false;
	MenuBtn_TextScript.whiteBelt = true;
	MenuBtn_TextScript.inGame = false;
	MenuBuilder.inGameMenuUp = false;

	//Resets all disabled buttons to default 'white' color
	MenuBuilder.item1Disabled = false;
	MenuBuilder.item2Disabled = false;
	MenuBuilder.item3Disabled = false;
	MenuBuilder.item4Disabled = false;
	
	MenuBtn_Script.currentTechnique = "";
	Lessons_Script.currentLesson = "";
}

function inGameMenuSystem () {
	MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Stop();
	MenuBtn_Script.characterMesh.transform.renderer.enabled = false;
	
	//Feedback_txt.banner.transform.renderer.enabled = false;
	//feedbackTEXT.transform.renderer.enabled = false;
	Feedback_txt.showFeedBack = false;
	
	cornerIcon_Script.inGameMenu = false;
	MenuBtn_TextScript.mainMenu = false;
	MenuBtn_TextScript.whiteBelt = false;
	MenuBtn_TextScript.inGame = false;
	
	MenuBuilder.item1Disabled = false;
	MenuBuilder.item2Disabled = false;
	MenuBuilder.item3Disabled = false;
	MenuBuilder.item4Disabled = false;
	
	MenuBuilder.inGameMenuUp = true;
	
	MenuBuilder.hideBtns = false;
	
	if(mainCam.transform.position != cameraOrbit.originalPos){
		mainCam.transform.position = cameraOrbit.originalPos;
		mainCam.transform.eulerAngles.x = cameraOrbit.originalRotX;
		mainCam.transform.eulerAngles.y = cameraOrbit.originalRotY;
		mainCam.transform.eulerAngles.z = cameraOrbit.originalRotZ;
	}
}

function fromGame () {
	
	if(MenuBuilder.targetZone == "item_1"){
		//Debug.Log("One");	
		if(Lessons_Script.currentLesson == "bows"){
			Feedback_txt.showFeedBack = true;
			MenuBtn_Script.characterMesh.transform.renderer.enabled = true;
		} else {
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play(MenuBtn_Script.currentTechnique);
			MenuBtn_Script.characterMesh.transform.renderer.enabled = true;
			
		}
		
		MenuBuilder.inGameMenuUp = false;
		MenuBtn_TextScript.inGame = true;
		Debug.Log("hideBtns Checkpoint 4");
		MenuBuilder.hideBtns = true;
		
		//Match camera back to where the user put it
		mainCam.transform.position.x = cameraOrbit.currentPos.x;
		mainCam.transform.position.y = cameraOrbit.currentPos.y;
		mainCam.transform.position.z = cameraOrbit.currentPos.z;
		
		mainCam.transform.eulerAngles.x = cameraOrbit.currentRotX;
		mainCam.transform.eulerAngles.y = cameraOrbit.currentRotY;
		mainCam.transform.eulerAngles.z = cameraOrbit.currentRotZ;
				
	} else if(MenuBuilder.targetZone == "item_2"){
		
		tutScriptOBJScript.ToggleTutorial(tutorialScreen.tutMessageArr[7]);
		tutImgScriptOBJScript.swapTutImage(7);
		tutorialScreen.imgCounter = 7;
		tutorialScreen.navUp = true;
		tutorialScreen.manualNavigation = true;
		
		/*
		MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play(MenuBtn_Script.currentTechnique);
		MenuBtn_Script.characterMesh.transform.renderer.enabled = true;
		*/
		MenuBuilder.inGameMenuUp = false;
		MenuBtn_TextScript.inGame = false;
		Debug.Log("hideBtns Checkpoint 5");
		MenuBuilder.hideBtns = true;
		Lessons_Script.animating = false;
		//Spinnerz.navigationMode = true;
		//Debug.Log("Two");
		
	} else if(MenuBuilder.targetZone == "item_3"){
		toWhiteBelt();
		
		cameraOrbit.currentPos = cameraOrbit.originalPos;
		cameraOrbit.currentRotX = cameraOrbit.originalRotX;
		cameraOrbit.currentRotY = cameraOrbit.originalRotY;
		cameraOrbit.currentRotZ = cameraOrbit.originalRotZ;
		
		Lessons_Script.step = 1;
		Lessons_Script.animating = false;
		Lessons_Script.stopAnimation = false;
		//Debug.Log("Three");
	} else if(MenuBuilder.targetZone == "item_4"){
		backToMainMenu();
		
		cameraOrbit.currentPos = cameraOrbit.originalPos;
		cameraOrbit.currentRotX = cameraOrbit.originalRotX;
		cameraOrbit.currentRotY = cameraOrbit.originalRotY;
		cameraOrbit.currentRotZ = cameraOrbit.originalRotZ;
		
		Lessons_Script.step = 1;
		Lessons_Script.bow = false;
		Lessons_Script.animating = false;
		Lessons_Script.stopAnimation = false;
		//Debug.Log("Four");
	}	
}