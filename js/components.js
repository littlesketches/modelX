
////////////////////////////////////////////////////////////
/// CUSTOM COMPONENTS AND EVENT METHODS ////
////////////////////////////////////////////////////////////

console.log('REGISTERING A-FRAME COMPONENTS...')

    AFRAME.registerComponent('setup', {
        init: function(){
            console.log('**** SETTING DOM ELEMENTS UP...****')

            // Setup element references on initation for referencing in othercomponent code
            // Lights
            sceneEls.lights = {
                hemi:          document.getElementById('ambient-hemiLight'),
                ambient:       document.getElementById('ambient-light'),
                sun:           document.getElementById('sun-light'),
                spot:          document.getElementById('spotlight-above')
            }

            // Environment elements
            sceneEls.enviro = {
                sun:            document.getElementById('sun-body'),
                moon:           document.getElementById('moon-body'),
                sky:            document.getElementById('sky')
            }
            // Camera elements
            sceneEls.cam = {
                fly:    document.getElementById('flycam'),
                vr:     document.getElementById('vrcam')
            }
            sceneEls.camRig = {
                fly:    document.getElementById('flycam-rig'),
                vr:     document.getElementById('vrcam-rig')
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
            console.log('Setting the sun and moon position for hour '+state.modelTime.hour)
            sceneEls.enviro.sun.setAttribute('position', document.getElementById(sceneEls.misc.sunPos[state.modelTime.hour]).getAttribute('position'))
            sceneEls.lights.sun.setAttribute('position', document.getElementById(sceneEls.misc.sunPos[state.modelTime.hour]).getAttribute('position'))

            sceneEls.enviro.moon.setAttribute('position', document.getElementById(sceneEls.misc.moonPos[state.modelTime.hour]).getAttribute('position'))

            // Change the hemi ambient light
            sceneEls.lights.hemi.setAttribute('light', { 
                intensity: settings.lights.hemi.intProp[state.modelTime.season][state.modelTime.hour] * settings.lights.hemi.maxIntensity
            })  

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
                pos.x = settings.environment.sunX[state.time.season]
                document.getElementById(id).setAttribute('position', pos)
            })
            // Add animation along path for sun body and sun direcitonal light, starting at midnight
            sceneEls.enviro.sun.setAttribute('alongpath', `curve: #sun-path-points; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
            sceneEls.lights.sun.setAttribute('alongpath', `curve: #sun-path-points ; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
        },

        pause: function () {
            clearInterval(state.modelTime.timer)
            console.log('Model clock stopped at '+state.modelTime.hour)
        },

        play: function () {
            // Start the hour of day timer
            state.modelTime.hour = 0
            state.modelTime.timer = setInterval( () => { 
                state.modelTime.hour = (state.modelTime.hour + 1) % 24  
                // console.log('Hour is '+state.modelTime.hour )
            }, this.data.dur / 24 )
        }
    })


    AFRAME.registerComponent("fly-plane", {
        play: function () {
            document.getElementById("plaine-animation").setAttribute('alongpath', {
                curve:          "#airplane-path-points",
                dur:            90000, 
                resetonplay:    true, 
                rotate:         true
            })
        }
    })


    AFRAME.registerComponent("sail-duck", {
        play: function () {
            document.getElementById("rubberDuck").setAttribute('alongpath', {
                curve:          "#duck-path-points",
                dur:            120000, 
                loop:           true, 
                resetonplay:    true, 
                rotate:         true
            })
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
        }
    })


    AFRAME.registerComponent("add-external-listeners", { 
        init: function(){
            // KEYBOARD EVENTS
            window.addEventListener("keydown", function(key){
                console.log(`Pressed ${key.code}`)
                if(state.enableKeyEvents){
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
                        case 'MetaLeft':
                                state.keydown = setTimeout( () => {
                                    document.getElementById('shortcuts').classList.add('visible') 
                                }, 2000)
                            break
                        case 'Digit1':
                                console.log('Showing message...')
                                const blockGroup =  document.getElementById('message-blocks-group')
                                blockGroup.setAttribute('show-block-title', "text: Hello World;  posZ: 35, -35;   posY: 5,  -10; posX: 0, 0; tilt: 10, -10; rotate: 0, 0; letterSpace: 15")
                                blockGroup.setAttribute('animation', {
                                    property: 'position.y', from: 100, to: 0, dur: 3500, delay: 500
                                })
                            break
                        default:

                            clearTimeout(state.keydown)  
                            document.getElementById('shortcuts').classList.remove('visible')
                    }
                }
            })

            window.addEventListener("keyup", function(key){
                if(state.enableKeyEvents){
                    switch(key.code){
                        case 'MetaLeft':
                                clearTimeout(state.keydown)  
                                document.getElementById('shortcuts').classList.remove('visible')
                            break
                        default:
                            clearTimeout(state.keydown)  
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

////

const externalEvents = {
    toggleStats: function(){
        document.getElementById('scene').toggleAttribute('stats')
    },

    toggleCamera: function(){
        if(sceneEls.cam.fly.getAttribute('camera').active ){
            sceneEls.cam.fly.setAttribute('camera', {active: false  })
            sceneEls.cam.vr.setAttribute('camera', {active: true   })
        } else {
            sceneEls.cam.fly.setAttribute('camera',   {active: true   })
            sceneEls.cam.vr.setAttribute('camera',    {active: false   })
        }
    },

    rotateFlyCam: function(direction, duration = 2000){
        state.enableKeyEvents = false
        sceneEls.camRig.fly.removeAttribute('animation__position')
        sceneEls.camRig.fly.removeAttribute('animation__rotation')     

        if(direction === 'left'){
            state.camera.flyIndex = (state.camera.flyIndex  + 1) < view.cam.fly.length ? state.camera.flyIndex  + 1 : 0
            rotateY =  sceneEls.camRig.fly.getAttribute('rotation').y - 45
        } else if(direction === 'right') {
            state.camera.flyIndex = (state.camera.flyIndex  - 1) >= 0 ? state.camera.flyIndex  - 1 : (view.cam.fly.length -1)
            rotateY =  sceneEls.camRig.fly.getAttribute('rotation').y + 45
        }

        sceneEls.camRig.fly.setAttribute('animation__position', {
            property: 'position',
            dur: duration,
            to: `${view.cam.fly[state.camera.flyIndex].pos.x}  ${view.cam.fly[state.camera.flyIndex].pos.y}  ${view.cam.fly[state.camera.flyIndex].pos.z}`
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
            state.enableKeyEvents = true     
        }, duration)
    },

    // Helper to attache new instance of look-controls after after animation
    resetLookControls: function() {
        sceneEls.cam.fly.removeAttribute('look-controls')
        sceneEls.cam.fly.setAttribute('look-controls', {})
    },

    changeHour: function(direction, duration = 2000){
        console.log('Moving hour '+direction+' to '+sceneEls.misc.sunPos[state.modelTime.hour])

        if(direction === 'forward'){
            state.modelTime.hour = state.modelTime.hour !== (sceneEls.misc.sunPos.length - 1) ? state.modelTime.hour + 1 : 0
        } else if(direction === 'back'){
            state.modelTime.hour = state.modelTime.hour !== 0 ? state.modelTime.hour  - 1 :  sceneEls.misc.sunPos.length - 1 
        }
        // Resposition sun an sun light
        const newSunPos = document.getElementById(sceneEls.misc.sunPos[state.modelTime.hour]).getAttribute('position')
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
        const newMoonPos = document.getElementById(sceneEls.misc.moonPos[state.modelTime.hour]).getAttribute('position')
        sceneEls.enviro.moon.setAttribute('animation__position', {
            property: 'position',
            dur: duration,
            to: `${newMoonPos.x}  ${newMoonPos.y}  ${newMoonPos.z}`
        })  

        // Change the hemi ambient light
        sceneEls.lights.hemi.setAttribute('animation__light', {
            property: 'light.intensity',
            dur: duration,
            to: settings.lights.hemi.intProp[state.modelTime.season][state.modelTime.hour] * settings.lights.hemi.maxIntensity
        })  
        // Change the environment
        externalEvents.changeEnvironment()

        // Turn lights on/off
        if (state.modelTime.timeOfDay() === "day" || state.modelTime.timeOfDay() === "morning"){
            externalEvents.turnNightLightsOff()
        } else {
            externalEvents.turnNightLightsOn()
        }

        // Control key events
        state.enableKeyEvents = false
        setTimeout( ()=> {  state.enableKeyEvents = true    }, duration)

    },

    changeEnvironment: function(name = state.environment.name, timeOfDay = state.modelTime.timeOfDay(), duration = 2000){
        console.log('Changing environment to '+name, timeOfDay)
        // Change the sky colour for time of day and "conditions"
        sceneEls.enviro.sky.setAttribute('animation__topColour', {
            property:   'material.topColor',
            dur:        duration,
            to:         settings.evironment[name][timeOfDay]['sky-top']
        })  
       sceneEls.enviro.sky.setAttribute('animation__bottomColour', {
            property:   'material.bottomColor',
            dur:        duration,
            to:         settings.evironment[name][timeOfDay]['sky-bottom']
        })  

        // Change the hemisphere light colours
        if(settings.evironment[name][timeOfDay].hemilight){
            console.log('Changing hemi light colours...')
            sceneEls.lights.hemi.setAttribute('animation__skyColour', {
                property: 'light.color',
                dur: duration,
                to: settings.evironment[name][timeOfDay].hemilight.sky
            })  
            sceneEls.lights.hemi.setAttribute('animation__groundColour', {
                property: 'light.groundColor',
                dur: duration,
                to: settings.evironment[name][timeOfDay].hemilight.ground
            })  

        } else {
            sceneEls.lights.hemi.setAttribute('animation__skyColour', {
                property: 'light.color',
                dur: duration,
                to: settings.evironment.default[timeOfDay].hemilight.sky
            })  
            sceneEls.lights.hemi.setAttribute('animation__groundColour', {
                property: 'light.groundColor',
                dur: duration,
                to: settings.evironment.default[timeOfDay].hemilight.ground
            })  

        }



    },

    turnNightLightsOn:  function(){
        const glassEls =  document.getElementsByClassName('glass-group')
        state.environment.state = true
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
        state.environment.state = false
        for(const el of glassEls){
            el.setAttribute('material', {'emissive': '#000'})
        }
        document.getElementById('lighthouse-light').removeAttribute('animation__rotation')
        document.getElementById('lighthouse-light').setAttribute('animation__intensity', {
            property:       'light.intensity',
            dur:            1000,
            to:             0
        })
    }

}



/////////

    // Orthographic camera
    AFRAME.registerComponent('ortho', {
        init: function () {
            console.log('implementing an ortho')
            var sceneEl = this.el.sceneEl;
            sceneEl.addEventListener('render-target-loaded', () => {
            this.originalCamera = sceneEl.camera;
            this.cameraParent = sceneEl.camera.parent;
            this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1);
            this.cameraParent.add(this.orthoCamera);
            sceneEl.camera = this.orthoCamera;
            });
        },
        remove: function () {
            this.cameraParent.remove(this.orthoCamera);
            sceneEl.camera = this.originalCamera;
        }
    });

    // Shader experiment
    AFRAME.registerComponent("foo", {
        init: function() {
            console.log(this.el.object3D)
            // console.log(this.el.getObject3D('color'))
            //Multiple Colors
            var materials = new THREE.MeshToonMaterial({
                color: this.el.color
            })

            this.el.getObject3D('mesh').material = materials;
            //mesh2 = mesh
            // console.log(materials)
        }
    })
