//
// Cesium app:
// Satellite terrain + 3D model (mesh or point cloud)
//
// 2016 - 2018 by Martin Heide
// 
// * Based on SandCastle Camera Tutorial
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

var whichModel = getParameterByName('model'); //'solitude'; // 'dischingen';
var whichResolution = getParameterByName('res'); //'solitude'; // 'dischingen';
var isDischingen = (whichModel === 'dischingen');

// 48.786889, 9.0843

var locSolitude = {
    destination: Cesium.Cartesian3.fromDegrees(
        9.0843, 48.786889, 2106.9202737011865),
    orientation: {
        heading: 4.2981925580887905,
        pitch: -0.29,
        roll: 0.0
    }
};
var locSolitude2 = {
    destination: Cesium.Cartesian3.fromRadians
        (0.15865324078031692, 0.8514895282737008, 778.7003110082524),
    orientation: {
        heading: 4.699033167472921,
        pitch: -0.49804187544369105,
        roll: 6.283185307179586
    }
};

var locDischingen = {
     destination: Cesium.Cartesian3.fromRadians
         (0.18084061711266533, 0.8499164214409288, 706.5038912575528),
     orientation: {
         heading: 0.2071936605300566,
         pitch: -1.057209649239752,
         roll: 6.283185307179586
    }
};
var locDischingen2 = {
    destination: Cesium.Cartesian3.fromRadians
        (0.18085320653894993, 0.849906141531208, 651.9098072220992),
    orientation: {
        heading: 6.103145207244639,
        pitch: -0.6898048370557279,
        roll: 6.283185307179586
    }
};
var locDischingen3 = {
    destination: Cesium.Cartesian3.fromRadians
        (0.18089854441930955, 0.8499329125971656, 546.608496822056),
    orientation: {
        heading: 4.653580680757289,
        pitch: -0.06455501887049397,
        roll: 6.283185307179586
    }
};


viewer.camera.setView(
    isDischingen ? locDischingen2 : locSolitude2
);

// var entity = viewer.entities.add({
//     position : Cesium.Cartesian3.fromDegrees(9.0843, 48.786889, 545),
//     model : {
//         uri : '../../Apps/SampleData/models/CesiumGround/Cesium_Ground.gltf'
//     }
// })

//0.18084261010091865, 0.8499308407127765
//10.3615183149, 48.6974500508

var entity;

if (isDischingen) {
    var position = Cesium.Cartesian3.fromDegrees(10.3615183149 - 0.00058, 48.6974500508 - 0.00048, 46.2); // Dischingen (v2)
    //var position = Cesium.Cartesian3.fromDegrees(10.3616259, 48.6972844, 45.0); // Dischingen (v1)
    var heading = Cesium.Math.toRadians(0); //(213.0)4
    var pitch = Cesium.Math.toRadians(0);
    var roll = Cesium.Math.toRadians(-90);
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    entity = viewer.entities.add({
        position : position,
        orientation: orientation,
        scale: 100,
        model : {
            //scale: 100,
            uri: '../_models/dischingen-gltf-2.glb'
            //uri: 'chair_simp.glb'
            //uri : '../_pointclouds/solitude/solitude-10cm.gltf'
        }
    });
} else {
    let res = '10cm';
    if (whichResolution === '5cm' || whichResolution === '2cm') {
        res = whichResolution;
    }
    console.log('Resolution:', res);

    var position = Cesium.Cartesian3.fromDegrees(9.08385, 48.787800, 654.0); // Solitude
    var heading = Cesium.Math.toRadians(213.0);
    var pitch = Cesium.Math.toRadians(0);
    var roll = Cesium.Math.toRadians(0);
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    entity = viewer.entities.add({
        //position : Cesium.Cartesian3.fromDegrees(9.0843, 48.786889, 650), //546),
        position : position,
        orientation: orientation,
        model : {
            uri : '../_pointclouds/solitude/solitude-' + res + '.gltf'
            //uri : '../_pointclouds/xb2testproj/funpark.gltf'
            //uri : '../_models/Points_Sphere/ColorPoints.gltf'
            //uri : '../_models/Points_ext/Points.gltf'
            //uri : '../_models/BoxWithoutIndices_ext/BoxWithoutIndices_Really.gltf'
            //uri : '../_models/BoxWithoutIndices_ext/BoxWithoutIndices.gltf'
        }
    });
}

// No automatic render update when model is ready (requestRenderMode = true)
//setTimeout(scene.requestRender.bind(scene), 1000);
//setTimeout(scene.requestRender.bind(scene), 2000);
setTimeout(scene.requestRender.bind(scene), 2000);
setTimeout(scene.requestRender.bind(scene), 4000); // This one works for me. Others are there as a precaution.
setTimeout(scene.requestRender.bind(scene), 6000);
setTimeout(scene.requestRender.bind(scene), 8000);

// viewer.trackedEntity = entity;

// window.addEventListener('load', function() {
//     console.log('onload');
// });
