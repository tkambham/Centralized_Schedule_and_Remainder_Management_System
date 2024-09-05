import { homePageView } from "../view/home_page.js";
import { menu2PageView } from "../view/menu2_page.js";

export const routePathnames = {
    HOME: '/',
    MENU2: '/menu2',
};

export const routes = [
    {path: routePathnames.HOME, page: homePageView},
    {path: routePathnames.MENU2, page: menu2PageView},
]

export function routing(pathname, hash)
{
    const route = routes.find(r => r.path === pathname);
    if(route){
        route.page();
    }
    else{
        routes[0].page();
    }
}