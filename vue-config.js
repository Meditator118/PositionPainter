const path = require('path')
function resolve(dir) {
return path.join(__dirname, dir)
}
module.exports = {
publicPath: './public',
devServer: {
open: true
},
configureWebpack: {
resolve: {
alias: {
'@': resolve('src')
}
}
}
}
