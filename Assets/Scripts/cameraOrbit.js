#pragma strict

//This is what the camera will aim at
//Should be the null GameObject containing the instructor
var target : Transform;

var distance = 10.0;
 
var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -20;
var yMaxLimit = 80;
 
var distanceMin = 3;
var distanceMax = 15;

static var zoomSpeed:float;
static var rotationXSpeed:float;
 
private var x = 0.0;
private var y = 0.0;
 
static var originalPos:Vector3;
static var originalRotX: float;
static var originalRotY: float;
static var originalRotZ: float;

static var currentPos:Vector3;
static var currentRotX: float;
static var currentRotY: float;
static var currentRotZ: float;

@script AddComponentMenu("Camera-Control/Mouse Orbit")
 
function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
    
    originalPos.x = transform.position.x;
    originalPos.y = transform.position.y;
    originalPos.z = transform.position.z;
    
    originalRotX = transform.eulerAngles.x;
    originalRotY = transform.eulerAngles.y;
    originalRotZ = transform.eulerAngles.z;
    
    currentPos.x = transform.position.x;
    currentPos.y = transform.position.y;
    currentPos.z = transform.position.z;
    
	currentRotX = transform.eulerAngles.x;
	currentRotY = transform.eulerAngles.y;
	currentRotZ = transform.eulerAngles.z;
    
    /*
    Debug.Log("X = " + originalPos.x);
    Debug.Log("Y = " + originalPos.y);
    Debug.Log("Z = " + originalPos.z);
    
    Debug.Log("X = " + originalRotX);
    Debug.Log("Y = " + originalRotY);
    Debug.Log("Z = " + originalRotZ);
    */
}
 
function LateUpdate () {
	//If the kinect is tracking the user, we are in navigation mode, and there is a target defined... 
	if (OpenNISingleSkeletonController.IsTracking) {
		if(Spinnerz.navigationMode == true) {
			//Update camera position and rotation
			currentPos = transform.position;
		    
			currentRotX = transform.eulerAngles.x;
			currentRotY = transform.eulerAngles.y;
			currentRotZ = transform.eulerAngles.z;
			/*
			Debug.Log("X = " + currentPos.x);
		    Debug.Log("Y = " + currentPos.y);
		    Debug.Log("Z = " + currentPos.z);
		    
		    Debug.Log("X = " + currentRotX);
		    Debug.Log("Y = " + currentRotY);
		    Debug.Log("Z = " + currentRotZ);
			*/
		    if (target) {
		        x += rotationXSpeed * xSpeed * distance* 0.02;
		 
		        y = ClampAngle(y, yMinLimit, yMaxLimit);
		        
		        var rotation = Quaternion.Euler(y, x, 0);
		 
		        distance = Mathf.Clamp(distance - zoomSpeed * 5, distanceMin, distanceMax);
		        
		        var hit : RaycastHit;
		        if (Physics.Linecast (target.position, transform.position, hit)) {
		                distance -=  hit.distance;
		        }
		        
		        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
		 
		        transform.rotation = rotation;
		        transform.position = position;
		    }
	    }
	}
}
 
 
static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
}