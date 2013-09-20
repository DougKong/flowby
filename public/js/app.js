window.app = angular.module('mean', ['ngCookies', 'ngResource',
		'ui.bootstrap', 'ui.route', 'mean.system',
		'mean.routes',
		'mean.articles',
  'mean.map',
		'mean.schedule',
		'mean.drivers'
		]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.routes', []);
angular.module('mean.map', ["google-maps"]);
angular.module('mean.schedule', []);
angular.module('mean.drivers', ['ngGrid']);