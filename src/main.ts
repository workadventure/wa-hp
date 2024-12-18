/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Player tags: ',WA.player.tags)

    WA.ui.actionBar.addButton({
        id: 'explore-btn',
        // @ts-ignore
        label: 'Explore map',
        callback: () => {
            WA.nav.openCoWebSite("https://www.youtube.com/embed/E8gmARGvPlI?si=sc0G_NQZeU5nlHoJ");
        }
    });

    function castleMainEntranceAccess() {
        WA.room.hideLayer('Doors/doorZone2closed');
        WA.room.hideLayer('Roof/Roof3')
        WA.room.hideLayer('Roof/Roof2')
        WA.room.hideLayer('Roof/Roof1')
        WA.room.hideLayer('Roof/Roof0')
    }

    if(WA.player.state.zoneEntrance1Access) {
        castleMainEntranceAccess();
    }

    let zoneEntrance1: any;
    WA.room.area.onEnter('zoneEntrance1').subscribe(() => {
        zoneEntrance1 = WA.ui.displayActionMessage({
            message: "<div style='text-align:center;'>Press <svg width='20' height='10' viewBox='0 0 20 10' style='margin-right: 2px; margin-left: 2px; fill: white; border-radius: 2px; border: 1px solid white; padding: 2px; box-sizing: border-box; background-color: white;'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' style='font-size: 10px; fill: black; font-weight: bold;'>SPACE</text></svg> to watch video<div style='font-size:8px;font-style:italic;'> and watch video</div></div>",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlIntro') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                WA.player.state.saveVariable("zoneEntrance1Access", true, {
                  public: true,
                  persist: true,
                  ttl: 3600 * 3600,
                  scope: "world",
                });
                castleMainEntranceAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneEntrance1').subscribe(() => {
        zoneEntrance1.remove();
    })

    let zoneEntrance2: any;
    WA.room.area.onEnter('zoneEntrance2').subscribe(() => {
        if(!WA.player.state.zoneEntrance1Access) {
            zoneEntrance2 = WA.ui.displayActionMessage({
                message: "<div style='text-align:center;'>Please find Isabellatrix and Dmitrydor (in the garden)\n <div style='font-size:8px;font-style:italic;'> and watch video</div></div>",
                callback: () => {
                    WA.ui.modal.closeModal();
                    WA.ui.modal.openModal({
                        src: WA.state.loadVariable('urlIntro') as string,
                        allow: 'fullscreen',
                        title: 'Bienvenue',
                        allowApi: true,
                        position: 'center',
                    });
                }
            }); 
        } else {
            zoneEntrance2 = WA.ui.displayActionMessage({
                message: "<div style='text-align:center;'>Doors are open you can explore videos</div>",
                callback: function (): void {
                    throw new Error("Function not implemented.");
                }
            }); 
        }
    })
    WA.room.area.onLeave('zoneEntrance2').subscribe(() => {
        zoneEntrance2.remove();
    })

    
    if(!WA.player.state.videoEntranceSeen) {
        WA.player.state.saveVariable("videoEntranceSeen", 0, {
          public: true,
          persist: true,
          ttl: 3600 * 3600,
          scope: "world",
        });
    } else {
        zoneEntrance3HasAccess();
    }

    function zoneEntrance3HasAccess () {
        // @ts-ignore
        let count = parseInt(WA.player.state.videoEntranceSeen) + 1;
        // @ts-ignore
        WA.player.state.saveVariable("videoEntranceSeen", parseInt(count), {
          public: true,
          persist: true,
          ttl: 3600 * 3600,
          scope: "world",
        });
        // @ts-ignore
        if(WA.player.state.videoEntranceSeen >= 4) {
            WA.room.hideLayer('Doors/doorZone3closed');
            WA.room.hideLayer('Doors/doorZone3closed2');
        }
    }

    if(!WA.player.state.videoChamberSeen) {
        WA.player.state.saveVariable("videoChamberSeen", 0, {
          public: true,
          persist: true,
          ttl: 3600 * 3600,
          scope: "world",
        });
    } else {
        zoneForestHasAccess();
    }

    function zoneForestHasAccess() {
        // @ts-ignore
        let count = parseInt(WA.player.state.videoChamberSeen) + 1;
        // @ts-ignore
        WA.player.state.saveVariable("videoChamberSeen", parseInt(count), {
          public: true,
          persist: true,
          ttl: 3600 * 3600,
          scope: "world",
        });
        // @ts-ignore
        if(WA.player.state.videoChamberSeen >= 2) {
            WA.room.hideLayer('Doors/doorZone5closed');
            WA.room.showLayer('Doors/doorZone5open');
        }
    }


    let zoneEntrance3: any;
    WA.room.area.onEnter('zoneEntrance3').subscribe(() => {
        zoneEntrance3 = WA.ui.displayActionMessage({
            message: "To access training room, please watch all video in that room",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlIntro') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneEntrance3HasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneEntrance3').subscribe(() => {
        zoneEntrance3.remove();
    })

    
    let zoneVideoTeam: any;
    WA.room.area.onEnter('zoneVideoTeam').subscribe(() => {
        zoneVideoTeam = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoTeam') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneEntrance3HasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoTeam').subscribe(() => {
        zoneVideoTeam.remove();
    })
    
    let zoneVideoWow: any;
    WA.room.area.onEnter('zoneVideoWow').subscribe(() => {
        zoneVideoWow = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoWow') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                WA.room.hideLayer('DynamicLayers/anmVideoWow');
                zoneEntrance3HasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoWow').subscribe(() => {
        zoneVideoWow.remove();
    })

    let zoneVideoProject: any;
    WA.room.area.onEnter('zoneVideoProject').subscribe(() => {
        zoneVideoProject = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoProject') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                WA.room.hideLayer('DynamicLayers/anmVideoProject');
                zoneEntrance3HasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoProject').subscribe(() => {
        zoneVideoProject.remove();
    })

    let zoneVideoTools: any;
    WA.room.area.onEnter('zoneVideoTools').subscribe(() => {
        zoneVideoTools = WA.ui.displayActionMessage({
            message: "To access training room, please watch all video in that room",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoTools') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                WA.room.hideLayer('DynamicLayers/anmVideoTools');
                zoneEntrance3HasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoTools').subscribe(() => {
        zoneVideoTools.remove();
    })

    let zoneVideoFinance1: any;
    WA.room.area.onEnter('zoneVideoFinance1').subscribe(() => {
        zoneVideoFinance1 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoFinance1') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoFinance1').subscribe(() => {
        zoneVideoFinance1.remove();
    })

    let zoneVideoFinance2: any;
    WA.room.area.onEnter('zoneVideoFinance2').subscribe(() => {
        zoneVideoFinance2 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoFinance2') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoFinance2').subscribe(() => {
        zoneVideoFinance2.remove();
    })

    let zoneVideoDeploy1: any;
    WA.room.area.onEnter('zoneVideoDeploy1').subscribe(() => {
        zoneVideoDeploy1 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoDeploy1') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoDeploy1').subscribe(() => {
        zoneVideoDeploy1.remove();
    })
    let zoneVideoDeploy2: any;
    WA.room.area.onEnter('zoneVideoDeploy2').subscribe(() => {
        zoneVideoDeploy2 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoDeploy2') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoDeploy2').subscribe(() => {
        zoneVideoDeploy2.remove();
    })

    let zoneVideoClusters1: any;
    WA.room.area.onEnter('zoneVideoClusters1').subscribe(() => {
        zoneVideoClusters1 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoClusters1') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoClusters1').subscribe(() => {
        zoneVideoClusters1.remove();
    })
    let zoneVideoClusters2: any;
    WA.room.area.onEnter('zoneVideoClusters2').subscribe(() => {
        zoneVideoClusters2 = WA.ui.displayActionMessage({
            message: "Press 'space' to watch video",
            callback: () => {
                WA.ui.modal.closeModal();
                WA.ui.modal.openModal({
                    src: WA.state.loadVariable('urlVideoClusters2') as string,
                    allow: 'fullscreen',
                    title: 'Bienvenue',
                    allowApi: true,
                    position: 'center',
                });
                zoneForestHasAccess();
            }
        }); 
    })
    WA.room.area.onLeave('zoneVideoClusters2').subscribe(() => {
        zoneVideoClusters2.remove();
    })


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
