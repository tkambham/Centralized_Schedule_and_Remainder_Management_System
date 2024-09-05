import { homePageView } from '../view/home_page.js';
import { menu2PageView } from '../view/menu2_page.js';
import { signOutFirbase } from './firebase_auth.js';
import { routePathnames } from './route_controller.js';

export function onClickHomeMenu(e) {
    history.pushState(null, null, routePathnames.HOME);
    homePageView();
}

export function onClickMenu2Menu(e) {
    history.pushState(null, null, routePathnames.MENU2);
    menu2PageView();
}

export async function onClickSignoutMenu(e) {
    await signOutFirbase(e);
}