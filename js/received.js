requirejs.config({
    paths: {
        "jquery": "lib/jquery-min",
        "bootstrap": "lib/bootstrap-min",
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});
	
require(["bootstrap"], function ($) {
	

});