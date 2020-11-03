/***************************************************************************/
/***************************************************************************/
/****              Project: Kingdom of Dreams and Madness               ****/
/****                                                                   ****/
/****  An exploration of building 'dynamic models' in a humane form     ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a    ****/
/****  a completed protoype is (eventually) released  under a Creative  ****/
/***   Commons 4.0 license                                              ****/
/***************************************************************************/
/****  This components.js file is used for A-Frame scene interactivty   ****/
/***************************************************************************/


console.log('REGISTERING CUSTOM A-FRAME COMPONENTS...')

    AFRAME.registerComponent('setup', {
        init: function(){
            console.log('**** SETTING DOM ELEMENTS UP...****')

            // Iniiate element references on initation for referencing in othercomponent code
            sceneEls.scene = document.getElementById('scene')

            // Zones elements
            sceneEls.zones = {
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
            sceneEls.lights = {
                hemi:           document.getElementById('ambient-hemiLight'),
                ambient:        document.getElementById('ambient-light'),
                sun:            document.getElementById('sun-light'),
                spot:           document.getElementById('spotlight-above')
            }

            // Environment elements
            sceneEls.enviro = {
                sun:            document.getElementById('sun-body'),
                moon:           document.getElementById('moon-body'),
                sky:            document.getElementById('sky'),
                sea:            document.getElementById('sea'),
                oceanGroup:     document.getElementById('ocean-group'),
                snowGroup:      document.getElementById('snow-group'),
                particles:      document.getElementById('particles'),
                lightningGroup: document.getElementById('lightning-group'),
                grassGroup:     document.getElementById('ground-group'),
                fire:           document.getElementById('fire-group'),
                vortexGroup:    document.getElementById('vortex-group'),
                vortex:         document.getElementById('vortex')
            }
            // Camera elements
            sceneEls.cam = {
                fly:            document.getElementById('flycam'),
                low:            document.getElementById('lowcam')
            }
            sceneEls.camRig = {
                fly:            document.getElementById('flycam-rig'),
                low:            document.getElementById('lowcam-rig')
            }

            // elements elements
            sceneEls.items = {
                duckPath:       document.getElementById('duck-path-points'),
                blockGroup:     document.getElementById('message-blocks-group')
            }

            // Misc
            sceneEls.misc = {
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
        }
    })


    AFRAME.registerComponent("position-sun", {        
        init: function() {
            console.log('Setting the sun and moon position for hour '+state.visual.modelTime.hour)
            sceneEls.enviro.sun.setAttribute('position', document.getElementById(sceneEls.misc.sunPos[state.visual.modelTime.hour]).getAttribute('position'))
            sceneEls.lights.sun.setAttribute('position', document.getElementById(sceneEls.misc.sunPos[state.visual.modelTime.hour]).getAttribute('position'))

            sceneEls.enviro.moon.setAttribute('position', document.getElementById(sceneEls.misc.moonPos[state.visual.modelTime.hour]).getAttribute('position'))

            // Change the hemi ambient light
            sceneEls.lights.hemi.setAttribute('light', { 
                intensity: settings.lights.hemi.intProp[state.visual.modelTime.season][state.visual.modelTime.hour] * settings.lights.hemi.maxIntensity
            })  
            // Set solar farm axis
            const solarFarmEls = document.getElementsByClassName('solarRotatable')
            for(let i = 0; i < solarFarmEls.length; i++){
                solarFarmEls[i].setAttribute('animation__rotate', {
                    property:   'rotation',
                    dur:        1000,
                    to:         {x: settings.solarFarm.rotationByHour[state.visual.modelTime.hour] , y: 0, z: 0}
                })            
            }

            // Set the environment
            externalEvents.changeEnvironment()
      }
    })


    AFRAME.registerComponent("cycle-sun", {
        schema: {
            dur:                {type: 'number',   default: simulation.dayLength},
            hour:               { type: 'int',      default: 0}
        },

        init: function() {
            console.log(`Initiating the sun cycle of ${this.data.dur / 1000 } seconds`)

            // Create sun curve path from midnight
            sceneEls.misc.sunPos.forEach((id, i) => {
                const pos = document.getElementById(id).getAttribute('position')
                pos.x = settings.days.sunX[state.visual.time.season]
                document.getElementById(id).setAttribute('position', pos)
            })
            // Add animation along path for sun body and sun direcitonal light, starting at midnight
            sceneEls.enviro.sun.setAttribute('alongpath', `curve: #sun-path-points; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
            sceneEls.lights.sun.setAttribute('alongpath', `curve: #sun-path-points ; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
        },

        pause: function () {
            clearInterval(state.visual.modelTime.timer)
            console.log('Model clock stopped at '+state.visual.modelTime.hour)
        },

        play: function () {
            // Start the hour of day timer
            state.visual.modelTime.hour = 0
            state.visual.modelTime.timer = setInterval( () => { 
                state.visual.modelTime.hour = (state.visual.modelTime.hour + 1) % 24  
                // console.log('Hour is '+state.visual.modelTime.hour )
            }, this.data.dur / 24 )
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
                state.visual.animation.planeFlight = false
                sceneEls.scene.removeAttribute('fly-plane') 
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
                slchange:        {type: 'number',  default: 0 },  
                dur:             {type: 'number',   default: 1000 },              
            },

            update: function(){
                // Change sea level
                const currentSea = sceneEls.enviro.sea.getAttribute('position')
                sceneEls.enviro.sea.setAttribute('animation__seaLevel', {
                    property:       'position',
                    dur:            this.data.dur,
                    to:             {x: currentSea.x,   y: 2 + this.data.slchange, z: currentSea.z}
                })
                // Change angle to show 'creeping inundation' (above 2)
                if(this.data.slchange > 2){
                    sceneEls.enviro.oceanGroup.setAttribute('animation__seaAngle', {
                        property:       'rotation',
                        dur:            this.data.dur,
                        to:             {x: 0,   y: 0,  z: 1}
                    })
                } else {
                    sceneEls.enviro.oceanGroup.setAttribute('animation__seaAngle', {
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
                    sceneEls.enviro.particles.setAttribute('particle-system', {
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
                sceneEls.enviro.particles.removeAttribute('particle-system')
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
                const currentEnviro = settings.days.stormFlood[state.visual.modelTime.timeOfDay()]
                state.visual.hazard.lightning = setInterval(strike, 5000 + Math.random()* 10000 );
                function strike(){
                    sceneEls.enviro.sky.setAttribute('material', { topColor:   '#fff' })
                    sceneEls.enviro.lightningGroup.setAttribute('visible', 'true')
                    setTimeout(() => {
                       sceneEls.enviro.sky.setAttribute('material', {  topColor:  currentEnviro['sky-top']  })
                       setTimeout(() => {
                            sceneEls.enviro.sky.setAttribute('material', { topColor:   '#fff' })               
                            setTimeout( ()=> {
                                sceneEls.enviro.sky.setAttribute('material', {  topColor:  currentEnviro['sky-top']  })
                                sceneEls.enviro.lightningGroup.setAttribute('visible', 'false')
                            }, 50)
                        }, 30);
                    }, 30);
                };
            },

            remove: function(){
                // Stop the lightning
                clearInterval(state.visual.hazard.lightning)
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
                    sceneEls.enviro.particles.setAttribute('particle-system', {
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
                clearInterval(state.visual.hazard.treeSway)
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
                        state.visual.hazard.treeSway = setInterval(() => {
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
                sceneEls.enviro.particles.removeAttribute('particle-system')
                // Stop the trees swaying
                clearInterval(state.visual.hazard.treeSway)
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
                externalEvents.changeEnvironment(state.visual.environment.name, this.data.dur)
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
                    to:         {x: 24.2, y: 10.4, z: 10.9}
                })
                document.getElementById('snowCap-02').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 59.25, y: 8.96, z: 14.46}
                })
                document.getElementById('snowCap-03').setAttribute('animation__scale', {
                    property:   'scale',
                    dur:        this.data.dur,
                    to:         {x: 31.9, y: 12.5, z: 24.1}
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
                sceneEls.enviro.fire.setAttribute('visible', true) 
                sceneEls.enviro.fire.setAttribute('animation__position', {
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

                sceneEls.enviro.fire.setAttribute('animation__position', {
                    property:       'position',
                    dur:            this.data.dur / 2,
                    to:             {x: posX , y: 0, z: 0}
                })
            },
            remove: function(){
                externalEvents.changeEnvironment(state.visual.environment.name, this.data.dur)
                sceneEls.enviro.fire.setAttribute('animation__position', {
                    property:       'position',
                    dur:            this.data.dur,
                    to:             {x:0 , y: -50, z: 0},  
                })
                setTimeout(() => {
                    sceneEls.enviro.fire.setAttribute('visible', false)
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

            },
            update: function(){
                const heatstate = ['default', 'hotDay', 'veryHotDay', 'heatwave'],
                    pulseTime = this.data.dur, 
                    newIntensity = this.data.intensity,
                    baseIntensity = heatstate[heatstate.indexOf(newIntensity)-1]
                clearInterval(state.visual.hazard.heatPulse)
                if(this.data.intensity !== 'heatwave'){
                    state.visual.hazard.heatPulse = setInterval(pulseSky, pulseTime );
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
                    const timeOfDay = state.visual.modelTime.timeOfDay(),
                        topColor = direction === 'heat' ? settings.days.heat[timeOfDay][newIntensity]['sky-top'] 
                            : (baseIntensity === 'default') ? settings.days.heat[timeOfDay]['sky-top'] 
                            : settings.days.heat[timeOfDay][baseIntensity]['sky-top'] ,
                        bottomColor = direction === 'heat' ? settings.days.heat[timeOfDay][newIntensity]['sky-bottom'] : (baseIntensity === 'default') ? settings.days.heat[timeOfDay]['sky-bottom'] : settings.days.heat[timeOfDay][newIntensity]['sky-bottom']
                    sceneEls.enviro.sky.setAttribute('animation__topColour', {
                        property:       'material.topColor',
                        dur:            duration,
                        to:             topColor
                    })  
                    sceneEls.enviro.sky.setAttribute('animation__bottomColour', {
                        property:   'material.bottomColor',
                        dur:        duration,
                        to:         bottomColor
                    })  
                };
            },
            remove: function(){
                clearInterval(state.visual.hazard.heatPulse)
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
                    sceneEls.enviro.vortexGroup.setAttribute('visible', true)
                    sceneEls.enviro.vortexGroup.setAttribute('animation__scale', {
                        property:       'scale',
                        from:           {x:0 , y: 0, z: 0},
                        to:             {x:1 , y: 1, z: 1},
                        dur:            3000
                    })
                    sceneEls.enviro.vortexGroup.setAttribute('animation__position', {
                        property:       'position',
                        from:           {x:0 , y: -50, z: 0},
                        to:             {x:0 , y: -5, z: 0},
                        dur:            5000
                    })
                    // Lean the whole vortex
                    sceneEls.enviro.vortexGroup.setAttribute('animation__rotate', {
                        property:       'rotation',
                        from:             {x:-5 , y: 0, z: 5},
                        to:             {x: 5 , y: 0, z: 10},
                        dur:            1000,
                        loop:           'true',
                        dir:            'alternate',
                    })
                    // Spin/size and move the vortex alogn path
                    sceneEls.enviro.vortexGroup.setAttribute('alongpath', {
                        curve:          "#cyclone-path-points",
                        dur:            90000, 
                        loop:           'true'
                    })
                    sceneEls.enviro.vortex.setAttribute('animation__scale', {
                        property:       'scale',
                        from:           {x:3 , y: 3, z: 3},
                        to:             {x:8 , y: 8, z: 8},
                        dur:            20000,
                        dir:            'alternate',
                        loop:           'true'
                    })
                    sceneEls.enviro.vortex.setAttribute('animation__rotate', {
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
                sceneEls.enviro.vortexGroup.setAttribute('animation__scale', {
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
                    sceneEls.enviro.vortexGroup.setAttribute('visible', false)
                    sceneEls.enviro.vortexGroup.removeAttribute('animation__scale')
                    sceneEls.enviro.vortexGroup.removeAttribute('animation__rotate')
                    sceneEls.enviro.vortex.removeAttribute('alongpath')
                    sceneEls.enviro.vortex.removeAttribute('animation__scale')
                    sceneEls.enviro.vortex.removeAttribute('animation__rotate')
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
                state.visual.elements.origCol.homeRoofs = []
                state.visual.elements.origCol.barnRoofs = []
                state.visual.elements.origCol.industrialRoofs = []
                state.visual.elements.origCol.townhouseRoofs = []
                state.visual.elements.origCol.centralHill = []
                state.visual.elements.origCol.hotelRoofs = [],
                state.visual.elements.origCol.foliage = [],
                state.visual.elements.origCol.beach = [],
                state.visual.elements.origCol.river = []
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
                    state.visual.elements.origCol.homeRoofs.push( homeRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < barnRoofs.length; i++){
                    state.visual.elements.origCol.barnRoofs.push( barnRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < industrialRoofs.length; i++){
                    state.visual.elements.origCol.industrialRoofs.push( industrialRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < townhouseRoofs.length; i++){
                    state.visual.elements.origCol.townhouseRoofs.push( townhouseRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < centralHill.length; i++){
                    state.visual.elements.origCol.centralHill.push( centralHill[i].getAttribute('material').color)
                }
                for(let i = 0; i < hotelRoofs.length; i++){
                    state.visual.elements.origCol.hotelRoofs.push( hotelRoofs[i].getAttribute('material').color)
                }
                for(let i = 0; i < foliage.length; i++){
                    state.visual.elements.origCol.foliage.push( foliage[i].getAttribute('material').color)
                }
                for(let i = 0; i < beach.length; i++){
                    state.visual.elements.origCol.beach.push( beach[i].getAttribute('material').color)
                }
                for(let i = 0; i < river.length; i++){
                    state.visual.elements.origCol.river.push( river[i].getAttribute('material').color)
                }
            },
            update: function(){
                switch(this.data.intensity){
                    case 'snow':
                        sceneEls.enviro.particles.setAttribute('particle-system', {
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
                            sceneEls.enviro.snowGroup.setAttribute('visible', true)
                            sceneEls.enviro.snowGroup.setAttribute('animation__scale', {
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
                        sceneEls.enviro.particles.setAttribute('particle-system', {
                            size:                2
                        })
                        sceneEls.enviro.snowGroup.setAttribute('animation__scale', {
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
                        sceneEls.enviro.particles.setAttribute('particle-system', {
                            size:                3
                        })
                        sceneEls.enviro.snowGroup.setAttribute('animation__scale', {
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
                sceneEls.enviro.particles.removeAttribute('particle-system')
                sceneEls.enviro.snowGroup.setAttribute('animation__position', {
                    property:       'position',   
                    to:             {x: 0, y: 0, z: 0 },   
                    dur:            this.data.dur
                })
                sceneEls.enviro.snowGroup.setAttribute('animation__scale', {
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
                        to:             state.visual.elements.origCol.homeRoofs[i]
                    })                    
                }
                for(let i = 0; i < barnRoofs.length; i++){
                    barnRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.barnRoofs[i]
                    })      
                }
                for(let i = 0; i < industrialRoofs.length; i++){
                    industrialRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.industrialRoofs[i]
                    })      
                }
                for(let i = 0; i < townhouseRoofs.length; i++){
                    townhouseRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.townhouseRoofs[i]
                    })      
                }
                  for(let i = 0; i < centralHill.length; i++){
                    centralHill[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.centralHill[i]
                    })      
                }
                for(let i = 0; i < hotelRoofs.length; i++){
                    hotelRoofs[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.hotelRoofs[i]
                    })      
                }
                for(let i = 0; i < foliage.length; i++){
                    foliage[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.foliage[i]
                    })      
                }
                for(let i = 0; i < beach.length; i++){
                    beach[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.beach[i]
                    })      
                }
                for(let i = 0; i < river.length; i++){
                    river[i].setAttribute('animation__col', {
                        property:       'material.color',
                        dur:             this.data.dur,
                        to:             state.visual.elements.origCol.river[i]
                    })      
                }

                setTimeout(() => {
                    sceneEls.enviro.snowGroup.setAttribute('visible', false)
                    document.getElementById('duckSantaHat').setAttribute('visible', false)
                    // Clear the orginal element colour object 
                    state.visual.elements.origCol = {}
                },this.data.dur )
            }
        })


        AFRAME.registerComponent('hazard-ocean-acidification', {
            schema: {   
                dur:                    {type: 'number',   default: 2000 },  
                intensity:              {type: 'string',   default: 'severe' },  
            },

            init: function(){
                sceneEls.enviro.sea.removeAttribute('ocean')
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
                sceneEls.enviro.sea.setAttribute('ocean', {
                    color:              oceanColour,
                    width:              10.8,
                    amplitude:          0.25,
                    amplitudeVariance:  0.25,
                    density:            20
                })
                document.getElementById('duckMask').setAttribute('visible', maskVisible)
            },
            remove: function(){
                sceneEls.enviro.sea.removeAttribute('ocean')
                sceneEls.enviro.sea.setAttribute('ocean', {
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
                    state.visual.hazard.earthquake = null
                    sceneEls.scene.removeAttribute('hazard-earthquake')
                    sceneEls.zones.planet.removeAttribute('animation__pos')
                }, 1200 )

                function shakeOut(intensity){
                    const toObj = {
                        x: intensity * (1 - Math.random()*2), 
                        y: intensity * (1 - Math.random()*2), 
                        z: intensity * (1 - Math.random()*2)
                    }
                    sceneEls.zones.planet.setAttribute('animation__pos', {
                        property:       'position',
                        to:             toObj,
                        dur:            100,
                        easing:         'easeInOutElastic'
                    })
                }
                function shakeReturn(intensity){
                    sceneEls.zones.planet.setAttribute('animation__pos', {
                        property:       'position',
                        to:             { x: 0, y: -3,   z: 0},
                        dur:            500
                    })
                }
            },
        })


        AFRAME.registerComponent('hazard-avalanche', {
        })

        AFRAME.registerComponent('hazard-mudslide', {
        })

        AFRAME.registerComponent('hazard-dust-storm', {
        })


    // EXTERNAL EVENT CONTROLS : FOR UI AND TESTING
    AFRAME.registerComponent("add-external-listeners", { 
        init: function(){
            window.addEventListener("touchstart", function(){
console.log('TOUCH/ORBIT CAMERAS ENABLED')
                 //Enable Orbit control and VR mode options
                sceneEls.scene.setAttribute('vr-mode-ui', {enabled: true})
                sceneEls.cam.fly.setAttribute('orbit-controls', null)

                // Disable look and wasd controls
                sceneEls.cam.fly.removeAttribute('look-controls')
                sceneEls.cam.fly.removeAttribute('wasd-controls')
            })

            // KEYBOARD EVENTS
            window.addEventListener("keydown", function(key){
console.log('KEYBOARD CAMERAS ENABLED')
                // Disable Orbit control and VR mode options
                sceneEls.scene.setAttribute('vr-mode-ui', {enabled: false})
                sceneEls.cam.fly.setAttribute('orbit-controls', {enabled: false})
                // Enable look and wasd controls
                sceneEls.cam.fly.setAttribute('look-controls', {acceleration: 150, enabled: true})
                sceneEls.camRig.fly.setAttribute('wasd-controls', {acceleration: 150, enabled: true})

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
                                externalEvents.toggleFlyCamHeight()
                            break
                        case 'ShiftRight':
                                externalEvents.changeEnvironment()
                            break
                        case 'Enter':
                                document.getElementById('scene').components.inspector.openInspector()
                            break
                        case 'MetaLeft':
                                document.getElementById('shortcuts').classList.add('visible') 
                            break
                        case 'KeyP':
                            if(!state.visual.animation.planeFlight){                                
                                sceneEls.scene.setAttribute('fly-plane', null)
                            }
                            break
                        case 'keyE':   
                            const environments = Object.keys(settings.days),
                                currentIndex = environments.indexOf(state.visual.environment.name),
                                newEnvironment = environments[(currentIndex+1) % environments.length]  
                            state.visual.environment.name = newEnvironment
                            externalEvents.changeEnvironment(newEnvironment)
                            console.log('Changing environment to '+newEnvironment)
                            break
                        case 'KeyK':
                            if(!state.visual.animation.blockTitleShowing){
                                state.visual.animation.blockTitleShowing = true
                                sceneEls.items.blockGroup.setAttribute('show-block-title', "text: Kieran World;  posZ: 35, -35;   posY: 5,  -10; posX: 0, 0; tilt: 10, -10; rotate: 0, 0; letterSpace: 15")
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                                })
                            } else {
                                state.visual.animation.blockTitleShowing = false
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 0, to: 100, dur: 3500, delay: 500
                                })
                                setTimeout( () => {
                                    sceneEls.items.blockGroup.removeAttribute('show-block-title')
                                }, 3500)                                    
                            }
                            break

                        case 'KeyM':
                            if(!state.visual.animation.blockTitleShowing){
                                state.visual.animation.blockTitleShowing = true
                                sceneEls.items.blockGroup.setAttribute('show-block-title', "text: Matthew World;  posZ: 35, -35;   posY: 5,  -10; posX: 0, 0; tilt: 10, -10; rotate: 0, 0; letterSpace: 15")
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                                })
                            } else {
                                state.visual.animation.blockTitleShowing = false
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 0, to: 100, dur: 3500, delay: 500
                                })
                                setTimeout( () => {
                                    sceneEls.items.blockGroup.removeAttribute('show-block-title')
                                }, 3500)                                    
                            }
                            break

                        case 'keyQ':
                            if(!state.visual.animation.blockTitleShowing){
                                state.visual.animation.blockTitleShowing = true
                                // sceneEls.items.blockGroup.setAttribute('show-block-title', "text: Hello World;  posZ: 35, -35;   posY: 5,  -10; posX: 0, 0; tilt: 10, -10; rotate: 0, 0; letterSpace: 15")
                                sceneEls.items.blockGroup.setAttribute('show-block-title', "text: The Kingdom of Dreams & Madness;  posX: -20, -20, -20, 0, -20, 0; posY: 40, 40, 40, 0, -5, -15;  posZ: 70, 0, -70, 50, 5, -45;  tilt: 0, 0, 0, 10, 0, -10; rotate: 0, 0, 0, 0, 0, 0; letterSpace: 12.5")
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                                })
                            } else {
                                state.visual.animation.blockTitleShowing = false
                                sceneEls.items.blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 0, to: 100, dur: 3500, delay: 500
                                })
                                setTimeout( () => {
                                    sceneEls.items.blockGroup.removeAttribute('show-block-title')
                                }, 3500)                                    
                            }
                        break

                        // HAZARD EVENTS
                        case 'Digit1':      // 1. THUNDERSTORM AND FLOODING EVENTS 
                            switch(state.visual.hazard.flood){  
                                // Increase flood levels on subsequent keypress
                                case 'none': 
                                    state.visual.hazard.particles = true          
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    sceneEls.scene.setAttribute('hazard-rain', null)
                                    sceneEls.scene.setAttribute('hazard-lightning', null)
                                    setTimeout( () => { 
                                        sceneEls.scene.setAttribute('hazard-flood', {"floodLvl": 0.125}) 
                                    }, 2000)
                                    state.visual.hazard.flood = 'minor'
                                    break
                                // From minor to medium flood
                                case 'minor':
                                    state.visual.hazard.flood = 'medium'
                                    sceneEls.scene.setAttribute('hazard-flood', {"floodLvl": 0.5})
                                    break
                                // From medium to major flood
                                case 'medium':
                                    state.visual.hazard.flood = 'major'
                                    sceneEls.scene.setAttribute('hazard-flood', {"floodLvl": 0.75})
                                    break
                                // Reset after showing major flood 
                                default:                        
                                    state.visual.hazard.particles = false
                                    state.visual.hazard.lightning = null
                                    state.visual.hazard.flood = 'none'
                                    sceneEls.scene.removeAttribute('hazard-rain')
                                    sceneEls.scene.removeAttribute('hazard-lightning')
                                    sceneEls.scene.removeAttribute('hazard-flood')
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                            }
                            break
                        
                        case 'Digit2':      // 2. EXTREME WIND (THUNDERSTORM) EVENTS 
                            switch(state.visual.hazard.wind){  
                                case 'none': 
                                    state.visual.hazard.particles = true
                                    state.visual.hazard.lightning = true
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    sceneEls.scene.setAttribute('hazard-rain', null)
                                    sceneEls.scene.setAttribute('hazard-wind', null)
                                    sceneEls.scene.setAttribute('hazard-lightning', null)
                                    state.visual.hazard.wind = 'minor'
                                    break 
                                // Increase wind levels on subsequent keypress
                                case 'minor': 
                                    state.visual.hazard.wind = 'major'
                                    sceneEls.scene.setAttribute('hazard-wind', {"damage": 0.25})
                                    break
                                // Reset after showing major wind event 
                                default:    
                                    state.visual.hazard.wind = 'none'
                                    state.visual.hazard.particles = false
                                    state.visual.hazard.lightning = null
                                    sceneEls.scene.removeAttribute('hazard-wind')
                                    sceneEls.scene.removeAttribute('hazard-rain')
                                    sceneEls.scene.removeAttribute('hazard-lightning')
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                            }                            
                            break
                       
                        case 'Digit3':      // 3. HEAT DAYS AND HEATWAVE
                            switch(state.visual.hazard.heat){  
                                case null: 
                                    state.visual.hazard.heat = 'hotDay'
                                    externalEvents.changeEnvironment('heat', 2000)
                                    sceneEls.scene.setAttribute('hazard-heat', {intensity: 'hotDay'})
                                    break
                                case 'hotDay': 
                                    state.visual.hazard.heat = 'veryHotDay'
                                    sceneEls.scene.setAttribute('hazard-heat', {intensity: 'veryHotDay'})
                                    break 
                                case 'veryHotDay': 
                                    state.visual.hazard.heat = 'heatwave'
                                    sceneEls.scene.setAttribute('hazard-heat', {intensity: 'heatwave'})
                                    break

                                // Reset after showing heat eevents
                                default:    
                                    state.visual.hazard.heat = null
                                    sceneEls.scene.removeAttribute('hazard-heat')
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                            }                            
                            break
                        
                        case 'Digit4':      // 4. DROUGHT | FOOD AND WATER SUPPLY SHORTAGE
                            switch(state.visual.hazard.drought){  
                                case 'none':
                                    state.visual.hazard.drought = 'minor'
                                    sceneEls.scene.setAttribute('hazard-drought', {level: 'minor'})
                                    break
                                case 'minor':
                                    state.visual.hazard.drought = 'major'
                                    sceneEls.scene.setAttribute('hazard-drought', {level: 'major'})
                                    break
                                default:
                                    state.visual.hazard.drought = false
                                    sceneEls.scene.removeAttribute('hazard-drought')
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                            }
                            break
                       
                        case 'Digit5':      // 5. BUSHFIRES | INTENSITY AND POSITION BASED
                            switch(state.visual.hazard.bushfire){  
                                case null:
                                    state.visual.hazard.bushfire = 0
                                    sceneEls.scene.setAttribute('hazard-bushfire', {intensity: 0})
                                    break
                                case 0:
                                    state.visual.hazard.bushfire = 0.5
                                    sceneEls.scene.setAttribute('hazard-bushfire', {intensity: 0.5})
                                    break
                                case 0.5:
                                    state.visual.hazard.bushfire = 1
                                    sceneEls.scene.setAttribute('hazard-bushfire', {intensity: 1})
                                    break
                                default:
                                    state.visual.hazard.bushfire = null
                                    sceneEls.scene.removeAttribute('hazard-bushfire')
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                            }
                            break 

                        case 'Digit6':      // 6. OCEAN ACIDIFICATION | INTENSITY BASED
                            switch(state.visual.hazard.oceanAcidification){  
                                case null:
                                    state.visual.hazard['ocean-acidification'] = 'minor'
                                    sceneEls.scene.setAttribute('hazard-ocean-acidification', null)
                                    break
                                default:
                                    state.visual.hazard['ocean-acidification'] = false
                                    sceneEls.scene.removeAttribute('hazard-ocean-acidification')
                                    externalEvents.changeEnvironment('default')
                            }
                            break
                    
                        case 'Digit7':      // 7. CYCLONES AND HURRICANES | SEA AND LAND BASED WIND EVENTS
                            switch(state.visual.hazard.tropicalStorm){  
                                case false:
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    state.visual.hazard.tropicalStorm = true
                                    state.visual.hazard.wind = 'major'
                                    sceneEls.scene.setAttribute('hazard-tropical-storm', null)
                                    sceneEls.scene.setAttribute('hazard-wind', {damage: 0.25})
                                    break
                                default:
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                                    state.visual.hazard.tropicalStorm = false
                                    state.visual.hazard.wind = 'none'
                                    sceneEls.scene.removeAttribute('hazard-tropical-storm')
                                    sceneEls.scene.removeAttribute('hazard-wind')
                                    externalEvents.changeEnvironment('default')
                            }
                            break

                        case 'Digit8':      // 8. WINTER AND ICE STORM
                            switch(state.visual.hazard.winterStorm){  
                                case 'none':
                                    externalEvents.changeEnvironment('snow', 2000 )
                                    state.visual.hazard.winterStorm = 'snow'
                                    state.visual.hazard.snow = true
                                    sceneEls.scene.setAttribute('hazard-winter-storm', {intensity: 'snow'})
                                    break
                                case 'snow':
                                    state.visual.hazard.winterStorm = 'bizzard'
                                     sceneEls.scene.setAttribute('hazard-winter-storm', {intensity: 'blizzard'})
                                    break
                                case 'bizzard':
                                    state.visual.hazard.winterStorm = 'iceStorm'
                                     sceneEls.scene.setAttribute('hazard-winter-storm', {intensity: 'iceStorm'})
                                    break
                                default:
                                    externalEvents.changeEnvironment(state.visual.environment.name)
                                    state.visual.hazard.winterStorm = 'none'
                                    sceneEls.scene.removeAttribute('hazard-winter-storm')
                            }
                            break

                        case 'Digit9':      //  9. AVALANCHE AND MUDSLIDE
                            break

                        case 'Digit0':      //  0. EARTHQUAKES AND TSUNAMIS
                            switch(state.visual.hazard.earthquake){  
                                 case null:
                                    sceneEls.scene.setAttribute('hazard-earthquake', {intensity: 10})
                                    break

                                default:
                            }
                            break

                        // +/- SEA LEVEL CHANGES | INCREMENTAL
                        case 'Equal':
                        case 'NumpadAdd':
                            state.visual.hazard.seaLevel = state.visual.hazard.seaLevel + 0.1 
                            sceneEls.scene.setAttribute('hazard-sea-level', 'slchange: '+state.visual.hazard.seaLevel )
                            console.log('Raising Sea level to '+state.visual.hazard.seaLevel)
                            // COASTAL EROSION
                            break
                        case 'Minus':
                        case 'NumpadSubtract':
                            state.visual.hazard.seaLevel = state.visual.hazard.seaLevel - 0.1 
                            sceneEls.scene.setAttribute('hazard-sea-level', 'slchange: '+state.visual.hazard.seaLevel )
                            console.log('Lowering sea level to '+state.visual.hazard.seaLevel)
                            break
                    
                        default:
                            clearTimeout(state.ui.keydown)  
                            document.getElementById('shortcuts').classList.remove('visible')
                            console.log('Unused jkey code is: '+ key.code)

                    }
                }
            })

            window.addEventListener("keyup", function(key){
                if(state.ui.enableKeyEvents){
                    switch(key.code){
                        case 'MetaLeft':
                                clearTimeout(state.ui.keydown)  
                                document.getElementById('shortcuts').classList.remove('visible')
                            break
                        default:
                            clearTimeout(state.ui.keydown)  
                            document.getElementById('shortcuts').classList.remove('visible')
                    }
                }
            })

            // VOICE CONTROLLED EVENTS

        }
     })


////////////////////////////////////////////////////////////
/// METHODS ABLE TO BE CALLED EXTERNAL FROM THE SCENE   ////
////////////////////////////////////////////////////////////

    const externalEvents = {
        toggleStats: function(){
            document.getElementById('scene').toggleAttribute('stats')
        },
        toggleCamera: function(){
            if(sceneEls.cam.fly.getAttribute('camera').active ){
                sceneEls.cam.fly.setAttribute('camera', {active: false  })
                sceneEls.cam.low.setAttribute('camera', {active: true   })
            } else {
                sceneEls.cam.fly.setAttribute('camera',   {active: true   })
                sceneEls.cam.low.setAttribute('camera',   {active: false   })
            }
        },

        rotateFlyCam: function(direction, duration = 2000){
            state.visual.enableKeyEvents = false
            sceneEls.camRig.fly.removeAttribute('animation__position')
            sceneEls.camRig.fly.removeAttribute('animation__rotation')     

            if(direction === 'left'){
                state.visual.camera.flyIndex = (state.visual.camera.flyIndex  + 1) < view.cam.fly.length ? state.visual.camera.flyIndex  + 1 : 0
                rotateY =  sceneEls.camRig.fly.getAttribute('rotation').y - 45
            } else if(direction === 'right') {
                state.visual.camera.flyIndex = (state.visual.camera.flyIndex  - 1) >= 0 ? state.visual.camera.flyIndex  - 1 : (view.cam.fly.length -1)
                rotateY =  sceneEls.camRig.fly.getAttribute('rotation').y + 45
            }

            sceneEls.camRig.fly.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${view.cam.fly[state.visual.camera.flyIndex].pos.x}  ${view.cam.fly[state.visual.camera.flyIndex].pos.y}  ${view.cam.fly[state.visual.camera.flyIndex].pos.z}`
            })  
            sceneEls.camRig.fly.setAttribute('animation__rotation', {
                property: 'rotation',
                dur: duration,
                to: `-5 ${rotateY} 0}`
            })  

            sceneEls.cam.fly.removeAttribute('animation__rotation')
            sceneEls.cam.fly.setAttribute('animation__rotation', {
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
            const currentPos = sceneEls.camRig.fly.getAttribute('position')
            switch(state.visual.camera.flyHeight){
                case "high":
                    sceneEls.camRig.fly.setAttribute('animation__pos', {
                        property:       'position',
                        dur:            1500,
                        to:             {x: currentPos.x,  y: 10, z: currentPos.z}
                    })
                    sceneEls.camRig.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: 0,  y: 90, z: 0}
                    })
                    sceneEls.cam.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: 0,  y: 0, z: 0}
                    })
                    state.visual.camera.flyHeight = "low"
                    break

                case "low":
                    sceneEls.camRig.fly.setAttribute('animation__pos', {
                        property:       'position',
                        dur:            1500,
                        to:             {x: currentPos.x,  y: 90, z: currentPos.z}
                    })
                    sceneEls.camRig.fly.setAttribute('animation__rotation', {
                        property:       'rotation',
                        dur:            1500,
                        to:             {x: -10,  y: 90, z: 0}
                    })
                    state.visual.camera.flyHeight = "high"
                    break
            }
        },

        // Helper to attach new instance of look-controls after after animation
        resetLookControls: function() {
            sceneEls.cam.fly.removeAttribute('look-controls')
            sceneEls.cam.fly.setAttribute('look-controls', {})
        },

        changeHour: function(direction, duration = 2000){
            console.log('Moving hour '+direction+' to '+sceneEls.misc.sunPos[state.visual.modelTime.hour])
        
            externalEvents.resetHazards() // Reset all hazard (i.e. hazard environents)
            if(direction === 'forward'){
                state.visual.modelTime.hour = state.visual.modelTime.hour !== (sceneEls.misc.sunPos.length - 1) ? state.visual.modelTime.hour + 1 : 0
            } else if(direction === 'back'){
                state.visual.modelTime.hour = state.visual.modelTime.hour !== 0 ? state.visual.modelTime.hour  - 1 :  sceneEls.misc.sunPos.length - 1 
            }
            // Resposition sun an sun light
            const newSunPos = document.getElementById(sceneEls.misc.sunPos[state.visual.modelTime.hour]).getAttribute('position')
            sceneEls.enviro.sun.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
            })  
            sceneEls.lights.sun.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
            })  
            // Resposition moon body
            const newMoonPos = document.getElementById(sceneEls.misc.moonPos[state.visual.modelTime.hour]).getAttribute('position')
            sceneEls.enviro.moon.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newMoonPos.x}  ${newMoonPos.y}  ${newMoonPos.z}`
            })  
            // Change the hemi ambient light
            sceneEls.lights.hemi.setAttribute('animation__light', {
                property: 'light.intensity',
                dur: duration,
                to: settings.lights.hemi.intProp[state.visual.modelTime.season][state.visual.modelTime.hour] * settings.lights.hemi.maxIntensity
            })  
            // Change the environment
            externalEvents.changeEnvironment()
            // Turn lights on/off
            if (state.visual.modelTime.timeOfDay() === "day" || state.visual.modelTime.timeOfDay() === "morning"){
                externalEvents.turnNightLightsOff()
            } else {
                externalEvents.turnNightLightsOn()
            }
            // Track the solar  
            const solarFarmEls = document.getElementsByClassName('solarRotatable')
            for(let i = 0; i < solarFarmEls.length; i++){
                solarFarmEls[i].setAttribute('animation__rotate', {
                    property:   'rotation',
                    dur:        duration,
                    to:         {x: settings.solarFarm.rotationByHour[state.visual.modelTime.hour] , y: 0, z: 0}
                })            
            }

            // Control key events
            state.ui.enableKeyEvents = false
            setTimeout( ()=> {  state.ui.enableKeyEvents = true    }, duration)

        },

        changeEnvironment: function(name = state.visual.environment.name, duration = 2000, timeOfDay = state.visual.modelTime.timeOfDay()){
            console.log('Changing environment to '+name, timeOfDay)
            // Change the sky colour for time of day and "conditions"
            sceneEls.enviro.sky.setAttribute('animation__topColour', {
                property:   'material.topColor',
                dur:        duration,
                to:         settings.days[name][timeOfDay]['sky-top']
            })  
        sceneEls.enviro.sky.setAttribute('animation__bottomColour', {
                property:   'material.bottomColor',
                dur:        duration,
                to:         settings.days[name][timeOfDay]['sky-bottom']
            })  
            // Change the hemisphere light colours and ocean colour
            if(settings.days[name][timeOfDay].hemilight){
                console.log('Changing hemi light colours...')
                sceneEls.lights.hemi.setAttribute('animation__skyCol', {
                    property: 'light.color',
                    dur: duration,
                    to: settings.days[name][timeOfDay].hemilight.sky
                })  
                sceneEls.lights.hemi.setAttribute('animation__groundCol', {
                    property: 'light.groundColor',
                    dur: duration,
                    to: settings.days[name][timeOfDay].hemilight.ground
                })  

            } else {
                sceneEls.lights.hemi.setAttribute('animation__skyCol', {
                    property: 'light.color',
                    dur: duration,
                    to: settings.days.default[timeOfDay].hemilight.sky
                })  
                sceneEls.lights.hemi.setAttribute('animation__groundCol', {
                    property: 'light.groundColor',
                    dur: duration,
                    to: settings.days.default[timeOfDay].hemilight.ground
                })  
            }
            // Change the water colour
            if(settings.days[name][timeOfDay].water){
                sceneEls.enviro.sea.removeAttribute('ocean')
                sceneEls.enviro.sea.setAttribute('ocean', {
                    color:              settings.days[name][timeOfDay].water,
                    width:              10.8,
                    amplitude:          0.25,
                    amplitudeVariance:  0.25,
                    density:            20
                })  
            } else {
                sceneEls.enviro.sea.removeAttribute('ocean')
                sceneEls.enviro.sea.setAttribute('ocean', {
                    color:              settings.days.default[timeOfDay].water,
                    width:              10.8,
                    amplitude:          0.25,
                    amplitudeVariance:  0.25,
                    density:            20
                })  
            }
            // Change the fog settings
            if(settings.days[name][timeOfDay].fog){
                sceneEls.scene.setAttribute('fog', {
                    color: settings.days[name][timeOfDay].fog.color,
                    far: settings.days[name][timeOfDay].fog.far
                })  
                sceneEls.scene.setAttribute('animation__far', {
                    property: 'fog.far',
                    dur: duration,
                    from: 1000,
                    to: settings.days[name][timeOfDay].fog.far
                })  
            } else {
                sceneEls.scene.setAttribute('fog', {
                    color: settings.days.default[timeOfDay].fog.color,
                    far: settings.days.default[timeOfDay].fog.far
                })  
            }
        },

        turnNightLightsOn:  function(){
            const glassEls =  document.getElementsByClassName('glass-group')
            state.visual.environment.nightLights = true
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
                dur:            1000,
                to:             1
            })
        },

        turnNightLightsOff:  function(){
            const glassEls =  document.getElementsByClassName('glass-group')
            state.visual.environment.nightLights = false
            for(const el of glassEls){
                el.setAttribute('material', {'emissive': '#000'})
            }
            document.getElementById('lighthouse-light').removeAttribute('animation__rotation')
            document.getElementById('lighthouse-light').setAttribute('animation__intensity', {
                property:       'light.intensity',
                dur:            1000,
                to:             0
            })
        },

        resetHazards: function(){
            state.visual.hazard.particles = false
            state.visual.hazard.flood = 'none'
            state.visual.hazard.wind = 'none'
            state.visual.hazard.lightning = false
            sceneEls.scene.removeAttribute('hazard-rain')
            sceneEls.scene.removeAttribute('hazard-lightning')
            sceneEls.scene.removeAttribute('hazard-drought')
            sceneEls.scene.removeAttribute('hazard-tropical-storm')
            sceneEls.scene.removeAttribute('hazard-winter-storm')
            sceneEls.scene.removeAttribute('hazard-ocean-acidification')
            sceneEls.scene.removeAttribute('hazard-flood')
            sceneEls.scene.removeAttribute('hazard-wind')
            sceneEls.scene.removeAttribute('hazard-heat')
            clearInterval(state.visual.hazard.lightning)
            externalEvents.changeEnvironment(state.visual.environment.name)
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
