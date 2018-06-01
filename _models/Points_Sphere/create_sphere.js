var fs = require('fs');
var wstream = fs.createWriteStream('sphere_xyz_rgb_interleaved.bin');

var PI = Math.PI;
var phiMin = 0;
var phiMax = 2 * PI;
var thetaMin = 0;  //-PI / 2;
var thetaMax = PI; // PI / 2;

var phiNum = 20;
var thetaNum = 20;

var phiStep = (phiMax - phiMin) / phiNum;
var thetaStep = (thetaMax - thetaMin) / thetaNum;

// 3 XYZ + 3 RGB
// 4 = sizeof float
var buffer = new Buffer((3 + 3) * 4 * (phiNum+1) * (thetaNum+1));

var r = 10;
var bufferPos = -4;
for (var phiI = 0, phi = phiMin; phiI <= phiNum; phiI++, phi += phiStep) {
	for (var thetaI = 0, theta = thetaMin; thetaI <= thetaNum; thetaI++, theta += thetaStep) {
		var R,G,B;
		var x = R = Math.sin(theta) * Math.cos(phi);
		var y = G = Math.sin(theta) * Math.sin(phi);
		var z = B = Math.cos(theta);
		x *= r;
		y *= r;
		z *= r;
		R = R/2 + 0.5;
		G = G/2 + 0.5;
		B = B/2 + 0.5;

		console.log(x, y, z, R, G, B);
		buffer.writeFloatLE(x, bufferPos += 4);
		buffer.writeFloatLE(y, bufferPos += 4);
		buffer.writeFloatLE(z, bufferPos += 4);
		buffer.writeFloatLE(R, bufferPos += 4);
		buffer.writeFloatLE(G, bufferPos += 4);
		buffer.writeFloatLE(B, bufferPos += 4);
	}
}

wstream.write(buffer);
wstream.end();
