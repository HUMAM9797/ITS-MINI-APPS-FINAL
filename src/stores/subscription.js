import { writable } from "svelte/store";


export const currentPage = writable("home");
export const chosenPlan = writable(null);
export const subscription = writable(null);
