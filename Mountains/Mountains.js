//
// Cesium app:
// Animated GPS track  -  Mittag -> Nagelfluhkette -> Hochgrat
//
// 2016 - 2018 by Martin Heide
// 
// * Based on SandCastle Camera Tutorial
// * GPS track from: http://www.gpsies.com/map.do?fileId=nrfdckhyuhkdswxd
//
var viewer, scene, canvas;

canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = scene.globe.ellipsoid;



   

var locMittag0 = {
    destination: Cesium.Cartesian3.fromRadians(
        0.178622518084433, 0.8297831969154067, 2276.353773385157),
    orientation: {
        heading: 4.297617364650815,
        pitch: -0.40310962120080296,
        roll: 0.0
    }
};
var locMittag = {
    destination: Cesium.Cartesian3.fromRadians(
        0.17866396807738766, 0.8297450872217873, 2106.9202737011865),
    orientation: {
        heading: 4.2981925580887905,
        pitch: -0.29,
        roll: 0.0
    }
};
var locHochgrat0 = {
    destination: Cesium.Cartesian3.fromRadians(
        0.17576353109249687, 0.8288890948514613, 2265.20417303413),
    orientation: {
        heading: 3.2857406939319853,
        pitch: -0.15100159929490564,
        roll: 0.0
    }
};
var locHochgrat = {
    destination: Cesium.Cartesian3.fromRadians(
        0.17615561078699613, 0.8289905934665552, 2563.828501441308),
    orientation: {
        heading: 4.452038315131528,
        pitch: -0.429613616328992,
        roll: 0.0
    }
};

    viewer.camera.setView(
        //{
        /* destination: Cesium.Cartesian3.fromDegrees(
            // lon, lat [, height, ellipsoid, result ]
            //
            // ?
            //-117.16, 32.71, 15000.0
            //
            // Kirche Dischingen
            //10.3609779, 48.696807, 15000.0
            //
            // Einstein, Tirol
            //10.513333, 47.522222, 1500.0
            //
            //Hochgrat
            //10.078583, 47.495389, 1500.0
            10.078583, 47.495389, 1500.0
        ), */
        
        //
        // Hochgrat
        /* destination: Cesium.Cartesian3.fromRadians(
            0.17576353109249687, 0.8288890948514613, 2265.20417303413),
        orientation: {
            heading: 1.2857406939319853,
            pitch: -0.15100159929490564,
            roll: 0.0
        } */
    //}
        //
        // Mittag
        locMittag
    );
   

var animGpsTrack = function() {
    console.log('animGpsTrack');
    viewer.camera.flyTo({
        destination: locMittag.destination,
        orientation: locMittag.orientation,
        complete: function() {
            viewer.camera.flyTo({
                destination: locHochgrat.destination,
                orientation: locHochgrat.orientation,
                duration: 20,
                easingFunction: Cesium.EasingFunction.LINEAR_NONE
            });
        }
    });
};

window.addEventListener('load', function() {
    console.log('onload');
    var btnAnimGps = document.getElementById('btnAnimGps');
    if (btnAnimGps) {
        btnAnimGps.addEventListener("click", animGpsTrack);
    } else {
        console.log('btnAnimGps not found!');
    }
});

var lonLatHeightArray;
// adjust for average size of hiker ;-)
// (nah, just make sure that the line is above the terrain...)
for (var i = lonLatHeightArray.length - 1; i >= 0; i -= 3) {
    lonLatHeightArray[i] += 80.0; // meters
}

var gpsPolyline = viewer.entities.add({
    name : 'Mittag -> Nagelfluhkette -> Hochgrat',
    polyline: {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            lonLatHeightArray
        ),
        width: 7.0,
        material : Cesium.Color.RED
    }
});

