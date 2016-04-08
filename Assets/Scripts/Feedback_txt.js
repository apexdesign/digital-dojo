#pragma strict

//Build an Array to hold all of the possible feedback that might be displayed
var feedBackTextArr = new Array("Great Work!", "Keep working on it!", "The third block of text is the longest by far; In fact, I might say it's the longest string in the application.", "Demo Text01");

static var feedBacktm:TextMesh;
feedBacktm = gameObject.GetComponent(TextMesh);
feedBacktm.alignment = TextAlignment.Center;
feedBacktm.text =  "";

static var showFeedBack:boolean = false;
static var banner:GameObject;
 
function Start () { 
	feedBacktm.text = feedBackTextArr[3];
	showFeedBack = false;
	
	banner = GameObject.Find("inGameBanner");
}

function Update () {
	//feedBacktm.text = BoneColor.feedBackDiff.ToString();
	//transform.renderer.enabled = false;
	
	if(showFeedBack == true) {
		banner.transform.renderer.enabled = true;
		transform.renderer.enabled = true;
	} else {
		banner.transform.renderer.enabled = false;
		transform.renderer.enabled = false;
	}
}