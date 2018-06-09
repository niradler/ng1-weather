import angular from 'angular';

//components
import {componentsModule} from './app/components/index';

//pages
import {weatherArea} from './app/pages/weatherArea/weatherArea';

//services
import weatherService from './app/services/weatherService';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router',componentsModule])
  .config(routesConfig)
  .component('app', weatherArea)
  .service('weatherService',weatherService);
