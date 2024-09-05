import { onClickHomeMenu, onClickMenu2Menu, onClickSignoutMenu } from './controller/menueventhandlers.js';
import { signinPageView } from './view/signin_page.js';
import { attachAuthStateChangObserver } from './controller/firebase_auth.js';

document.getElementById('menu-home').onclick = onClickHomeMenu;
document.getElementById('menu-menu2').onclick = onClickMenu2Menu;
document.getElementById('menu-signout').onclick = onClickSignoutMenu;

attachAuthStateChangObserver();

signinPageView();