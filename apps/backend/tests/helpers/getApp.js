import createApp from "../../src/server.js";

export default async function getApp(){
    //create and return the app instance
    const app =createApp();
    return app;
}