precision highp float;

#define PTS_ROUND 0
// 0.25 = circles
#define PTS_MAXR2 0.3


//attribute vec3 a_color;
varying vec3 v_color;

void main(void) {
#if PTS_ROUND
	vec2 pointCoord = gl_PointCoord - vec2(0.5, 0.5);
	if (pointCoord.x * pointCoord.x + pointCoord.y * pointCoord.y > PTS_MAXR2) {
		discard;
	}
#endif

	gl_FragColor = vec4(v_color, 1.0);
}
