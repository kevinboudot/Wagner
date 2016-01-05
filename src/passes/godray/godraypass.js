//  USAGE : 
//  https://gist.github.com/Samsy/7219c148e6cbd179883a

//  Port by Samsy for Wagner from http://bkcore.com/blog/3d/webgl-three-js-volumetric-light-godrays.html

'use strict';

var THREE = require('three');
var glslify = require('glslify');
var Pass = require('../../Pass');

var HorizontalBlur = require('../horizontalblur/horizontal-blurPass');
var VerticalBlur = require('../verticalblur/vertical-blurPass');

var vertex = glslify('../../shaders/vertex/basic.glsl');
var fragment = glslify('./godray-fs.glsl');

function Godray(options) {

  Pass.call(this);

  options = options || {};

  this.setShader(vertex, fragment);

  this.hBlur = new HorizontalBlur();
  this.vBlur = new VerticalBlur();

  this.width = options.width || 512;
  this.height = options.height || 512;

  this.params.fX = 0.5;
  this.params.fY = 0.5;
  this.params.fExposure = 0.6;
  this.params.fDecay = 0.93;
  this.params.fDensity = 0.88
  this.params.fWeight = 0.4
  this.params.fClamp = 1.0

}

module.exports = Godray;

Godray.prototype = Object.create(Pass.prototype);
Godray.prototype.constructor = Godray;

Godray.prototype.run = function(composer) {

  this.shader.uniforms.fX.value = this.params.fX;
  this.shader.uniforms.fY.value = this.params.fY;
  this.shader.uniforms.fExposure.value = this.params.fExposure;
  this.shader.uniforms.fDecay.value = this.params.fDecay;
  this.shader.uniforms.fDensity.value = this.params.fDensity;
  this.shader.uniforms.fWeight.value = this.params.fWeight;
  this.shader.uniforms.fClamp.value = this.params.fClamp;

  composer.pass(this.hBlur)
  composer.pass(this.vBlur)
  composer.pass(this.hBlur)
  composer.pass(this.vBlur)

  composer.pass(this.shader);

};
