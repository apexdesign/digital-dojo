#pragma strict

//Two materials, one for 'Back' and one for 'Menu'
var swapMatBack : Material;
var swapMatMenu : Material;

// This variable is used to make sure that when the inGame Menu is activated, it is only done once. 
static var inGameMenu:boolean = false;

//Allows this script to access functions in timeArray script attached to "timer_GO"
var timerScriptOBJ : GameObject;
timerScriptOBJ = GameObject.Find("timer_GO");
var timerScriptOBJScript : timerArray;
timerScriptOBJScript = timerScriptOBJ.GetComponent(typeof(timerArray)) as timerArray;

function Start () {
	transform.renderer.enabled = false;
}

function Update () {
	//If we're still in the tutorial mode or at the main menu, don't show the icon
	if(tutorialScreen.navUp || MenuBtn_TextScript.mainMenu){
		transform.renderer.enabled = false;
	//If we're in the white belt menu, set the icon to 'back' and display it
	} else if (MenuBtn_TextScript.whiteBelt){
		renderer.material = swapMatBack;
		transform.renderer.enabled = true;
	//Else (if we're in the gameplay) set the icon to 'menu' and display it
	} else {
		renderer.material = swapMatMenu;
		transform.renderer.enabled = true;
	}
	
	// If the player raises their left hand
	if(MenuBtn_TextScript.inGame && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && !inGameMenu){
		//Send a timer to the timer array
		timerScriptOBJScript.hoverStartTimer();
		timerScriptOBJScript.hoverLabelTimer();
		inGameMenu = true;
		//Debug.Log("Activated");
	} else if(MenuBtn_TextScript.inGame && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4) && inGameMenu){
		//Do nothing
		//Debug.Log("Hovering");
	} else if (MenuBtn_TextScript.inGame && inGameMenu) {
		timerScriptOBJScript.clearAllTimers();
		inGameMenu = false;
		//Debug.Log("Deactivated");
	}
}