module.exports = {
    entry: {
        app: './public/js/main.js'
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-webpack-loader',
                        options: {
                            htmlmin: true,
                            emitFile: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
