#pragma strict

//These variables help to create the base timer (the time since the lesson started)
private var lessonStartTime:float;
var lessonTime:float;
var lessonSeconds:int;
var isBlockTimer01:boolean = false;
var blockTimer01:float;
private var blockTimer01Kill:float = 8;
var blockTimer01Seconds:int;
var blockTimer01Offset:float;

//These variables help to create the accuracy timer (the time that the player is in the green)

var isMatchTimer01:boolean = false;
var matchTimer01:float;
var matchTimer01Seconds:int;
var matchTimer01Offset:float;
var currentMatchTime:float;
var currentSeconds:int;

static var currentLesson:String = "";
static var step:int = 1;
static var animating:boolean = false;

//Allows this script to access functions in tutorialScreen script attached to "textBox"
var tutScriptOBJ : GameObject;
tutScriptOBJ = GameObject.Find("textBox");
var tutScriptOBJScript : tutorialScreen;
tutScriptOBJScript = tutScriptOBJ.GetComponent(typeof(tutorialScreen)) as tutorialScreen;

static var stopAnimation:boolean = false;

var numSeconds:int;
static var bow:boolean = false;

function Awake () {
	lessonStartTime = Time.time;
}

function Update () {
	
	//Debug.Log("Match = " + matchTimer01);
	//Debug.Log("");
	
	
	
	if(isBlockTimer01 && currentLesson == "blocks" && (BoneColor.LeftElbowLocked && BoneColor.RightElbowLocked) && bow){
		
		matchTimer01 = Time.time - currentMatchTime;
		matchTimer01Seconds = matchTimer01 % 60;
		
		if(currentSeconds != lessonSeconds) {
			//currentMatchTime ++;
			currentSeconds = lessonSeconds;
		}
		
		//matchTimer01 = Time.time - currentMatchTime;
		//matchTimer01Seconds = matchTimer01 % 60;
		//Debug.Log("*************" + matchTimer01Seconds + "**************");
		//Debug.Log("currentMatchTime = " + currentMatchTime);
		
		
	} else if(isBlockTimer01 && currentLesson == "blocks" && bow){
		
		matchTimer01 = Time.time - currentMatchTime;
		matchTimer01Seconds = matchTimer01 % 60;
		
		if(currentSeconds != lessonSeconds) {
			currentMatchTime ++;
			currentSeconds = lessonSeconds;
			
		}
		//Debug.Log("===========" + matchTimer01Seconds + "===========");
		//Debug.Log("currentMatchTime ===== " + currentMatchTime);
	}
	
	if(isBlockTimer01 && (blockTimer01 < blockTimer01Kill)){
		blockTimer01 = Time.time - blockTimer01Offset;
		blockTimer01Seconds = blockTimer01 % 60;
		//Debug.Log("*************" + blockTimer01Seconds + "**************");
	} else if(isBlockTimer01 && (blockTimer01 >= blockTimer01Kill)){
		isBlockTimer01 = false;
	//} else if(currentLesson == "blocks" && stopAnimation && bow) {
		//Debug.Log("match1 = " + matchTimer01);
		//Debug.Log("grade1 = " + (matchTimer01/blockTimer01Kill));
		tutorialScreen.grade = (matchTimer01/blockTimer01Kill)*100;
		
		//Debug.Log("match2 = " + matchTimer01);
		//Debug.Log("grade2 = " + (matchTimer01/blockTimer01Kill));
		blockTimer01 = 0;
		blockTimer01Offset = 0;
		step = 1;
		
		if(tutorialScreen.grade >=50) {
			MenuBtn_Script.passOrFail = "Great Work!";
		} else {
			MenuBtn_Script.passOrFail = "Keep Trying!";
			
		}
		tutScriptOBJScript.ShowResults(MenuBtn_Script.passOrFail);
		//tutorialScreen.grade = 100;
		//Debug.Log("match3 = " + matchTimer01);
		currentLesson = "";
	}
	
	lessonTime = Time.time - lessonStartTime;
	lessonSeconds = lessonTime % 60;
	//Debug.Log("Seconds = " + lessonSeconds);

	//Debug.Log("StopAnimation = " + stopAnimation);
	//Debug.Log("Lesson = " + currentLesson);
	//Debug.Log("Bow = " + bow);
	//Debug.Log("Animating = " + animating);
	//Debug.Log("Step = " + step);
	//Debug.Log("-------------------------------------");
	//Debug.Log("Technique = " + MenuBtn_Script.currentTechnique);
	if ((currentLesson == "bows" || currentLesson == "blocks"  || currentLesson == "punches") && !stopAnimation) {
		//Debug.Log("STOPPING ANIMATION!!");
		stopAnimation = true;
		MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Stop();
	//BOWS
	} else if(currentLesson == "bows" && BoneColor.LeftElbowLocked && BoneColor.RightElbowLocked && BoneColor.LeftKneeLocked && BoneColor.RightKneeLocked && !animating){
		if(step ==1){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
			MenuBtn_Script.currentTechnique = "standingBow1Bow";
			step++;
			Feedback_txt.feedBacktm.text = "Step 1 - Bow Forward";
			CheckAnim(2);
		} else if (step ==2){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow2Stand");
			MenuBtn_Script.currentTechnique = "standingBow2Stand";
			step++;
			Feedback_txt.feedBacktm.text = "Step 2 - Stand Up Straight";
			CheckAnim(2);
		} else {
			//Debug.Log("Hello, World!");
			step = 1;
			currentLesson = "";
			MenuBtn_Script.passOrFail = "Great Work!";
			tutorialScreen.grade = 100;
			tutScriptOBJScript.ShowResults(MenuBtn_Script.passOrFail);
			MenuBtn_TextScript.deactiveListWhite[2] = "";
			MenuBtn_TextScript.deactiveListWhite[3] = "";
		}
	//BLOCKING	
	} else if(currentLesson == "blocks" && BoneColor.LeftElbowLocked && BoneColor.RightElbowLocked && BoneColor.LeftKneeLocked && BoneColor.RightKneeLocked && !animating) {
		if(step ==1){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
			MenuBtn_Script.currentTechnique = "standingBow1Bow";
			step++;
			Feedback_txt.feedBacktm.text = "Step 1 - Bow Forward";
			CheckAnim(2);
		} else if (step ==2){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow2Stand");
			MenuBtn_Script.currentTechnique = "standingBow2Stand";
			step++;
			Feedback_txt.feedBacktm.text = "Step 2 - Stand Up Straight";
			CheckAnim(2);
		} else if (step ==3){
			bow = true;
			isBlockTimer01 = true;
			blockTimer01Offset = lessonTime;
			currentMatchTime = lessonTime;
			currentSeconds = lessonSeconds;
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("blocks");
			MenuBtn_Script.currentTechnique = "blocks";
			step++;
			Feedback_txt.feedBacktm.text = "Follow Along with the Instructor!";
			CheckAnim(2);
		}
		
	} else if(MenuBtn_Script.currentTechnique == "blocks" && !animating) {
		//Debug.Log("Hello, World!");
		//step = 1;
		//currentLesson = "";
		//MenuBtn_Script.passOrFail = "Great Work!";
		//tutorialScreen.grade = 100;
		//tutScriptOBJScript.ShowResults(MenuBtn_Script.passOrFail);
		//MenuBtn_TextScript.deactiveListWhite[2] = "";
		//MenuBtn_TextScript.deactiveListWhite[3] = "";
	//PUNCHES
	} else if(currentLesson == "punches" && BoneColor.LeftElbowLocked && BoneColor.RightElbowLocked && BoneColor.LeftKneeLocked && BoneColor.RightKneeLocked && !animating && !bow) {
		if(step ==1){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow1Bow");
			MenuBtn_Script.currentTechnique = "standingBow1Bow";
			step++;
			Feedback_txt.feedBacktm.text = "Step 1 - Bow Forward";
			CheckAnim(2);
		} else if (step ==2){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("standingBow2Stand");
			MenuBtn_Script.currentTechnique = "standingBow2Stand";
			step++;
			Feedback_txt.feedBacktm.text = "Step 2 - Stand Up Straight";
			CheckAnim(2);
			bow = true;
		} else  {
			//Debug.Log("*****************************************");
		}
	} else if(currentLesson == "punches" && BoneColor.LeftElbowLocked && BoneColor.RightElbowLocked && !animating && bow) {
		if (step ==3){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("punches1Stance");
			MenuBtn_Script.currentTechnique = "punches1Stance";
			step++;
			Feedback_txt.feedBacktm.text = "Assume the Horse Stance!";
			CheckAnim(2);
		} else if (step ==4){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("punches2LPunch");
			MenuBtn_Script.currentTechnique = "punches2LPunch";
			step++;
			Feedback_txt.feedBacktm.text = "Punch with the Left Hand!";
			CheckAnim(2);
		} else if (step ==5){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("punches3RPunch");
			MenuBtn_Script.currentTechnique = "punches3RPunch";
			step++;
			Feedback_txt.feedBacktm.text = "Punch with the Right Hand!";
			CheckAnim(2);
		} else if (step ==6){
			MenuBtn_Script.characterMesh.transform.parent.parent.parent.parent.animation.Play("punches4Rapid");
			MenuBtn_Script.currentTechnique = "punches4Rapid";
			step++;
			Feedback_txt.feedBacktm.text = "Try a Few with the Instructor!";
			CheckAnim(2);
		} else{
			stopAnimation = false;
			bow = false;
		}
	} else {
		
	}
}

function CheckAnim (numSeconds) { 
	animating = true;
	yield WaitForSeconds(numSeconds); 
	animating = false;   
}