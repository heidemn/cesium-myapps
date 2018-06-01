var viewer, scene, canvas;


var startMousePosition;
var mousePosition;
var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false,
    
    fast : false
};

var handler = new Cesium.ScreenSpaceEventHandler(canvas);

handler.setInputAction(function(movement) {
    flags.looking = true;
    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

handler.setInputAction(function(movement) {
    mousePosition = movement.endPosition;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function(position) {
    flags.looking = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
    case 'W'.charCodeAt(0):
        return 'moveForward';
    case 'S'.charCodeAt(0):
        return 'moveBackward';
    case 'R'.charCodeAt(0):
        return 'moveUp';
    case 'F'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    case 16: // shift
        return 'fast';
    case 'X'.charCodeAt(0):
        console.log('var locXY = {');
        console.log('    destination: Cesium.Cartesian3.fromRadians');
        console.log('        ' + viewer.camera.positionCartographic + ',');
        console.log('    orientation: {');
        console.log('        heading: ' + viewer.camera.heading + ',');
        console.log('        pitch: ' + viewer.camera.pitch + ',');
        console.log('        roll: ' + viewer.camera.roll);
        console.log('}};');            
        //console.log('positionCartographic (lon,lat [rad], height [m]):');
        //console.log(viewer.camera.positionCartographic);
        ////console.log(viewer.camera.direction);
        //console.log('heading, pitch, roll [rad]:');
        //console.log(viewer.camera.heading);
        //console.log(viewer.camera.pitch);
        //console.log(viewer.camera.roll);
        return undefined;
    default:
        return undefined;
    }
}

document.addEventListener('keydown', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}, false);

document.addEventListener('keyup', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}, false);

viewer.clock.onTick.addEventListener(function(clock) {
    var camera = viewer.camera;

    if (flags.looking) {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        var x = (mousePosition.x - startMousePosition.x) / width;
        var y = -(mousePosition.y - startMousePosition.y) / height;

        var lookFactor = 0.7; // 0.15; //0.1; //0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
        
        // Avoid user getting sick: set roll to zero
        var heading = camera.heading;
        var pitch = camera.pitch;
        //var roll = camera.roll;
        camera.setView({
            orientation: {
                heading : heading,
                pitch : pitch,
                roll : 0.0
            }
        });

        startMousePosition.x = mousePosition.x;
        startMousePosition.y = mousePosition.y;
    }

    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
    var moveRate = 2 * (flags.fast ? 4 : 1) * cameraHeight / 100.0;

    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
});

// disable the default event handlers
scene.screenSpaceCameraController.enableRotate = false;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = false;
scene.screenSpaceCameraController.enableTilt = false;
scene.screenSpaceCameraController.enableLook = false;
