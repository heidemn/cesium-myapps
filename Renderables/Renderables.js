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





if (true) {
    var pos0 =  new Cesium.Cartesian3(0,0,0); // Cesium.Cartesian3.fromDegrees(9, 41);
    var scale = 1000;

    var lon0 = 9.0843;
    var lat0 = 48.786889;
    var eps = 0.001;
    var pink = false;
    for (var lon = lon0 - 0.2; lon <= lon0 + 0.25 + eps; lon += 0.05) {
        for (var lat = lat0 - 0.1; lat <= lat0 + 0.1 + eps; lat += 0.05) {
            pink = !pink;
            var points = scene.primitives.add(new Cesium.PointPrimitiveCollection());
            var center = Cesium.Cartesian3.fromDegrees(lon,  lat);
            points.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);    
            // sqrt_3:  30k -> 31   /   60k -> 39
            for (var i = 0; i < 30000; i++) {
                points.add({
                        position : new Cesium.Cartesian3(
                            pos0.x + Math.random()*scale, 
                            pos0.y + Math.random()*scale, 
                            pos0.z + Math.random()*scale),
                        color : pink ? Cesium.Color.PINK : Cesium.Color.CYAN,
                        outlineColor : Cesium.Color.TRANSPARENT,
                        outlineWidth : 0.0,
                        pixelSize : 2.0
                    });
            }
        }
    }
    
} else {
    var points = scene.primitives.add(new Cesium.PointPrimitiveCollection());
    for (var longitude = -180; longitude < 180; longitude++) {
        var color = Cesium.Color.PINK;
        if ((longitude % 2) === 0) {
            color = Cesium.Color.CYAN;
        }

        for (var latitude = -90; latitude < 90; latitude++) {
            points.add({
                position : Cesium.Cartesian3.fromDegrees(longitude, latitude),
                color : color
            });
        }
    }
}

