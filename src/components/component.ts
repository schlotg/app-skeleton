import { injectable } from 'inversify';
import { container } from '../ioc';

@injectable()
export class Component {
  protected e: HTMLElement;
  protected components: Component[] = [];
  protected _symbol = Symbol();
  protected elements: { [index: string]: HTMLElement } = {};

  constructor() {
    const name = this.constructor.name;
    let dashName = name.charAt(0).toLowerCase();
    for(let i = 1; i < name.length; ++i) {
      let char: string = name.charAt(i);
      let charLower = char.toLowerCase();
      dashName += (char !== charLower) ? `-${charLower}` : charLower;
    }
    this.e = document.createElement(dashName);
  }
  destroy(): void {
    this.components.forEach(c => c.destroy());
  }
  _getSymbol(): symbol {
    return this._symbol;
  }
  init(data?: any) {}
  createComponent<T>(_symbol: symbol): T {
    const component = container.get(_symbol);
    this.components.push(component as Component);
    return component as T;
  }
  destroyComponent(component: Component): boolean {
    let success = false;
    const components = this.components;
    const target = component._getSymbol();
    for(let i = 0; i < components.length; ++i) {
      if (target === components[i]._getSymbol()) {
        success = true;
        this.components.splice(i, 1);
        component.destroy();
        break;
      }
    }
    return success;
  }
  getComponentCount(): number {
    return this.components.length;
  }
  getComponent(index: number): Component {
    return this.components[index];
  }
  getNamedElements(): { [index: string]: HTMLElement } {
    const elementList = this.e.querySelectorAll('[name]');
    const elements = this.elements = {} as { [index: string]: HTMLElement };
    elementList.forEach(e => {
      const name = e.getAttribute('name') as string;
      elements[name] = e as HTMLElement;
    });
    return elements;
  }
  setHtml(html: string, source?: Component | {[index: string]: any }): void {
    function evaluate(str: string) {
      let result = '';
      try { result =  eval(`\`${str}\``) }
      catch(e) { console.error('Error trying to evaluate in setHTML', e) }
      return result;
    }
    this.e.innerHTML = (source) ? evaluate.call(source, html) : html;
    this.getNamedElements();
  }
  getElement() {
    return this.e;
  }
}