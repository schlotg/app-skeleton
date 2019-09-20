import { injectable } from 'inversify';
import { container } from '../ioc';
import { Symbols } from '../symbols';
import { Component } from '../components/component';

// add Route enums here
export enum Route {
  DEFAULT,
};

@injectable()
export class RouterService {
  protected e: HTMLElement;
  protected current: Component;

  setView(e: HTMLElement) {
    this.e = e;
  }
  setRoute(route?: Route, data?: any) {
    let component: Component;
    switch(route) {
      default:
      case Route.DEFAULT: {
        component = container.get<Component>(Symbols.AppComponent);
        break;
      }
    }
    this.e.innerHTML = '';
    component.init(data);
    this.e.appendChild(component.getElement());
    this.current && this.current.destroy();
    this.current = component;
  }
  destroy() {
    this.current && this.current.destroy();
    this.e.innerHTML = '';
    this.current = null;
  }
}