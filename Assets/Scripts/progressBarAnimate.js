#pragma strict
//This keeps track of the original size so that we can reset the
//progress bar if the hover is cancled.
var originalSize:float;
//These variables help to figure out if the menu has changed from
//main menu to white belt or the other way around
var currentMenu:String ="";
var latestMenu:String ="";
var currentImg:int;
var latestImg:int;

var circleGrowthRate:float = 1.8;
var barGrowthRate:float = .3;

function Start () {
	//fill the variables with default values
	currentMenu = "mainMenu";
	latestMenu = "mainMenu";
	originalSize = transform.localScale.x;
	
	currentImg = 0;
	latestImg = 0;
}

function Update () {
	//If we're on the initial, calibration screen, no need to display the arrows
	if(tutorialScreen.imgCounter == 0){
		transform.renderer.enabled = false;
		transform.parent.renderer.enabled = false;
	}
	
	if(OpenNISingleSkeletonController.IsTracking && tutorialScreen.navUp){
		
		if(name == "l_arrow_progress" && tutorialScreen.resultsMenu ){
			transform.renderer.enabled = false;
			transform.parent.renderer.enabled = false;
			//If the user lifts their left hand, the left arrow will begin to fill with green
		} else if((name == "l_arrow_progress" && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) < .4)) && tutorialScreen.imgCounter != 1){
			transform.parent.renderer.enabled = true;
			transform.renderer.enabled = true;
			transform.localScale.x = transform.localScale.x + (Time.deltaTime * circleGrowthRate);
			transform.localScale.z = transform.localScale.z + (Time.deltaTime * circleGrowthRate);
		} else if(name == "r_arrow_progress" && (Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) < .35 && (Mathf.Abs(HandTracker.xValue - HandTracker.RxValue)) > .4 && ((Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) > .35 || (Mathf.Abs(HandTracker.xValue - HandTracker.LxValue)) < .4)){
			transform.parent.renderer.enabled = true;
			transform.renderer.enabled = true;
			transform.localScale.x = transform.localScale.x + (Time.deltaTime * circleGrowthRate);
			transform.localScale.z = transform.localScale.z + (Time.deltaTime * circleGrowthRate);
		} else {
		//If not hovering, reset the progress markers
			transform.parent.renderer.enabled = true;
			transform.renderer.enabled = false;
			transform.localScale.x = originalSize;
			transform.localScale.z = originalSize;
		}
		//If switched to a new menu, also reset the progress markers
		if(currentImg != latestImg){
			currentImg = latestImg;
			transform.renderer.enabled = false;
			transform.localScale.x = originalSize;
			transform.localScale.z = originalSize;
		}
	} else if((OpenNISingleSkeletonController.IsTracking && !tutorialScreen.navUp) && (name == "l_arrow_progress" || name == "r_arrow_progress")){
		//Once the tutorial screens are over, hide the arrows and the progress markers
		transform.renderer.enabled = false;
		transform.parent.renderer.enabled = false;
	//The rest of these conditionals do not affect the arrows	
	} else if(MenuBuilder.hideBtns) {
		//If buttons are hidden, also hide progress markers
		MenuBtn_Script.progress = false;
		transform.renderer.enabled = false;
		transform.localScale.x = originalSize;
	} else if(currentMenu != latestMenu){
		//If we switch from main to white or the other way around, reset the progress markers and hide them
		currentMenu = latestMenu;
		transform.renderer.enabled = false;
	
		transform.localScale.x = originalSize;	
	} else if(transform.parent.name == MenuBuilder.targetZone + "(Clone)" && MenuBtn_Script.progress) {
		//Grow the markers (hovering)
		transform.renderer.enabled = true;
		transform.localScale.x = transform.localScale.x + (Time.deltaTime * barGrowthRate);
	} else {
		//If all else fails, reset and hide the markers
		transform.renderer.enabled = false;
		transform.localScale.x = originalSize;
	}
	
	if(MenuBtn_TextScript.mainMenu) {
		latestMenu = "mainMenu";
	} else {
		latestMenu = "whiteBelt";
	}
	
	if(tutorialScreen.imgCounter == 0){
		latestImg = 0;
	} else if(tutorialScreen.imgCounter == 1){
		latestImg = 1;
	} else if(tutorialScreen.imgCounter == 2){
		latestImg = 2;
	} else if(tutorialScreen.imgCounter == 3){
		latestImg = 3;
	} else if(tutorialScreen.imgCounter == 4){
		latestImg = 4;
	} else if(tutorialScreen.imgCounter == 5){
		latestImg = 5;
	} else if(tutorialScreen.imgCounter == 6){
		latestImg = 6;
	} else if(tutorialScreen.imgCounter == 7){
		latestImg = 7;
	} else if(tutorialScreen.imgCounter == 8){
		latestImg = 8;
	}
	
	
}
