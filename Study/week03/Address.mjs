export default class Address {
  constructor(country, state = null, city = null, zip = null, street = null) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }

  set country(country) {
    this._country = country;
    return this;
  }
}
