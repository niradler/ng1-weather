import angular from 'angular';

import {cityWeather} from './cityWeather/cityWeather';
import {header} from './header/header';

export const componentsModule = 'componentsModule';

angular
  .module(componentsModule, [])
  .component('cityWeather', cityWeather)
  .component('customHeader', header);
