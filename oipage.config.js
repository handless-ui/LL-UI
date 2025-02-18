const fs = require('fs');

module.exports = {
    devServer: {
        port: 20000, // 可选，端口号
        basePath: "./", // 可选，服务器根地址
        handler: function (request, response) { // 可选，自定义拦截，如果返回true表示此次请求自定义处理
            let fileInfo = this.getFileInfo(decodeURIComponent(this.filePath));

            // src中的js需要特殊处理
            if (/^\/src/.test(request.url) && fileInfo && fileInfo.path.endsWith(".js")) {

                response.writeHead(200, {
                    'Content-type': "application/javascript;charset=utf-8",
                    'Access-Control-Allow-Origin': '*',
                    'Server': "Powered by LL-UI"
                });

                let source = fs.readFileSync(fileInfo.path) + "";
                for (let nodeName of ["oipage"]) {
                    source = source.replace(new RegExp("(from ['\"])(" + nodeName + ")", "g"), "$1/node_modules/" + nodeName);
                }
                response.write(source);
                response.end();

                return true;
            }
        },
        suffixs: [] // 可选，表示缺省后缀
    }
};