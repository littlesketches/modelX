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
                    
                    scene.els.items.blockGroup.setAttribute('animation', {
                        property: 'position.y', from: 0, to: 100, dur: 3500, delay: 500
                    })
                    setTimeout( () => {
                        scene.els.items.blockGroup.removeAttribute('show-block-title')
                    }, 3500)  
                } else { // Close menu
                    const tl = new TimelineLite();
                    for(var i=0; i<items.length; i++){
                        tl.to(items[i], 0.3, {rotation: offset, ease:Circ.easeOut}, 0.05);
                    }
                    tl.to(items, .3, {scale:0, ease:Back.easeIn}, 0.3);

                    label.innerHTML = "+";
                    ui.mainMenus[menuName].svg.style.pointerEvents = "none";
                    document.querySelectorAll(`.${menuName}-item`).forEach(el =>  {
                        el.classList.remove('active')
                        el.classList.remove('blur')
                    })
                    document.querySelectorAll('.subMenu-container').forEach(el =>  el.classList.remove('active') )
                    ui.methods.closeDetails()
                    externalEvents.resetHazards()  
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
            }                
        }
    } 

    // Set up menu handler
    function setupMenuInterface(){
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
        // Add circle sector trigger event /animation
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
                        ui.methods.selectSector(this, menuName)                 
                        ui.methods.selectSubMenu(sector)
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
        // Set details close button and more info
        document.getElementById('details-close-right').addEventListener('click', ui.methods.closeDetails)
        document.getElementById('details-more-label').addEventListener('click', () => {
            ui.methods.openMoreDetails()
        })
    };

    // Add Event listeners (generic menu interactions only > to be added to add scene interactivity)
    function addInteraction() {
        document.querySelectorAll('.subMenu-event-container').forEach(el => {
            el.addEventListener('click', function(){
                ui.methods.selectEvent(this)
            })
        })
        // Season selector
        document.querySelectorAll('.subMenu-event-icon-container.season').forEach(seasonEl => {
            seasonEl.addEventListener('click', function(){
                const season = this.id.slice(this.id.indexOf('-')+6)
                state.scene.time.season = season
                externalEvents.changeSeasonSelector(season)
                scene.els.scene.setAttribute('set-hourly-environment', {season: season})
            })
        })
        // Year selector
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
    }


//////////////////////////////////////////
///////  LOADER    ///////
//////////////////////////////////////////

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('loader-button').innerHTML = 'Tap here to begin...'
        document.getElementById('loader-button').classList.add('ready')
    });
