var K=Object.defineProperty;var j=(i,e,r)=>e in i?K(i,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[e]=r;var n=(i,e,r)=>(j(i,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();class H{constructor(e,r){n(this,"_canvas");n(this,"_gl");this._canvas=document.getElementById("canvas"),this._canvas.width=e,this._canvas.height=r,this._gl=this._canvas.getContext("webgl2"),this._gl||alert("Cannot use webgl2"),this.createWindow()}get gl(){return this._gl}makeVertexArray(e){const r=this._gl.createVertexArray();this._gl.bindVertexArray(r);for(const[s,t]of e)this._gl.bindBuffer(this._gl.ARRAY_BUFFER,s),this._gl.enableVertexAttribArray(t),this._gl.vertexAttribPointer(t,2,this._gl.FLOAT,!1,0,0);return r}makeTransformFeedback(e){const r=this._gl.createTransformFeedback();return this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK,r),this._gl.bindBufferBase(this._gl.TRANSFORM_FEEDBACK_BUFFER,0,e),r}makeBuffer(e,r=this._gl.STATIC_DRAW){const s=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ARRAY_BUFFER,s),this._gl.bufferData(this._gl.ARRAY_BUFFER,e,r),s}createWindow(){const e=this._gl;this.resizeCanvasToDisplaySize(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(1,1,1,1),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE)}resizeCanvasToDisplaySize(e,r=1){const s=e.clientWidth*r|0,t=e.clientHeight*r|0;return e.width!==s||e.height!==t?(e.width=s,e.height=t,!0):!1}}const q=(i,e)=>(e===void 0&&(e=i,i=0),Math.random()*(e-i)+i),Z=(i,e)=>new Array(i).fill(0).map(r=>e.map(s=>q(s[0],s[1]))).flat(),$=(i,e,r,s)=>{const t=Math.floor((i-r)/2),o=Math.floor((e-s)/2),a=[],c=[];for(let d=o;d<o+s;d++)for(let l=t;l<t+r;l++)a.push(l,d),c.push((l-(i-r)/2)/r,1-(d-(e-s)/2)/s);return{positions:a,texs:c}},J=(i,e,r,s,t,o)=>[2/(e-i),0,0,0,0,2/(s-r),0,0,0,0,2/(t-o),0,(i+e)/(i-e),(r+s)/(r-s),(t+o)/(t-o),1],Q=(i,e)=>{const r={...i};Object.assign(i,e),Object.assign(e,r)};class w{constructor(e,r,s,t){n(this,"_gl");n(this,"_program");this._gl=e,this._program=this.createProgram(r,s,t)}addAttrib(e){return this._gl.getAttribLocation(this._program,e)}addUniform(e){return this._gl.getUniformLocation(this._program,e)}use(){this._gl.useProgram(this._program)}createProgram(e,r,s){const t=this._gl.createProgram();t||console.error("failed to creat a program.");const o=this.createShader(this._gl.VERTEX_SHADER,e),a=this.createShader(this._gl.FRAGMENT_SHADER,r);return this._gl.attachShader(t,o),this._gl.attachShader(t,a),s&&this._gl.transformFeedbackVaryings(t,s,this._gl.SEPARATE_ATTRIBS),this._gl.linkProgram(t),this._gl.getProgramParameter(t,this._gl.LINK_STATUS)||(console.error(this._gl.getProgramInfoLog(t)),this._gl.deleteProgram(t)),t}createShader(e,r){const s=this._gl,t=s.createShader(e);if(t){if(s.shaderSource(t,r),s.compileShader(t),s.getShaderParameter(t,s.COMPILE_STATUS))return t;console.log(s.getShaderInfoLog(t)),s.deleteShader(t)}else console.error(`failed to creat a shader type ${e}.`)}}const ee=`#version 300 es
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
  `,te=`#version 300 es
  precision highp float;
  void main() {
  }
  `;class ie extends w{constructor(r){super(r,ee,te,["newPosition"]);n(this,"_oldPosition");n(this,"_velocity");n(this,"_canvasDimensions");n(this,"_deltaTime");n(this,"_isMove");n(this,"_inverse");this._oldPosition=this.addAttrib("oldPosition"),this._velocity=this.addAttrib("velocity"),this._canvasDimensions=this.addUniform("canvasDimensions"),this._deltaTime=this.addUniform("deltaTime"),this._isMove=this.addUniform("isMove"),this._inverse=this.addUniform("inverse")}get oldPosition(){return this._oldPosition}get velocity(){return this._velocity}get canvasDimensions(){return this._canvasDimensions}get deltaTime(){return this._deltaTime}get isMove(){return this._isMove}get inverse(){return this._inverse}}const re=`#version 300 es
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
  `,se=`#version 300 es
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
  `;class oe extends w{constructor(r){super(r,re,se);n(this,"_position");n(this,"_texPos");n(this,"_matrixUniform");n(this,"_slide");n(this,"_tex0");n(this,"_tex1");this._position=this.addAttrib("pos"),this._texPos=this.addAttrib("tex"),this._matrixUniform=this.addUniform("matrix"),this._slide=this.addUniform("slide"),this._tex0=this.addUniform("u_image0"),this._tex1=this.addUniform("u_image1")}get position(){return this._position}get texPos(){return this._texPos}get matrixUniform(){return this._matrixUniform}get slide(){return this._slide}get tex0(){return this._tex0}get tex1(){return this._tex1}}class D{constructor(e){n(this,"_gl");n(this,"_textureID");this._gl=e,this._textureID=e.createTexture()}initialise(e){this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.LINEAR),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.LINEAR),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,e)}use(e){this._gl.activeTexture(e),this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID)}get id(){return this._textureID}}const E=window.innerWidth,R=window.innerHeight,ne=E*.8,b=R*.8,P=Math.min(ne,Math.floor(b/8*6)),y=Math.min(b,Math.floor(P/6*8)),x=Math.floor(P*y),g=20;let u=0,_=0,h=0;const I=()=>{var i,e;u=1,h=_,(i=document.getElementById("click"))==null||i.setAttribute("hidden","true"),(e=document.getElementById("app"))==null||e.removeEventListener("click",I)};var S;(S=document.getElementById("app"))==null||S.addEventListener("click",I);function ae(){const i=new H(E,R),e=i.gl,r=new D(e),s=new Image;s.src="img.jpg",s.onload=()=>{r.initialise(s)};const t=new D(e),o=new Image;o.src="img2.jpg",o.onload=()=>{t.initialise(o)};const a=new ie(e),c=new oe(e),d=$(E,R,P,y),l=new Float32Array(d.positions),U=new Float32Array(d.texs),B=new Float32Array(Z(x,[[-g,g],[-g,g]])),f=i.makeBuffer(l,e.DYNAMIC_DRAW),v=i.makeBuffer(l,e.DYNAMIC_DRAW),M=i.makeBuffer(l,e.STATIC_DRAW),A=i.makeBuffer(U,e.DYNAMIC_DRAW),p=i.makeBuffer(B,e.STATIC_DRAW),C=i.makeVertexArray([[f,a.oldPosition],[p,a.velocity]]),V=i.makeVertexArray([[v,a.oldPosition],[p,a.velocity]]),k=i.makeVertexArray([[f,c.position],[A,c.texPos]]),L=i.makeVertexArray([[v,c.position],[A,c.texPos]]),O=i.makeVertexArray([[M,c.position],[A,c.texPos]]),N=i.makeTransformFeedback(f),X=i.makeTransformFeedback(v);e.bindBuffer(e.ARRAY_BUFFER,null),e.bindBuffer(e.TRANSFORM_FEEDBACK_BUFFER,null);let m={updateVA:C,tf:X,drawVA:L},W={updateVA:V,tf:N,drawVA:k};function F(T){T*=.001;const Y=T-_;_=T;const G=(h&&_-h)>3?1:0,z=Math.min((h&&_-h)/6,1);(h&&_-h)>6&&(u=0),e.clear(e.COLOR_BUFFER_BIT),a.use(),e.bindVertexArray(m.updateVA),e.uniform2f(a.canvasDimensions,e.canvas.width,e.canvas.height),e.uniform1f(a.deltaTime,Y),e.uniform1f(a.isMove,u),e.uniform1f(a.inverse,G),e.enable(e.RASTERIZER_DISCARD),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,m.tf),e.beginTransformFeedback(e.POINTS),e.drawArrays(e.POINTS,0,x),e.endTransformFeedback(),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),c.use(),e.uniform1f(c.slide,z),e.uniform1i(c.tex0,0),e.uniform1i(c.tex1,1),r.use(e.TEXTURE0),t.use(e.TEXTURE1),u==0?e.bindVertexArray(O):e.bindVertexArray(m.drawVA),e.viewport(0,0,e.canvas.width,e.canvas.height),e.uniformMatrix4fv(c.matrixUniform,!1,J(0,e.canvas.width,0,e.canvas.height,-1,1)),e.drawArrays(e.POINTS,0,x),Q(m,W),requestAnimationFrame(F)}requestAnimationFrame(F)}ae();
