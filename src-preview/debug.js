/*
Debug file for running Azure function

To use this Debug file, put the following in \.vscode\launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug DIRECT previewMode",
      "program": "src-preview/debug",
      "cwd": "${workspaceRoot}",
      "outputCapture": "std",
      "autoAttachChildProcesses": true,
      "console": "internalConsole"
    },
  ]
}

*/

process.env.debug = true;

//run the indexpage async
const indexCode = require('./index');
(async () => {
  //let req = {headers:{'x-original-url': "/MyFile.png"}, query:{}};
  //let req = {headers:{'x-original-url': "/"}, query:{}};
  // let req = {headers:{'x-original-url': "/"}};
  // let req = {headers:{'x-original-url': "/img/thumb/100-performance.jpg"}, query:{}};
  //let req = {headers:{'x-original-url': "/css/5c904a3bad4ab89406bd.css"}, query:{}};
  //image-2-150x150.png
  //let req = {headers:{'x-original-url': "/"}, query:{}};
  //let req = { params: {}, query: { postid: '82' } };
  //let req = {params:{}, query:{postid:'59'}};
  let context = {req, res:{body:''}};
  await indexCode(context);
  console.log(context.res.body);

})();