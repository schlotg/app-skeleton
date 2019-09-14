import "reflect-metadata";
import { container } from './ioc';
import { RouterService } from './services/router-service';
import './symbols';
import './index.less';

console.log(`${NAME}\nVersion:${VERSION} - running in ${PRODUCTION ? 'Production' : 'Development'}`);
console.log(container);
container.bind<RouterService>('RouterService').to(RouterService).inSingletonScope();
const router = container.get<RouterService>('RouterService');
const routerContainer = document.createElement('router-container');
document.body.appendChild(routerContainer);
router.setView(routerContainer);
router.setRoute();
