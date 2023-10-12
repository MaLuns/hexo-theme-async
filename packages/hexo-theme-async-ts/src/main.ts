import { ready } from './init';

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();
