/**************************************************************************/
/**************************************************************************/
/****              Project: Kingdom of Dreams and Madness              ****/
/****                                                                  ****/
/****  An exploration of building 'dynamic models' in a humane form    ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a   ****/
/****  a completed prototype is released  under a Creative Commons     ****/
/***   4.0 license                                                     ****/
/**************************************************************************/
/****  This us.js file is used to configure flat UI features outside   ****/
/****  of the A-Frame canvas, which has script logic written as as     ****/
/****  custom A-Frame components (see component.js)                    ****/
/**************************************************************************/

//////////////////////////////////////////
///////  USER INTERFACE CODE       ///////
//////////////////////////////////////////

    const ui = {
        mainMenus:      {},
        buttonEl: {
            nav:        {}
        },
        methods: {
            selectSector: function(selectedEl, menuName){
                document.querySelectorAll(`.${menuName}-item`).forEach(el => {
                    el.classList.remove('active')
                    el.classList.add('blur')
                })
                selectedEl.classList.add('active')
                selectedEl.classList.remove('blur')
                ui.methods.clearEvent()
            },
            selectSubMenu: function (type){
                document.querySelectorAll('.subMenu-container').forEach(el =>  el.classList.remove('active') )
                document.getElementById(`subMenu-${type}`).classList.add('active')
                // Setup first page
                document.querySelectorAll('.narrative-container').forEach(el =>  el.classList.add('hidden') )
                document.getElementById(`narrative-${type}-1`).classList.remove('hidden')
                document.getElementById(`narrative-${type}-1`).classList.add('show')
            },
            selectEvent: function(selectedEl){
                document.querySelectorAll('.subMenu-event-container').forEach(el => el.classList.remove('active') )
                selectedEl.classList.add('active')
                selectedEl.parentElement.parentElement.parentElement.classList.add('invite')
                document.querySelectorAll('.subMenu-main-header').forEach(el =>  el.classList.add('invite'))
                document.getElementById('details-pane-right').classList.add('active')
                document.getElementById('details-pane-right').classList.remove('no-transition')
                document.getElementById('details-pane-right').classList.add('preview')
                document.getElementById('details-right-more').classList.remove('hide')
                document.getElementById('details-intensity-container').classList.add('hidden')
                ui.methods.updateEventDetails(selectedEl)
                if(selectedEl.classList.contains('climate-risk')){
                    document.getElementById('details-intensity-container').classList.remove('hidden')
                }
            },
            clearEvent: function(){
                document.querySelectorAll('.narrative-container').forEach(el => el.classList.remove('invite') )
                document.querySelectorAll('.subMenu-main-header').forEach(el => el.classList.remove('invite') )
                document.querySelectorAll('.subMenu-event-container').forEach(el => el.classList.remove('active') )
                document.getElementById('details-pane-right').classList.remove('active') 
            },
            updateEventDetails: function(selectedEl){
                const label = selectedEl.querySelector('.subMenu-event-label').childElementCount === 0 ? selectedEl.querySelector('.subMenu-event-label').innerHTML : selectedEl.querySelector('.subMenu-event-label').querySelector(':first-child').innerHTML,
                    id = selectedEl.id,
                    details = selectedEl.querySelector('.details-content') ? selectedEl.querySelector('.details-content').innerHTML : 'No details available'
                document.getElementById('details-header-right').innerHTML = label 
                document.getElementById('details-content-right').innerHTML = details
            },
            closeDetails: function(){
                document.getElementById('details-pane-right').classList.remove('active')
                document.querySelectorAll('.narrative-container').forEach(el => el.classList.remove('invite') )
                document.querySelectorAll('.subMenu-main-header').forEach(el => el.classList.remove('invite') )
            },
            openMoreDetails: function(){
                document.getElementById('details-pane-right').classList.add('no-transition')
                document.getElementById('details-pane-right').classList.remove('preview')
                document.getElementById('details-right-more').classList.add('hide')
            },
            addSubSectionNav: function(type){
                const articles = document.querySelectorAll(`.narrative-container.${type}`)
                articles.forEach((el, i) => {
                    const currentContainer = document.getElementById(`narrative-${type}-${i+1}`), 
                        nextContainer = document.getElementById(`narrative-${type}-${i+2}`), 
                        prevContainer = document.getElementById(`narrative-${type}-${i}`), 
                        forwardButton = document.querySelector(`#narrative-${type}-${i+1} * .narrative-controls-button.forward`),
                        backButton = document.querySelector(`#narrative-${type}-${i+1} * .narrative-controls-button.back`)    

                    if(forwardButton){
                        if(i < articles.length - 1){
                            forwardButton.addEventListener('click', function(){  // Flip the current container closed and show next page
                                nextContainer.classList.remove('hidden')
                                currentContainer.classList.remove('invite')
                                currentContainer.classList.add('flipClose')
                                setTimeout(()=>{
                                    nextContainer.classList.add('show')
                                    currentContainer.classList.remove('flipClose')
                                    currentContainer.classList.add('hidden')
                                    currentContainer.classList.remove('show')
                                    ui.methods.clearEvent()    // Clear event button selections
                                }, 500)
                            })
                        } else {   // Setup final forward button to close the submenu
                            forwardButton.innerHTML ="Close"
                            forwardButton.classList.add('close')
                            forwardButton.addEventListener('click', function(){  // Flip the current container  closed, hide pane and reset circle menu
                                currentContainer.classList.add('flipClose')
                                document.getElementById(`subMenu-${type}`).classList.remove('active')
                                setTimeout(()=>{
                                    document.querySelectorAll('.main-menu-item').forEach(el => {
                                        el.classList.remove('active') 
                                        el.classList.remove('blur')
                                    })
                                    ui.methods.clearEvent()    // Clear event button selections
                                }, 500)
                            })
                        }
                    }
                    if(backButton){
                        backButton.addEventListener('click', function(){ // Flip the current container closed and show previous page
                            currentContainer.classList.remove('show')
                            prevContainer.classList.add('flipClose')
                            setTimeout(()=>{
                                prevContainer.classList.remove('hidden')
                                currentContainer.classList.add('hidden')
                                currentContainer.classList.remove('show')
                                currentContainer.classList.remove('invite')
                                document.querySelectorAll('.subMenu-main-header').forEach(el => el.classList.remove('invite'))
                            }, 500)
                            setTimeout(()=>{
                                prevContainer.classList.remove('flipClose')
                                prevContainer.classList.add('show')
                                ui.methods.clearEvent()    // Clear event button selections
                            }, 550)
                        })
                    }
                })      
            },
            toggleMenu:  function(menuName) {
                const items =  ui.mainMenus[menuName].svg.querySelectorAll(`.${menuName}-item`),        
                    label = ui.mainMenus[menuName].trigger.querySelector(`#${menuName}-label`),
                    angle = 45,
                    menuContainer = document.getElementById(`${menuName}-container`),
                    pos = {
                        top: menuContainer.classList.contains('top'),
                        bottom: menuContainer.classList.contains('bottom'),
                        left: menuContainer.classList.contains('left'),
                        right: menuContainer.classList.contains('right'),
                    },
                    direction = (pos.top && pos.left) || (pos.bottom && pos.right) ? 'anticlockwise' : 'clockwise',
                    polarity = direction === 'anticlockwise' ? -1 : 1,
                    offset = direction === 'anticlockwise' ? 0 : 225

                if (!event) var event = window.event;
                event.stopPropagation();
                ui.mainMenus[menuName].open  = !ui.mainMenus[menuName].open ;
                ui.mainMenus[menuName].svg.classList.toggle('closed')

                if (ui.mainMenus[menuName].open) { // Open 
                    const tl = new TimelineLite();
                    tl.to(items, 0.2, {scale:1, ease:Back.easeOut.config(4)}, 0.05);
                    for(var i=0; i<items.length; i++){
                        tl.to(items[i], 0.7, {rotation: (polarity * i * angle + offset)+"deg", ease:Bounce.elastic}, 0.35);
                    }
                    label.innerHTML = "-";
                    ui.mainMenus[menuName].svg.style.pointerEvents = "auto";
                    // Reset the intro animation (balloons)
                    if(state.scene.animation.intro){
                        state.scene.animation.intro = false
                        scene.els.scene.setAttribute('emissions-activity-balloons', {visible: false})
                        scene.els.items.blockGroupTitle.setAttribute('hide-block-title', {id: "title-blocks"})  
                    }
                    
                } else { // Close menu
                    const tl = new TimelineLite();
                    for(var i=0; i<items.length; i++){
                        tl.to(items[i], 0.3, {rotation: offset, ease:Circ.easeOut}, 0.05);
                    }
                    tl.to(items, .3, {scale:0, ease:Back.easeIn}, 0.3);

                    label.innerHTML = "+";
                    // Reset view
                    ui.mainMenus[menuName].svg.style.pointerEvents = "none";
                    document.querySelectorAll(`.${menuName}-item`).forEach(el =>  {
                        el.classList.remove('active')
                        el.classList.remove('blur')
                    })
                    document.querySelectorAll('.subMenu-container').forEach(el =>  el.classList.remove('active') )
                    ui.methods.closeDetails()
                    externalEvents.resetHazards()  
                    scene.els.items.blockGroup01.setAttribute('hide-block-title', {id: "chapter-01-blocks"})
                    scene.els.items.blockGroup02.setAttribute('hide-block-title', {id: "chapter-02-blocks"})
                    scene.els.items.blockGroup03.setAttribute('hide-block-title', {id: "chapter-03-blocks"})
                    scene.els.items.blockGroup04.setAttribute('hide-block-title', {id: "chapter-04-blocks"})
                }

                // Close all other main menus
                document.querySelectorAll(`.main-menu-svg:not(#${menuName})`).forEach(el => {
                    el.classList.add('closed')
                    ui.mainMenus[el.id].open = false
                    const items =  ui.mainMenus[el.id].svg.querySelectorAll(`.${el.id}-item`), 
                        label = ui.mainMenus[el.id].trigger.querySelector(`#${el.id}-label`),
                        menuContainer = document.getElementById(`${el.id}-container`),
                        pos = {
                            top: menuContainer.classList.contains('top'),
                            bottom: menuContainer.classList.contains('bottom'),
                            left: menuContainer.classList.contains('left'),
                            right: menuContainer.classList.contains('right'),
                        },
                        direction = (pos.top && pos.left) || (pos.bottom && pos.right) ? 'anticlockwise' : 'clockwise',
                        polarity = direction === 'anticlockwise' ? -1 : 1,
                        offset = direction === 'anticlockwise' ? 0 : 225
                        tl = new TimelineLite();
                    for(var i=0; i<items.length; i++){
                        tl.to(items[i], 0.3, {rotation: offset, ease:Circ.easeOut}, 0.05);
                    }
                    tl.to(items, .3, {scale:0, ease:Back.easeIn}, 0.3);
                    label.innerHTML = "+";
                    ui.mainMenus[el.id].svg.style.pointerEvents = "none";
                    document.querySelectorAll(`.${el.id}-item`).forEach(el =>  {
                        el.classList.remove('active')
                        el.classList.remove('blur')
                    })
                })             
            }, 
             // Set up menu handler   
            setupMenuInterface: function(){
                // 1. Camera navigation button event listeners
                    const navEls = Object.keys(scene.camPos.nav)
                    for(i = 0; i < navEls.length; i++){
                        navEls[i] = ui.buttonEl.nav[navEls[i]] =  document.getElementById(navEls[i])
                    }

                    Object.entries(ui.buttonEl.nav).forEach( ([name, el]) => {
                        el.addEventListener('click', function(){
                            externalEvents.toggleCamera('flyCam')
                            el.classList.toggle('active')
                            if(el.classList.contains('active')){
                                scene.els.scene.setAttribute('move-fly-camera', {
                                    pos:        Object.values(scene.camPos.nav[name].pos),
                                    rotation:   Object.values(scene.camPos.nav[name].rotation)
                                })
                            }
                        })
                    })

                // 2. Add climate hazard button event listeners: add DOM elements and events for hazards
                    ui.lists.hazardMenuEls.forEach(id => {
                        document.getElementById(id).addEventListener('click', function(){
                            const hazard = this.id.slice(this.id.indexOf('-')+1),
                                intensityContainer = document.getElementById('details-intensity-container'),
                                hazardArray = scene.hazard.options[hazard]                      
                            this.classList.add('selected')                  // Mark hazard button as selected

                            // Add intensity options to details container
                            intensityContainer.innerHTML = ''                        
                            if(hazardArray.length > 0){
                                hazardArray.forEach((option, i) => {
                                    const intensityButton = document.createElement('div')
                                    intensityButton.classList.add('details-intensity-button')                                
                                    intensityButton.innerHTML = option
                                    // Add listeners for each intensity option for all but sea level change                            
                                    intensityButton.addEventListener('click', function(){
                                        if(hazard !== 'seaLevel'){
                                            document.querySelectorAll('.details-intensity-button').forEach(el => el.classList.remove('active'))
                                            this.classList.add('active')         
                                        }                         
                                        externalEvents.hazards[hazard](option)           // Call the hazard
                                    })
                                    intensityContainer.appendChild(intensityButton)      // Add button option to DOM                                
                                    if(i === 0){                                         // Show the first intensity option active by default (as hazard button triggers first option)
                                        if(hazard !== 'seaLevel'){
                                            intensityButton.classList.add('active')
                                            externalEvents.hazards[hazard](option)
                                        } else { 
                                            externalEvents.hazards[hazard]('Expected Rise')         // Show custom SLR event with +/-  option available
                                        }
                                    }
                                })
                            }
                        }) 
                    })

                // 3. Add emissions source/sinks/switch sector button event listeners
                    const types = ['sources', 'switches', 'sinks']
                    types.forEach(type => {
                        ui.lists.emissionsSectorMenuEls.forEach(sector => {
                            const id = `menu-${type}-${sector}`
                            if(document.getElementById(id)){
                                document.getElementById(id).addEventListener('click', function(){
                                    const intensityContainer = document.getElementById('details-intensity-container')
                                    intensityContainer.innerHTML = ''  
                                    document.querySelectorAll('.subMenu-emissions-container').forEach(el => el.classList.remove('active'))
                                    this.classList.add('active')                  // Mark emissions sector button as selected
                                    scene.els.scene.setAttribute('emissions-activity-balloons', {
                                        type:               type,
                                        selectorClass1:     sector,
                                        dur:                3000,
                                        visible:            true
                                    })
                                    document.querySelectorAll('.subMenu-emissions-container').forEach(el =>{ 
                                        el.classList.add('noPointerEvents')
                                        setTimeout( () => el.classList.remove('noPointerEvents'))
                                    })
                                })
                            }
                        })
                    })

                // SETUP & BUILD UI MENUS
                ui.mainMenus = {
                    'menu-1': {
                        container:          document.getElementById('menu-1-container'),
                        svg:                document.getElementById('menu-1'),
                        trigger:            document.getElementById('menu-1-trigger'),
                        open:               false,
                        lists: {
                            sectors:        ['world', 'risk', 'emissions', 'actions']
                        },
                    },
                    'menu-2': {
                        container:          document.getElementById('menu-2-container'),
                        svg:                document.getElementById('menu-2'),
                        trigger:            document.getElementById('menu-2-trigger'),
                        open:               false,
                        lists: {
                            modes:        ['explore', 'disasters', 'vr', 'info']
                        }
                    }
                }
                const menuNames = ['menu-1', 'menu-2']
                // 1. Add circle sector trigger event /animation
                    menuNames.forEach(menuName =>{
                        ui.mainMenus[menuName].trigger.addEventListener('click', function(){ui.methods.toggleMenu(menuName)} , false);
                        // Close each menu on initiation
                        const tl = new TimelineLite(), 
                            items =  document.querySelectorAll(`.${menuName}-item`),
                            menuContainer = document.getElementById(`${menuName}-container`),
                            pos = {
                                top: menuContainer.classList.contains('top'),
                                bottom: menuContainer.classList.contains('bottom'),
                                left: menuContainer.classList.contains('left'),
                                right: menuContainer.classList.contains('right'),
                            },
                            direction = (pos.top && pos.left) || (pos.bottom && pos.right) ? 'anticlockwise' : 'clockwise',
                            offset = direction === 'anticlockwise' ? 0 : 225

                        for(var i=0; i<items.length; i++){
                            tl.to(items[i], 0, {rotation: offset, ease:Circ.easeOut}, 0);
                        }
                        tl.to(items, 0, {scale:0, ease:Back.easeIn}, 0);

                        // Add subsection navigation and event listeners for selecting main menu items
                        if(ui.mainMenus[menuName].lists.sectors){
                            ui.mainMenus[menuName].lists.sectors.forEach( sector => {
                                ui.methods.addSubSectionNav(sector)                
                                document.getElementById(`${menuName}-button-${sector}`).addEventListener('click', function(){ 
                                    externalEvents.toggleSectionTitle(this.id)
                                    ui.methods.selectSector(this, menuName)                 
                                    ui.methods.selectSubMenu(sector)
                                    scene.els.scene.setAttribute('move-fly-camera', {pos: [180, 60, 0], rotation: [-10, 90, 0], cleartitles: false} )
                                })
                            })
                        }
                        // Add free play mode menus..
                        if(ui.mainMenus[menuName].lists.modes){
                            ui.mainMenus[menuName].lists.modes.forEach( mode => {
                                console.log('Need to add a quick mode for '+mode)
                            })
                        }
                    })
                // 2. Set details close button and more info
                    document.getElementById('details-close-right').addEventListener('click', ui.methods.closeDetails)
                    document.getElementById('details-more-label').addEventListener('click', () => {
                        ui.methods.openMoreDetails()
                    })
                // 3. Add Event listeners (generic menu interactions only > to be added to add scene interactivity)
                    // a. All event buttons
                    document.querySelectorAll('.subMenu-event-container').forEach(el => {
                        el.addEventListener('click', function(){
                            ui.methods.selectEvent(this)
                        })
                    })
                    // b. Season selector buttons
                    document.querySelectorAll('.subMenu-event-icon-container.season').forEach(seasonEl => {
                        seasonEl.addEventListener('click', function(){
                            const season = this.id.slice(this.id.indexOf('-')+6)
                            state.scene.time.season = season
                            externalEvents.changeSeasonSelector(season)
                            scene.els.scene.setAttribute('set-hourly-environment', {season: season})
                        })
                    })
                    // c. Year selector
                    document.querySelectorAll('.subMenu-option-year-container.button').forEach(el => {
                        el.addEventListener('click', function(){
                            const currentYear = parseInt(+document.getElementById('menu-time-year').innerHTML),
                                targetYear = currentYear + parseInt(this.getAttribute('delta')) ,
                                newYear = targetYear < settings.modelTime.minYear ? settings.modelTime.minYear 
                                        : targetYear > settings.modelTime.maxYear ? settings.modelTime.maxYear 
                                        : targetYear
                            document.getElementById('menu-time-year').innerHTML =  newYear
                        })
                    })    
                    // d. Time of day (clock) buttons and initiate clockhand
                    document.getElementById('menu-time-forward').addEventListener('click', () => externalEvents.changeHour('forward')) 
                    document.getElementById('menu-time-back').addEventListener('click', () => externalEvents.changeHour('back')) 
                    document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-'+(state.scene.time.hour%12))
            }
        },
        lists: {
            hazardMenuEls: ['menu-heat', 'menu-drought', 'menu-bushfire', 'menu-acidification', 'menu-desertification',
                        'menu-stormFlood', 'menu-stormWind', 'menu-mudLandslides', 'menu-tropicalStorm',  'menu-winterStorm',  'menu-seaLevel', 
                        'menu-earthquake','menu-volcanic', 'menu-tsunami'],
            emissionsSectorMenuEls:  ['stationaryEnergy', 'transportEnergy', 'wasteAndWasteWater',  'industrialProcessesAndProductUse', 'agriculture','landAndForestry', 'all']
        }
    } 


////////////////////////////////////////////////////////////
/// METHODS ABLE TO BE CALLED EXTERNAL FROM THE SCENE   ////
////////////////////////////////////////////////////////////

    const externalEvents = {
        primeInterface: function(){
            console.log('PRIMING INTERFACE...')

            document.getElementById('loader-button').addEventListener('click', async function(){
                document.getElementById('loader-button').addEventListener('click', null)        // Ensure startApp not called twice
                // 0. Start the ToneJS audio context
                await Tone.start()
                // 1. Switch to instruction pane
                document.getElementById('loader-text').classList.add('faded')
                setTimeout( () => {
                    document.getElementById('loader-button').addEventListener('click', externalEvents.startApp)
                    document.getElementById('loader-button').innerHTML = 'Tap here to begin...'
                    document.getElementById('loader-text').innerHTML = document.getElementById('loader-instruction-text').innerHTML
                    document.getElementById('loader-text').classList.remove('faded')                    
                }, 200)
                // 2. Set balloon colours (to random!). Note: this is called here, after all balloons are created
                if(scene.els.scene){
                   scene.els.scene.setAttribute('set-balloon-colours', {random: true})
                }
            })
            // Setup menu interface and interaction
             ui.methods.setupMenuInterface()     
        },

        startApp: function(){
            document.getElementById('loader-button').addEventListener('click', null)        // Enure startApp not called twice
            document.getElementById('loader-background').classList.remove('active')         // Un-blur background
            document.getElementById('loader-intro').classList.add('hidden')
            if(scene.els.scene){
                // Intro: sail the duck and call the mobile block title
                scene.els.scene.setAttribute('sail-duck', null)
                state.scene.animation.intro = true
                scene.els.scene.setAttribute('emissions-activity-balloons', {visible: true})
                scene.els.items.blockGroupTitle.setAttribute('show-block-title', {id: "title-blocks", dur: 3000})
            }
            setTimeout(() => {
                document.getElementById('loader-container').classList.add('hidden')
            }, 1000)
        },

        toggleTouchUI: function() {
            state.ui.touchMenu = !state.ui.touchMenu
            if(state.ui.touchMenu) {
                document.getElementById('touch-UI').classList.toggle('active')
            }
        },

        toggleStats: function(){
            document.getElementById('scene').toggleAttribute('stats')
        },

        toggleCamera: function(camera){
            if(camera){     // If target camera specified
                if(camera === 'flyCam'){
                    scene.els.cam.fly.setAttribute('camera', {active: true })
                    scene.els.cam.orbit.setAttribute('camera', {active: false  })                
                } else {
                    scene.els.cam.fly.setAttribute('camera', {active: false })
                    scene.els.cam.orbit.setAttribute('camera', {active: true  })
                }
            } else {        // Otherwise toggle to other camera
                if(scene.els.cam.fly.getAttribute('camera').active ){
                    scene.els.cam.fly.setAttribute('camera', {active: false })
                    scene.els.cam.orbit.setAttribute('camera', {active: true  })
                } else {
                    scene.els.cam.fly.setAttribute('camera', {active: true  })
                    scene.els.cam.orbit.setAttribute('camera', {active: false })
                }
            }
        },

        rotateFlyCam: function(direction, duration = 2000){
            state.scene.enableKeyEvents = false
            scene.els.camRig.fly.removeAttribute('animation__position')
            scene.els.camRig.fly.removeAttribute('animation__rotation')     

            if(direction === 'left'){
                state.scene.camPosera.flyIndex = (state.scene.camPosera.flyIndex  + 1) < scene.camPos.overheadRing.length ? state.scene.camPosera.flyIndex  + 1 : 0
                rotateY =  scene.els.camRig.fly.getAttribute('rotation').y - 45
            } else if(direction === 'right') {
                state.scene.camPosera.flyIndex = (state.scene.camPosera.flyIndex  - 1) >= 0 ? state.scene.camPosera.flyIndex  - 1 : (scene.camPos.overheadRing.length -1)
                rotateY =  scene.els.camRig.fly.getAttribute('rotation').y + 45
            }

            scene.els.camRig.fly.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${scene.camPos.overheadRing[state.scene.camPosera.flyIndex].pos.x}  ${scene.camPos.overheadRing[state.scene.camPosera.flyIndex].pos.y}  ${scene.camPos.overheadRing[state.scene.camPosera.flyIndex].pos.z}`
            })  
            scene.els.camRig.fly.setAttribute('animation__rotation', {
                property: 'rotation',
                dur: duration,
                to: `-5 ${rotateY} 0}`
            })  

            scene.els.cam.fly.removeAttribute('animation__rotation')
            scene.els.cam.fly.setAttribute('animation__rotation', {
                property: 'fly',
                dur: duration,
                to: "0 0 0"
            })
            setTimeout( ()=> {
                externalEvents.resetLookControls()         // Bind new instance of look-controls after after animation
                state.ui.enableKeyEvents = true     
            }, duration)
        },

        toggleFlyCamHeight: function(){
            const currentPos = scene.els.camRig.fly.getAttribute('position')
            switch(state.scene.camera.flyHeight){
                case "high":
                    scene.els.camRig.fly.setAttribute('animation__pos', {
                        property:       'position',
                        dur:            1500,
                        to:             {x: currentPos.x,  y: 10, z: currentPos.z}
                    })
                    scene.els.camRig.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: 0,  y: 90, z: 0}
                    })
                    scene.els.cam.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: 0,  y: 0, z: 0}
                    })
                    state.scene.camera.flyHeight = "low"
                    break

                case "low":
                    scene.els.camRig.fly.setAttribute('animation__pos', {
                        property:       'position',
                        dur:            1500,
                        to:             {x: currentPos.x,  y: 90, z: currentPos.z}
                    })
                    scene.els.camRig.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: -10,  y: 90, z: 0}
                    })
                    state.scene.camera.flyHeight = "high"
                    break
            }
        },
        
        resetLookControls: function() { // Helper to attach new instance of look-controls after after animation
            scene.els.cam.fly.removeAttribute('look-controls')
            scene.els.cam.fly.setAttribute('look-controls', {})
        },

        toggleSectionTitle: function(sectionID){
        if(scene.els.scene)
            switch(sectionID){
                case 'menu-1-button-world': 
                    scene.els.items.blockGroup01.setAttribute('show-block-title', {id: "chapter-01-blocks"})
                    scene.els.items.blockGroup02.setAttribute('hide-block-title', {id: "chapter-02-blocks"})
                    scene.els.items.blockGroup03.setAttribute('hide-block-title', {id: "chapter-03-blocks"})
                    scene.els.items.blockGroup04.setAttribute('hide-block-title', {id: "chapter-04-blocks"})
                    break   
                case 'menu-1-button-risk': 
                    scene.els.items.blockGroup02.setAttribute('show-block-title', {id: "chapter-02-blocks"})
                    scene.els.items.blockGroup01.setAttribute('hide-block-title', {id: "chapter-01-blocks"})
                    scene.els.items.blockGroup03.setAttribute('hide-block-title', {id: "chapter-03-blocks"})
                    scene.els.items.blockGroup04.setAttribute('hide-block-title', {id: "chapter-04-blocks"})
                    break   
                case 'menu-1-button-emissions': 
                    scene.els.items.blockGroup03.setAttribute('show-block-title', {id: "chapter-03-blocks"})
                    scene.els.items.blockGroup01.setAttribute('hide-block-title', {id: "chapter-01-blocks"})
                    scene.els.items.blockGroup02.setAttribute('hide-block-title', {id: "chapter-02-blocks"})
                    scene.els.items.blockGroup04.setAttribute('hide-block-title', {id: "chapter-04-blocks"})
                    break   
                case 'menu-1-button-actions': 
                    scene.els.items.blockGroup04.setAttribute('show-block-title', {id: "chapter-04-blocks"})
                    scene.els.items.blockGroup01.setAttribute('hide-block-title', {id: "chapter-01-blocks"})
                    scene.els.items.blockGroup02.setAttribute('hide-block-title', {id: "chapter-02-blocks"})
                    scene.els.items.blockGroup03.setAttribute('hide-block-title', {id: "chapter-03-blocks"})
                    break   
            }
        },

        changeSeasonSelector: function(season){
            document.querySelectorAll('.subMenu-event-icon-container.season').forEach(season => season.classList.remove('active'))       
            document.getElementById(`menu-time-${season}`).classList.add('active')                
        },

        changeHour: function(direction, duration = 2000){
            console.log('Moving hour '+direction+' to '+scene.els.misc.sunPos[state.scene.time.hour])
            if(direction === 'forward'){
                state.scene.time.hour = state.scene.time.hour !== (scene.els.misc.sunPos.length - 1) ? state.scene.time.hour + 1 : 0
            } else if(direction === 'back'){
                state.scene.time.hour = state.scene.time.hour !== 0 ? state.scene.time.hour  - 1 :  scene.els.misc.sunPos.length - 1 
            }
            // Set the environment components affected by the change in hour
            scene.els.scene.setAttribute('set-hourly-environment', {dur: duration, hour: state.scene.time.hour })
            // Change thew clock
            externalEvents.changeClock(direction, duration)
            // Control key events
            state.ui.enableKeyEvents = false
            setTimeout( () => {  state.ui.enableKeyEvents = true }, duration)
        },

        changeClock: function(direction = 'forward', duration = 2000){
            // Prevent queuing of clicks
            document.getElementById('clockhand-hour-group').classList.add('noPointerEvents')
            document.getElementById('clockhand-min-group').classList.add('noPointerEvents')
            // Move the hour hand
            if(state.scene.time.hour % 12 === 0){
                if(direction === 'forward'){
                    document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-12')
                    setTimeout(() => {
                        document.getElementById('clockhand-hour-group').style.transitionDuration = '0s'
                        document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-0')
                    }, 2000)
                } else if(direction === 'back'){
                    document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-0')
                    setTimeout(() => {
                        document.getElementById('clockhand-hour-group').style.transitionDuration = '0s'
                        document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-12')
                    }, 2000)
                }
            } else {
                document.getElementById('clockhand-hour-group').style.transitionDuration = '2s'
                document.getElementById('clockhand-hour-group').setAttribute('class', 'hour-'+(state.scene.time.hour%12))
            }
            // Move the minute hand
            const spin = (direction === 'forward') ? 'spinClockwise' : 'spinAntiClock'
            document.getElementById('clockhand-min-group').style.transitionDuration = '2s'
            document.getElementById('clockhand-min-group').classList.add(spin)
            // Reset interactions
            setTimeout( () => {  
                document.getElementById('clockhand-min-group').style.transitionDuration = '0s'
                document.getElementById('clockhand-min-group').classList.remove('spinClockwise')
                document.getElementById('clockhand-min-group').classList.remove('spinAntiClock')
                document.getElementById('clockhand-min-group').classList.remove('noPointerEvents')
                document.getElementById('clockhand-hour-group').classList.remove('noPointerEvents')
            }, duration)
        },

        changeEnvironment: function(name = state.scene.environment.name, duration = 2000){
            scene.els.scene.setAttribute('set-environment', {name: name, dur: duration})
        },

        resetHazards: function(){
            state.scene.effect.particles = false
            state.scene.effect.flood = false
            state.scene.effect.wind = false
            state.scene.effect.bushfire = false
            scene.els.scene.setAttribute('hazard-sea-level', 'slchange: 0')
            scene.els.scene.removeAttribute('hazard-rain')
            scene.els.scene.removeAttribute('hazard-lightning')
            scene.els.scene.removeAttribute('hazard-bushfire')
            scene.els.scene.removeAttribute('hazard-drought')
            scene.els.scene.removeAttribute('hazard-tropical-storm')
            scene.els.scene.removeAttribute('hazard-winter-storm')
            scene.els.scene.removeAttribute('hazard-ocean-acidification')
            scene.els.scene.removeAttribute('hazard-flood')
            scene.els.scene.removeAttribute('hazard-wind')
            scene.els.scene.removeAttribute('hazard-heat')
            clearInterval(state.scene.effect.lightning)
            externalEvents.changeEnvironment(state.scene.environment.name)
            console.log('All hazards reset')
        }, 

        hazards: {
            stormFlood: function(type){
                let introDuration = 0
                 // For a new effect
                if(!state.scene.effect.flood){
                    introDuration = 2000
                    externalEvents.resetHazards()               // Clear any existing hazards
                    externalEvents.changeEnvironment('stormFlood', introDuration )
                    scene.els.scene.setAttribute('hazard-rain', null)
                    scene.els.scene.setAttribute('hazard-lightning', null)
                    state.scene.effect.particles = true  
                }
                state.scene.effect.flood = type
                switch(type){  
                    // Increase flood levels on subsequent keypress
                    case scene.hazard.options.stormFlood[0]:  // Minor flood
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.125}) 
                        }, introDuration)
                        break
                    case scene.hazard.options.stormFlood[1]:    // Medium flood
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.5}) 
                        }, introDuration)
                        break
                    case scene.hazard.options.stormFlood[2]:    // Major flood
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.75}) 
                        }, introDuration)
                        break
                    // Reset after showing major flood 
                    default:          
                        clearInterval(state.scene.effect.lightning)
                        scene.els.scene.removeAttribute('hazard-rain')
                        scene.els.scene.removeAttribute('hazard-lightning')
                        scene.els.scene.removeAttribute('hazard-flood')
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        state.scene.effect.particles = false
                        state.scene.effect.flood = false
                        state.scene.effect.lightning = false
                        state.scene.environment.hazardVisible = false
                }
            },
            stormWind: function(type) {
                let introDuration = 0
                 // For a new effect
                if(!state.scene.effect.wind){
                    introDuration = 2000
                    externalEvents.resetHazards()               // Clear any existing hazards
                    externalEvents.changeEnvironment('stormFlood', introDuration )
                    scene.els.scene.setAttribute('hazard-rain', null)
                    scene.els.scene.setAttribute('hazard-lightning', null)
                    state.scene.effect.particles = true  
                }
                state.scene.effect.wind = type
                switch(type){  
                    case scene.hazard.options.stormWind[0]:     // Severe wind event
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-wind', {"damage": 0})
                        }, introDuration)
                        break 
                    case scene.hazard.options.stormWind[1]:       // Extreme wind event
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-wind', {"damage": 0.25})
                        }, introDuration)
                        break
                    // Reset after showing major wind event 
                    default:    
                        clearInterval(state.scene.effect.lightning)
                        scene.els.scene.removeAttribute('hazard-wind')
                        scene.els.scene.removeAttribute('hazard-rain')
                        scene.els.scene.removeAttribute('hazard-lightning')
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        state.scene.effect.particles = false
                        state.scene.environment.hazardVisible =false
                }   
            },
            heat: function(type) {
                state.scene.effect.heat = type
                if(!state.scene.effect.heat){
                    externalEvents.resetHazards()               // Clear any existing hazards
                    externalEvents.changeEnvironment('heat', 2000)
                }
                switch(type){  
                    case scene.hazard.options.heat[0]:          // Hot day
                        scene.els.scene.setAttribute('hazard-heat', {intensity: 'hotDay'})
                        break
                    case scene.hazard.options.heat[1]:          // Very hot day
                        scene.els.scene.setAttribute('hazard-heat', {intensity: 'veryHotDay'})
                        break 
                    case scene.hazard.options.heat[2]:          // Heatwave
                        scene.els.scene.setAttribute('hazard-heat', {intensity: 'heatwave'})
                        break
                    // Reset after showing heat events
                    default:    
                        scene.els.scene.removeAttribute('hazard-heat')
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        state.scene.effect.heat = false
                        state.scene.environment.hazardVisible =false
                }   
            },
            drought: function(type) {
                if(!state.scene.effect.drought){
                    externalEvents.resetHazards()               // Clear any existing hazards
                }
                state.scene.effect.drought = type
                switch(type){  
                    case scene.hazard.options.drought[0]:          // Severe drought
                        scene.els.scene.setAttribute('hazard-drought', {level: 'minor'})
                        break
                    case scene.hazard.options.drought[1]:          // Extreme drought{ 
                        scene.els.scene.setAttribute('hazard-drought', {level: 'major'})
                        break
                    default:
                        scene.els.scene.removeAttribute('hazard-drought')
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        state.scene.effect.drought = false
                        state.scene.environment.hazardVisible =false
                }
            },
            bushfire: function(type) {
                if(!state.scene.effect.bushfire){
                    externalEvents.resetHazards()               // Clear any existing hazards
                }
                state.scene.effect.bushfire = type
                switch(type){  
                    case scene.hazard.options.bushfire[0]:          // Nearby
                        scene.els.scene.setAttribute('hazard-bushfire', {intensity: 0})
                        break
                    case scene.hazard.options.bushfire[1]:          // Suburban
                        scene.els.scene.setAttribute('hazard-bushfire', {intensity: 0.5})
                        break
                    case scene.hazard.options.bushfire[2]:          // Urban fire
                        scene.els.scene.setAttribute('hazard-bushfire', {intensity: 1})
                        break
                    default:
                        scene.els.scene.removeAttribute('hazard-bushfire')
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        state.scene.effect.bushfire = false
                        state.scene.environment.hazardVisible =false
                }
            },
            desertification: function(type) {
                state.scene.effect.desertification = type
                if(!state.scene.effect.desertification){
                    externalEvents.resetHazards()               // Clear any existing hazards
                }                
                switch(type){  
                    case scene.hazard.options.desertification[0]:
                        scene.els.scene.setAttribute('hazard-desertification', null)
                        break
                    default:
                        scene.els.scene.removeAttribute('hazard-desertification')
                        externalEvents.changeEnvironment('default')
                        state.scene.effect.desertification = false
                        state.scene.environment.hazardVisible =false
                }
            },
            mudLandslides: function(type) {
                state.scene.effect.mudLandslides = type
                if(!state.scene.effect.mudLandslides){
                    externalEvents.resetHazards()               // Clear any existing hazards
                }                
                switch(type){  
                    case scene.hazard.options.desertification[0]:
                        scene.els.scene.setAttribute('hazard-desertification', null)
                        break
                    default:
                        scene.els.scene.removeAttribute('hazard-desertification')
                        externalEvents.changeEnvironment('default')
                        state.scene.effect.desertification = false
                        state.scene.environment.hazardVisible =false
                }
            },

            acidification: function(type) {
                state.scene.effect.oceanAcidification = type
                if(!state.scene.effect.oceanAcidification){
                    externalEvents.resetHazards()               // Clear any existing hazards
                }                
                switch(type){  
                    case scene.hazard.options.acidification[0]:
                        scene.els.scene.setAttribute('hazard-ocean-acidification', null)
                        break
                    default:
                        scene.els.scene.removeAttribute('hazard-ocean-acidification')
                        externalEvents.changeEnvironment('default')
                        state.scene.effect.oceanAcidification = false
                        state.scene.environment.hazardVisible =false
                }
            },
            tropicalStorm: function(type) {
                introDuration = 0
                if(!state.scene.effect.tropicalStorm){
                    introDuration = 2000
                    externalEvents.resetHazards()               // Clear any existing hazards
                    // externalEvents.changeEnvironment('stormFlood', 2000 )
                }
                state.scene.effect.tropicalStorm = type
                switch(type){  
                    case scene.hazard.options.tropicalStorm[0]:
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-tropical-storm', null)
                            scene.els.scene.setAttribute('hazard-wind', {damage: 0.25})
                            state.scene.effect.wind = 'major'
                        }, introDuration)
                        break
                    default:
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        scene.els.scene.removeAttribute('hazard-tropical-storm')
                        scene.els.scene.removeAttribute('hazard-wind')
                        externalEvents.changeEnvironment('default')
                        state.scene.effect.tropicalStorm = false
                        state.scene.effect.wind = 'none'
                        state.scene.environment.hazardVisible = false
                }
            },
            winterStorm: function(type){
                introDuration = 0
                if(!state.scene.effect.winterStorm){
                    introDuration = 2000
                    externalEvents.resetHazards()               // Clear any existing hazards
                    externalEvents.changeEnvironment('snow', 2000 )
                    state.scene.effect.snow = true
                }
                state.scene.effect.winterStorm = type

                switch(type){  
                    case scene.hazard.options.winterStorm[0]:
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'snow'})
                        }, introDuration)
                        break
                    case scene.hazard.options.winterStorm[1]:
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'blizzard'})
                        }, introDuration)
                        break
                    case scene.hazard.options.winterStorm[2]:
                        setTimeout( () => { 
                            scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'iceStorm'})
                        }, introDuration)
                        break
                    default:
                        externalEvents.changeEnvironment(state.scene.environment.name)
                        scene.els.scene.removeAttribute('hazard-winter-storm')
                        state.scene.effect.winterStorm = false
                        state.scene.environment.hazardVisible = false
                }
            },
            earthquake: function(type) {
                switch(type){  
                    case scene.hazard.options.earthquake[0]:
                        scene.els.scene.setAttribute('hazard-earthquake', {intensity: 10})
                        break
                    default:
                        state.scene.environment.hazardVisible = false
                }
            },
            seaLevel: function(type){
                switch(type){  
                    case scene.hazard.options.seaLevel[0]: //Decrease
                        state.scene.effect.seaLevel = state.scene.effect.seaLevel - 0.1 
                        scene.els.scene.setAttribute('hazard-sea-level', 'slchange: '+state.scene.effect.seaLevel )
                        break
                    case scene.hazard.options.seaLevel[1]: // Decrease
                        state.scene.effect.seaLevel = state.scene.effect.seaLevel + 0.1 
                        scene.els.scene.setAttribute('hazard-sea-level', 'slchange: '+state.scene.effect.seaLevel )
                        break
                    case scene.hazard.options.seaLevel[2]: // Reset
                        scene.els.scene.setAttribute('hazard-sea-level', 'slchange: 0')
                        break
                }
            },
        }
    }
