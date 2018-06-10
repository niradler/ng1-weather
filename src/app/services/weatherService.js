import keys from './keys';

class weatherService {
  constructor($http) {
    this.$http = $http;
    this.data = {};
    this.optimal = {
      temp: 21,
      humidity: 50
    }
  }

  getWeatherDataTopCities() {
    return this
      .$http
      .get(`http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,5128638,293198,2950159,1261481,1835848&units=metric&appid=${keys.appid}`)
      .then(response => {
        this.data.top = {
          response: response.data,
          request: {}
        };
        return response.data;
      })
      .catch((err) => console.log(err));
  }

  getWeatherDataCycle(center, radius) {
    return this
      .$http
      .get(`http://api.openweathermap.org/data/2.5/find?lat=${center.lat}&lon=${center.lon}&cnt=${radius}&appid=${keys.appid}`)
      .then(response => {
        this.data.cycle = {
          response: response.data,
          request: {
            center,
            radius
          }
        };
        return response.data;
      })
      .catch((err) => console.log(err));
  }

  getWeatherDataQuery(name) {
    return this
      .$http
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${keys.appid}`)
      .then(response => {
        debugger;
        this.data.query = {
          response: response.data,
          request: {
            name
          }
        };
        return response.data;
      })
      .catch((err) => console.log(err));
  }

  calcAccuracy(data) {
    const midAccuracy = 5;
    const lowAccuracyArr = [],
      highAccuracyArr = []
    data.forEach(city => {
      city.tempAccuracy = Math.abs(city.main.temp - this.optimal.temp) >= midAccuracy
        ? "LOW"
        : "HIGH";
      city.hueAccuracy = Math.abs(city.main.humidity - this.optimal.humidity) >= midAccuracy
        ? "LOW"
        : "HIGH";
      if (city.tempAccuracy == "HIGH" && city.hueAccuracy == "HIGH") {
        highAccuracyArr.push(city);
      } else {
        lowAccuracyArr.push(city);
      }
    });
    return {highAccuracyArr, lowAccuracyArr};
  }

  orderByOptimal(data, order = 'DESC') {
    if (!data)
      return;
    const {highAccuracyArr, lowAccuracyArr} = this.calcAccuracy(data);
    data = lowAccuracyArr.sort((bcity, acity) => {
      return (Math.abs(bcity.main.temp - this.optimal.temp) > Math.abs(acity.main.temp - this.optimal.temp) && (acity.hueAccuracy == "HIGH")) || (Math.abs(bcity.main.humidity - this.optimal.humidity) > Math.abs(acity.main.humidity - this.optimal.humidity) && (acity.tempAccuracy == "HIGH")) || Math.abs(bcity.main.temp - this.optimal.temp) > Math.abs(acity.main.temp - this.optimal.temp);
    });
    data = highAccuracyArr.concat(data);
    if (order == 'AESC') {
      data = data.reverse();
    }
    return data
  }
}

export default weatherService;
