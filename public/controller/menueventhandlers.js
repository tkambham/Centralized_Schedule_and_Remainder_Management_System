import { homePageView } from '../view/home_page.js';
import { schedulePageView } from '../view/schedule_page.js';
import { signOutFirbase } from './firebase_auth.js';
import { routePathnames } from './route_controller.js';

export function onClickHomeMenu(e) {
    history.pushState(null, null, routePathnames.HOME);
    homePageView();
}

export function onClickScheduleMenu(e) {
    history.pushState(null, null, routePathnames.SCHEDULE);
    schedulePageView();
}

export async function onClickSignoutMenu(e) {
    await signOutFirbase(e);
}