#pragma strict

//Build an Array to hold all of the possible labels that menu items might have
var menuTextArr = new Array("White Belt", "Yellow Belt", "Orange Belt", "Purple Belt", "Demo" , "Bows" , "Blocks" , "Punches", "Resume", "Change View", "Belt Menu", "Main Menu");
//Make a variable that will give us the text component of this 3D text
var menutm:TextMesh;
menutm = gameObject.GetComponent(TextMesh);
menutm.text =  "";

static var deactiveListMenu = new Array("", "item_2(Clone)", "item_3(Clone)", "item_4(Clone)");
static var deactiveListWhite = new Array("", "", "item_3(Clone)", "item_4(Clone)");
//These booleans help us determine which phase of the game we're in
static var mainMenu: boolean = true;
static var whiteBelt:boolean = false;
static var inGame:boolean = false;
/*
function Awake() {
	deactiveListMenu[1] = "item_2(Clone)";
}
*/
function Update () {

	Debug.Log("yellow belt = " + deactiveListMenu[1]);
	
	if(MenuBuilder.hideBtns) {
		transform.renderer.enabled = false;
	} else if (mainMenu) {
		transform.renderer.enabled = true;
		if(transform.parent.name == "item_1(Clone)") {
			menutm.text = menuTextArr[0];
		} else if (transform.parent.name == "item_2(Clone)") {
			menutm.text = menuTextArr[1];
		} else if (transform.parent.name == "item_3(Clone)") {
			menutm.text = menuTextArr[2];
		} else if (transform.parent.name == "item_4(Clone)") {
			menutm.text = menuTextArr[3];
		}
	} else if (whiteBelt) {
		transform.renderer.enabled = true;
		if(transform.parent.name == "item_1(Clone)") {
			menutm.text = menuTextArr[4];
		} else if (transform.parent.name == "item_2(Clone)") {
			menutm.text = menuTextArr[5];
		} else if (transform.parent.name == "item_3(Clone)") {
			menutm.text = menuTextArr[6];
		} else if (transform.parent.name == "item_4(Clone)") {
			menutm.text = menuTextArr[7];
		}
	} else if (MenuBuilder.inGameMenuUp) {
		transform.renderer.enabled = true;
		if(transform.parent.name == "item_1(Clone)") {
			menutm.text = menuTextArr[8];
		} else if (transform.parent.name == "item_2(Clone)") {
			menutm.text = menuTextArr[9];
		} else if (transform.parent.name == "item_3(Clone)") {
			menutm.text = menuTextArr[10];
		} else if (transform.parent.name == "item_4(Clone)") {
			menutm.text = menuTextArr[11];
		}
	}
}