//
// Cesium app:
// Renderable
//
// * Based on official Cesium example
//
var viewer, scene, canvas;

canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = scene.globe.ellipsoid;


// 48.786889, 9.0843
var locSolitude2 = {
    destination: Cesium.Cartesian3.fromRadians
        (0.15865324078031692, 0.8514895282737008, 778.7003110082524),
    orientation: {
        heading: 4.699033167472921,
        pitch: -0.49804187544369105,
        roll: 6.283185307179586
    }
};
viewer.camera.setView(locSolitude2);

viewer.entities.add({
    rectangle : {
        coordinates : Cesium.Rectangle.fromDegrees(8, 40, 10, 60),
        material : new Cesium.StripeMaterialProperty({
            evenColor: Cesium.Color.WHITE,
            oddColor: Cesium.Color.BLUE,
            repeat: 5
        })
    }
});


var entity;
