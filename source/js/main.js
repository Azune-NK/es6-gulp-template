import {polyfills} from './utils/polyfills';
import {IECheck} from './utils/IE-check';

import {initModals} from './modules/init-modals';
import {footerIe} from './modules/footer-ie';

// Utils
// ---------------------------------

polyfills();
IECheck();

// Modules
// ---------------------------------

initModals();
footerIe();
