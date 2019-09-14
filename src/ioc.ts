import { Container } from 'inversify';
import { Symbols } from './symbols';
import { Component } from './components/component';
import { AppComponent } from './components/app-component';
import { RouterService } from './services/router-service';

export const container = new Container();
// define components here
container.bind<Component>(Symbols.Component).to(Component);
container.bind<AppComponent>(Symbols.AppComponent).to(AppComponent);
// define services here
container.bind<RouterService>(Symbols.RouterService).to(RouterService).inSingletonScope();
