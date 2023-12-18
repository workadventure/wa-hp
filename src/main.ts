/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let isHidden: boolean = false;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('entranceHall').subscribe(toggleRoof)
    WA.room.area.onEnter('entranceLib').subscribe(toggleRoof)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function toggleRoof() {
    isHidden = !isHidden

    if (isHidden) {
        WA.room.hideLayer('AboveRoof1')
        WA.room.hideLayer('Roof2')
        WA.room.hideLayer('Roof1')
        WA.room.hideLayer('Roof0')
    } else {
        WA.room.showLayer('AboveRoof1')
        WA.room.showLayer('Roof2')
        WA.room.showLayer('Roof1')
        WA.room.showLayer('Roof0')
    }
    
}

export {};
