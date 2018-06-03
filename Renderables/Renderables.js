//
// Cesium app:
// Renderable
//
// * Based on:
//   * https://github.com/AnalyticalGraphicsInc/cesium/wiki/Geometry-and-Appearances
//   * https://gist.github.com/zwcloud/182c2e2c23ad1aef4b2dd9e6df4c1ea7
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
    // destination: Cesium.Cartesian3.fromDegrees
    //     (-100.0, 40.0)
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


var modelMatrix = new Cesium.Matrix4();
Cesium.Matrix4.multiplyByTranslation(
    Cesium.Transforms.eastNorthUpToFixedFrame(
        ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(8, 40))
    ),
    new Cesium.Cartesian3(0.0, 0.0, 200000.0),
    modelMatrix);
Cesium.Matrix4.multiplyByUniformScale(modelMatrix, 500000.0, modelMatrix);

var instance = new Cesium.GeometryInstance({
    geometry : new TetrahedronGeometry(),
    modelMatrix : modelMatrix,
    // attributes : {
    //     color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE)
    // }
});

scene.primitives.add(new Cesium.Primitive({
    asynchronous: false, // we don't provide a worker
    geometryInstances : instance,
    appearance : new Cesium.PerInstanceColorAppearance({
        flat : true,
        translucent : false
    })
}));