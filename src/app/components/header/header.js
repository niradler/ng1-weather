import './header.scss';

class HeaderController {
  /** @ngInject */
  constructor() {
    this.title = "TOP - Weather";
  }
}

export const header = {
  template: require('./header.html'),
  controller: HeaderController,
};
