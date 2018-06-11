module.exports = function (wallaby) {

    var wallabyWebpack = require('wallaby-webpack');
    var webpack = require('webpack');
    var wallabyPostprocessor = wallabyWebpack({
        plugins:
            [
                new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|css)$/, 'node-noop')
            ],
    });

    // Babel, jest-cli and some other modules are located under
    // react-scripts/node_modules, so need to let node.js know about it
    var path = require('path');
    process.env.NODE_PATH +=
        path.delimiter +
        path.join(__dirname, 'node_modules') +
        path.delimiter +
        path.join(__dirname, 'node_modules/react-scripts/node_modules');
    require('module').Module._initPaths();

    // Babel needs this
    process.env.NODE_ENV = 'development';

    return {
        files: [
            'src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
            '!src/**/*.test.js'
        ],

        tests: ['src/**/*.test.js'],

        env: {
            type: 'node',
            runner: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: require('babel-core'),
                presets: ['react-app', 'es2017']
            }),
        },

        setup: (wallaby) => {
            const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(p => require.resolve('react-scripts/' + p));
            delete jestConfig.transform['^.+\\.(js|jsx)$'];
            delete jestConfig.testEnvironment;
            wallaby.testFramework.configure(jestConfig);
        },

        testFramework: 'jest',
    };
};
