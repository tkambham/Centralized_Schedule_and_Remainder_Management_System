import { onClickHomeMenu, onClickMenu2Menu } from './controller/menueventhandlers.js';
import { signinPageView } from './view/signin_page.js';

document.getElementById('menu-home').onclick = onClickHomeMenu;
document.getElementById('menu-menu2').onclick = onClickMenu2Menu;

signinPageView();