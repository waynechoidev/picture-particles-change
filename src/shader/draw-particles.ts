export const drawParticlesVS = `#version 300 es
  in vec2 pos;
  in vec2 tex;
  out vec2 texCoord;

  uniform mat4 matrix;
  uniform vec2 canvasSize;
  uniform vec2 picSize;

  void main() {
    // do the common matrix math
    gl_Position = matrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = 1.0;
    
    texCoord = tex;
  }
  `;

export const drawParticlesFS = `#version 300 es
  precision highp float;

  in vec2 texCoord;
  out vec4 outColor;

  uniform float slide;
  uniform sampler2D u_image0;
  uniform sampler2D u_image1;
  
  void main() {
    vec4 tex0 = texture(u_image0, texCoord);
    vec4 tex1 = texture(u_image1, texCoord);
    outColor = (1.0 - slide) * tex0 + slide * tex1;
  }
  `;
