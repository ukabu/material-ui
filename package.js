Package.describe({
    name: "ukabu:material-ui",
    version: "0.8.0-rc1",
    summary: "material-ui for Meteor apps",
    git: "https://github.com/ukabu/material-ui.git",
    documentation: "README.md"
});

Package.onUse(function(api) {
    api.versionsFrom("0.9.0");
    api.use("reactjs:react@0.2.4", {weak:true});
    api.addFiles('meteor/react.js');
    api.addFiles('meteor-bundle.js');
    api.addFiles('meteor-tap-event-plugin.js', 'client');
    api.addFiles('meteor/export-server.js', 'server');
    api.addFiles('meteor/export.js', 'client');
    api.export('mui');
    api.export('injectTapEventPlugin');
});
