'use strict';

angular.module('slideshowApp.version', [
  'slideshowApp.version.interpolate-filter',
  'slideshowApp.version.version-directive'
])

.value('version', '0.1');
