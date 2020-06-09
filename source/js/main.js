import {polyfillForEach} from './utils/polyfill-foreach';
import {polyfillIe11Download} from './utils/polyfill-ie11-download';

import {initModals} from './modules/init-modals';

// Utils
// ---------------------------------

polyfillForEach();
polyfillIe11Download();

// Modules
// ---------------------------------

initModals();
