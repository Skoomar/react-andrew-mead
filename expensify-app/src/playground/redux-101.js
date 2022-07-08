import { createStore } from "@reduxjs/toolkit";

const store = createStore((state = { count: 0 }) => {
    return state
})

console.log(store.getState());