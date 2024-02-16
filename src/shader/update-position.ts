export const updatePositionVS = `#version 300 es
  in vec2 oldPosition;
  in vec2 velocity;

  uniform vec2 canvasDimensions;
  uniform float deltaTime;
  uniform float isMove;
  uniform float inverse;

  out vec2 newPosition;

  vec2 euclideanModulo(vec2 n, vec2 m) {
  	return mod(mod(n, m) + m, m);
  }

  void main() {
    float inverseFactor;
    if(inverse == 1.0) inverseFactor = -1.0;
    else inverseFactor = 1.0;
    newPosition = euclideanModulo(
        oldPosition + velocity * deltaTime * isMove * inverseFactor,
        canvasDimensions);
  }
  `;

export const updatePositionFS = `#version 300 es
  precision highp float;
  void main() {
  }
  `;
