/***************************************************************************/
/***************************************************************************/
/****              Project: Kingdom of Dreams and Madness               ****/
/****                                                                   ****/
/****  An exploration of building 'dynamic models' in a humane form     ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a    ****/
/****  a completed prototype is (eventually) released  under a Creative ****/
/***   Commons 4.0 license                                              ****/
/***************************************************************************/
/****  This components.js file is used for A-Frame scene interactivity  ****/
/***************************************************************************/


    console.log('REGISTERING CUSTOM A-FRAME COMPONENTS...')

    // SCENE SETUP AND WORLD UPDATE COMPONENTS
        AFRAME.registerComponent('init-elements', {
            init: function(){
                console.log('**** SETTING DOM ELEMENTS UP...****')

                // Iniiate element references on initation for referencing in othercomponent code
                scene.els.scene = document.getElementById('scene')
                // Zones elements
                scene.els.zones = {
                    planet:         document.getElementById('planet'),
                    central:        document.getElementsByClassName('central-zone'),
                    suburban:       document.getElementsByClassName('suburban-zone'),
                    urban:          document.getElementsByClassName('urban-zone'),
                    periUrban:      document.getElementsByClassName('periUrban-zone'),
                    agriculture:    document.getElementsByClassName('agriculture-zone'),
                    outer:          document.getElementsByClassName('agriculture-zone'),
                    waterfront:     document.getElementsByClassName('waterfront-zone'),
                }
                // Lights
                scene.els.lights = {
                    hemi:           document.getElementById('ambient-hemiLight'),
                    ambient:        document.getElementById('ambient-light'),
                    sun:            document.getElementById('sun-light'),
                    spot:           document.getElementById('spotlight-above')
                }
                // Environment elements
                scene.els.enviro = {
                    sun:            document.getElementById('sun-body'),
                    moon:           document.getElementById('moon-body'),
                    sky:            document.getElementById('sky'),
                    sea:            document.getElementById('sea'),
                    oceanGroup:     document.getElementById('ocean-group'),
                    snowGroup:      document.getElementById('snow-group'),
                    alpTops:        document.getElementById('alp-tops'),
                    particles:      document.getElementById('particles'),
                    lightningGroup: document.getElementById('lightning-group'),
                    grassGroup:     document.getElementById('ground-group'),
                    fire:           document.getElementById('fire-group'),
                    vortexGroup:    document.getElementById('vortex-group'),
                    vortex:         document.getElementById('vortex')
                }
                // Camera elements
                scene.els.cam = {
                    fly:            document.getElementById('flycam'),
                    low:            document.getElementById('lowcam')
                }
                scene.els.camRig = {
                    fly:            document.getElementById('flycam-rig'),
                    low:            document.getElementById('lowcam-rig')
                }
                // Miscellaneous items
                scene.els.items = {
                    duckPath:       document.getElementById('duck-path-points'),
                    blockGroup:     document.getElementById('message-blocks-group')
                }
                // Misc
                scene.els.misc = {
                    sunPos: [
                        "sun-0000", "sun-0100", "sun-0200", "sun-0300", "sun-0400", "sun-0500", 
                        "sun-0600", "sun-0700", "sun-0800", "sun-0900", "sun-1000", "sun-1100", 
                        "sun-1200", "sun-1300", "sun-1400", "sun-1500", "sun-1600", "sun-1700", 
                        "sun-1800", "sun-1900", "sun-2000", "sun-2100", "sun-2200", "sun-2300" ],
                    moonPos: [
                        "moon-0000", "moon-0100", "moon-0200", "moon-0300", "moon-0400", "moon-0500", 
                        "moon-0600", "moon-0700", "moon-0800", "moon-0900", "moon-1000", "moon-1100", 
                        "moon-1200", "moon-1300", "moon-1400", "moon-1500", "moon-1600", "moon-1700", 
                        "moon-1800", "moon-1900", "moon-2000", "moon-2100", "moon-2200", "moon-2300" ]
                }    

                const emissionsFeaturesSml = document.querySelectorAll('.house-small * .chimney, .house-small * .rooftop-solar, .house-small * .gas-meter, .house-small * .ac-unit, .house-small * .hot-water-tank, .house-small * .water-heat-pump, .house-small * .home-battery')
                const emissionsFeaturesLrg = document.querySelectorAll('.house-large * .chimney, .house-large * .rooftop-solar, .house-large * .gas-meter, .house-large * .ac-unit, .house-large * .hot-water-tank, .house-large * .water-heat-pump .house-large * .home-battery')

                emissionsFeaturesSml.forEach( el => { el.setAttribute('visible', true)  })
                emissionsFeaturesLrg.forEach( el => { el.setAttribute('visible', true)  })
            },
        })
         
        AFRAME.registerComponent("set-environment", { 
            schema: {
                dur:                  {type: 'number',    default: 2000},
                name:                 {type: 'string',    default: state.scene.environment.name}
            },
            init: function(){
            },
            update: function(){
                const timeOfDay = state.scene.time.timeOfDay()
                console.log('Changing environment to:'+name, timeOfDay)

                // Change the sky colour for time of day and "conditions"
                scene.els.enviro.sky.setAttribute('animation__topColour', {
                    property:   'material.topColor',
                    dur:        this.data.dur,
                    to:         settings.days[this.data.name][timeOfDay]['sky-top']
                })  
                scene.els.enviro.sky.setAttribute('animation__bottomColour', {
                    property:   'material.bottomColor',
                    dur:        this.data.dur,
                    to:         settings.days[this.data.name][timeOfDay]['sky-bottom']
                })  
                // Change the hemisphere light colours and ocean colour
                if(settings.days[this.data.name][timeOfDay].hemilight){
                    scene.els.lights.hemi.setAttribute('animation__skyCol', {
                        property: 'light.color',
                        dur: this.data.dur,
                        to: settings.days[this.data.name][timeOfDay].hemilight.sky
                    })  
                    scene.els.lights.hemi.setAttribute('animation__groundCol', {
                        property: 'light.groundColor',
                        dur: this.data.dur,
                        to: settings.days[this.data.name][timeOfDay].hemilight.ground
                    })  
                } else {
                    scene.els.lights.hemi.setAttribute('animation__skyCol', {
                        property: 'light.color',
                        dur: this.data.dur,
                        to: settings.days.default[timeOfDay].hemilight.sky
                    })  
                    scene.els.lights.hemi.setAttribute('animation__groundCol', {
                        property: 'light.groundColor',
                        dur: this.data.dur,
                        to: settings.days.default[timeOfDay].hemilight.ground
                    })  
                }
                // Change the water colour
                if(settings.days[this.data.name][timeOfDay].water){
                    scene.els.enviro.sea.removeAttribute('ocean')
                    scene.els.enviro.sea.setAttribute('ocean', {
                        color:              settings.days[this.data.name][timeOfDay].water,
                        width:              10.8,
                        amplitude:          0.25,
                        amplitudeVariance:  0.25,
                        density:            20
                    })  
                } else {
                    scene.els.enviro.sea.removeAttribute('ocean')
                    scene.els.enviro.sea.setAttribute('ocean', {
                        color:              settings.days.default[timeOfDay].water,
                        width:              10.8,
                        amplitude:          0.25,
                        amplitudeVariance:  0.25,
                        density:            20
                    })  
                }
                // Change the fog settings
                if(settings.days[this.data.name][timeOfDay].fog){
                    scene.els.scene.setAttribute('fog', {
                        color: settings.days[this.data.name][timeOfDay].fog.color,
                        far: settings.days[this.data.name][timeOfDay].fog.far
                    })  
                    scene.els.scene.setAttribute('animation__far', {
                        property: 'fog.far',
                        dur: this.data.dur,
                        from: 1000,
                        to: settings.days[this.data.name][timeOfDay].fog.far
                    })  
                } else {
                    scene.els.scene.setAttribute('fog', {
                        color: settings.days.default[timeOfDay].fog.color,
                        far: settings.days.default[timeOfDay].fog.far
                    })  
                }

                // Update the hourly environment components
                scene.els.scene.setAttribute('set-hourly-environment', null)
            }
        }),

        AFRAME.registerComponent("set-hourly-environment", { 
            schema: {
                dur:                  {type: 'number',    default: 2000},
                time:                 {type: 'number',    default: state.scene.time.hour},
                season:               {type: 'string',    default: state.scene.time.season}
            },
            init: function(){
                externalEvents.changeSeasonSelector(state.scene.time.season)
            },
            update: function(){           
                console.log('Moving sun and other hourly elements for '+this.data.season)    
                // Resposition sun and sun light (incl. adjust sun position for season)
                const newSunPos = {
                    x: document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position').x + settings.environment.sunOffset[this.data.season].x,
                    y: document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position').y + settings.environment.sunOffset[this.data.season].y,
                    z: document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position').z + settings.environment.sunOffset[this.data.season].z
                }
                scene.els.enviro.sun.setAttribute('animation__position', {
                    property: 'position',
                    dur: this.data.dur,
                    to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
                })  
                scene.els.lights.sun.setAttribute('animation__position', {
                    property: 'position',
                    dur: this.data.dur,
                    to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
                })  
                // Resposition moon body
                const newMoonPos = document.getElementById(scene.els.misc.moonPos[state.scene.time.hour]).getAttribute('position')
                scene.els.enviro.moon.setAttribute('animation__position', {
                    property: 'position',
                    dur: this.data.dur,
                    to: `${newMoonPos.x}  ${newMoonPos.y}  ${newMoonPos.z}`
                })  
                // Change the hemi ambient light
                scene.els.lights.hemi.setAttribute('animation__light', {
                    property: 'light.intensity',
                    dur: this.data.dur,
                    to: settings.lights.hemi.intProp[this.data.season][state.scene.time.hour] * settings.lights.hemi.maxIntensity
                })  
                // Turn lights on/off
                if ((state.scene.time.timeOfDay() === "day" || state.scene.time.timeOfDay() === "morning")){
                    if(state.scene.environment.nightLights){ scene.els.scene.removeAttribute('nightlights')  } 
                } else {
                    if(!state.scene.environment.nightLights){ scene.els.scene.setAttribute('nightlights', null) } 
                }
                // Track the solar  
                const solarFarmEls = document.getElementsByClassName('solarRotatable')
                for(let i = 0; i < solarFarmEls.length; i++){
                    solarFarmEls[i].setAttribute('animation__rotate', {
                        property:   'rotation',
                        dur:        this.data.dur,
                        to:         {x: settings.solarFarm.rotationByHour[state.scene.time.hour], y: 0, z: 0}
                    })            
                }
            }
        })

        AFRAME.registerComponent('initiate-ui', {
            init: function(){
                document.getElementById('loader-background').classList.remove('active')
                setupMenuInterface()
                addInteraction() 
                setTimeout(() => {
                    document.getElementById('loader-background').classList.remove('active')
                    document.getElementById('loader-container').classList.add('hidden')
                }, 1500)
            }
        })


    // CAMERA CONTROl
        AFRAME.registerComponent("move-fly-camera", {
            schema: {
                dur:                {type: 'number',    default: 5000},
                pos:                {type: 'array',     default: [0, 0, 0]},
                rotation:           {type: 'array',     default: [0, 0, 0]},
                reset:              {type: 'boolean',   default: false},
                ease:               {type: 'string',    default: 'easeInOutCubic'},
                camera:             {type: 'string',    default: ''}
            },

            update: function() {    
                // Disable all event container buttons
                document.querySelectorAll('.subMenu-event-container').forEach(el => el.classList.add('noPointerEvents'))
                // Animate camera rig position and rotation
                scene.els.camRig.fly.setAttribute('animation__pos', {
                    property:           'position',
                    dur:                this.data.dur,
                    to:                 `${this.data.pos[0]}  ${this.data.pos[1]} ${this.data.pos[2]}`,
                    easing:             this.data.ease
                })

                scene.els.camRig.fly.setAttribute('animation__rotation', {
                    property:           'rotation',
                    dur:                this.data.dur,
                    to:                 `${this.data.rotation[0]}  ${this.data.rotation[1]} ${this.data.rotation[2]}`,
                    easing:              this.data.ease
                })
                // Reset look controls on the camera itself: remove and reattached eh look-controls to clear any user look rotation
                scene.els.cam.fly.removeAttribute('look-controls')
                scene.els.cam.fly.removeAttribute('wasd-controls')
                scene.els.cam.fly.removeAttribute('animation__rotation')
                scene.els.cam.fly.removeAttribute('animation__position')
                scene.els.cam.fly.setAttribute('animation__rotation', {
                    property:           'rotation',
                    dur:                this.data.dur,
                    to:                 `0 0 0`,
                    easing:             this.data.ease
                })
                scene.els.cam.fly.setAttribute('animation__position', {
                    property:           'position',
                    dur:                this.data.dur,
                    to:                 `0 0 0`,
                    easing:             this.data.ease
                })
                setTimeout(()=> {
                    scene.els.cam.fly.setAttribute('look-controls', null)
                    scene.els.cam.fly.setAttribute('wasd-controls', null)
                    document.querySelectorAll('.subMenu-event-container').forEach(el => el.classList.remove('noPointerEvents'))
                }, this.data.dur)
            }
        })

        AFRAME.registerComponent("move-low-camera", {
            schema: {
                dur:                {type: 'number',    default: 5000},
                pos:                {type: 'array',     default: [0, 0, 0]},
                target:             {type: 'array',     default: [0, 10, 0]},
                reset:              {type: 'boolean',   default: false},
                ease:               {type: 'string',    default: 'easeInOutCubic'},
            },

            update: function() {
                const currentPos = scene.els.cam.low.getObject3D('camera').position,
                    initPos = scene.els.cam.low.getAttribute('orbit-controls').initialPosition,
                    moveToX = this.data.reset ? 0 : this.data.pos[0] - initPos.x,
                    moveToY = this.data.reset ? 0 :  this.data.pos[1] - initPos.y,
                    moveToZ = this.data.reset ? 0 :  this.data.pos[2] - initPos.z

                console.log('Target position: '+ this.data.pos)
                console.log('Duration: '+this.data.dur)
                console.log('Move camera to:')
                console.log('x: '+  moveToX)
                console.log('y: '+  moveToY)
                console.log('z: '+  moveToZ)
                console.log('Move target to:')
                console.log('x: '+  this.data.target[0])
                console.log('y: '+  this.data.target[1])
                console.log('z: '+  this.data.target[2])
                scene.els.cam.low.setAttribute('animation__pos', {
                    property:           'position',
                    dur:                this.data.dur,
                    to:                 `${moveToX}  ${moveToY} ${moveToZ}`,
                    easing:              this.data.ease
                })

                scene.els.cam.low.setAttribute('animation__target', {
                    property:           'orbit-controls.target',
                    dur:                this.data.dur,
                    to:                 `${this.data.target[0]}  ${this.data.target[1]} ${this.data.target[2]}`,
                    easing:              this.data.ease
                })
            }
        })

        AFRAME.registerComponent("fly-plane", {
            init: function () {
                document.getElementById("plane-animation").setAttribute('alongpath', {
                    curve:          "#airplane-path-points",
                    dur:            90000, 
                    rotate:         true
                })
                setTimeout( () => {
                    state.scene.animation.planeFlight = false
                    scene.els.scene.removeAttribute('fly-plane') 
                }, 90000)
            }
        })

        AFRAME.registerComponent("sail-duck", {
            update: function () {
                document.getElementById("rubberDuck").setAttribute('alongpath', {
                    curve:          "#duck-path-points",
                    dur:            120000, 
                    loop:           true, 
                    rotate:         true
                })
            },

            remove: function(){
                document.getElementById("rubberDuck").removeAttribute('alongpath')
            }
        })

        AFRAME.registerComponent("animate-lighthouse", {
            play: function() {
                document.getElementById("lighthouse-light").setAttribute('animation__lighthouse', {
                    property:       'rotation',
                    dur:            30000,
                    from:           '-10 -50 0',
                    to:             '-10 -180 0',
                    loop:           true,
                    dir:            'alternate'
                })
            }
        })

        AFRAME.registerComponent("nightlights", {
            schema: {
                dur:             {type: 'number',   default: 1000 },              
            },            
            init: function() {
                const glassEls =  document.getElementsByClassName('glass-group')
                state.scene.environment.nightLights = true
                for(const el of glassEls){
                    el.setAttribute('material', {'emissive': '#C7CEF6'})
                }
                document.getElementById('lighthouse-light').setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            30000,
                        from:           '-10 -50 0',
                        to:             '-10 -180 0',
                        loop:           true,
                        dir:            'alternate'
                    })
                document.getElementById('lighthouse-light').setAttribute('animation__intensity', {
                    property:       'light.intensity',
                    dur:            this.data.dur,
                    to:             1
                })
            },

            remove: function(){
                const glassEls =  document.getElementsByClassName('glass-group')
                state.scene.environment.nightLights = false
                for(const el of glassEls){
                    el.setAttribute('material', {'emissive': '#000'})
                }
                document.getElementById('lighthouse-light').removeAttribute('animation__rotation')
                document.getElementById('lighthouse-light').setAttribute('animation__intensity', {
                    property:       'light.intensity',
                    dur:            this.data.dur,
                    to:             0
                })
            }
        })

        AFRAME.registerComponent("show-block-title", {
            schema: {
                text:        {type: 'string',   default: "Hello world"},
                tilt:        {type: 'array',    default: [10, -10]},
                rotate:      {type: 'array',    default: [0, 0]},   
                posZ:        {type: 'array',    default: [50, -50]},            
                posX:        {type: 'array',    default: [0, 0]},            
                posY:        {type: 'array',    default: [0, 0]},
                letterSpace: {type: 'number',   default: 17.5},                     
            },

            init: function() {
                const words = this.data.text.split(" "),
                    container = document.getElementById("message-blocks-group"),
                    noWords = words.length

                container.innerHTML = ""            // Clear previous
                let letterCount = 0;

                words.forEach((word, i) => {
                    const noLetters = word.length,
                        width = (noLetters - 1) * this.data.letterSpace,
                        startPos = width/2,
                        tilt = +this.data.tilt[i],
                        rotate = +this.data.rotate[i]

                    const wordContainer =  document.createElement('a-entity')
                    wordContainer.setAttribute('id', 'message-block-word-'+i)
                    wordContainer.setAttribute('class', 'block-title')
                    wordContainer.setAttribute('position', { x: this.data.posX[i],   y:  this.data.posY[i],  z: this.data.posZ[i] })

                    const topString = document.createElement('a-cylinder')
                    topString.setAttribute('mixin', 'mobile-string')
                    topString.setAttribute('position', { x: 0,   y: 105,  z: 0 })
                    topString.setAttribute('rotation', { x: 0,   y: 90,   z: 0 })
                    topString.setAttribute('geometry', { radius: 0.25, height: 50 })

                    const mobile = document.createElement('a-cylinder')
                    mobile.setAttribute('mixin', 'mobile-bar')
                    mobile.setAttribute('position', { x: 0,   y: 80,  z: 0 })
                    mobile.setAttribute('rotation', { x: (90 + tilt), y: rotate,   z: 0 })
                    mobile.setAttribute('geometry', { height: (width + 5) })

                    const mobileGroup= document.createElement('a-entity')
                    mobileGroup.setAttribute('class', 'mobile-group')
                    mobileGroup.setAttribute('position', { x: 0,   y: Math.atan(tilt * Math.PI / 180) * 10,  z: 0 })                
                    mobileGroup.setAttribute('animation__mobile1', { property: 'rotation.y' ,  from: -5, to: 5, dur: 5000, delay: (2500* i), dir: 'alternate', loop: 'true' })                

                    word.split('').forEach((letter, j) => {
                        const letterString= document.createElement('a-entity')
                        letterString.setAttribute('mixin', 'mobile-string')
                        letterString.setAttribute('position', { x: 0,   y: (startPos - this.data.letterSpace * j) ,  z: 10 })
                        letterString.setAttribute('rotation', { x: (-90  -tilt), y: 0,   z: 0 })
                        letterString.setAttribute('geometry', {primitive: 'cylinder', height: 20})

                        const letterBox = document.createElement('a-box')
                        letterBox.setAttribute('position',  { x: 0,   y: -12.5,  z: 0 })
                        letterBox.setAttribute('rotation',  { x: 0,     y: 90,   z: 0 })
                        letterBox.setAttribute('scale',     { x: 10,    y: 10,   z: 10 })
                        letterBox.setAttribute('material', { color: palette.letterBlock[letterCount % palette.letterBlock.length].trim() })

                        const letterFrontText = document.createElement('a-entity')
                        letterFrontText.setAttribute('position', { x: 0,   y: 0,  z: 0.5 })
                        letterFrontText.setAttribute('scale', { x: 20, y: 20,   z: 20 })
                        letterFrontText.setAttribute('text', { value: letter.toUpperCase(), align: 'center' })

                        const letterBackText = document.createElement('a-entity')
                        letterBackText.setAttribute('position', { x: 0,   y: 0,   z: -0.5 })
                        letterBackText.setAttribute('rotation', { x: 0,   y: 180,  z: 0 })
                        letterBackText.setAttribute('scale', { x: 20, y: 20,   z: 20 })
                        letterBackText.setAttribute('text', { value: letter.toUpperCase(), align: 'center' })

                        const letterSideA = document.createElement('a-entity')
                        letterSideA.setAttribute('position', { x: 0.525,   y: 0,   z: 0 })
                        letterSideA.setAttribute('rotation', { x: 0,   y: 90,  z: 0 })
                        letterSideA.setAttribute('scale', { x: 20, y: 20,   z: 20 })
                        letterSideA.setAttribute('material', { side: 'back' })
                        letterSideA.setAttribute('text', { value: letter.toUpperCase(), align: 'center' })

                        const letterSideB = document.createElement('a-entity')
                        letterSideB.setAttribute('position', { x: -0.525,   y: 0,   z: 0 })
                        letterSideB.setAttribute('rotation', { x: 0,   y: -90,  z: 0 })
                        letterSideB.setAttribute('scale', { x: 20,  y: 20,   z: 20 })
                        letterSideA.setAttribute('material', { side: 'back' })
                        letterSideB.setAttribute('text', { value: letter.toUpperCase(), align: 'center' })

                        const letterBottom = document.createElement('a-entity')
                        letterBottom.setAttribute('position', { x: 0,   y: -0.525,   z: 0 })
                        letterBottom.setAttribute('rotation', { x: -90,   y: 0,  z: 0 })
                        letterBottom.setAttribute('scale', { x: 20,  y: 20,   z: 20 })
                        letterBottom.setAttribute('text', { value: letter.toUpperCase(), align: 'center', side: 'back' })

                        const letterTop= document.createElement('a-entity')
                        letterTop.setAttribute('position', { x: 0,   y: 0.525,   z: 0 })
                        letterTop.setAttribute('rotation', { x: 90,   y: 0,  z: 0 })
                        letterTop.setAttribute('scale', { x: 20,  y: 20,   z: 20 })
                        letterTop.setAttribute('text', { value: letter.toUpperCase(), align: 'center', side: 'back' })

                        letterBox.appendChild(letterBottom)
                        letterBox.appendChild(letterTop)
                        letterBox.appendChild(letterSideA)
                        letterBox.appendChild(letterSideB)
                        letterBox.appendChild(letterBackText)
                        letterBox.appendChild(letterFrontText)
                        letterString.appendChild(letterBox)
                        mobileGroup.appendChild(letterString)
                        letterCount++
                    })

                    // Append all containers
                    mobile.appendChild(mobileGroup)
                    wordContainer.appendChild(topString)
                    wordContainer.appendChild(mobile)
                    container.appendChild(wordContainer)
                })
            },
        })


    // CLIMATE RISK / HAZARD EVENT VISUALISATIONS
        AFRAME.registerComponent('hazard-sea-level', {
            schema: {
                slchange:        {type: 'number',   default: 0 },  
                dur:             {type: 'number',   default: 1000 },              
            },
            update: function(){
                // Change sea level
                const currentSea = scene.els.enviro.sea.getAttribute('position')
                scene.els.enviro.sea.setAttribute('animation__seaLevel', {
                    property:       'position',
                    dur:            this.data.dur,
                    to:             {x: currentSea.x,   y: 2 + this.data.slchange, z: currentSea.z}
                })
                // Change angle to show 'creeping inundation' (above 2)
                if(this.data.slchange > 2){
                    scene.els.enviro.oceanGroup.setAttribute('animation__seaAngle', {
                        property:       'rotation',
                        dur:            this.data.dur,
                        to:             {x: 0,   y: 0,  z: 1}
                    })
                } else {
                    scene.els.enviro.oceanGroup.setAttribute('animation__seaAngle', {
                        property:       'rotation',
                        dur:            this.data.dur,
                        to:             {x: 0,   y: 0,  z: 0}
                    })
                }
                // Move the bloody duck!
                const duckPoints = document.getElementsByClassName('duckPathPoint')
                setTimeout( () => {
                    for(let i = 0; i < duckPoints.length; i++){
                        const duckPoint = duckPoints[i].getAttribute('position')
                        duckPoints[i].setAttribute('position', {
                            x: duckPoint.x,  
                            y: (-4 + this.data.slchange), 
                            z: duckPoint.z 
                        })
                    }
                }, this.data.dur)
                console.log('Changing sea level from '+currentSea.y+' to '+(currentSea.y + this.data.slchange))
            }
        })

        AFRAME.registerComponent('hazard-rain', {
            schema: {   
                dur:                    {type: 'number',   default: 1000 },      
            },
            init: function(){
                // Move clouds in
                document.getElementById('cloud-group-left').setAttribute('animation__pos', {
                    property:   'position',
                    dur:        this.data.dur,
                    to:         {x: 100, y: 0, z: 0}
                })
                document.getElementById('cloud-group-right').setAttribute('animation__pos', {
                    property:   'position',
                    dur:        this.data.dur,
                    to:         {x: -140, y: 0, z: 0}
                })
                // Start rain particles after the clouds
                setTimeout(() => {
                    scene.els.enviro.particles.setAttribute('particle-system', {
                        preset:              'dust',
                        blending:            1,
                        size:                2,
                        maxAge:              3,
                        particleCount:       5000,
                        type:                3,
                        color:               '#fff, #377b7b',
                        rotationAngle:       3.140,
                        rotationAngleSpread: 0.5,
                        accelerationSpread:  {x: 0, y: 20, z: 0},
                        accelerationValue:   {x: 0, y: 50, z: 0}
                    })
                }, this.data.dur * 1.25)

                // Build up of puddles
                const floodplains = document.getElementsByClassName('floodplain'),
                    floodGroup = document.getElementById('nuisance-flood-group')
                for(let i = 0; i < floodplains.length; i++){
                    floodplains[i].setAttribute('ocean', {
                        width:              0.75,
                        amplitude:          0.2,
                        amplitudeVariance:  0,
                        density:            20,
                        color:              '#377b7b',
                        depth:              0.75,
                        speed:              0.01
                    })
                }
            },
            remove: function(){
                // Move clouds out
                document.getElementById('cloud-group-left').setAttribute('animation__pos', {
                    property:   'position',
                    dur:        this.data.dur,
                    to:         {x: -200, y: 0, z: 0}
                })
                document.getElementById('cloud-group-right').setAttribute('animation__pos', {
                    property:   'position',
                    dur:        this.data.dur,
                    to:         {x: 200, y: 0, z: 0}
                })
                // Stop the rain
                scene.els.enviro.particles.removeAttribute('particle-system')
                // Remove the puddles and reset the flood group height
                const floodplains = document.getElementsByClassName('floodplain'),
                    floodGroup = document.getElementById('nuisance-flood-group')
                floodGroup.setAttribute('animation__puddles', {
                    property:   'position',
                    to:       {x: 0, y: -2, z: 0},
                    from:         {x: 0, y: this.data.floodLvl, z: 0},
                    dur:        this.data.dur * 2
                })
                setTimeout(() => {
                    for(let i = 0; i < floodplains.length; i++){
                        floodplains[i].removeAttribute('ocean')
                    }
                    floodGroup.removeAttribute('animation__puddles')  
                }, this.data.dur * 2);
            }
        })

        AFRAME.registerComponent('hazard-lightning', {
            schema: {   
                dur:                    {type: 'number',   default: 1000 },    
            },
            init: function(){
                // Lightning effects
                const currentEnviro = settings.days.stormFlood[state.scene.time.timeOfDay()]
                state.scene.effect.lightning = setInterval(strike, 5000 + Math.random()* 10000 );
                function strike(){
                    scene.els.enviro.sky.setAttribute('material', { topColor:   '#fff' })
                    scene.els.enviro.lightningGroup.setAttribute('visible', 'true')
                    setTimeout(() => {
                       scene.els.enviro.sky.setAttribute('material', {  topColor:  currentEnviro['sky-top']  })
                       setTimeout(() => {
                            scene.els.enviro.sky.setAttribute('material', { topColor:   '#fff' })               
                            setTimeout( ()=> {
                                scene.els.enviro.sky.setAttribute('material', {  topColor:  currentEnviro['sky-top']  })
                                scene.els.enviro.lightningGroup.setAttribute('visible', 'false')
                            }, 50)
                        }, 30);
                    }, 30);
                };
            },

            remove: function(){
                // Stop the lightning
                clearInterval(state.scene.effect.lightning)
            }
        })

        AFRAME.registerComponent('hazard-flood', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                floodLvl:               {type: 'number',   default: 0.5 },
                centralFloodLvl:        {type: 'number',   default: 0 },         
                urbanFloodLvl:          {type: 'number',   default: 0.5 },         
                industrialFloodLvl:     {type: 'number',   default: 0 },         
                suburbanFloodLvl:       {type: 'number',   default: 0 },         
                periurbanFloodLvl:      {type: 'number',   default: 0 },         
                agriculturalFloodLvl:   {type: 'number',   default: 0 }
            },

            update: function(){
                // Raise the puddles
                const  floodGroup = document.getElementById('nuisance-flood-group')
                floodGroup.setAttribute('animation__puddles', {
                    property:   'position',
                    to:         {x: 0, y: this.data.floodLvl, z: 0},
                    dur:        this.data.dur 
                })
            },

            remove: function(){
                // Remove the puddles and reset the flood group height
                const floodplains = document.getElementsByClassName('floodplain'),
                    floodGroup = document.getElementById('nuisance-flood-group')
                floodGroup.setAttribute('animation__puddles', {
                    property:   'position',
                    to:       {x: 0, y: -2, z: 0},
                    from:         {x: 0, y: this.data.floodLvl, z: 0},
                    dur:        this.data.dur * 2
                })
                setTimeout(() => {
                    for(let i = 0; i < floodplains.length; i++){
                        floodplains[i].removeAttribute('ocean')
                    }
                    floodGroup.removeAttribute('animation__puddles')  
                }, this.data.dur * 2);
            }
        })

        AFRAME.registerComponent('hazard-wind', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                windIntensity:          {type: 'number',   default: 20 }, 
                damage:                 {type: 'number',   default: 0 }  
            },

            update: function(){
                // Windy rain
                setTimeout( () => {
                    scene.els.enviro.particles.setAttribute('particle-system', {
                        preset:              'dust',
                        blending:            1,
                        size:                2,
                        maxAge:              3,
                        particleCount:       5000,
                        type:                3,
                        color:               '#fff, #377b7b',
                        rotationAngle:       90,
                        rotationAngleSpread: 0.5,
                        accelerationSpread:  {x: 0, y: 20, z: 0},
                        accelerationValue:   {x: 0, y: 50, z: 0}
                    })
                }, this.data.dur)
                clearInterval(state.scene.effect.treeSway)
                const treeEls = document.querySelectorAll('.tree'),
                    fallenRatio = this.data.damage === 0 ? 0 : Math.round(1 / this.data.damage)

                for(let i = 0; i < treeEls.length; i++){
                    // Fell trees if wind damage specified
                    if(fallenRatio > 0 && i%fallenRatio === 0 ){
                        treeEls[i].classList.add("fallen")
                        treeEls[i].classList.remove("standing")
                        treeEls[i].setAttribute('animation__sway', {
                            property:       'rotation',
                            dur:            500,
                            to:             {x: 80, y: Math.random()*360, z: Math.random()*360},
                        })
                    // Or add to swaying trees 
                    } else {
                        treeEls[i].classList.add("standing")
                        treeEls[i].classList.remove("fallen")
                    }
                    // Then sway standing trees
                    if(i === treeEls.length - 1){
                        const treeStandingEls = document.querySelectorAll('.standing')
                        state.scene.effect.treeSway = setInterval(() => {
                            sway(this.data.windIntensity, treeStandingEls)
                            setTimeout(() => {returnTrees(treeStandingEls)}, 3000);
                        }, 4500);            
                        function sway(intensity, els){
                            for(let i = 0; i < els.length; i++){
                                els[i].setAttribute('animation__sway', {
                                    property:       'rotation',
                                    dur:            3000,
                                    to:             {x: -(intensity/4 + Math.random()* intensity), y: 0, z: (-intensity/4 + Math.random()* intensity)},
                                })
                            }
                        }
                        function returnTrees(els){
                            for(let i = 0; i < els.length; i++){
                                els[i].setAttribute('animation__sway', {
                                    property:       'rotation',
                                    dur:            1500,
                                    to:             {x: 0, y: 0, z: 0},
                                })
                            }
                        }
                    }
                }
            },

            remove: function(){
                // Stop the wind
                scene.els.enviro.particles.removeAttribute('particle-system')
                // Stop the trees swaying
                clearInterval(state.scene.effect.treeSway)
                const treeEls = document.getElementsByClassName('tree')
                for(let i = 0; i < treeEls.length; i++){
                    treeEls[i].classList.remove("fallen")
                    treeEls[i].classList.remove("standing")
                    treeEls[i].setAttribute('animation__sway', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: 0, y: 0, z: 0},
                    })
                    setTimeout(() => {
                        treeEls[i].removeAttribute('animation__sway')
                    }, 2000);
                }
            }
        })

        AFRAME.registerComponent('hazard-drought', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                level:                  {type: 'string',   default: 'minor' },  
            },
            update: function(){
                externalEvents.changeEnvironment('dry', this.data.dur)
                // Change grass/ground conditions
                const groundEls = document.getElementsByClassName('grass'),
                    fieldEls = document.getElementsByClassName('field'),
                    cropSoilEls = document.getElementsByClassName('cropTopSoil')
                for (let i = 0; i < groundEls.length; i++){
                    groundEls[i].setAttribute('animation__grassCol', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         '#9ba550'
                    })
                }
                for (let i = 0; i < fieldEls.length; i++){
                    fieldEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         '#d9b759'
                    })
                }
                for (let i = 0; i < cropSoilEls.length; i++){
                    cropSoilEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         '#d9b759'
                    })
                }
                // Change tree foliage
                const foliageEls = document.getElementsByClassName('foliage')
                for (let i = 0; i < foliageEls.length; i++){
                    foliageEls[i].setAttribute('animation__foliageCol', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         '#9a881c'
                    })
                }
                // Change the crop colours
                const cornEls = document.getElementsByClassName('crop-corn'),
                    cornStemEls = document.getElementsByClassName('stem-corn'),
                    wheatEls = document.getElementsByClassName('crop-wheat'),
                    wheatStemEls = document.getElementsByClassName('stem-wheat'),
                    genCropEls = document.getElementsByClassName('crop-generic')
                if(this.data.level === 'minor'){
                    for (let i = 0; i < cornEls.length; i++){
                        cornEls[i].setAttribute('animation__col', {
                            property:   'material.color',
                            dur:        this.data.dur,
                            to:         '#ea9739'
                        })
                    }
                    for (let i = 0; i < cornStemEls.length; i++){
                        cornStemEls[i].setAttribute('animation__col', {
                            property:   'material.color',
                            dur:        this.data.dur,
                            to:         '#ea9739'
                        })
                    }
                    for (let i = 0; i < wheatEls.length; i++){
                        wheatEls[i].setAttribute('animation__col', {
                            property:   'material.color',
                            dur:        this.data.dur,
                            to:         '#ea9739'
                        })
                    }
                    for (let i = 0; i < wheatStemEls.length; i++){
                        wheatStemEls[i].setAttribute('animation__col', {
                            property:   'material.color',
                            dur:        this.data.dur,
                            to:         '#ea9739'
                        })
                    }
                    for (let i = 0; i < genCropEls.length; i++){
                        genCropEls[i].setAttribute('animation__col', {
                            property:   'material.color',
                            dur:        this.data.dur,
                            to:         '#ea9739'
                        })
                    }
                }
                if(this.data.level === 'major'){
                    for (let i = 0; i < cornEls.length; i++){
                        cornEls[i].setAttribute('animation__scale', {
                            property:   'scale',
                            dur:        this.data.dur,
                            to:         {x: 0, y: 0, z: 0}
                        })
                    }
                    for (let i = 0; i < cornStemEls.length; i++){
                        cornStemEls[i].setAttribute('animation__scale', {
                            property:   'scale',
                            dur:        this.data.dur,
                            to:         {x: 0, y: 0, z: 0}
                        })
                    }
                    for (let i = 0; i < wheatEls.length; i++){
                        wheatEls[i].setAttribute('animation__scale', {
                            property:   'scale',
                            dur:        this.data.dur,
                            to:         {x: 0, y: 0, z: 0}
                        })
                    }
                    for (let i = 0; i < wheatStemEls.length; i++){
                        wheatStemEls[i].setAttribute('animation__scale', {
                            property:   'scale',
                            dur:        this.data.dur,
                            to:         {x: 0, y: 0, z: 0}
                        })
                    }
                    for (let i = 0; i < genCropEls.length; i++){
                        genCropEls[i].setAttribute('animation__scale', {
                            property:   'scale',
                            dur:        this.data.dur,
                            to:         {x: 0, y: 0, z: 0}
                        })
                    }
                }
                // Lower the dam
                document.getElementById('laked-dam').setAttribute('animation__damLevel', {
                        property:   'geometry.height',
                        dur:        this.data.dur,
                        to:         2
                })
                // Lower the water treatment/supply
                const ponds = document.getElementsByClassName('water-treatment')
                for(let i = 0; i < ponds.length; i++){
                    ponds[i].setAttribute('animation__height', {
                        property:   'geometry.height',
                        dur:        this.data.dur,
                        to:         0.05
                    })
                }
                // Melt the snow
                document.getElementById('snowCap-01').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 23.6, y: 9.8, z: 10.3}
                })
                document.getElementById('snowCap-02').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 58.65, y: 8.36, z: 13.86}
                })
                document.getElementById('snowCap-03').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 31.3, y: 11.9, z: 23.5}
                })
            },

            remove: function(){
                externalEvents.changeEnvironment(state.scene.environment.name, this.data.dur)
                // Restore grass/ground conditions
                const groundEls = document.getElementsByClassName('grass'),
                    fieldEls = document.getElementsByClassName('field'),
                    cropSoilEls = document.getElementsByClassName('cropTopSoil')
                for (let i = 0; i < groundEls.length; i++){
                    groundEls[i].setAttribute('animation__grassCol', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('ground-zone').getAttribute('material').color
                    })
                }
                for (let i = 0; i < fieldEls.length; i++){
                    fieldEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:          document.getElementById('col-field').getAttribute('material').color
                    })
                }
                for (let i = 0; i < cropSoilEls.length; i++){
                    cropSoilEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:          document.getElementById('col-field').getAttribute('material').color
                    })
                }
                // Restore tree foliage
                const foliageEls = document.getElementsByClassName('foliage')
                for (let i = 0; i < foliageEls.length; i++){
                    foliageEls[i].setAttribute('animation__foliageCol', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-treeTop').getAttribute('material').color
                    })
                }
                // Restore the crop colours and size
                const cornEls = document.getElementsByClassName('crop-corn'),
                    cornStemEls = document.getElementsByClassName('stem-corn'),
                    wheatEls = document.getElementsByClassName('crop-wheat'),
                    wheatStemEls = document.getElementsByClassName('stem-wheat'),
                    genCropEls = document.getElementsByClassName('crop-generic')

                for (let i = 0; i < cornEls.length; i++){
                    cornEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-crop-corn').getAttribute('material').color
                    })
                    cornEls[i].setAttribute('animation__scale', {
                        property:   'scale',
                        dur:        this.data.dur,
                        to:         {x: 1, y: 1, z: 1}
                    })
                }
                for (let i = 0; i < cornStemEls.length; i++){
                    cornStemEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-stem-corn').getAttribute('material').color
                    })
                    cornStemEls[i].setAttribute('animation__scale', {
                        property:   'scale',
                        dur:        this.data.dur,
                        to:         {x: 1, y: 1, z: 1}
                    })
                }
                for (let i = 0; i < wheatEls.length; i++){
                    wheatEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-crop-wheat').getAttribute('material').color
                    })
                    wheatEls[i].setAttribute('animation__scale', {
                        property:   'scale',
                        dur:        this.data.dur,
                        to:         {x: 1, y: 1, z: 1}
                    })
                }
                for (let i = 0; i < wheatStemEls.length; i++){
                    wheatStemEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-stem-wheat').getAttribute('material').color
                    })
                    wheatStemEls[i].setAttribute('animation__scale', {
                        property:   'scale',
                        dur:        this.data.dur,
                        to:         {x: 1, y: 1, z: 1}
                    })
                }
                for (let i = 0; i < genCropEls.length; i++){
                    genCropEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        dur:        this.data.dur,
                        to:         document.getElementById('col-crop-generic').getAttribute('material').color
                    })
                    genCropEls[i].setAttribute('animation__scale', {
                        property:   'scale',
                        dur:        this.data.dur,
                        to:         {x: 1, y: 1, z: 1}
                    })
                }                
                // Raise the dam
                document.getElementById('laked-dam').setAttribute('animation__damLevel', {
                        property:   'geometry.height',
                        dur:        this.data.dur,
                        to:         6
                })
                // Lower the water treatment/supply
                const ponds = document.getElementsByClassName('water-treatment')
                for(let i = 0; i < ponds.length; i++){
                    ponds[i].setAttribute('animation__height', {
                        property:   'geometry.height',
                        dur:        this.data.dur,
                        to:         0.4
                    })
                }
                // Restore the snow
                document.getElementById('snowCap-01').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 25, y: 11, z: 11}
                })
                document.getElementById('snowCap-02').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 60, y: 10, z: 15}
                })
                document.getElementById('snowCap-03').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 33, y: 13, z: 25}
                })
            }

        })

        AFRAME.registerComponent('hazard-bushfire', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                intensity:              {type: 'number',   default: 0 },  
            },
            init: function() {
                const intensity = this.data.intensity > 1 ? 1 : this.data.intensity,
                    posX =  (intensity) * 140
                externalEvents.changeEnvironment('bushfire', this.data.dur)
                scene.els.enviro.fire.setAttribute('visible', true) 
                scene.els.enviro.fire.setAttribute('animation__position', {
                    property:       'position',
                    dur:            this.data.dur / 2,
                    from:           {x: 0 , y: -50, z: 0},  
                    to:             {x: posX , y: 0, z: 0}
                })
                document.getElementById('duckFiremanHat').setAttribute('visible', true)
                document.getElementById("rubberDuck").setAttribute('alongpath', { rotate: false })
                document.getElementById("rubberDuck").setAttribute('look-at', '#central-hill')
                document.getElementById('duckFirehose').setAttribute('visible', true)
                document.getElementById("duckFirehose").setAttribute('look-at', '#central-hill')
                document.getElementById("duckFirehose").setAttribute('particle-system', {
                    preset:              'dust',
                    blending:            3,
                    size:                1,
                    maxAge:              3,
                    particleCount:       3000,
                    type:                3,
                    color:               '#fff',
                    rotationAngle:       200,
                    rotationAxis:        'x',
                    rotationAngleSpread: 0.125,
                    accelerationSpread:  {x: 10, y: 0, z: 20},
                    accelerationValue:   {x: 0, y: 0, z: 20},
                    positionSpread:      {x: 0, y: 0, z: 0},
                    velocitySpread:      {x: 10, y: 7.5, z: 10},
                    velocityValue:       {x: 0, y: 50, z: 0}
                })
            },
            update: function(){
                const intensity = this.data.intensity > 1 ? 1 : this.data.intensity,
                    posX =  (intensity) * 140

                scene.els.enviro.fire.setAttribute('animation__position', {
                    property:       'position',
                    dur:            this.data.dur / 2,
                    to:             {x: posX , y: 0, z: 0}
                })
            },
            remove: function(){
                externalEvents.changeEnvironment(state.scene.environment.name, this.data.dur)
                scene.els.enviro.fire.setAttribute('animation__position', {
                    property:       'position',
                    dur:            this.data.dur,
                    to:             {x:0 , y: -50, z: 0},  
                })
                setTimeout(() => {
                    scene.els.enviro.fire.setAttribute('visible', false)
                    document.getElementById('duckFiremanHat').setAttribute('visible', false)
                    document.getElementById("rubberDuck").setAttribute('alongpath', { rotate: true })
                    document.getElementById("rubberDuck").removeAttribute('look-at')
                    document.getElementById('duckFirehose').setAttribute('visible', false)
                    document.getElementById("duckFirehose").removeAttribute('look-at')
                    document.getElementById("duckFirehose").removeAttribute('particle-system')
                },  this.data.dur)
            }
        })

        AFRAME.registerComponent('hazard-heat', {
            schema: {   
                dur:                    {type: 'number',   default: 3000 },  
                intensity:              {type: 'string',   default: 'hotDay' },  
            },            
            init: function(){
                document.getElementById('duckSunglasses').setAttribute('visible', true)
                scene.els.enviro.alpTops.setAttribute('visible', true)
            },
            update: function(){
                const heatstate = ['default', 'hotDay', 'veryHotDay', 'heatwave'],
                    pulseTime = this.data.dur, 
                    newIntensity = this.data.intensity,
                    baseIntensity = heatstate[heatstate.indexOf(newIntensity)-1]
                clearInterval(state.scene.effect.heatPulse)
                if(this.data.intensity !== 'heatwave'){
                    state.scene.effect.heatPulse = setInterval(pulseSky, pulseTime );
                } else {
                    setTimeout(() => changeSky('heat', pulseTime), pulseTime)
                }
                // Function to pulse to and from 'heat' sky colour for time of day and "conditions"
                function pulseSky(){
                    changeSky('heat', pulseTime /2)
                    setTimeout(() => {
                        changeSky('cool', pulseTime /2)
                    }, pulseTime/2 );
                };
                function changeSky(direction, duration = pulseTime /2){
                    const timeOfDay = state.scene.time.timeOfDay(),
                        topColor = direction === 'heat' ? settings.days.heat[timeOfDay][newIntensity]['sky-top'] 
                            : (baseIntensity === 'default') ? settings.days.heat[timeOfDay]['sky-top'] 
                            : settings.days.heat[timeOfDay][baseIntensity]['sky-top'] ,
                        bottomColor = direction === 'heat' ? settings.days.heat[timeOfDay][newIntensity]['sky-bottom'] : (baseIntensity === 'default') ? settings.days.heat[timeOfDay]['sky-bottom'] : settings.days.heat[timeOfDay][newIntensity]['sky-bottom']
                    scene.els.enviro.sky.setAttribute('animation__topColour', {
                        property:       'material.topColor',
                        dur:            duration,
                        to:             topColor
                    })  
                    scene.els.enviro.sky.setAttribute('animation__bottomColour', {
                        property:   'material.bottomColor',
                        dur:        duration,
                        to:         bottomColor
                    })  
                };
            },
            remove: function(){
                clearInterval(state.scene.effect.heatPulse)
                scene.els.enviro.alpTops.setAttribute('visible', false)
                document.getElementById('duckSunglasses').setAttribute('visible', false)
            }
        })

        AFRAME.registerComponent('hazard-tropical-storm', {
            init: function(){
                const vortexDuck = document.getElementById('vortex-duck')
                // Sink the duck
                document.getElementById('duck-group').setAttribute('animation__position', {
                    property:       'position',
                    to:             {x:0 , y: -50, z: 0},
                    dur:            1000
                })
                document.getElementById('duck-group').setAttribute('animation__scale', {
                    property:       'scale',
                    to:             {x:0 , y: 0, z: 0},
                    dur:            1000
                })

                // Bring vortextgroup into view aftre delay for moving ducj out of view
                setTimeout( ()=> {
                    scene.els.enviro.vortexGroup.setAttribute('visible', true)
                    scene.els.enviro.vortexGroup.setAttribute('animation__scale', {
                        property:       'scale',
                        from:           {x:0 , y: 0, z: 0},
                        to:             {x:1 , y: 1, z: 1},
                        dur:            3000
                    })
                    scene.els.enviro.vortexGroup.setAttribute('animation__position', {
                        property:       'position',
                        from:           {x:0 , y: -50, z: 0},
                        to:             {x:0 , y: -5, z: 0},
                        dur:            5000
                    })
                    // Lean the whole vortex
                    scene.els.enviro.vortexGroup.setAttribute('animation__rotate', {
                        property:       'rotation',
                        from:             {x:-5 , y: 0, z: 5},
                        to:             {x: 5 , y: 0, z: 10},
                        dur:            1000,
                        loop:           'true',
                        dir:            'alternate',
                    })
                    // Spin/size and move the vortex alogn path
                    scene.els.enviro.vortexGroup.setAttribute('alongpath', {
                        curve:          "#cyclone-path-points",
                        dur:            90000, 
                        loop:           'true'
                    })
                    scene.els.enviro.vortex.setAttribute('animation__scale', {
                        property:       'scale',
                        from:           {x:3 , y: 3, z: 3},
                        to:             {x:8 , y: 8, z: 8},
                        dur:            20000,
                        dir:            'alternate',
                        loop:           'true'
                    })
                    scene.els.enviro.vortex.setAttribute('animation__rotate', {
                        property:       'rotation',
                        to:             {x:0 , y: 360, z: 8},
                        dur:            500,
                        loop:           'true'
                    })
                // Randomly spin and levitate the duck
                    vortexDuck.setAttribute('animation__rotate', {
                        property:       'rotation',
                        from:           {x:0 , y: 0, z: 0},
                        to:             {x:180 , y: 360, z: 270},
                        dur:            2000,
                        loop:           'true',
                        dir:            'alternate',
                    })
                    vortexDuck.setAttribute('animation__position', {
                        property:       'position',
                        from:           {x:-1 , y: 10, z: 0},
                        to:             {x:1.5 , y: 40, z: 1},
                        dur:            10000,
                        loop:           'true',
                        dir:            'alternate'
                    })
                }, 1000)
            },
            remove: function(){
                // Shrink the vortex
                scene.els.enviro.vortexGroup.setAttribute('animation__scale', {
                    property:       'scale',
                    to:             {x:0 , y: 0, z: 0},
                    dur:            1500
                })

                // Reset the rubber duck and animiation properties
                setTimeout( ()=> {
                    document.getElementById('duck-group').setAttribute('animation__position', {
                        property:       'position',
                        to:             {x:0 , y: 0, z: 0},
                        dur:            1000
                    })
                    document.getElementById('duck-group').setAttribute('animation__scale', {
                        property:       'scale',
                        to:             {x:1 , y: 1, z: 1},
                        dur:            1000
                    })
                    scene.els.enviro.vortexGroup.setAttribute('visible', false)
                    scene.els.enviro.vortexGroup.removeAttribute('animation__scale')
                    scene.els.enviro.vortexGroup.removeAttribute('animation__rotate')
                    scene.els.enviro.vortex.removeAttribute('alongpath')
                    scene.els.enviro.vortex.removeAttribute('animation__scale')
                    scene.els.enviro.vortex.removeAttribute('animation__rotate')
                }, 1500)
            }

        })

        AFRAME.registerComponent('hazard-winter-storm', {
            schema: {   
                dur:                    {type: 'number',   default: 3000 },  
                intensity:              {type: 'string',   default: 'snow' },  
            },     
            init: function(){
                // Record any element colours that are changed to be snow' to enable resotation on removal
                state.scene.elements.origCol.homeRoofs = []
                state.scene.elements.origCol.barnRoofs = []
                state.scene.elements.origCol.industrialRoofs = []
                state.scene.elements.origCol.townhouseRoofs = []
                state.scene.elements.origCol.centralHill = []
                state.scene.elements.origCol.hotelRoofs = [],
                state.scene.elements.origCol.foliage = [],
                state.scene.elements.origCol.beach = [],
                state.scene.elements.origCol.river = []
                const homeRoofs = document.getElementsByClassName('home-roof'),
                    barnRoofs = document.getElementsByClassName('barn-roof'),
                    industrialRoofs = document.getElementsByClassName('industrial-roof'),
                    townhouseRoofs = document.getElementsByClassName('townhouse-roof'),
                    centralHill = document.getElementsByClassName('hill'),
                    hotelRoofs = document.getElementsByClassName('hotel-roof'),
                    foliage = document.getElementsByClassName('foliage'),
                    beach = document.getElementsByClassName('beach'),
                    river = document.getElementsByClassName('river')
                for(let i = 0; i < homeRoofs.length; i++){
                    state.scene.elements.origCol.homeRoofs.push( homeRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < barnRoofs.length; i++){
                    state.scene.elements.origCol.barnRoofs.push( barnRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < industrialRoofs.length; i++){
                    state.scene.elements.origCol.industrialRoofs.push( industrialRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < townhouseRoofs.length; i++){
                    state.scene.elements.origCol.townhouseRoofs.push( townhouseRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < centralHill.length; i++){
                    state.scene.elements.origCol.centralHill.push( centralHill[i].getAttribute('material').color)
                }
                for(let i = 0; i < hotelRoofs.length; i++){
                    state.scene.elements.origCol.hotelRoofs.push( hotelRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < foliage.length; i++){
                    state.scene.elements.origCol.foliage.push( foliage[i].getAttribute('material').color)
                }
                for(let i = 0; i < beach.length; i++){
                    state.scene.elements.origCol.beach.push( beach[i].getAttribute('material').color)
                }
                for(let i = 0; i < river.length; i++){
                    state.scene.elements.origCol.river.push( river[i].getAttribute('material').color)
                }
            },
            update: function(){
                switch(this.data.intensity){
                    case 'snow':
                        scene.els.enviro.particles.setAttribute('particle-system', {
                            preset:              'snow',
                            blending:            2,
                            size:                1.5,
                            maxAge:              3,
                            particleCount:       5000,
                            type:                3,
                            color:               '#fff',
                            rotationAngle:       3.140,
                            rotationAngleSpread: 0.5,
                            accelerationSpread:  {x: 0, y: 20, z: 0},
                            accelerationValue:   {x: 0, y: 50, z: 0}
                        })
                        setTimeout( () => {
                            scene.els.enviro.snowGroup.setAttribute('visible', true)
                            scene.els.enviro.snowGroup.setAttribute('animation__scale', {
                                property:       'scale',    
                                to:             {x: 1, y: 1.5, z: 1 },   
                                dur:            this.data.dur
                            })
                            // Change colour of central hill
                            document.getElementById('hill').setAttribute('animation__col', {
                                property:       'material.color',
                                dur:             this.data.dur,
                                to:             '#fff'
                            })

                        }, 500)
                        break
                    case 'blizzard':
                        scene.els.enviro.particles.setAttribute('particle-system', {
                            size:                2
                        })
                        scene.els.enviro.snowGroup.setAttribute('animation__scale', {
                            property:       'scale',   
                            to:             {x: 1, y: 3, z: 1 },   
                            dur:            this.data.dur
                        })
                        // Change colour of home/barn, hotel/townhouse roofs,
                        const homeRoofs = document.getElementsByClassName('home-roof'),
                            barnRoofs = document.getElementsByClassName('barn-roof'),
                            industrialRoofs = document.getElementsByClassName('industrial-roof'),
                            townhouseRoofs = document.getElementsByClassName('townhouse-roof'),
                            hotelRoofs = document.getElementsByClassName('hotel-roof')

                        const blizzardGroups = [homeRoofs, barnRoofs, industrialRoofs, townhouseRoofs, hotelRoofs]
                        blizzardGroups.forEach( blizzardGroup => {
                            for(let i = 0; i < blizzardGroup.length; i++){
                                blizzardGroup[i].setAttribute('animation__col', {
                                    property:       'material.color',
                                    dur:             this.data.dur,
                                    to:             '#fff'
                                })
                            }
                        })
                        // Show santa hat
                        document.getElementById('duckSantaHat').setAttribute('visible', true)
                        break
                    case 'iceStorm':
                        scene.els.enviro.particles.setAttribute('particle-system', {
                            size:                3
                        })
                        scene.els.enviro.snowGroup.setAttribute('animation__scale', {
                            property:       'scale',   
                            to:             {x: 1, y: 4, z: 1 },   
                            dur:            this.data.dur
                        })
                        // Change colour of home/barn, hotel/townhouse roofs,
                        const foliage = document.getElementsByClassName('foliage'),
                            beach = document.getElementsByClassName('beach'),
                            river = document.getElementsByClassName('river')

                        const iceStromGroups = [foliage, beach, river]
                        iceStromGroups.forEach( iceStromGroup => {
                            for(let i = 0; i < iceStromGroup.length; i++){
                                iceStromGroup[i].setAttribute('animation__col', {
                                    property:       'material.color',
                                    dur:             this.data.dur,
                                    to:             '#fff'
                                })
                            }
                        })
                        break
                }

            },
            remove: function(){
                scene.els.enviro.particles.removeAttribute('particle-system')
                scene.els.enviro.snowGroup.setAttribute('animation__position', {
                    property:       'position',   
                    to:             {x: 0, y: 0, z: 0 },   
                    dur:            this.data.dur
                })
                scene.els.enviro.snowGroup.setAttribute('animation__scale', {
                    property:       'position',   
                    to:             {x: 1, y: 1, z: 1 },   
                    dur:            this.data.dur
                })
                // Return all snow coloured elements
                const homeRoofs = document.getElementsByClassName('home-roof'),
                    barnRoofs = document.getElementsByClassName('barn-roof'),
                    industrialRoofs = document.getElementsByClassName('industrial-roof'),
                    townhouseRoofs = document.getElementsByClassName('townhouse-roof'),
                    centralHill = document.getElementsByClassName('hill'),
                    hotelRoofs = document.getElementsByClassName('hotel-roof'),
                    foliage = document.getElementsByClassName('foliage'),
                    beach = document.getElementsByClassName('beach'),
                    river = document.getElementsByClassName('river')

                for(let i = 0; i < homeRoofs.length; i++){
                    homeRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.homeRoofs[i]
                    })                    
                }
                for(let i = 0; i < barnRoofs.length; i++){
                    barnRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.barnRoofs[i]
                    })      
                }
                for(let i = 0; i < industrialRoofs.length; i++){
                    industrialRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.industrialRoofs[i]
                    })      
                }
                for(let i = 0; i < townhouseRoofs.length; i++){
                    townhouseRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.townhouseRoofs[i]
                    })      
                }
                  for(let i = 0; i < centralHill.length; i++){
                    centralHill[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.centralHill[i]
                    })      
                }
                for(let i = 0; i < hotelRoofs.length; i++){
                    hotelRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.hotelRoofs[i]
                    })      
                }
                for(let i = 0; i < foliage.length; i++){
                    foliage[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.foliage[i]
                    })      
                }
                for(let i = 0; i < beach.length; i++){
                    beach[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.beach[i]
                    })      
                }
                for(let i = 0; i < river.length; i++){
                    river[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.scene.elements.origCol.river[i]
                    })      
                }

                setTimeout(() => {
                    scene.els.enviro.snowGroup.setAttribute('visible', false)
                    document.getElementById('duckSantaHat').setAttribute('visible', false)
                    // Clear the original element colour object 
                    state.scene.elements.origCol = {}
                },this.data.dur )
            }
        })

        AFRAME.registerComponent('hazard-ocean-acidification', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                intensity:              {type: 'string',   default: 'severe' },  
            },

            init: function(){
                scene.els.enviro.sea.removeAttribute('ocean')
            },
            update: function(){
                // Set variables based on intensity
                let oceanColour, maskVisible = false 
                switch(this.data.intensity){
                    case 'severe':
                        oceanColour = '#edf7a6'
                        maskVisible = true
                    break
                }
                // Set ocean colour and mask visibility              
                scene.els.enviro.sea.setAttribute('ocean', {
                    color:              oceanColour,
                    width:              10.8,
                    amplitude:          0.25,
                    amplitudeVariance:  0.25,
                    density:            20
                })
                document.getElementById('duckMask').setAttribute('visible', maskVisible)
            },
            remove: function(){
                scene.els.enviro.sea.removeAttribute('ocean')
                scene.els.enviro.sea.setAttribute('ocean', {
                    color:              '#00fdff',
                    width:              10.8,
                    amplitude:          0.25,
                    amplitudeVariance:  0.25,
                    density:            20
                })
                document.getElementById('duckMask').setAttribute('visible', false)
            }
        })

        AFRAME.registerComponent('hazard-earthquake', {
            schema: {   
                dur:                    {type: 'number',   default: 3000 },  
                intensity:              {type: 'number',   default: 5 },  
            },
            update: function(){
                shakeOut(this.data.intensity)
                setTimeout(() => {shakeOut(this.data.intensity)}, 100 )
                setTimeout(() => {shakeOut(this.data.intensity)}, 200 )
                setTimeout(() => {shakeOut(this.data.intensity)}, 300 )
                setTimeout(() => {shakeOut(this.data.intensity)}, 400 )
                setTimeout(() => {shakeOut(this.data.intensity)}, 500 )
                setTimeout(() => {shakeOut(this.data.intensity)}, 600 )
                setTimeout(() => {shakeReturn(this.data.intensity)}, 700 )
                setTimeout(() => {
                    state.scene.effect.earthquake = false
                    scene.els.scene.removeAttribute('hazard-earthquake')
                    scene.els.zones.planet.removeAttribute('animation__pos')
                }, 1200 )

                function shakeOut(intensity){
                    const toObj = {
                        x: intensity * (1 - Math.random()*2), 
                        y: intensity * (1 - Math.random()*2), 
                        z: intensity * (1 - Math.random()*2)
                    }
                    scene.els.zones.planet.setAttribute('animation__pos', {
                        property:       'position',
                        to:             toObj,
                        dur:            100,
                        easing:         'easeInOutElastic'
                    })
                }
                function shakeReturn(intensity){
                    scene.els.zones.planet.setAttribute('animation__pos', {
                        property:       'position',
                        to:             { x: 0, y: -3,   z: 0},
                        dur:            500
                    })
                }
            },
        })


        AFRAME.registerComponent('hazard-mudslide', {
        })

        AFRAME.registerComponent('hazard-dust-storm', {
        })

    // EMISSIONS VISUALISATION COMPONENTS
        AFRAME.registerComponent('emissions-activity-balloons', {
            schema: {   
                dur:                {type: 'number',   default: 3000 },  
                visible:            {type: 'boolean',  default: true}, 
                type:               {type: 'string',   default: 'all'}, 
                sourceNetSwitch:    {type: 'boolean',  default: false}, 
                sourceNetSink:      {type: 'boolean',  default: false}
            },
            init: function(){
                // Emissions balloon anchor collections
                scene.els.anchors = {
                    // Emission source objects
                    sources: {
                        stationaryEnergy: {
                            scope1: {
                                residential:{
                                    mainsGas: {
                                        smallDwellings:          document.querySelectorAll('.house-small * .emissions-anchor.mains-gas'),
                                        largeDwellings:          document.querySelectorAll('.house-large * .emissions-anchor.mains-gas'),
                                        townhouses:              []
                                    },
                                    bottledLPG: {
                                    },
                                    wood: {
                                        smallDwellings:          document.querySelectorAll('.house-small * .emissions-anchor.firewood'),
                                        largeDwellings:          document.querySelectorAll('.house-large * .emissions-anchor.firewood'),
                                        townhouses:              []
                                    }
                                },
                                commercial: {
                                    mainsGas: {
                                        offices:                document.querySelectorAll('.commercial-bldg.five-level * .emissions-anchor.mains-gas'),
                                        retail:                 document.querySelectorAll('.commercial-bldg.three-level * .emissions-anchor.mains-gas'),
                                        hospitality:            document.querySelectorAll('.hospitality * .emissions-anchor.mains-gas'),
                                        accomodation:           document.querySelectorAll('.accomodation * .emissions-anchor.mains-gas')
                                    },
                                    bottledLPG:                 {},
                                    diesel:                     {},
                                },
                                industrial: {
                                    electricityGeneration: {
                                        coalFired:              document.querySelectorAll('.emissions-anchor.utility-coal'),
                                        gasFired:               []
                                    },
                                    mainsGas: {
                                        other:                  [],
                                        mineral:                [],
                                        chemical:               [],
                                        metal:                  [],
                                        electronics:            []
                                    },
                                    bottledLPG:                 {},
                                    diesel:                     {},
                                },
                                farming: {
                                    mainsGas: {
                                        largeFarm:                   document.querySelectorAll('.barn-large * .emissions-anchor.mains-gas'),
                                        smallFarm:                   document.querySelectorAll('.barn-small * .emissions-anchor.mains-gas'),
                                    },
                                    bottledLPG:                 {},
                                    diesel:                     {},
                                },
                                institutional: {
                                    mainsGas: {
                                        government:             document.querySelectorAll('.gov-building * .emissions-anchor.mains-gas'),
                                        hospital:               document.querySelectorAll('.hospital * .emissions-anchor.mains-gas'),
                                        airport:                document.querySelectorAll('.airport * .emissions-anchor.mains-gas'),
                                        school:                 document.querySelectorAll('.school-building * .emissions-anchor.mains-gas'),
                                        church:                 document.querySelectorAll('.emissions-anchor.mains-gas.church')
                                    },
                                    bottledLPG:                 {},
                                    diesel:                     {},
                                },
                            },
                            scope2: {
                                residential: {
                                    gridElectricity: {
                                        smallDwellings:         document.querySelectorAll('.house-small * .emissions-anchor.grid-electricity'),
                                        largeDwellings:         document.querySelectorAll('.house-large * .emissions-anchor.grid-electricity'),
                                        townhouses:             document.querySelectorAll('.townhouse * .emissions-anchor.grid-electricity')
                                    }
                                },
                                commercial: {
                                    gridElectricity: {
                                        offices:                document.querySelectorAll('.commercial-bldg.five-level * .emissions-anchor.grid-electricity'),
                                        officeTowers:           document.querySelectorAll('.emissions-anchor.grid-electricity.office-tower'),
                                        retail:                 document.querySelectorAll('.commercial-bldg.three-level * .emissions-anchor.grid-electricity'),
                                        hospitality:            document.querySelectorAll('.emissions-anchor.grid-electricity.hospitality'),
                                        accomodation:           document.querySelectorAll('.emissions-anchor.grid-electricity.accomodation')
                                    }
                                },
                                industrial: {
                                    gridElectricity: {
                                        other:                  document.querySelectorAll('.emissions-anchor.grid-electricity.other'),
                                        minerals:               document.querySelectorAll('.emissions-anchor.grid-electricity.minerals'),
                                        chemicals:              document.querySelectorAll('.emissions-anchor.grid-electricity.chemicals'),
                                        metals:                 document.querySelectorAll('.emissions-anchor.grid-electricity.metals'),
                                        electronics:            document.querySelectorAll('.emissions-anchor.grid-electricity.electronics'),
                                    }
                                },
                                farming: {
                                    gridElectricity: {
                                        largeFarm:              document.querySelectorAll('.barn-large * .emissions-anchor.grid-electricity'),
                                        smallFarm:              document.querySelectorAll('.barn-small * .emissions-anchor.grid-electricity')
                                    }
                                },
                                institutional: {
                                    gridElectricity: {
                                        government:             document.querySelectorAll('.gov-building * .emissions-anchor.grid-electricity'),
                                        airport:                document.querySelectorAll('.emissions-anchor.grid-electricity.airport'),   
                                        hospital:               document.querySelectorAll('.hospital * .emissions-anchor.grid-electricity'),
                                        church:                 document.querySelectorAll('.emissions-anchor.grid-electricity.church'),
                                        school:                 document.querySelectorAll('.school-building * .emissions-anchor.grid-electricity'),
                                    }
                                }
                            },
                            scope3: {
                                industrial: {
                                    gridElectricity: {
                                        transmission:     document.querySelectorAll('.emissions-anchor.grid-transmission'),
                                        distribution:     document.querySelectorAll('.emissions-anchor.grid-distribution'),
                                    },
                                    mainsGas: {
                                        distribution:            [],
                                    }
                                }
                            }
                        },
                        transportEnergy: {
                            scope1: {
                                residential: {
                                    road: {
                                        passengerVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        motorcyle: {
                                            petrol:             [],
                                            ethanol:            [],
                                        },
                                        other: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    },
                                    aviation: {
                                        passsengerAirTravel: {
                                            jetfuel:            document.querySelectorAll('.emissions-anchor.airplane'),
                                            avgas:              [],
                                        }
                                    }
                                },
                                commercial: {
                                    road: {
                                        passengerVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        lightCommercialVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        heavyTrucks: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        bus: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        other: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    },
                                    aviation: {
                                        passsengerAirTravel: {
                                            jetfuel:            [],
                                            avgas:              [],
                                        },
                                        freight: {
                                            jetfuel:            [],
                                            avgas:              [],
                                        }
                                    }
                                },
                                industrial: {
                                    road: {
                                        passengerVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        lightCommercialVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        heavyTrucks: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        other: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                        }
                                },
                                farming: {
                                    road: {
                                        passengerVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        lightCommercialVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        other: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    },
                                    offroad: {
                                        all: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    }
                                },
                                institutional: {
                                    road: {
                                        passengerVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        lightCommercialVehicle: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        heavyTrucks: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        bus: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        },
                                        other: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    },
                                    offroad: {
                                        all: {
                                            petrol:             [],
                                            diesel:             [],
                                            lpg:                [],
                                            biodiesel:          [],
                                            ethanol:            [],
                                        }
                                    },
                                    aviation: {
                                        passsengerAirTravel: {
                                            jetfuel:            document.querySelectorAll('.emissions-anchor.airplane'),
                                            avgas:              [],
                                        }
                                    }
                                },    
                            }
                        },
                        waste: {
                            scope1: {
                                industrial: {
                                    landfill: {
                                        MSW:                    document.querySelectorAll('.emissions-anchor.landfill.msw'),
                                        CandI:                  document.querySelectorAll('.emissions-anchor.landfill.ci'),
                                        CandD:                  document.querySelectorAll('.emissions-anchor.landfill.cd'),
                                    },
                                    incineration:                    {},
                                    biologicalTreatment:             {},
                                }
                            },
                            scope3: {
                                residential: {
                                    MSW: {    
                                        smallDwellings:         document.querySelectorAll('.house-small * .emissions-anchor.bin-landfill'),
                                        largeDwellings:         document.querySelectorAll('.house-large * .emissions-anchor.bin-landfill')
                                    }
                                },
                                commercial: {
                                    CandI: {
                                        offices:                document.querySelectorAll('.emissions-anchor.skip-landfill'),
                                        officeTowers:           [],
                                        retail:                 [],
                                        hospitality:            [],
                                        accomodation:           []
                                    }               
                                },  
                                industrial: {
                                    CandI: {
                                        other:                  [],
                                        mineral:                [],
                                        chemical:               [],
                                        metal:                  [],
                                        electronics:            []
                                    }               
                                } ,
                                institutional: {
                                    CandI: {
                                        government:             [],
                                        hospital:               [],
                                        airport:                [],
                                    },
                                    MSW: { 
                                        school:                 [],
                                        church:                 []
                                    }
                                }
                            },
                        },
                        wasteWater: {
                            scope1: {
                                industrial: {
                                    treatment: {
                                        sewered:                 [],
                                    }
                                }
                            },
                            scope3: {
                                residential:{
                                    sewered: {
                                        smallDwellings:         [],
                                        largeDwellings:         [],
                                        townhouses:             []
                                    }
                                },
                                commercial:{
                                    sewered: {
                                        offices:                [],
                                        officeTowers:           [],
                                        retail:                 [],
                                        hospitality:            [],
                                        accomodation:           []     
                                    }
                                },
                                industrial:{
                                    sewered: {
                                        other:                  [],
                                        mineral:                [],
                                        chemical:               [],
                                        metal:                  [],
                                        electronics:            []
                                    }
                                },
                                farming:{},
                                institutional:{
                                    sewered: {
                                        government:             [],
                                        airport:                [],   
                                        hospital:               [],
                                        church:                 [],
                                        school:                 [],
                                    }
                                },
                            },
                        },
                        agriculture: {
                            scope1: {
                                farming: {
                                    livestockEnteric: {
                                        cattle:         document.querySelectorAll('.emissions-anchor.livestock.cow'),
                                        pigs:           document.querySelectorAll('.emissions-anchor.livestock.pig'),
                                        sheep:          document.querySelectorAll('.emissions-anchor.livestock.sheep'),
                                        poultry:        document.querySelectorAll('.emissions-anchor.livestock.poultry')
                                    },
                                    livestockManure: {},
                                    livestockGrazing: {
                                        cattle:         [],
                                        pigs:           [],
                                        sheep:          [],
                                        poultry:        []
                                    },
                                    cropping: {
                                        wheat:          document.querySelectorAll('.emissions-anchor.agriculture.cropping-wheat'),
                                        corn:           document.querySelectorAll('.emissions-anchor.agriculture.cropping-corn'),
                                        other:          document.querySelectorAll('.emissions-anchor.agriculture.cropping-other')
                                    },
                                    fruitAndVeg: {
                                        apples:         document.querySelectorAll('.emissions-anchor.agriculture.ag-apples'),
                                    }
                                },
                            },
                            scope3: {

                            }
                        },
                        land: {
                            scope1: {
                                farming: {
                                    conversion:             [],
                                    clearing:               [],
                                    reclearing:             []
                                },
                                institutional: {
                                    conversion:             [],
                                    clearing:               [],
                                    reclearing:             []
                                }
                            }
                        },
                        industrialProcesses: {
                            scope1: {
                                industrial: {
                                    other:                  [],
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:            []
                                },
                            }
                        },
                        industrialProductUse: {
                            scope1: {
                                residential:  {
                                    refrigerants: {
                                        smallDwellings:         [],
                                        largeDwellings:         [],
                                        townhouses:             [],
                                        transport:  {
                                            passengerVehicles:  [],
                                        }
                                    }
                                },
                                commerical:  {
                                    refrigerants: {
                                        offices:                [],
                                        officeTowers:           [],
                                        retail:                 [],
                                        hospitality:            [],
                                        accomodation:           []   
                                    }
                                },
                                industrial: { 
                                    refrigerants: {
                                        other:                  [],
                                        mineral:                [],
                                        chemical:               [],
                                        metal:                  [],
                                        electronics:            []      
                                    }
                                },
                                institutional: {
                                    refrigerants: {
                                        government:             [],
                                        airport:                [],   
                                        hospital:               [],
                                        church:                 [],
                                        school:                 [],
                                    }
                                }

                            }
                        }
                    },
                    // Clean alternatives
                    switches: {       
                        stationaryEnergy: {
                            scope1: {
                                industrial: {
                                    electricityGeneration: {
                                        solar:                  document.querySelectorAll('.emissions-anchor.utility-solar'),
                                        wind:                   document.querySelectorAll('.emissions-anchor.utility-wind'),
                                        hydro:                  document.querySelectorAll('.emissions-anchor.utility-hydro')
                                    }
                                }
                            },
                            scope2: {
                                residential: {
                                    onSiteSolar: {
                                        smallDwellings:         document.querySelectorAll('.house-small * .emissions-anchor.rooftop-solar'),
                                        largeDwellings:         document.querySelectorAll('.house-large * .emissions-anchor.rooftop-solar'),
                                        townhouses:             []
                                    },
                                },
                                commercial:  {
                                    onSiteSolar: {
                                        offices:                [],
                                        retail:                 [],
                                        hospitality:            [],
                                        accomodation:           []
                                    }
                                },   
                                industrial: {
                                    onSiteSolar: {
                                        other:                  [],
                                        mineral:                [],
                                        chemical:               [],
                                        metal:                  [],
                                        electronics:            []
                                    }
                                },          
                                agriculture:  {
                                    onSiteSolar: {
                                        largeFarm:              [],
                                        smallFarm:              [],
                                        groundMounted:          [],
                                    }
                                },          
                                institutional: {
                                    onSiteSolar: {
                                        government:             [],
                                        airport:                [],
                                        hospital:               [],
                                        church:                 [],
                                        school:                 document.querySelectorAll('.school-building * .emissions-anchor.rooftop-solar'),
                                    }
                                }  
                            },
                            scope3: {
                            }
                        },
                    },
                    // Carbon sinks 
                    sinks: {
                        land: {
                            scope1: {
                                afforestation:             [],
                                reforestation:             [],
                            }
                        },
                        agriculture: {
                            scope1: {
                                soilSequestration:          []
                            }
                        }
                    }
                }

                Object.entries(scene.els.anchors).forEach( ([type, sectorObj]) => {
                    Object.entries(scene.els.anchors[type]).forEach( ([emissionsSector, scopeObj]) => {
                        Object.entries(scene.els.anchors[type][emissionsSector]).forEach( ([scope, sectorObj]) => {
                            Object.entries(scene.els.anchors[type][emissionsSector][scope]).forEach( ([sector, sourceObj]) => {
                                Object.entries(scene.els.anchors[type][emissionsSector][scope][sector]).forEach( ([emissionsSource, subsectorObj]) => {
                                    Object.entries(scene.els.anchors[type][emissionsSector][scope][sector][emissionsSource]).forEach( ([subsource, anchorCollection]) => {
                                        let scale, stringMultiplier, stringPosY, balloonCol
                                        if( anchorCollection.length > 0) {
                                            scale = Math.sqrt(model.scene.balloonScale[type][emissionsSector][scope][sector][emissionsSource][subsource].scale)
                                            stringLength = model.scene.balloonScale[type][emissionsSector][scope][sector][emissionsSource][subsource].stringLength
                                            stringPosY = model.scene.balloonScale[type][emissionsSector][scope][sector][emissionsSource][subsource].stringPosY
                                        }

                                        // Add ALL balloons (source/switch/sink)  
                                        for(let i = 0; i < anchorCollection.length; i++ ){
                                            const balloonContainer =  document.createElement('a-entity'),
                                                anchorY = anchorCollection[i].getAttribute('position').y

                                            switch(type){
                                                case 'sources':
                                                    balloonCol = '#000' 
                                                    break
                                                case 'sinks':
                                                    balloonCol = '#66ff00' 
                                                    break   
                                                case 'switches':
                                                    balloonCol = '#ff1dce' 
                                                    break                                                
                                            }

                                            balloonContainer.className +=`balloon-group ${type} ${scope} ${emissionsSector} ${emissionsSource} ${sector} ${subsource}`
                                            balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                                            balloonContainer.setAttribute('data-balloonpos', `0 ${stringLength + scale * 0.9} 0`)
                                            balloonContainer.setAttribute('data-mixin', 'col-balloon')
                                            balloonContainer.setAttribute('data-matcol', balloonCol)
                                            balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                                            balloonContainer.setAttribute('data-balloonscale', `${scale} ${scale} ${scale}`)
                                            balloonContainer.setAttribute('data-stringscale', `1 ${stringLength} 1`)
                                            balloonContainer.setAttribute('data-stringpos', `0 ${stringLength} 0`)
                                            balloonContainer.setAttribute('visible', false)
                                            anchorCollection[i].appendChild(balloonContainer)
                                        }
                                    })                        
                                }) 
                            })
                        })
                    })
                })
            },

            update: function(){
                const balloonGroupEls = this.data.type === 'all' ? document.querySelectorAll('.balloon-group') :  document.querySelectorAll('.balloon-group.'+ this.data.type ), 
                    sourceGroupBalloonEls = document.querySelectorAll('.balloon-group.sources'),
                    animationTime =  this.data.dur,
                    sourceScale = (this.data.sourceNetSwitch && this.data.sourceNetSink) ? 0.7 : this.data.sourceNetSwitch ? 0.8 : this.data.sourceNetSink ? 0.9 : 1

                // Show/hide TARGETED balloons
                balloonGroupEls.forEach((el, i) => {
                    // Define scales
                    const currScale = el.getAttribute('scale')
                    // Animate INTO VIEW
                    if(this.data.visible){
                        el.setAttribute('visible', true)  // Set visibility state
                        // For sources where net impact needs to be checked
                        if(this.data.type === 'sources'){
                            el.setAttribute('animation__scale', {
                                property:   'scale',
                                from:       `${currScale.x} ${currScale.y} ${currScale.z}`,
                                to:         `${sourceScale} ${sourceScale} ${sourceScale}`,
                                dur:        this.data.dur
                            })
                        // For switches and sinks
                        } else {
                            el.setAttribute('animation__scale', {
                                property:   'scale',
                                from:       '0 0 0',
                                to:         '1 1 1',
                                dur:        this.data.dur
                            })
                        }
                    // Animate to hidden
                    }  else {
                        el.setAttribute('animation__scale', {
                            property:   'scale',
                            from:       `${currScale.x} ${currScale.y} ${currScale.z}`,
                            to:         '0 0 0',
                            dur:        this.data.dur
                        })
                        setTimeout( () => {         // Set visibility state
                            el.setAttribute('visible', false)
                        }, animationTime)
                    }         
                })

                // Adjust net impact on SOURCE balloons for switches and sinks
                if(this.data.type !== 'sources'){
                    sourceGroupBalloonEls.forEach(el => {
                        const currScale = el.getAttribute('scale')
                        el.setAttribute('animation__scale', {
                            property:   'scale',
                            from:       `${currScale.x} ${currScale.y} ${currScale.z}`,
                            to:         `${sourceScale} ${sourceScale} ${sourceScale}`,
                            dur:        this.data.dur
                        })
                    })
                }
            },

            remove: function(){
            }
        })

        AFRAME.registerComponent('set-balloon-colours', {
            schema: {   
                dur:                {type: 'number',    default: 5000 },  
                type:               {type: 'string',    default: 'all'}, 
                random:             {type: 'boolean',   default: 'false'}, 

            },
            update: function(){
                const balloonGroupEls = this.data.type === 'all' ? document.querySelectorAll('.balloon-group') :  document.querySelectorAll(`.balloon-group.${this.data.type}`), 
                    balloonEls = this.data.type === 'all' ? document.querySelectorAll('.balloon') :  document.querySelectorAll(`.balloon-group.${this.data.type} .balloon` ), 
                    sourceGroupBalloonEls = document.querySelectorAll('.balloon-group.sources .balloon'),
                    animationTime =  this.data.dur
             
                balloonGroupEls.forEach((el, i) => {
                    let balloonCol
                    if(this.data.random) {
                        balloonCol = palette.letterBlock[Math.floor(Math.random()*palette.letterBlock.length)] 
                    } else {
                        if(el.classList.contains('sources') ){
                            balloonCol = palette.emissions.balloons.sources
                        } else if (el.classList.contains('sinks') ){
                            balloonCol =  palette.emissions.balloons.sinks
                        } else if (el.classList.contains('switches') ){
                            balloonCol = palette.emissions.balloons.switches
                        }   
                    }
                    // balloonEls[i].setAttribute('material', {color: balloonCol})
                    balloonEls[i].setAttribute('animation__col', {
                        property:   'material.color',
                        duration:    this.data.dur,
                        to:          balloonCol
                    })
                })
            }
        })


    // EXTERNAL EVENT CONTROLS : FOR UI AND TESTING
        AFRAME.registerComponent("add-external-listeners", { 
            init: function(){
                window.addEventListener("touchstart", function(){
                    // Enable Orbit control and VR mode options
                    scene.els.scene.setAttribute('vr-mode-ui', {enabled: true})
                    scene.els.cam.fly.setAttribute('camera', {active: false  })
                    scene.els.cam.low.setAttribute('camera', {active: true   })
                })
                // KEYBOARD EVENTS
                window.addEventListener("keydown", function(key){
                    // Turn off VR option if a keyboard is present
                    scene.els.scene.setAttribute('vr-mode-ui', {enabled: false})
                    // Keyboard events
                    if(state.ui.enableKeyEvents){
                        switch(key.code){
                            case 'Backquote': 
                                externalEvents.toggleStats()
                                break
                            case 'BracketLeft':
                                externalEvents.rotateFlyCam('left')
                                break
                            case 'BracketRight':
                                externalEvents.rotateFlyCam('right')
                                break
                            case 'Backslash':
                                externalEvents.toggleFlyCamHeight()
                                break
                            case 'Period':
                                externalEvents.changeHour('forward')
                                break
                            case 'Comma':
                                externalEvents.changeHour('back')
                                break
                            case 'Space':
                                externalEvents.toggleCamera()
                                break
                            case 'ShiftRight':
                                externalEvents.changeEnvironment()
                                break
                            case 'Enter':
                                document.getElementById('scene').components.inspector.openInspector()
                                break
                            case 'ShiftLeft':
                                document.getElementById('shortcuts').classList.add('visible') 
                                break
                            case 'KeyP':
                                if(!state.scene.animation.planeFlight){                                
                                    scene.els.scene.setAttribute('fly-plane', null)
                                }
                                break
                            case 'KeyR':                       
                                    scene.els.scene.setAttribute('sail-duck', null)
                                break
                            case 'KeyE':   
                                const environments = Object.keys(settings.days),
                                    currentIndex = environments.indexOf(state.scene.environment.name),
                                    newEnvironment = environments[(currentIndex+1) % environments.length]  
                                state.scene.environment.name = newEnvironment
                                externalEvents.changeEnvironment(newEnvironment)
                                console.log('Changing environment to '+newEnvironment)
                                break
                            case 'KeyQ':
                                if(!state.scene.animation.blockTitleShowing){
                                    state.scene.animation.blockTitleShowing = true
                                    // scene.els.items.blockGroup.setAttribute('show-block-title', "text: Hello World;  posZ: 35, -35;   posY: 5,  -10; posX: 0, 0; tilt: 10, -10; rotate: 0, 0; letterSpace: 15")
                                    scene.els.items.blockGroup.setAttribute('show-block-title', "text: The Kingdom of Dreams & Madness;  posX: -20, -20, -20, 0, -20, 0; posY: 40, 40, 40, 0, -5, -15;  posZ: 70, 0, -70, 50, 5, -45;  tilt: 0, 0, 0, 10, 0, -10; rotate: 0, 0, 0, 0, 0, 0; letterSpace: 12.5")
                                    scene.els.items.blockGroup.setAttribute('animation', {
                                        property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                                    })
                                } else {
                                    state.scene.animation.blockTitleShowing = false
                                    scene.els.items.blockGroup.setAttribute('animation', {
                                        property: 'position.y', from: 0, to: 100, dur: 3500, delay: 500
                                    })
                                    setTimeout( () => {
                                        scene.els.items.blockGroup.removeAttribute('show-block-title')
                                    }, 3500)                                    
                                }
                                break
                            case 'KeyC':    // Toggle carbon 'balloons'
                                state.scene.emissions.balloons.sources = !state.scene.emissions.balloons.sources
                                scene.els.scene.setAttribute('emissions-activity-balloons', {visible: state.scene.emissions.balloons.sources, dur: 3000, type: 'sources'})
                                // Control key events
                                state.ui.enableKeyEvents = false
                                setTimeout( ()=> {  state.ui.enableKeyEvents = true    }, 3000)
                                break
                            // HAZARD EVENTS
                            case 'Digit1':      // 1. THUNDERSTORM AND FLOODING EVENTS 
                                externalEvents.hazards.stormFlood()
                                break                            
                            case 'Digit2':      // 2. EXTREME WIND (THUNDERSTORM) EVENTS 
                                externalEvents.hazards.stormWind()                          
                                break                        
                            case 'Digit3':      // 3. HEAT DAYS AND HEATWAVE
                                externalEvents.hazards.heat()                                                   
                                break                            
                            case 'Digit4':      // 4. DROUGHT | FOOD AND WATER SUPPLY SHORTAGE
                                externalEvents.hazards.drought()  
                                break                        
                            case 'Digit5':      // 5. BUSHFIRES | INTENSITY AND POSITION BASED
                                externalEvents.hazards.bushfire()  
                                break 
                            case 'Digit6':      // 6. OCEAN ACIDIFICATION | INTENSITY BASED
                                externalEvents.hazards.acidifcation()  
                                break                        
                            case 'Digit7':      // 7. TROPICAL STORMS| SEA AND LAND BASED WIND EVENTS
                                externalEvents.hazards.tropicalStorm()  
                                break
                            case 'Digit8':      // 8. WINTER AND ICE STORM
                                externalEvents.hazards.winterStorm() 
                                break
                            case 'Digit9':      //  9. AVALANCHE AND MUDSLIDE
                                break
                            case 'Digit0':      //  0. EARTHQUAKES AND TSUNAMIS
                                externalEvents.hazards.earthquake() 
                                break
                            // +/- SEA LEVEL CHANGES | INCREMENTAL
                            case 'Equal':
                            case 'NumpadAdd':
                                externalEvents.hazards.seaLevelUp()
                                console.log('Raising Sea level to '+state.scene.effect.seaLevel)
                                // COASTAL EROSION
                                break
                            case 'Minus':
                            case 'NumpadSubtract':
                               externalEvents.hazards.seaLevelDown()
                                console.log('Lowering sea level to '+state.scene.effect.seaLevel)
                                break                        
                            default:
                                clearTimeout(state.ui.keydown)  
                                document.getElementById('shortcuts').classList.remove('visible')
                                console.log('Unused key code is: '+ key.code)
                        }
                    }
                })

                window.addEventListener("keyup", function(key){
                    if(state.ui.enableKeyEvents){
                        switch(key.code){
                            case 'ShiftLeft':
                                    clearTimeout(state.ui.keydown)  
                                    document.getElementById('shortcuts').classList.remove('visible')
                                break
                            default:
                                clearTimeout(state.ui.keydown)  
                                document.getElementById('shortcuts').classList.remove('visible')
                        }
                    }
                })

                // MENU EVENTS

                // CLICK / TOUCH EVENTS
    
                // VOICE CONTROLLED EVENTS

            },
            play: function(){
            }
        })


////////////////////////////////////////////////////////////
/// METHODS ABLE TO BE CALLED EXTERNAL FROM THE SCENE   ////
////////////////////////////////////////////////////////////

    const externalEvents = {
        addTouchUI: function(){
            document.getElementById('loader-button').addEventListener('click', function(){
                scene.els.scene.setAttribute('initiate-ui', null)
                scene.els.items.blockGroup.setAttribute('show-block-title', "text: The Kingdom of Dreams & Madness;  posX: -20, -20, -20, 0, -20, 0; posY: 40, 40, 40, 0, -5, -15;  posZ: 70, 0, -70, 50, 5, -45;  tilt: 0, 0, 0, 10, 0, -10; rotate: 0, 0, 0, 0, 0, 0; letterSpace: 12.5")
                scene.els.items.blockGroup.setAttribute('animation', {
                    property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                })
            })
            document.getElementById('menu-time-forward').addEventListener('click', function(){
                externalEvents.changeHour('forward')
            }) 
            document.getElementById('menu-time-back').addEventListener('click', function(){
                externalEvents.changeHour('back')
            }) 

            // Hazard buttons: add DOM elemens and events for hazards
            const hazardEls = ['menu-stormFlood', 'menu-stormWind', 'menu-heat', 'menu-drought', 'menu-bushfire', 'menu-acidification', 
                'menu-tropicalStorm',  'menu-winterStorm', 'menu-earthquake', 'menu-seaLevelUp', 'menu-seaLevelDown' ]

                hazardEls.forEach(id => {
                    
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
                                // Add listeners for each intesity option
                                intensityButton.addEventListener('click', function(){
                                    document.querySelectorAll('.details-intensity-button').forEach(el => el.classList.remove('active'))
                                    this.classList.add('active')                                  
                                    externalEvents.hazards[hazard](option)           // Call the hazard
                                })
                                intensityContainer.appendChild(intensityButton)      // Add button option to DOM
                                // Show the first intensity option active by default (as hazard button triggers first option)
                                if(i === 0){    
                                    intensityButton.classList.add('active')
                                    externalEvents.hazards[hazard](option)
                                }
                            })
                        }
                    }) 
                })

            // Emissions balloons
            // document.getElementById('menu-balloon-sources').addEventListener('click', function(){
            //     state.scene.emissions.balloons.sources = !state.scene.emissions.balloons.sources
            //     state.scene.emissions.balloons.net.switches = state.scene.emissions.balloons.switches
            //     state.scene.emissions.balloons.net.sinks = state.scene.emissions.balloons.sinks

            //     scene.els.scene.setAttribute('emissions-activity-balloons', {
            //         type:               'sources',
            //         visible:            state.scene.emissions.balloons.sources, 
            //         sourceNetSwitch:    state.scene.emissions.balloons.net.switches,
            //         sourceNetSinks:     state.scene.emissions.balloons.net.sinks
            //     })
            //     // Control menu style click events
            //     this.classList.toggle('selected')
            //     this.classList.add('noPointerEvents')
            //     setTimeout( () => {  this.classList.remove('noPointerEvents') }, 3000)
            // })   
            // document.getElementById('menu-balloon-switches').addEventListener('click', function(){
            //     state.scene.emissions.balloons.switches = !state.scene.emissions.balloons.switches
            //     state.scene.emissions.balloons.net.switches =  state.scene.emissions.balloons.switches 

            //     scene.els.scene.setAttribute('emissions-activity-balloons', {
            //         type:               'switches',
            //         visible:            state.scene.emissions.balloons.switches, 
            //         sourceNetSwitch:    state.scene.emissions.balloons.net.switches,
            //         sourceNetSinks:     state.scene.emissions.balloons.net.sinks
            //     })
            //     // Control menu style click events
            //     this.classList.toggle('selected')
            //     this.classList.add('noPointerEvents')
            //     setTimeout( () => {  this.classList.remove('noPointerEvents') }, 3000)
            // })   

            // Camera navigation
            const navEls = Object.keys(scene.camPos.nav)
            for(i = 0; i < navEls.length; i++){
                navEls[i] = ui.buttonEl.nav[navEls[i]] =  document.getElementById(navEls[i])
            }

            Object.entries(ui.buttonEl.nav).forEach( ([name, el]) => {
                el.addEventListener('click', function(){
                    el.classList.toggle('active')
                    if(el.classList.contains('active')){
                        scene.els.scene.setAttribute('move-fly-camera', {
                            pos:        Object.values(scene.camPos.nav[name].pos),
                            rotation:   Object.values(scene.camPos.nav[name].rotation)
                        })
                    }
                })
            })
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

        toggleCamera: function(){
            if(scene.els.cam.fly.getAttribute('camera').active ){
                scene.els.cam.fly.setAttribute('camera', {active: false })
                scene.els.cam.low.setAttribute('camera', {active: true  })
            } else {
                scene.els.cam.fly.setAttribute('camera', {active: true  })
                scene.els.cam.low.setAttribute('camera', {active: false })
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

        // Helper to attach new instance of look-controls after after animation
        resetLookControls: function() {
            scene.els.cam.fly.removeAttribute('look-controls')
            scene.els.cam.fly.setAttribute('look-controls', {})
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



////////////////////////////////////////////////////////////
/////  GLSL SHADERS AND DEPENDENT EFFECTS COMPONENTS  //////
////////////////////////////////////////////////////////////

    // from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl
    const shaders = {

        pnoise3: ` // GLSL textureless classic 3D noise "cnoise",
                    // with an RSL-style periodic variant "pnoise".
                    // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
                    // Version: 2011-10-11
                    //
                    // Many thanks to Ian McEwan of Ashima Arts for the
                    // ideas for permutation and gradient selection.
                    // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
                    // Distributed under the MIT license. See LICENSE file.
                    // https://github.com/ashima/webgl-noise

                    vec3 mod289(vec3 x)
                    {
                        return x - floor(x * (1.0 / 289.0)) * 289.0;
                    }

                    vec4 mod289(vec4 x)
                    {
                        return x - floor(x * (1.0 / 289.0)) * 289.0;
                    }

                    vec4 permute(vec4 x)
                    {
                        return mod289(((x*34.0)+1.0)*x);
                    }

                    vec4 taylorInvSqrt(vec4 r)
                    {
                        return 1.79284291400159 - 0.85373472095314 * r;
                    }

                    vec3 fade(vec3 t) {
                        return t*t*t*(t*(t*6.0-15.0)+10.0);
                    }

                    // Classic Perlin noise, periodic variant
                    float pnoise3(vec3 P, vec3 rep)
                    {
                        vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
                        vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
                        Pi0 = mod289(Pi0);
                        Pi1 = mod289(Pi1);
                        vec3 Pf0 = fract(P); // Fractional part for interpolation
                        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
                        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                        vec4 iy = vec4(Pi0.yy, Pi1.yy);
                        vec4 iz0 = Pi0.zzzz;
                        vec4 iz1 = Pi1.zzzz;

                        vec4 ixy = permute(permute(ix) + iy);
                        vec4 ixy0 = permute(ixy + iz0);
                        vec4 ixy1 = permute(ixy + iz1);

                        vec4 gx0 = ixy0 * (1.0 / 7.0);
                        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                        gx0 = fract(gx0);
                        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                        vec4 sz0 = step(gz0, vec4(0.0));
                        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                        vec4 gx1 = ixy1 * (1.0 / 7.0);
                        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                        gx1 = fract(gx1);
                        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                        vec4 sz1 = step(gz1, vec4(0.0));
                        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                        g000 *= norm0.x;
                        g010 *= norm0.y;
                        g100 *= norm0.z;
                        g110 *= norm0.w;
                        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                        g001 *= norm1.x;
                        g011 *= norm1.y;
                        g101 *= norm1.z;
                        g111 *= norm1.w;

                        float n000 = dot(g000, Pf0);
                        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                        float n111 = dot(g111, Pf1);

                        vec3 fade_xyz = fade(Pf0);
                        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                        return 2.2 * n_xyz;
                    }`
        
    }

    AFRAME.registerShader('steam', {
        schema: {
            timeMsec: {type:'time', is:'uniform'}
        },
        vertexShader: shaders.pnoise3 + `
            // Based on @thespite's article:
            // "Vertex displacement with a noise function using GLSL and three.js"
            // Source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

            varying float noise;
            uniform float timeMsec; // A-Frame time in milliseconds.

            float turbulence( vec3 p ) {
                float w = 100.0;
                float t = -.5;
                for (float f = 1.0 ; f <= 10.0 ; f++ ){
                    float power = pow( 2.0, f );
                    t += abs( pnoise3( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
                }
                return t;
            }

            void main() {
                float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.
                noise = 10.0 *  -.10 * turbulence( .5 * normal + time / 3.0 );
                float b = 5.0 * pnoise3( 0.05 * position, vec3( 100.0 ) );
                float displacement = (- 10. * noise + b) / 50.0;

                vec3 newPosition = position + normal * displacement;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }`,
            fragmentShader: `
                varying float noise;
                void main() {
                vec3 color = vec3(1. - 2. * noise);
                gl_FragColor = vec4( color.rgb, 1 );

                }
            `
    });
