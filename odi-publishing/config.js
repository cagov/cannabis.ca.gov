const main = require('./odi-publishing.json'); // Default settings.
// const staging = require('./odi-publishing/odi-publishing.staging.json'); // Default settings.
// const development = require('./odi-publishing/odi-publishing.development.json'); // Default settings.
// @TODO change branch automatically with github branch? Defaults to `main`
const getConfig = () => {
    var branch = "main";
    // @TODO connect .yml or local env variable branch name & return if branch exists.
    
    switch (branch) {
        case 'main': 
            return main;
            break;
        // case 'staging':
        //     return staging;
        // case 'development':
        //     return development;
        
        default:
            return main;
    }
}

exports.getConfig = getConfig;
