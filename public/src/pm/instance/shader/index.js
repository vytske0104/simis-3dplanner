
// исправляет эти методы и блоки шейдеров с необходимой логикой для инстансов
THREE.ShaderChunk[ 'begin_vertex' ] = 				ins_begin_vertex;
THREE.ShaderChunk[ 'color_fragment' ] = 			ins_color_fragment;
THREE.ShaderChunk[ 'color_pars_fragment' ] = 		ins_color_pars_fragment;
THREE.ShaderChunk[ 'color_vertex' ] = 				ins_color_vertex;
THREE.ShaderChunk[ 'defaultnormal_vertex' ] = 		ins_defaultnormal_vertex;
THREE.ShaderChunk[ 'uv_pars_vertex' ] = 			ins_uv_pars_vertex;
