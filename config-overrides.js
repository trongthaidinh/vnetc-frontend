const { override, useBabelRc, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),

    addWebpackAlias({
        '~/*': ['src/*'],
    }),

    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [path.resolve(__dirname, 'src/styles')],
                    },
                },
            },
        ],
    }),
);
