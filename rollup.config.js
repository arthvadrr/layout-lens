import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'

const addPlugins = () => {
    postcss({
        extract: true,
        minimize: true,
        use: ['sass']
    })
}

export default [
    {
        input: './styles/index.scss',
        output: {
            name: 'styles',
            file: './index.min.scss',
            format: 'es'
        },
        plugins: addPlugins()
    },
    {
        input: './scripts/index.js',
        output: {
            file: './build/index.min.js',
            name: 'scripts',
            format: 'iife',
        },
        plugins: [
            babel({ babelHelpers: 'bundled'}),
            terser()
        ]
    },
    {
        input: './popup/popup.js',
        output: {
            file: './popup/popup.min.js',
            name: 'scripts',
            format: 'iife',
        },
        plugins: [
            babel({ babelHelpers: 'bundled'}),
            terser()
        ]
    }
]