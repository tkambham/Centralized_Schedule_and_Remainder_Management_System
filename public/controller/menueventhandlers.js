import { homePageView } from '../view/home_page.js';
import { menu2PageView } from '../view/menu2_page.js';
import { signOutFirbase } from './firebase_auth.js';

export function onClickHomeMenu(e) {
    homePageView();
}

export function onClickMenu2Menu(e) {
    menu2PageView();
}

export async function onClickSignoutMenu(e) {
    await signOutFirbase(e);
}