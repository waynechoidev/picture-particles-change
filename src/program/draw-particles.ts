import { Program } from "../lib/program";
import { drawParticlesFS, drawParticlesVS } from "../shader/draw-particles";

export class DrawParticles extends Program {
  private _position: number;
  private _texPos: number;
  private _matrixUniform: WebGLUniformLocation;
  private _slide: WebGLUniformLocation;
  private _tex0: WebGLUniformLocation;
  private _tex1: WebGLUniformLocation;

  constructor(gl: WebGL2RenderingContext) {
    super(gl, drawParticlesVS, drawParticlesFS);

    this._position = this.addAttrib("pos");
    this._texPos = this.addAttrib("tex");
    this._matrixUniform = this.addUniform("matrix");
    this._slide = this.addUniform("slide");
    this._tex0 = this.addUniform("u_image0");
    this._tex1 = this.addUniform("u_image1");
  }
  get position() {
    return this._position;
  }
  get texPos() {
    return this._texPos;
  }
  get matrixUniform() {
    return this._matrixUniform;
  }
  get slide() {
    return this._slide;
  }
  get tex0() {
    return this._tex0;
  }
  get tex1() {
    return this._tex1;
  }
}
