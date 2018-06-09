import './cityWeather.scss';

class CityWeatherController {
  /** @ngInject */
  constructor() {
    this.title = "cityWeather";

  }
}

export const cityWeather = {
  template: require('./cityWeather.html'),
  controller: CityWeatherController,
  bindings: {
    weather: '=',
  }
};
