/**************************
 * Dusan Bosnjak @pailhead
 **************************/

// multiply the color with per instance color if enabled
var ins_color_fragment = [

	'#ifdef USE_COLOR',

	'diffuseColor.rgb *= vColor;',

	'#endif',

	'#if defined(INSTANCE_COLOR)',

	'diffuseColor.rgb *= vInstanceColor;',

	'#endif'

].join('\n');
