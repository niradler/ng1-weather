import './weatherArea.scss'

class WeatherAreaController {
  /** @ngInject */
  constructor(weatherService) {
    this.weatherService = weatherService;
    this.title = "TOP - Weather";
    this.list = [];

    this.getWeatherData();
  }

  getWeatherData() {
    this
      .weatherService
      .getWeatherDataTopCities()
      .then((data) => {
        this.list =  this.weatherService.orderByOptimal(data.list);
      })
  }

}

export const weatherArea = {
  template: require('./weatherArea.html'),
  controller:WeatherAreaController
};
