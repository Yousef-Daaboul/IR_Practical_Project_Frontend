import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes.ts";


export const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(__, _, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {left: 0, top: 0};
        }
    },
});
