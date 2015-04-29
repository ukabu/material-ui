/* We Hijack require if it's there so we can reference React from the 
* reactjs:react meteor package.
*/
var requireChain = typeof require == 'undefined' ? function(module) { throw Error('Cannot find module: '+module) } : require;

require = function(module) {
    if (module !== 'react' && module !== 'react/addons') requireChain.apply(this, arguments);

    return Package['reactjs:react'].React;
}
