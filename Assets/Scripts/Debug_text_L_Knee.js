#pragma strict

var debugLElbow:TextMesh;
debugLElbow = gameObject.GetComponent(TextMesh);
debugLElbow.text =  "";

function Update () {

	debugLElbow.text =  BoneColor.lelbow.ToString();
}