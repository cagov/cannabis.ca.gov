//Using Azure FaaS, the service can render a single page from remote content, while redirecting all other resource requests (.css, .png, etc) back to the real web server.
const config = require('./odi-publishing/config.js.js');

const { azureFunctionHandler } = require("@cagov/11ty-serverless-preview-mode");

/** @type {import('@cagov/11ty-serverless-preview-mode').WordpressSettings} */
const wordpressSettings = {
  resourceUrl: config.static_site_url,
  wordPressSite: config.editor_url
}

/**
 * Azure Function to render a single 11ty page
 * @param {{req:{headers:*,query:*},res:{statusCode:number;body:string;headers?:*};done:function}} context Azure Function context
 */
module.exports = async function (context) {
  await azureFunctionHandler(context, wordpressSettings);
}

