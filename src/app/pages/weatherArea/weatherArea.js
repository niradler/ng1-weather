import './weatherArea.scss'

class WeatherAreaController {
  /** @ngInject */
  constructor(weatherService) {
    this.weatherService = weatherService;
    this.title = "TOP - Weather";
    this.list = [];
    this.customBackground = 'img-day';

    this.init();
  }

  init() {
    this.setCustomBackground();
    this.getWeatherData();
  }

  setCustomBackground() {
    const hour = (new Date()).getHours();

    if(hour >= 6 && hour < 18){
      this.customBackground = 'img-day';
    }else if (hour >= 18 && hour < 20) {
      this.customBackground = 'img-evening';
    }else if (hour >= 20 || hour < 6){
      this.customBackground = 'img-night';
    }
  }

  getWeatherData() {
    this
      .weatherService
      .getWeatherDataTopCities()
      .then((data) => {
        this.list = this
          .weatherService
          .orderByOptimal(data.list);
      })
  }

}

export const weatherArea = {
  template: require('./weatherArea.html'),
  controller: WeatherAreaController
};
