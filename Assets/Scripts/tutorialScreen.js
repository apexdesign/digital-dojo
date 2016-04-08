#pragma strict

//var textArr = new Array("one", "two", "three");
var tutorialText:String;
var tm:TextMesh;
tm = gameObject.GetComponent(TextMesh);
tm.text =  "";

var resultMessage:String;
var resultsText:String;

var extraText:String;
var tmTwo:TextMesh;
tmTwo = gameObject.Find("xtra_textBox").GetComponent(TextMesh);
tmTwo.text =  "";

//Determines whether or not the user can use their arms to navigate through the help menus
static var manualNavigation : boolean = false;

static var navUp : boolean = false;
static var imgCounter : int = 0;

static var tutMessageArr = new Array("Please assume calibration pose!" , "Point to the right for the next slide, left to go back", "Make sure that you have plenty of space around you", "Minimize sunlight where possible", "Remember to stretch before exercise!", "Raise your right hand to activate the menu", "Put your hands together to enter navigation mode", "Move your right hand to roll camera", "Push with your left to zoom");

// HELP IMAGE KEY
/*
1 - calibration
1b - left and right to navigate
2 - make sure there's room
3 - reduce sunlight
4 - stretch
5 - raise hand for menu
6 - hands together for nav
7 - use right hand pan
8 - use left hand zoom
*/

//This section basically just finds the imgPlane game object
//and allows me to access the script 'tutorialImgSwap' via a variable
var tutImgScriptOBJ : GameObject;
tutImgScriptOBJ = GameObject.Find("imgPlane");
var tutImgScriptOBJScript : tutorialImgSwap;
tutImgScriptOBJScript = tutImgScriptOBJ.GetComponent(typeof(tutorialImgSwap)) as tutorialImgSwap;

//and again for the timer game object
var timerScriptOBJ : GameObject;
timerScriptOBJ = GameObject.Find("timer_GO");
var timerScriptOBJScript : timerArray;
timerScriptOBJScript = timerScriptOBJ.GetComponent(typeof(timerArray)) as timerArray;

//Simply stops the tutorial menu function from being called everysingle frame at startup
var startUp : boolean = true;
//Signals for the calibration pose menu to be closed.
var calibrated : boolean = false;
//Signals whether the user has been given the basic warnings, etc.
var roomCheck : boolean = false;

//This toggle to true when the tutorial screen is hovered so that the function is only called once.
static var activeTut:boolean = false;

//This boolean triggers the menu to be built
static var introTutOver:boolean = false;

//A boolean that stops the menus from appearing for Debugging
static var DebugMode:boolean = false;

static var resultsMenu:boolean = false;
static var grade:int = 7;

function Start () {

	renderer.enabled = false;
	transform.parent.renderer.enabled = false;
}

function Update () {

	//Debug.Log("manualNavigation = " + manualNavigation);
	//Debug.Log("which hand?  = " + timerArray.hand);
	//Debug.Log("results Menu = " + tutorialScreen.resultsMenu);
	//Debug.Log("hide = " + MenuBuilder.hideBtns);
	//Debug.Log("nav up = " + navUp);
	//Debug.Log("activeTut = " + activeTut);
	//Debug.Log("text = " + Feedback_txt.feedBacktm.text);
	
	if(!OpenNISingleSkeletonController.IsTracking && startUp  && !DebugMode) {
		calibrationScreen();
		startUp = false;
		navUp = true;
	} else if(OpenNISingleSkeletonController.IsTracking && !calibrated) {
		calibrationScreen();
		calibrated = true;
		//changed this...
		navUp = true;
	} else if (calibrated && !roomCheck) {
		roomCheckScreen();
		roomCheck = true;
		navUp = true;
	}
	
	if(manualNavigation){
			
		//if left hand up and right hand down activate
		if((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && !activeTut){
			if(!resultsMenu){
				timerScriptOBJScript.navStartTimer("left");
			}
			activeTut = true;
		//if right hand up and left hand down activate
		} else if((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) < .4) && !activeTut){
			timerScriptOBJScript.navStartTimer("right");
			activeTut = true;
		//holding...
		} else if((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && activeTut){
		} else if((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) < .4) && activeTut){
		//if no hands or both hands, deactivate
		} else {
			activeTut = false;
			timerScriptOBJScript.clearAllTimers();
		}
	}
}

function ToggleTutorial (tutorialText) {

	tm.text = tutorialText;
	
	if(tm.text.Length > 31 ){
		extraLine(tm.text.Substring(31, tm.text.Length - 31));
		tm.text = tm.text.Substring(0, 31);
	} else {
		extraLine("");
	}

	if(!manualNavigation){
		renderer.enabled = !renderer.enabled;
		transform.parent.renderer.enabled = !transform.parent.renderer.enabled;
	}
}

function ShowResults (resultMessage) {
	//Debug.Log("Hello, World!");
	resultsText = resultMessage;
	tutorialScreen.navUp = true;
	tm.text = ("You scored " + grade + " out of 100");
	MenuBuilder.hideBtns = true;
	
	if (resultsText == "Great Work!"){
		if(Lessons_Script.currentLesson == "blocks"){
			MenuBtn_TextScript.deactiveListMenu[1] = "";
		}
		tutImgScriptOBJScript.ResultsImg(1);
	} else if (resultsText == "Keep Trying!"){
		tutImgScriptOBJScript.ResultsImg(2);
	}
	
	Feedback_txt.showFeedBack = true;	
	Feedback_txt.feedBacktm.text = resultsText;
	Feedback_txt.feedBacktm.transform.renderer.enabled = true;
	
	manualNavigation = true;
	
	timerArray.tutTEXT.transform.renderer.enabled = true;
	timerArray.tutBG.transform.renderer.enabled = true;
	
	imgCounter = 40;
	resultsMenu = true;
}

function calibrationScreen () {
	
	ToggleTutorial(tutMessageArr[0]);
	tutImgScriptOBJScript.swapTutImage(0);
}

function roomCheckScreen () {
	ToggleTutorial(tutMessageArr[1]);
	tutImgScriptOBJScript.swapTutImage(1);
	imgCounter = 1;
	manualNavigation = true;
}

function extraLine(extraText) {
	
	tmTwo.text = extraText;
	if(!manualNavigation){
		gameObject.Find("xtra_textBox").renderer.enabled = !renderer.enabled;
	}
}