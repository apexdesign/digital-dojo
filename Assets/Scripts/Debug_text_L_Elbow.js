#pragma strict

var debugLElbow:TextMesh;
debugLElbow = gameObject.GetComponent(TextMesh);
debugLElbow.text =  "";

function Update () {

	//debugLElbow.text =  BoneColor.lelbow.ToString();
	debugLElbow.text =  "bot LE= " + (BoneColor.lelbow.ToString()) + ", p LE= " + (BoneColor.playerOffset.ToString());
	//Debug.Log("playerOffset = " + BoneColor.playerOffset);
}