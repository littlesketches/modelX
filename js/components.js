
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
                dur:            60000, 
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
                dir:      'alternate'
            })

        }

    })

    AFRAME.registerComponent("add-external-listeners", { 
        init: function(){
            // KEYBOARD EVENTS
            window.addEventListener("keydown", function(key){
                // console.log(`Pressed ${key.code}`)
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

                        default:
                            console.log(`No event for ${key.code}`)
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
    },

    turnNightLightsOff:  function(){
        const glassEls =  document.getElementsByClassName('glass-group')
        state.environment.state = false
        for(const el of glassEls){
            el.setAttribute('material', {'emissive': '#000'})
        }
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
