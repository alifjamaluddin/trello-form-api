/* Trello Form API
*
*  Make sure you replace key=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa with your 32-bit key value.
*  To generate an application key, go to https://trello.com/1/appKey/generate
*
*/

requirejs.config({
    paths: {
		"trello": "https://api.trello.com/1/client.js?key=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "jquery": "lib/jquery-min",
        "bootstrap": "lib/bootstrap-min",
		"dtp": "lib/bootstrap-datetimepicker",
		"parsley": "lib/parsley-min",
		"trello-form": "trello-form"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        },
		"dtp": {
			deps: ["jquery", "bootstrap"]
		},
		"parsley": {
			deps: ["jquery"]
		},
		"trello": {
			deps: ["jquery"]
		},
		"trello-form": {
			deps: ["jquery","bootstrap","dtp","parsley", "trello"]
		}
    }
});
	
require(["trello-form"], function ($) {
	

});