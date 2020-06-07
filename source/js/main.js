import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';

import {initModals} from './modules/init-modals';

// Utils
// ---------------------------------

forEachPolyfill();
initIe11Download();

// Modules
// ---------------------------------

initModals();

