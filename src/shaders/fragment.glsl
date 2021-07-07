precision mediump float;

#define PI 3.14159;

uniform float uTime;
uniform float uResolution;

varying vec2 vUv; 
varying vec3 vNormal;

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
}