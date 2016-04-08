#pragma strict

//Each possible material for the imgPlane
var swapMat_01 : Material;
var swapMat_01b : Material;
var swapMat_02 : Material;
var swapMat_03 : Material;
var swapMat_04 : Material;
var swapMat_05 : Material;
var swapMat_06 : Material;
var swapMat_07 : Material;
var swapMat_08 : Material;
var swapMat_results_01: Material;
var swapMat_results_02: Material;

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

static var imgNum : int = tutorialScreen.imgCounter;
static var resultNum : int = 1;

function Start () {

	renderer.enabled = false;
}

function Update () {

	if(tutorialScreen.navUp && !tutorialScreen.DebugMode){
		renderer.enabled = true;
	} else {
		renderer.enabled = false;
	}
}

function swapTutImage (imgNum) {
	
	if(imgNum == 0) {
		renderer.material = swapMat_01;
	} else if(imgNum == 1) {
		renderer.material = swapMat_01b;
	} else if(imgNum == 2) {
		renderer.material = swapMat_02;
	} else if(imgNum == 3) {
		renderer.material = swapMat_03;
	} else if(imgNum == 4) {
		renderer.material = swapMat_04;
	} else if(imgNum == 5) {
		renderer.material = swapMat_05;
	} else if(imgNum == 6) {
		renderer.material = swapMat_06;
	} else if(imgNum == 7) {
		renderer.material = swapMat_07;
	} else if(imgNum == 8) {
		renderer.material = swapMat_08;
	}
}

function ResultsImg (resultNum) {

	if(resultNum == 1){
		renderer.material = swapMat_results_01;
	} else if (resultNum == 2) {
		renderer.material = swapMat_results_02;
	}
	
}