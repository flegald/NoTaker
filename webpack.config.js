var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,
    entry: './assets/js/index', 
    
    output: {
        path: path.resolve('./assets/bundles/'), 
        filename: '[name]-[hash].js', 
    },

    mode: "development",
    
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}), 
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
    ],
    
    module: {
        rules: [
            {
            	test: /\.jsx?$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                query: {
                    presets: ['react'] 
                }
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    "css-loader"
                ]
            }
        ]
    },
    
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'] 
    }   
}