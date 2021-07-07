#define PI 3.14159;

uniform float uTime;
uniform float uResolution;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    vNormal = normal;
}