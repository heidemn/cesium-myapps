//
// Cesium app:
// Custom Appearance + shaders
//
// Based on example by Patrick Cozzi: 
//     https://groups.google.com/d/msg/cesium-dev/WmDTD1PU_Mw/vS0BDXaveE0J
// Modified for Cesium 1.45 by Martin Heide.
// 
var viewer, scene, canvas;

canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = scene.globe.ellipsoid;

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


    // CESIUM_1.45
    //var ellipsoid = viewer.centralBody.ellipsoid;
    var ellipsoid = scene.globe.ellipsoid;

    var ExampleAppearance = function() {
        this.material = undefined;

        this.vertexShaderSource =
// CESIUM_1.45: Added batchId
'attribute float batchId;' + 
'attribute vec3 position3DHigh;' +
'attribute vec3 position3DLow;' +
'attribute vec3 normal;' +
'varying vec3 v_positionEC;' +
'varying vec3 v_normalEC;' +
'void main()' +
'{' +
'    vec4 p = czm_computePosition();' +
'    v_positionEC = (czm_modelViewRelativeToEye * p).xyz;' +
'    v_normalEC = czm_normal * normal;' +
'    gl_Position = czm_modelViewProjectionRelativeToEye * p;' +
'}';

        this.fragmentShaderSource =
'varying vec3 v_positionEC;' +
'varying vec3 v_normalEC;' +
'void main()' +
'{' +
'    gl_FragColor = vec4(v_normalEC, 0.5);' +
'}';
        this.renderState = Cesium.Appearance.getDefaultRenderState(true, false);
    };

    ExampleAppearance.prototype.getFragmentShaderSource = Cesium.Appearance.prototype.getFragmentShaderSource;
    ExampleAppearance.prototype.isTranslucent = Cesium.Appearance.prototype.isTranslucent;
    ExampleAppearance.prototype.getRenderState = Cesium.Appearance.prototype.getRenderState;
 
    // CESIUM_1.45: Extent -> Rectangle.
    // CESIUM_1.45: Smaller rectangle region, otherwise normal is computed as NaN.
    // Red rectangle
    //var rectangle = Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0);
    var rectangle = Cesium.Rectangle.fromDegrees(0, 0, 180.0, 90.0);
    var redRectangleInstance = new Cesium.GeometryInstance({
        geometry : new Cesium.RectangleGeometry({
            rectangle : rectangle,
            vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL
        })
    });

    // Add rectangle instances to primitives
    scene.primitives.add(new Cesium.Primitive({
        geometryInstances : [redRectangleInstance],
        appearance : new ExampleAppearance()
    }));
