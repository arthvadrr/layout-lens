import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'

const plugins = postcss({
	extract: true,
	minimize: true,
	use: ['sass'],
});

export default [
	{
		input: './src/styles/index.scss',
		output: {
			name: 'styles',
			file: './build/index.min.css',
			format: 'es'
		},
		plugins: plugins
	},
	{
		input: './src/styles/popup-styles/popup.scss',
		output: {
			name: 'styles',
			file: './build/popup.min.css',
			format: 'es'
		},
		plugins: plugins
	},
	{
		input: './src/index.js',
		output: {
			file: './build/index.min.js',
			name: 'scripts',
			format: 'iife',
		},
		plugins: [
			babel({babelHelpers: 'bundled'}),
			terser()
		]
	},
	{
		input: './src/popup/popup.js',
		output: {
			file: './build/popup.min.js',
			name: 'scripts',
			format: 'iife',
		},
		plugins: [
			babel({babelHelpers: 'bundled'}),
			terser()
		]
	}
]