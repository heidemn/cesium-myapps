precision highp float;

attribute vec3 a_position;
attribute vec3 a_color;

varying vec3 v_color;

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;

void main(void) {
	//v_color =  vec3(1.0, 1.0, 1.0) - (a_color.bgr / 255.0); //vec3(a_color.r, 1.0, 1.0);
	v_color = a_color / 255.0;

	vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);
	//float z = -pos.z / pos.w;
	gl_Position = u_projectionMatrix * pos;
	gl_PointSize = min(40.0, max(1.0, 100.0 / (-pos.z)));
}
