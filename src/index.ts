import "reflect-metadata";
import { container } from './ioc';
import { RouterService } from './services/router-service';
import { Symbols } from './symbols';
import './index.less';

console.log(`${NAME}\nVersion:${VERSION} - running in ${PRODUCTION ? 'Production' : 'Development'}`);
const router = container.get<RouterService>(Symbols.RouterService);
const routerContainer = document.createElement('router-container');
document.body.appendChild(routerContainer);
router.setView(routerContainer);
router.setRoute();
