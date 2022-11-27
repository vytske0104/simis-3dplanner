/**************************
 * Dusan Bosnjak @pailhead
 **************************/

// read per instance color from attribute, pass to varying

var ins_color_vertex = [

	'#ifdef USE_COLOR',

	'vColor.xyz = color.xyz;',

	'#endif',

	'#if defined( INSTANCE_COLOR ) && defined( INSTANCE_TRANSFORM )',

	'vInstanceColor = instanceColor;',

	'#endif'

].join('\n');
