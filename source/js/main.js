import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {test} from './modules/test';

// Utils
// ---------------------------------
forEachPolyfill();
initIe11Download();


// Modules
// ---------------------------------
test();
