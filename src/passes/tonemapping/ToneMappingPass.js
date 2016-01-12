'use strict';

var glslify = require( 'glslify' );
var Pass = require( '../../Pass' );
var vertex = glslify( '../../shaders/vertex/basic.glsl' );
var fragment = glslify( './tonemapping-fs.glsl' );

function ToneMappingPass( options ) {

	Pass.call( this );

	options = options || {};

	this.setShader( vertex, fragment );

	this.params.mode = options.mode || 1;

	/*

	Modes :

	{
		Linear: 1,
		SimpleReinhard: 2,
		LumaBasedReinhard: 3,
		WhitePreservingLumaBasedReinhard: 4,
		RomBinDaHouse: 5,
		Filmic: 6,
		Uncharted2: 7
	}

	*/

}

module.exports = ToneMappingPass;

ToneMappingPass.prototype = Object.create( Pass.prototype );
ToneMappingPass.prototype.constructor = ToneMappingPass;

ToneMappingPass.prototype.run = function( composer ) {

	this.shader.uniforms.mode.value = this.params.mode;
	composer.pass( this.shader );

};
