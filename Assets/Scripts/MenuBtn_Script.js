#pragma strict

//Creates a variable to identify the INSTRUCTOR
static var characterMesh:GameObject;

//activeBtn is used to keep track of whether or not a button is currently selected.
var activeBtn:boolean = false;

//Allows this script to access functions in timeArray script attached to "timer_GO"
var timerScriptOBJ : GameObject;
timerScriptOBJ = GameObject.Find("timer_GO");
var timerScriptOBJScript : timerArray;
timerScriptOBJScript = timerScriptOBJ.GetComponent(typeof(timerArray)) as timerArray;

//Allows this script to access functions in tutorialScreen script attached to "textBox"
var tutScriptOBJ : GameObject;
tutScriptOBJ = GameObject.Find("textBox");
var tutScriptOBJScript : tutorialScreen;
tutScriptOBJScript = tutScriptOBJ.GetComponent(typeof(tutorialScreen)) as tutorialScreen;

static var progress:boolean = false;
//This is used to record what the most recent selected technique is.
static var currentTechnique:String = "";
static var passOrFail:String = "";

function Start() {
	characterMesh = GameObject.Find("Mia:Hips");
}

function Update () {
	//Debug.Log("Almost there...");
	//If we're debugging, make the INSTRUCTOR visible from the start
	if(tutorialScreen.DebugMode == true) {
		characterMesh.renderer.enabled = true;
	}
	
	//Debug.Log("targetZone = " + MenuBuilder.targetZone);
	
	if(OpenNISingleSkeletonController.IsTracking && tutorialScreen.navUp && MenuBuilder.hideBtns) {
			//Hide buttons if true
			//Debug.Log("It's a hit!");
				transform.renderer.enabled = false;
	} else if(OpenNISingleSkeletonController.IsTracking && !tutorialScreen.navUp) {
		//Debug.Log("Should not be able to read this...");
		//Default color for buttons
		transform.renderer.enabled = true;
		transform.renderer.material.color = Color.white;
		
		if(MenuBtn_TextScript.mainMenu){
		//If we're on the main menu, loop through all the possible disabled buttons
			for(var j:int = 0; j < MenuBtn_TextScript.deactiveListMenu.length; j++){
				//Debug.Log("Check # = " + (j+1));
				//Debug.Log("Button Name = " + transform.name);
				
				//Each one that is on the 'disabled list' triggers a boolean
				if(transform.name == MenuBtn_TextScript.deactiveListMenu[0]){
					MenuBuilder.item1Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[1]){
					MenuBuilder.item2Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[2]){
					MenuBuilder.item3Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[3]){
					MenuBuilder.item4Disabled = true;
				}
			}
		} else if(MenuBtn_TextScript.whiteBelt){
		//If we're on the white belt menu, loop through all the possible disabled buttons
			for(var k:int = 0; k < MenuBtn_TextScript.deactiveListWhite.length; k++){
				//Debug.Log("Check # = " + (j+1));
				//Debug.Log("Button Name = " + transform.name);
				
				//Each one that is on the 'disabled list' triggers a boolean
				if(transform.name == MenuBtn_TextScript.deactiveListWhite[0]){
					MenuBuilder.item1Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[1]){
					MenuBuilder.item2Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[2]){
					MenuBuilder.item3Disabled = true;
				} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[3]){
					MenuBuilder.item4Disabled = true;
				}
			}
		}
		
			if(MenuBuilder.hideBtns){
			//Hide buttons if true
				transform.renderer.enabled = false;
			//The following else if statements control which items are disabled
			} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[0] && MenuBuilder.item1Disabled == true && MenuBtn_TextScript.mainMenu){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[1] && MenuBuilder.item2Disabled == true && MenuBtn_TextScript.mainMenu){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[2] && MenuBuilder.item3Disabled == true && MenuBtn_TextScript.mainMenu){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListMenu[3] && MenuBuilder.item4Disabled == true && MenuBtn_TextScript.mainMenu){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[0] && MenuBuilder.item1Disabled == true && MenuBtn_TextScript.whiteBelt){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[1] && MenuBuilder.item2Disabled == true && MenuBtn_TextScript.whiteBelt){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[2] && MenuBuilder.item3Disabled == true && MenuBtn_TextScript.whiteBelt){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			} else if(transform.name == MenuBtn_TextScript.deactiveListWhite[3] && MenuBuilder.item4Disabled == true && MenuBtn_TextScript.whiteBelt){
				transform.renderer.enabled = true;
				transform.renderer.material.color = Color.gray;
				if(name == MenuBuilder.targetZone + "(Clone)") {
					timerScriptOBJScript.clearAllTimers();
				}
			//---- end disabled checks
			} else if((name == MenuBuilder.targetZone + "(Clone)") && timerArray.navTimerActivated == true) {
				//RED (the button is activated)
				transform.renderer.enabled = true;
				activeBtn = false;
				
				//Debug.Log("After = " + MenuBtn_TextScript.inGame);
				//Currently, all roads lead to the white belt material
				if(MenuBtn_TextScript.mainMenu == true){
					MenuBtn_TextScript.mainMenu = false;
					MenuBtn_TextScript.whiteBelt = true;
					MenuBtn_TextScript.inGame = false;
					
				} else if(MenuBtn_TextScript.whiteBelt == true) {
				//If we're already in the white belt material, make the character visible and play its animation
					characterMesh.renderer.enabled = true;
					
					if(MenuBuilder.targetZone == "item_1"){
						characterMesh.transform.parent.parent.parent.parent.animation.Play("testing");
						currentTechnique = "testing";
						
						//passOrFail = "Great Work!";
						//tutScriptOBJScript.ShowResults(passOrFail);
					} else if(MenuBuilder.targetZone == "item_2"){
						Lessons_Script.currentLesson = "bows";
						Feedback_txt.showFeedBack = true;
						Feedback_txt.feedBacktm.text = "Anza Rei - Informal Bow";
						characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
						currentTechnique = "standingBow1Bow";
					} else if(MenuBuilder.targetZone == "item_3"){
						Lessons_Script.currentLesson = "blocks";
						Feedback_txt.showFeedBack = true;
						Feedback_txt.feedBacktm.text = "High/Low Blocks";
						characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
						currentTechnique = "standingBow1Bow";
						Lessons_Script.stopAnimation = false;
						
						//characterMesh.transform.parent.parent.parent.parent.animation.CrossFade("blocks");
						//currentTechnique = "blocks";
					} else if(MenuBuilder.targetZone == "item_4"){
						Lessons_Script.currentLesson = "punches";
						Feedback_txt.showFeedBack = true;
						Feedback_txt.feedBacktm.text = "Front Punches";
						characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
						currentTechnique = "standingBow1Bow";
						
						Lessons_Script.stopAnimation = false;
						Lessons_Script.bow = false;
						
						//characterMesh.transform.parent.parent.parent.parent.animation.CrossFade("punches");
						//currentTechnique = "punches";
					}
					//Go from white belt menu to inGame phase
					//Debug.Log("hideBtns Checkpoint 2");
					MenuBuilder.hideBtns = true;
					MenuBtn_TextScript.whiteBelt = false;
					MenuBtn_TextScript.inGame = true;
					MenuBuilder.inGameMenuUp = false;
					progress = false;
				}
				
				//This stops all of this from happening every frame, in case the user is not lightning fast
				timerArray.navTimerActivated = false;
			} else if((name == MenuBuilder.targetZone + "(Clone)") && activeBtn == false) {
				//GREEN (button was just hovered over)
				
				transform.renderer.enabled = true;
				activeBtn = true;
				progress = true;
				
				timerScriptOBJScript.hoverStartTimer();
				timerScriptOBJScript.hoverLabelTimer();
				
			} else if (name == MenuBuilder.targetZone + "(Clone)") {
				//Green (hovering)
				
				transform.renderer.enabled = true;
				progress = true;
			} else if(activeBtn == true && MenuBuilder.targetZone == "") {
				//YELLOW (hovered off)
				
				transform.renderer.enabled = true;
				activeBtn = false;
				progress = false;
				
				timerScriptOBJScript.clearAllTimers();
			} else if(activeBtn == true) {
				//YELLOW (hovered off, onto new button)
				transform.renderer.enabled = true;
				activeBtn = false;
				progress = false;

			} else {
				transform.renderer.enabled = true;
				//If all else fails, just keep the button default
			}
	}
	
	//transform.renderer.enabled = true;
}