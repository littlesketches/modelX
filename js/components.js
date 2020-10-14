
console.log('REGISTERING A-FRAME COMPONENTS...')

    AFRAME.registerComponent('setup', {
        init: function(){
                console.log('****SETTING DOM ELEMENTS UP...****')

            console.log(document.getElementById('sunriseMixin'))
        }
    })





    AFRAME.registerComponent('ortho', {
        init: function () {
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


    AFRAME.registerComponent("position-sun", {        
        init: function() {
            // console.log('Setting the sun path..')
            // // Create sun curve path
            // const pointIDs =["sun-0000", "sun-0100", "sun-0200", "sun-0300", "sun-0400", "sun-0500", "sun-0600", "sun-0700", "sun-0800", "sun-0900", "sun-1000", "sun-1100", "sun-1200", "sun-1300", "sun-1400", "sun-1500", "sun-1600", "sun-1700", "sun-1800", "sun-1900", "sun-2000", "sun-2100", "sun-2200", "sun-2300"],
            //     indexToNow = Math.round(state.time.hour +(state.time.minutes/60)) 
            // let origin
            // pointIDs.forEach((id, i) => {
            //     const pos = document.getElementById(id).getAttribute('position')
            //     pos.x = settings.environment.sunX[state.time.season]
            //     document.getElementById(id).setAttribute('position', pos)
 
            //     const pathToNowEl = document.getElementById('sun-path-pointsToNow')
            //     if(i <=  indexToNow){                
            //         const el = document.createElement('a-curve-point')
            //         el.setAttribute('position', pos)
            //         pathToNowEl.appendChild(el)  
            //    } 
            // })

            // if(indexToNow === 0){
            //     document.getElementById('sun-body').setAttribute('position', document.getElementById(pointIDs[0]).getAttribute('position'))
            //     document.getElementById('sun-light').setAttribute('position', document.getElementById(pointIDs[0]).getAttribute('position'))
            // } else {
            //     document.getElementById('sun-body').setAttribute('alongpath', "curve: #sun-path-pointsToNow ; loop: false; dur: 20000; resetonplay: true " )
            //     document.getElementById('sun-light').setAttribute('alongpath', "curve: #sun-path-pointsToNow ; loop: false; dur: 20000; resetonplay: true " )

            // }
            // Add animation along path for sun body and sun direcitonal light
        }
    })




    AFRAME.registerComponent("cycle-sun", {
        schema: {
            dur:                {type: 'number',   default: simulation.dayLength},
            hour:               { type: 'int',      default: 0}
        },

        init: function() {
            console.log(`Initiating the sun cycle of ${this.data.dur / 1000 } seconds`)
            const pointIDs = ["sun-0000", "sun-0100", "sun-0200", "sun-0300", "sun-0400", "sun-0500", "sun-0600", "sun-0700", "sun-0800", "sun-0900", "sun-1000", "sun-1100", "sun-1200", "sun-1300", "sun-1400", "sun-1500", "sun-1600", "sun-1700", "sun-1800", "sun-1900", "sun-2000", "sun-2100", "sun-2200", "sun-2300"],
                sunBody =           document.getElementById('sun-body'),
                sunLight =          document.getElementById('sun-light')

            // Create sun curve pathm from midnight
            pointIDs.forEach((id, i) => {
                const pos = document.getElementById(id).getAttribute('position')
                pos.x = settings.environment.sunX[state.time.season]
                document.getElementById(id).setAttribute('position', pos)
            })

            // Add animation along path for sun body and sun direcitonal light, starting at midnight
            sunBody.setAttribute('alongpath', `curve: #sun-path-points; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
            sunLight.setAttribute('alongpath', `curve: #sun-path-points ; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
        },

        pause: function () {
            clearInterval(state.modelTime.timer)
            console.log('Model clock stopped at '+state.modelTime.hour)
        },

        play: function () {
            const sunLight =        document.getElementById('sun-light'),
                sky =               document.getElementById('sky'),
                ambientLight =      document.getElementById('ambient-light')


            // Start the hour of day timer
            state.modelTime.hour = 0
            state.modelTime.timer = setInterval( () => { 
                state.modelTime.hour = (state.modelTime.hour + 1) % 24  
                // console.log('Hour is '+state.modelTime.hour )
            }, this.data.dur / 24 )
        }

    })