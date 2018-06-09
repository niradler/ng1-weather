import angular from 'angular';

import {cityWeather} from './cityWeather/cityWeather';

export const componentsModule = 'componentsModule';

angular
  .module(componentsModule, [])
  .component('cityWeather', cityWeather);
