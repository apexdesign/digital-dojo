#pragma strict

var rotationSpeed = 100.0;
var startMove: boolean = false;
private var rightTrigger:float = .35;
private var leftTrigger:float = -.1;
private var pauseTrigger:float = -.25;
private var zoomValue:float = .4;
private var zoomOutValue:float = .2;
var navValue:float = .2;
var cameraGameObj:GameObject;

var camSpeed:float = .01;

static var navigationMode: boolean = false;
static var backFromNav: boolean = true;

var navStartTimer:boolean = false;

//Allows this script to access functions in timeArray script attached to "timer_GO"
var timerScriptOBJ : GameObject;
timerScriptOBJ = GameObject.Find("timer_GO");
var timerScriptOBJScript : timerArray;
timerScriptOBJScript = timerScriptOBJ.GetComponent(typeof(timerArray)) as timerArray;

function Update () {
	
	//Debug.Log("------------------------------------");
	//Debug.Log("Right Hand = " + HandTracker.RyValue);
	//Debug.Log("Left Hand = " + HandTracker.LyValue);
	//Debug.Log("Chest = " + HandTracker.yValue);
	
	if (OpenNISingleSkeletonController.IsTracking) {		
		if(navigationMode == true) {
			if (HandTracker.RxValue >= rightTrigger && (Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) < .35) {
			
				cameraOrbit.rotationXSpeed = .08;
			} else if (HandTracker.RxValue <= leftTrigger && (Mathf.Abs(HandTracker.yValue - (HandTracker.RyValue - .5))) < .35) {
				
				cameraOrbit.rotationXSpeed = -.08;
			} else {
			
				cameraOrbit.rotationXSpeed = 0;
			}
			
			//Debug.Log(HandTracker.LzDifference);
			
			if (HandTracker.LzDifference >= zoomValue && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35) {
			
				cameraOrbit.zoomSpeed = 0.01;
				//transform.position = Vector3.Lerp(transform.position, cameraGameObj.transform.position, camSpeed);
				//transform.position = Vector3.MoveTowards(transform.position, cameraGameObj.transform.position, camSpeed);
			
				//Debug.Log("Hand Position = " + HandTracker.RxValue);
				//Debug.Log("Zoooom");
			} else if (HandTracker.LzDifference <= zoomOutValue && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) < .35){
				cameraOrbit.zoomSpeed = -0.01;
			} else {
				cameraOrbit.zoomSpeed = 0;
			}
			
			// Deactivate
			if (HandTracker.LxValue <= pauseTrigger && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) > .40 && backFromNav) {
				backFromNav = false;
				timerScriptOBJScript.hoverStartTimer();
				timerScriptOBJScript.hoverLabelTimer();
				//Debug.Log("Activated");
			} else if (HandTracker.LxValue <= pauseTrigger && (Mathf.Abs(HandTracker.yValue - (HandTracker.LyValue - .5))) > .40 && !backFromNav){
				//Debug.Log("Hovering");
			} else if (!backFromNav){
				timerScriptOBJScript.clearAllTimers();
				//navigationMode = false;
				//MenuBtn_TextScript.inGame = true;
				//transform.position = Vector3.Lerp(transform.position, cameraGameObj.transform.position, camSpeed);
				//transform.position = Vector3.MoveTowards(transform.position, cameraGameObj.transform.position, camSpeed);
				backFromNav = true;
				//Debug.Log("Hand Position = " + HandTracker.RxValue);
				//Debug.Log("Working!!!!");
			}
		}
	}
}