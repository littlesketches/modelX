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

    // SCENE SETUP COMPONENTS
    AFRAME.registerComponent('setup', {
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

            // Miscellaneous itemes
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

            // Emissions balloon anchor collections
            scene.els.anchors = {
                // Emission sources
                sources: {
                    stationaryEnergy: {
                        scope1: {
                            electricityGeneration: {
                                coalFired:                  document.querySelectorAll('.emissions-anchor.utility-coal'),
                                gasFired:                   ''
                            },
                            mainsGas: {
                                residential: {
                                    smallDwellings:          document.querySelectorAll('.emissions-anchor.mains-gas.residential'),
                                    largeDwellings:          document.querySelectorAll('.emissions-anchor.mains-gas.large-home'),
                                    townhouses:              document.querySelectorAll('.emissions-anchor.mains-gas.townhouse')
                                },               
                                commercial:  {
                                    offices:                document.querySelectorAll('.emissions-anchor.mains-gas.offices'),
                                    retail:                 document.querySelectorAll('.emissions-anchor.mains-gas.retail'),
                                    hospitality:            document.querySelectorAll('.emissions-anchor.mains-gas.hospitality'),
                                    accomodation:           document.querySelectorAll('.emissions-anchor.mains-gas.accomodation')
                                },          
                                industrial: {
                                    other:                  document.querySelectorAll('.emissions-anchor.mains-gas.industrial'),
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:             []
                                },          
                                agriculture:  {
                                    farm:                   document.querySelectorAll('.emissions-anchor.mains-gas.farm'),
                                },          
                                institutional: {
                                    government:             document.querySelectorAll('.emissions-anchor.mains-gas.government'),
                                    hospital:               document.querySelectorAll('.emissions-anchor.mains-gas.hospital'),
                                    airport:                document.querySelectorAll('.emissions-anchor.mains-gas.airport'),
                                    school:                 document.querySelectorAll('.emissions-anchor.mains-gas.school'),
                                    church:                 document.querySelectorAll('.emissions-anchor.mains-gas.church')
                                }         
                            },
                            bottledLPG:{
                                residential: {
                                    smallDwellings:          document.querySelectorAll('.emissions-anchor.lpg.small-home'),
                                    largeDwellings:          document.querySelectorAll('.emissions-anchor.lpg.large-home'),
                                    townhouses:              document.querySelectorAll('.emissions-anchor.lpg.townhouse')
                                },               
                                commercial:  {
                                    offices:                document.querySelectorAll('.emissions-anchor.lpg.offices'),
                                    retail:                 document.querySelectorAll('.emissions-anchor.lpg.retail'),
                                    hospitality:            document.querySelectorAll('.emissions-anchor.lpg.hospitality'),
                                    accomodation:           document.querySelectorAll('.emissions-anchor.lpg.accomodation')
                                },          
                                industrial: {
                                    other:                  document.querySelectorAll('.emissions-anchor.lpg.industrial'),
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:            []
                                },          
                                agriculture:  {
                                    farm:                   document.querySelectorAll('.emissions-anchor.lpg.farm'),
                                },          
                                institutional: {
                                    government:             document.querySelectorAll('.emissions-anchor.lpg.government'),
                                    hospital:               document.querySelectorAll('.emissions-anchor.lpg.hospital'),
                                    airport:                document.querySelectorAll('.emissions-anchor.lpg.airport'),
                                    school:                 document.querySelectorAll('.emissions-anchor.lpg.school'),
                                    church:                 document.querySelectorAll('.emissions-anchor.lpg.church')
                                }        
                            },
                            wood: {
                                residential: {
                                    smallDwellings:          document.querySelectorAll('.emissions-anchor.firewood.small-home'),
                                    largeDwellings:          document.querySelectorAll('.emissions-anchor.firewood.large-home'),
                                    townhouses:              []
                                },               
                                commercial:                 {},          
                                industrial:                 {},          
                                agriculture:                {},          
                                institutional:              {},
                            },
                            diesel: {
                                residential: {
                                    smallDwellings:          {},
                                    largeDwellings:          {},
                                    townhouses:              []
                                },               
                                commercial:                 {},          
                                industrial:                 {},          
                                agriculture:                {
                                    generation:             document.querySelectorAll('.emissions-anchor.diesel-generators.farm'),
                                    pumpsIrrigation:        document.querySelectorAll('.emissions-anchor.diesal-pumps.farm')
                                },          
                                institutional:              {
                                    government:             document.querySelectorAll('.emissions-anchor.diesel.government'),
                                    hospital:               document.querySelectorAll('.emissions-anchor.diesel.hospital'),
                                    airport:                document.querySelectorAll('.emissions-anchor.diesel.airport'),
                                },
                            }
                        },
                        scope2: {
                            gridElectricity: {
                                residential: {
                                    smallDwellings:         document.querySelectorAll('.emissions-anchor.grid-electricity.small-home'),
                                    largeDwellings:         document.querySelectorAll('.emissions-anchor.grid-electricity.large-home'),
                                    townhouses:             document.querySelectorAll('.emissions-anchor.grid-electricity.townhouse')
                                },  
                                commercial:  {
                                    offices:                document.querySelectorAll('.emissions-anchor.grid-electricity.office-fiveLvl'),
                                    officeTowers:           document.querySelectorAll('.emissions-anchor.grid-electricity.office-tower'),
                                    retail:                 document.querySelectorAll('.emissions-anchor.grid-electricity.office-threeLvl'),
                                    hospitality:            document.querySelectorAll('.emissions-anchor.grid-electricity.hospitality'),
                                    accomodation:           document.querySelectorAll('.emissions-anchor.grid-electricity.accomodation')
                                },   
                                industrial: {
                                    other:                  document.querySelectorAll('.emissions-anchor.grid-electricity.industrial'),
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:            []
                                },          
                                agriculture:  {
                                    largeFarm:              document.querySelectorAll('.emissions-anchor.grid-electricity.large-barn'),
                                    smallFarm:              document.querySelectorAll('.emissions-anchor.grid-electricity.small-barn')
                                },          
                                institutional: {
                                    government:             document.querySelectorAll('.emissions-anchor.grid-electricity.govBuilding'),
                                    airport:                document.querySelectorAll('.emissions-anchor.grid-electricity.airport'),   
                                    hospital:               document.querySelectorAll('.emissions-anchor.grid-electricity.hospital'),
                                    church:                 document.querySelectorAll('.emissions-anchor.grid-electricity.church'),
                                    school:                 document.querySelectorAll('.emissions-anchor.grid-electricity.school'),
                                }  
                            },
                        },
                        scope3: {
                            eletricityTransmission:         document.querySelectorAll('.emissions-anchor.grid-electricity.transmission'),
                            eletricityDistribution:         document.querySelectorAll('.emissions-anchor.grid-electricity.distribution'),
                            gasDistribution:                [],
                        }
                    },
                    transportEnergy: {
                        scope1: {
                            road: {
                                residential: {
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
                                    },
                                },
                                commercial: {
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
                                    },
                                },
                                industrial: {
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
                                    },
                                },
                                agriculture: {
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
                                    },
                                },
                                institutional: {
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
                                    },
                                },
                            },
                            offroad: {
                                industrial: {
                                    petrol:             [],
                                    diesel:             [],
                                    lpg:                [],
                                    biodiesel:          [],
                                    ethanol:            [],
                                },
                                agriculture: {
                                    petrol:             [],
                                    diesel:             [],
                                    lpg:                [],
                                    biodiesel:          [],
                                    ethanol:            [],
                                },
                                institutional: {
                                    petrol:             [],
                                    diesel:             [],
                                    lpg:                [],
                                    biodiesel:          [],
                                    ethanol:            [],
                                },
                            },
                            aviation: {
                                airplane: {
                                    jetfuel:        document.querySelectorAll('.emissions-anchor.airplane'),
                                    avgas:          [],
                                },
                                airplane: {
                                    jetfuel:        [],
                                    avgas:          [],
                                }
                            }
                        }
                    },
                    solidWaste: {
                        scope1: {
                            landfill: {
                                municipalSolidWaste:        document.querySelectorAll('.emissions-anchor.landfill.msw'),
                                commercialAndIndustrial:    document.querySelectorAll('.emissions-anchor.landfill.ci'),
                                constructionAndDemolition:  document.querySelectorAll('.emissions-anchor.landfill.cd'),
                            },
                            incineration:                    {},
                            biologicalTreatment:             {},
                        },
                        scope3: {
                            landfill: {
                                municipalSolidWaste:            document.querySelectorAll('.emissions-anchor.bin-landfill'),
                                commercialAndIndustrial:        document.querySelectorAll('.emissions-anchor.skip-landfill'),
                            }
                        },
                    },
                    wasteWater: {
                        scope1: {
                            treatment:                      {}
                        },
                        scope3: {
                            landfill: {
                                municipalSolidWaste:        document.querySelectorAll('.emissions-anchor.bin-landfill'),
                                commercialAndIndustrial:    document.querySelectorAll('.emissions-anchor.skip-landfill'),
                            }
                        },
                    },
                    agriculture: {
                        scope1: {
                            livestock: {
                                enteric: {
                                    cattle:         document.querySelectorAll('.emissions-anchor.livestock.cow'),
                                    pigs:           document.querySelectorAll('.emissions-anchor.livestock.pig'),
                                    sheep:          document.querySelectorAll('.emissions-anchor.livestock.sheep'),
                                    poultry:        document.querySelectorAll('.emissions-anchor.livestock.poultry')
                                },
                                manure: {}
                            },
                            grazing: {
                                cattle:         [],
                                pigs:           [],
                                sheep:          [],
                                poultry:        []
                            },
                            cropping: {
                                wheat:              document.querySelectorAll('.emissions-anchor.agriculture.cropping-wheat'),
                                corn:               document.querySelectorAll('.emissions-anchor.agriculture.cropping-corn'),
                                other:              document.querySelectorAll('.emissions-anchor.agriculture.cropping-other')
                            },
                            fruitAndVeg: {
                                apples:              document.querySelectorAll('.emissions-anchor.agriculture.ag-apples'),
                            }

                        },
                        scope3: {

                        }
                    },
                    land: {
                        scope1: {
                            conversion:             [],
                            clearing:               [],
                            reclearing:             [],
                        }
                    },
                    industrialProcesses: {
                        scope1: {
                            industrial: {
                                other:                  document.querySelectorAll('.emissions-anchor.lpg.industrial'),
                                mineral:                [],
                                chemical:               [],
                                metal:                  [],
                                electronics:            []
                            },
                        }
                    },
                    industrialProductUse: {
                        scope1: {
                            refrigerants: {
                                residential:            [],
                                commerical:             [],
                                industrial:             [],
                                institutional:          [],
                                transport:  {
                                    passengerVehicles:  [],
                                }
                            }
                        }
                    }
                },
                // Clean alternatives
                switches: {       
                    stationaryEnergy: {
                        scope1: {
                            electricityGeneration: {
                                solar:                  document.querySelectorAll('.emissions-anchor.utility-solar'),
                                wind:                   document.querySelectorAll('.emissions-anchor.utility-wind'),
                                hydro:                  document.querySelectorAll('.emissions-anchor.utility-hydro')
                            },
                        },
                        scope2: {
                            onSiteSolar: {
                                residential: {
                                    smallDwellings:         document.querySelectorAll('.emissions-anchor.rooftop-solar'),
                                    largeDwellings:         [],
                                    townhouses:             []
                                },  
                                commercial:  {
                                    offices:                [],
                                    retail:                 [],
                                    hospitality:            [],
                                    accomodation:           []
                                },   
                                industrial: {
                                    other:                  [],
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:            []
                                },          
                                agriculture:  {
                                    largeFarm:              [],
                                    smallFarm:              [],
                                    groundMounted:          [],
                                },          
                                institutional: {
                                    government:             [],
                                    airport:                [],
                                    hospital:               [],
                                    church:                 [],
                                    school:                 []
                                }  
                            },
                        },
                        scope3: {
                            eletricityTransmission:         [],
                            eletricityDistribution:         [],
                            gasDistribution:                [],
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
        }
    })


                        

    AFRAME.registerComponent("position-sun", {        
        init: function() {
            console.log('Setting the sun and moon position for hour '+state.scene.time.hour)
            scene.els.enviro.sun.setAttribute('position', document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position'))
            scene.els.lights.sun.setAttribute('position', document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position'))

            scene.els.enviro.moon.setAttribute('position', document.getElementById(scene.els.misc.moonPos[state.scene.time.hour]).getAttribute('position'))

            // Change the hemi ambient light
            scene.els.lights.hemi.setAttribute('light', { 
                intensity: settings.lights.hemi.intProp[state.scene.time.season][state.scene.time.hour] * settings.lights.hemi.maxIntensity
            })  
            // Set solar farm axis
            const solarFarmEls = document.getElementsByClassName('solarRotatable')
            for(let i = 0; i < solarFarmEls.length; i++){
                solarFarmEls[i].setAttribute('animation__rotate', {
                    property:   'rotation',
                    dur:        1000,
                    to:         {x: settings.solarFarm.rotationByHour[state.scene.time.hour] , y: 0, z: 0}
                })            
            }

            // Set the environment
            externalEvents.changeEnvironment()
      }
    })

    // SCENE SCENARIO AND ANIMATION COMPONENTS
        AFRAME.registerComponent("cycle-sun", {
            schema: {
                dur:                {type: 'number',   default: simulation.dayLength},
                hour:               { type: 'int',      default: 0}
            },

            init: function() {
                console.log(`Initiating the sun cycle of ${this.data.dur / 1000 } seconds`)

                // Create sun curve path from midnight
                scene.els.misc.sunPos.forEach((id, i) => {
                    const pos = document.getElementById(id).getAttribute('position')
                    pos.x = settings.days.sunX[state.scene.time.season]
                    document.getElementById(id).setAttribute('position', pos)
                })
                // Add animation along path for sun body and sun direcitonal light, starting at midnight
                scene.els.enviro.sun.setAttribute('alongpath', `curve: #sun-path-points; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
                scene.els.lights.sun.setAttribute('alongpath', `curve: #sun-path-points ; loop: true; dur: ${this.data.dur}; resetonplay: true ` )
            },

            pause: function () {
                clearInterval(state.scene.time.timer)
                console.log('Model clock stopped at '+state.scene.time.hour)
            },

            play: function () {
                // Start the hour of day timer
                state.scene.time.hour = 0
                state.scene.time.timer = setInterval( () => { 
                    state.scene.time.hour = (state.scene.time.hour + 1) % 24  
                    // console.log('Hour is '+state.scene.time.hour )
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


    // SCENE INTERACTION COMPONENT COMPONENTS


    // CLIMATE RISK / HAZARD EVENT VISUALISATIONS
        AFRAME.registerComponent('hazard-sea-level', {
            schema: {
                slchange:        {type: 'number',  default: 0 },  
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
                state.scene.hazard.lightning = setInterval(strike, 5000 + Math.random()* 10000 );
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
                clearInterval(state.scene.hazard.lightning)
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
                clearInterval(state.scene.hazard.treeSway)
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
                        state.scene.hazard.treeSway = setInterval(() => {
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
                clearInterval(state.scene.hazard.treeSway)
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
            },
            update: function(){
                const heatstate = ['default', 'hotDay', 'veryHotDay', 'heatwave'],
                    pulseTime = this.data.dur, 
                    newIntensity = this.data.intensity,
                    baseIntensity = heatstate[heatstate.indexOf(newIntensity)-1]
                clearInterval(state.scene.hazard.heatPulse)
                if(this.data.intensity !== 'heatwave'){
                    state.scene.hazard.heatPulse = setInterval(pulseSky, pulseTime );
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
                clearInterval(state.scene.hazard.heatPulse)
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
                    // Clear the orginal element colour object 
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
                    state.scene.hazard.earthquake = false
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


        AFRAME.registerComponent('hazard-avalanche', {
        })

        AFRAME.registerComponent('hazard-mudslide', {
        })

        AFRAME.registerComponent('hazard-dust-storm', {
        })

    // EMISSIONS VISUALISATION COMPONENTS
        AFRAME.registerComponent('emissions-activity-balloons', {
            schema: {   
                dur:                    {type: 'number',   default: 3000 },  
            },
            init: function(){
                const woodEls = document.querySelectorAll('.emissions-anchor.wood-chimney'),
                    rooftopSolarEls = document.querySelectorAll('.emissions-anchor.rooftop-solar'),
                    smlHomeGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.small-home'),
                    lrgHomeGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.large-home'),
                    townhouseGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.townhouse'),
                    smlBarnGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.large-barn'),
                    lrgBarnGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.small-barn'),
                    industrialGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.industrial'),
                    hospitalGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.hospital'),
                    churchGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.church'),
                    schoolGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.school'),
                    govBuildGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.govBuilding'),
                    airportlGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.airport'),
                    officeThreeLvlGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.office-threeLvl'),
                    officeFiveLvlGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.office-fiveLvl'),
                    officeTowerGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.office-tower'),
                    hotelGridEls = document.querySelectorAll('.emissions-anchor.grid-electricity.hotel'),
                    mainsGasEls = document.querySelectorAll('.emissions-anchor.reticulated-gas'),
                    wasteResidentialEls = document.querySelectorAll('.emissions-anchor.bin-landfill'),
                    wasteCommercialEls = document.querySelectorAll('.emissions-anchor.skip-landfill'),
                    utilitySolarEls = document.querySelectorAll('.emissions-anchor.utility-solar'),
                    utilityWindEls = document.querySelectorAll('.emissions-anchor.utility-wind'),
                    utilityHydroEls = document.querySelectorAll('.emissions-anchor.utility-hydro'),
                    utilityCoalEls = document.querySelectorAll('.emissions-anchor.utility-coal'),
                    livestockCowEls = document.querySelectorAll('.emissions-anchor.livestock.cow'),
                    livestockPigEls = document.querySelectorAll('.emissions-anchor.livestock.pig'),
                    livestockSheepEls = document.querySelectorAll('.emissions-anchor.livestock.sheep'),
                    livestockPoultryEls = document.querySelectorAll('.emissions-anchor.livestock.poultry'),
                    agCroppingEls = document.querySelectorAll('.emissions-anchor.agriculture.cropping'),
                    landfillResiEls = document.querySelectorAll('.emissions-anchor.landfill.resi'),
                    landfillCandIEls = document.querySelectorAll('.emissions-anchor.landfill.candi'),
                    landfillCandDEls = document.querySelectorAll('.emissions-anchor.landfill.candd'),
                    airplaneEls = document.querySelectorAll('.emissions-anchor.airplane')


                // Small Household grid electricity
                for(let i = 0; i <smlHomeGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = smlHomeGridEls[i].getAttribute('position').y,
                        scale = 0.8
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    smlHomeGridEls[i].appendChild(balloonContainer)
                }
                // Large Household grid electricity
                for(let i = 0; i <lrgHomeGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = lrgHomeGridEls[i].getAttribute('position').y,
                        scale = 0.8
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    lrgHomeGridEls[i].appendChild(balloonContainer)
                }
                // Townhouse Household grid electricity
                for(let i = 0; i <townhouseGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = townhouseGridEls[i].getAttribute('position').y,
                        scale = 0.5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    townhouseGridEls[i].appendChild(balloonContainer)
                }
                // Office: Three level  grid electricity
                for(let i = 0; i <officeThreeLvlGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = officeThreeLvlGridEls[i].getAttribute('position').y,
                        scale = 2
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    officeThreeLvlGridEls[i].appendChild(balloonContainer)
                }
                // Office: Five level  grid electricity
                for(let i = 0; i <officeFiveLvlGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = officeFiveLvlGridEls[i].getAttribute('position').y,
                        scale = 2
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    officeFiveLvlGridEls[i].appendChild(balloonContainer)
                }
                // Office tower grid electricity
                for(let i = 0; i <officeTowerGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = officeTowerGridEls[i].getAttribute('position').y,
                        scale = 5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    officeTowerGridEls[i].appendChild(balloonContainer)
                }
                // Small barn grid electricity
                for(let i = 0; i <smlBarnGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = smlBarnGridEls[i].getAttribute('position').y,
                        scale = 0.5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    smlBarnGridEls[i].appendChild(balloonContainer)
                }
                // Large barn grid electricity
                for(let i = 0; i <lrgBarnGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = lrgBarnGridEls[i].getAttribute('position').y,
                        scale = 0.8
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    lrgBarnGridEls[i].appendChild(balloonContainer)
                }
                // Industrial grid electricity
                for(let i = 0; i <industrialGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = industrialGridEls[i].getAttribute('position').y,
                        scale = 6
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    industrialGridEls[i].appendChild(balloonContainer)
                }
                // Hospital grid electricity
                for(let i = 0; i <hospitalGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = hospitalGridEls[i].getAttribute('position').y,
                        scale = 3.5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    hospitalGridEls[i].appendChild(balloonContainer)
                }
                // Airport grid electricity
                for(let i = 0; i <airportlGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = airportlGridEls[i].getAttribute('position').y,
                        scale = 3
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    airportlGridEls[i].appendChild(balloonContainer)
                }
                // Church grid electricity
                for(let i = 0; i < churchGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = churchGridEls[i].getAttribute('position').y,
                        scale = 1
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    churchGridEls[i].appendChild(balloonContainer)
                }
                // School grid electricity
                for(let i = 0; i < schoolGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = schoolGridEls[i].getAttribute('position').y,
                        scale = 1.5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    schoolGridEls[i].appendChild(balloonContainer)
                }
                // Government building grid electricity
                for(let i = 0; i < govBuildGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = govBuildGridEls[i].getAttribute('position').y,
                        scale = 3
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    govBuildGridEls[i].appendChild(balloonContainer)
                }
                // Hotel grid electricity
                for(let i = 0; i < hotelGridEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = hotelGridEls[i].getAttribute('position').y,
                        scale = 1.5
                    balloonContainer.className +=" balloon source electricity gridElec stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    hotelGridEls[i].appendChild(balloonContainer)
                }

                // Household mains gas 
                for(let i = 0; i < mainsGasEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = mainsGasEls[i].getAttribute('position').y,
                        scale = 0.25
                    balloonContainer.className +=" balloon source electricity mainsGas stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(10*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 5 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -4.5 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    mainsGasEls[i].appendChild(balloonContainer)
                }
                // Household Wood
                for(let i = 0; i < woodEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = woodEls[i].getAttribute('position').y,
                        scale = 0.125
                    balloonContainer.className +=" balloon source wood stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    woodEls[i].appendChild(balloonContainer)
                }
                // Household-waste bins
                for(let i = 0; i < wasteResidentialEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = wasteResidentialEls[i].getAttribute('position').y,
                        scale = 0.125
                    balloonContainer.className +=" balloon source waste landfill"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    wasteResidentialEls[i].appendChild(balloonContainer)
                }
                // Commercial-waste skips
                for(let i = 0; i < wasteCommercialEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = wasteCommercialEls[i].getAttribute('position').y,
                        scale = 0.75
                    balloonContainer.className +=" balloon source waste landfill"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    wasteCommercialEls[i].appendChild(balloonContainer)
                }
                // Landfill waste: residential
                for(let i = 0; i < landfillResiEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = landfillResiEls[i].getAttribute('position').y,
                        scale = 5
                    balloonContainer.className +=" balloon source waste landfill"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    landfillResiEls[i].appendChild(balloonContainer)
                }
                // Landfill waste: Commercial and Industrial
                for(let i = 0; i < landfillCandIEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = landfillCandIEls[i].getAttribute('position').y,
                        scale = 2.5
                    balloonContainer.className +=" balloon source waste landfill"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    landfillCandIEls[i].appendChild(balloonContainer)
                }
                // Landfill waste: Construction and Demolition
                for(let i = 0; i < landfillCandDEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = landfillCandDEls[i].getAttribute('position').y,
                        scale = 1
                    balloonContainer.className +=" balloon source waste landfill"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    landfillCandDEls[i].appendChild(balloonContainer)
                }

                // Agriculture: Cows
                for(let i = 0; i < livestockCowEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = livestockCowEls[i].getAttribute('position').y,
                        scale = 1
                    balloonContainer.className +=" balloon source agriculture cattle"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-brown')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    livestockCowEls[i].appendChild(balloonContainer)
                }

                // Agriculture: Pigs
                for(let i = 0; i < livestockPigEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = livestockPigEls[i].getAttribute('position').y,
                        scale = 0.5
                    balloonContainer.className +=" balloon source agriculture pigs"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-brown')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    livestockPigEls[i].appendChild(balloonContainer)
                }

                // Agriculture: Sheep
                for(let i = 0; i < livestockSheepEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = livestockSheepEls[i].getAttribute('position').y,
                        scale = 0.25
                    balloonContainer.className +=" balloon source agriculture sheep"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-brown')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    livestockSheepEls[i].appendChild(balloonContainer)
                }

                // Agriculture: Poultry
                for(let i = 0; i < livestockPoultryEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = livestockPoultryEls[i].getAttribute('position').y,
                        scale = 0.125
                    balloonContainer.className +=" balloon source agriculture poultry"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-brown')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    livestockPoultryEls[i].appendChild(balloonContainer)
                }
                // Agriculture: Cropping
                for(let i = 0; i < agCroppingEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = agCroppingEls[i].getAttribute('position').y,
                        scale = 1
                    balloonContainer.className +=" balloon source agriculture cropping"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-brown')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    agCroppingEls[i].appendChild(balloonContainer)
                }

                // Household rooftop solar (offset)
                for(let i = 0; i <rooftopSolarEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = rooftopSolarEls[i].getAttribute('position').y,
                        scale = 0.5
                    balloonContainer.className +=" balloon offset renewableElec solar stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-green')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    rooftopSolarEls[i].appendChild(balloonContainer)
                }

                // Utility-scale solar (offset)
                for(let i = 0; i <utilitySolarEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = utilitySolarEls[i].getAttribute('position').y,
                        scale = 0.8
                    balloonContainer.className +=" balloon offset renewableElec solar stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-green')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    utilitySolarEls[i].appendChild(balloonContainer)
                }

                // Utility-scale hydro (offset)
                for(let i = 0; i < utilityHydroEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = utilityHydroEls[i].getAttribute('position').y,
                        scale = 5
                    balloonContainer.className +=" balloon offset renewableElec solar stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-green')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    utilityHydroEls[i].appendChild(balloonContainer)
                }

                // Utility-scale wind (offset)
                for(let i = 0; i <utilityWindEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = utilityWindEls[i].getAttribute('position').y,
                        scale = 6
                    balloonContainer.className +=" balloon offset renewableElec wind stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-green')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    utilityWindEls[i].appendChild(balloonContainer)
                }

                // Utility-scale fossil fuels 
                for(let i = 0; i <utilityCoalEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = utilityCoalEls[i].getAttribute('position').y,
                        scale = 10
                    balloonContainer.className +=" balloon electricity generation coal stationaryEnergy"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    utilityCoalEls[i].appendChild(balloonContainer)
                }

                // Transport: air travel  
                for(let i = 0; i <airplaneEls.length; i++ ){
                    const balloonContainer =  document.createElement('a-entity'),
                        anchorY = airplaneEls[i].getAttribute('position').y,
                        scale = 8
                    balloonContainer.className +=" balloon transportEnergy jetfuel airtravel"
                    balloonContainer.setAttribute('position', '0 '+(4*scale)+' 0')
                    balloonContainer.setAttribute('template', 'src:#tmp-balloon')
                    balloonContainer.setAttribute('data-col', 'col-balloon-black')
                    balloonContainer.setAttribute('data-stringcol', 'col-string-black')
                    balloonContainer.setAttribute('data-scale', `${scale} ${scale} ${scale}`)
                    balloonContainer.setAttribute('data-balloonscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringscale', '1 1 1')
                    balloonContainer.setAttribute('data-stringpos', '0 -3 0')
                    balloonContainer.setAttribute('animation__scale', {
                        property:   'scale',
                        from:       '0 0 0',
                        to:         '1 1 1',
                        dur:        this.data.dur
                    })
                    airplaneEls[i].appendChild(balloonContainer)
                }

            },

            update: function(){

            },

            remove: function(){
                const woodEls = document.querySelectorAll('.emissions-anchor.wood-chimney'),
                    rooftopSolarEls = document.querySelectorAll('.emissions-anchor.rooftop-solar'),
                    gridMeterEls = document.querySelectorAll('.emissions-anchor.grid-electricity'),
                    mainsGasEls = document.querySelectorAll('.emissions-anchor.reticulated-gas'),
                    wasteEls = document.querySelectorAll('.emissions-anchor.bin-landfill'),

                    elGroups = [woodEls, rooftopSolarEls, gridMeterEls, mainsGasEls, wasteEls]

                elGroups.forEach(group => {
                    for(let i = 0; i < group.length; i++ ){
                        group[i].setAttribute('animation__scale', {
                            property:       'scale',
                            dur:             1000,
                            to:             '0 0 0'
                        })
                    }
                })

            }
        })

    // EXTERNAL EVENT CONTROLS : FOR UI AND TESTING
    AFRAME.registerComponent("add-external-listeners", { 
        init: function(){
            window.addEventListener("touchstart", function(){
                console.log('TOUCH/ORBIT CAMERAS ENABLED')
                scene.els.cam.fly.setAttribute('camera',   {active: false   })
                scene.els.cam.low.setAttribute('camera',   {active: true   })
            })

            // KEYBOARD EVENTS
            window.addEventListener("keydown", function(key){

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
                        case 'MetaLeft':
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


                        case 'KeyC':
                            if(!state.scene.emissions.balloons){
                                scene.els.scene.setAttribute('emissions-activity-balloons', null)
                                state.scene.emissions.balloons = true
                            } else {
                                scene.els.scene.removeAttribute('emissions-activity-balloons')
                                state.scene.emissions.balloons = false
                            }
                            break

                        // HAZARD EVENTS
                            // state.scene.environment.hazardVisible = true

                        case 'Digit1':      // 1. THUNDERSTORM AND FLOODING EVENTS 
                            switch(state.scene.hazard.flood){  
                                // Increase flood levels on subsequent keypress
                                case false: 
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    scene.els.scene.setAttribute('hazard-rain', null)
                                    scene.els.scene.setAttribute('hazard-lightning', null)
                                    setTimeout( () => { 
                                        scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.125}) 
                                    }, 2000)
                                    state.scene.hazard.particles = true   
                                    state.scene.hazard.flood = 'minor'
                                    break
                                // From minor to medium flood
                                case 'minor':
                                    scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.5})
                                    state.scene.hazard.flood = 'medium'
                                    break
                                // From medium to major flood
                                case 'medium':
                                    state.scene.hazard.flood = 'major'
                                    scene.els.scene.setAttribute('hazard-flood', {"floodLvl": 0.75})
                                    break
                                // Reset after showing major flood 
                                default:                        
                                    clearInterval(state.scene.hazard.lightning)
                                    scene.els.scene.removeAttribute('hazard-rain')
                                    scene.els.scene.removeAttribute('hazard-lightning')
                                    scene.els.scene.removeAttribute('hazard-flood')
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    state.scene.hazard.particles = false
                                    state.scene.hazard.flood = false
                                    state.scene.hazard.lightning = false
                                    state.scene.environment.hazardVisible =false
                            }
                            break
                        
                        case 'Digit2':      // 2. EXTREME WIND (THUNDERSTORM) EVENTS 
                            switch(state.scene.hazard.wind){  
                                case false: 
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    scene.els.scene.setAttribute('hazard-rain', null)
                                    scene.els.scene.setAttribute('hazard-wind', null)
                                    scene.els.scene.setAttribute('hazard-lightning', null)
                                    state.scene.hazard.particles = true
                                    state.scene.hazard.wind = 'minor'
                                    break 
                                // Increase wind levels on subsequent keypress
                                case 'minor': 
                                    scene.els.scene.setAttribute('hazard-wind', {"damage": 0.25})
                                    state.scene.hazard.wind = 'major'
                                    break
                                // Reset after showing major wind event 
                                default:    
                                    clearInterval(state.scene.hazard.lightning)
                                    scene.els.scene.removeAttribute('hazard-wind')
                                    scene.els.scene.removeAttribute('hazard-rain')
                                    scene.els.scene.removeAttribute('hazard-lightning')
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    state.scene.hazard.wind = false
                                    state.scene.hazard.particles = false
                                    state.scene.environment.hazardVisible =false
                            }                            
                            break
                       
                        case 'Digit3':      // 3. HEAT DAYS AND HEATWAVE
                            switch(state.scene.hazard.heat){  
                                case false: 
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    externalEvents.changeEnvironment('heat', 2000)
                                    scene.els.scene.setAttribute('hazard-heat', {intensity: 'hotDay'})
                                    state.scene.hazard.heat = 'hotDay'
                                    break
                                case 'hotDay': 
                                    scene.els.scene.setAttribute('hazard-heat', {intensity: 'veryHotDay'})
                                    state.scene.hazard.heat = 'veryHotDay'
                                    break 
                                case 'veryHotDay': 
                                    scene.els.scene.setAttribute('hazard-heat', {intensity: 'heatwave'})
                                    state.scene.hazard.heat = 'heatwave'
                                    break
                                // Reset after showing heat events
                                default:    
                                    scene.els.scene.removeAttribute('hazard-heat')
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    state.scene.hazard.heat = false
                                    state.scene.environment.hazardVisible =false
                            }                            
                            break
                        
                        case 'Digit4':      // 4. DROUGHT | FOOD AND WATER SUPPLY SHORTAGE
                            switch(state.scene.hazard.drought){  
                                case false:
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    scene.els.scene.setAttribute('hazard-drought', {level: 'minor'})
                                    state.scene.hazard.drought = 'minor'
                                    break
                                case 'minor':
                                    scene.els.scene.setAttribute('hazard-drought', {level: 'major'})
                                    state.scene.hazard.drought = 'major'
                                    break
                                default:
                                    scene.els.scene.removeAttribute('hazard-drought')
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    state.scene.hazard.drought = false
                                    state.scene.environment.hazardVisible =false
                            }
                            break
                       
                        case 'Digit5':      // 5. BUSHFIRES | INTENSITY AND POSITION BASED
                            switch(state.scene.hazard.bushfire){  
                                case false:
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    state.scene.hazard.bushfire = 0
                                    scene.els.scene.setAttribute('hazard-bushfire', {intensity: 0})
                                    break
                                case 0:
                                    scene.els.scene.setAttribute('hazard-bushfire', {intensity: 0.5})
                                    state.scene.hazard.bushfire = 0.5
                                    break
                                case 0.5:
                                    scene.els.scene.setAttribute('hazard-bushfire', {intensity: 1})
                                    state.scene.hazard.bushfire = 1
                                    break
                                default:
                                    scene.els.scene.removeAttribute('hazard-bushfire')
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    state.scene.hazard.bushfire = false
                                    state.scene.environment.hazardVisible =false
                            }
                            break 

                        case 'Digit6':      // 6. OCEAN ACIDIFICATION | INTENSITY BASED
                            switch(state.scene.hazard.oceanAcidification){  
                                case false:
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    state.scene.hazard.oceanAcidification = 'minor'
                                    scene.els.scene.setAttribute('hazard-ocean-acidification', null)
                                    break
                                default:
                                    scene.els.scene.removeAttribute('hazard-ocean-acidification')
                                    externalEvents.changeEnvironment('default')
                                    state.scene.hazard.oceanAcidification = false
                                    state.scene.environment.hazardVisible =false
                            }
                            break
                    
                        case 'Digit7':      // 7. CYCLONES AND HURRICANES | SEA AND LAND BASED WIND EVENTS
                            switch(state.scene.hazard.tropicalStorm){  
                                case false:
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    externalEvents.changeEnvironment('stormFlood', 2000 )
                                    scene.els.scene.setAttribute('hazard-tropical-storm', null)
                                    scene.els.scene.setAttribute('hazard-wind', {damage: 0.25})
                                    state.scene.hazard.tropicalStorm = 'tropical'
                                    state.scene.hazard.wind = 'major'
                                    break
                                default:
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    scene.els.scene.removeAttribute('hazard-tropical-storm')
                                    scene.els.scene.removeAttribute('hazard-wind')
                                    externalEvents.changeEnvironment('default')
                                    state.scene.hazard.tropicalStorm = false
                                    state.scene.hazard.wind = 'none'
                                    state.scene.environment.hazardVisible = false
                            }
                            break

                        case 'Digit8':      // 8. WINTER AND ICE STORM
                            switch(state.scene.hazard.winterStorm){  
                                case false:
                                    externalEvents.resetHazards()               // Clear any existing hazards
                                    externalEvents.changeEnvironment('snow', 2000 )
                                    scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'snow'})
                                    state.scene.hazard.winterStorm = 'snow'
                                    state.scene.hazard.snow = true
                                    break
                                case 'snow':
                                    scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'blizzard'})
                                    state.scene.hazard.winterStorm = 'bizzard'
                                    break
                                case 'bizzard':
                                    scene.els.scene.setAttribute('hazard-winter-storm', {intensity: 'iceStorm'})
                                    state.scene.hazard.winterStorm = 'iceStorm'
                                    break
                                default:
                                    externalEvents.changeEnvironment(state.scene.environment.name)
                                    scene.els.scene.removeAttribute('hazard-winter-storm')
                                    state.scene.hazard.winterStorm = false
                                    state.scene.environment.hazardVisible = false
                            }
                            break

                        case 'Digit9':      //  9. AVALANCHE AND MUDSLIDE

                            break

                        case 'Digit0':      //  0. EARTHQUAKES AND TSUNAMIS
                            switch(state.scene.hazard.earthquake){  
                                 case false:
                                    scene.els.scene.setAttribute('hazard-earthquake', {intensity: 10})
                                    break
                                default:
                                    state.scene.environment.hazardVisible = false
                            }
                            break

                        // +/- SEA LEVEL CHANGES | INCREMENTAL
                        case 'Equal':
                        case 'NumpadAdd':
                            state.scene.hazard.seaLevel = state.scene.hazard.seaLevel + 0.1 
                            scene.els.scene.setAttribute('hazard-sea-level', 'slchange: '+state.scene.hazard.seaLevel )
                            console.log('Raising Sea level to '+state.scene.hazard.seaLevel)
                            // COASTAL EROSION
                            break
                        case 'Minus':
                        case 'NumpadSubtract':
                            state.scene.hazard.seaLevel = state.scene.hazard.seaLevel - 0.1 
                            scene.els.scene.setAttribute('hazard-sea-level', 'slchange: '+state.scene.hazard.seaLevel )
                            console.log('Lowering sea level to '+state.scene.hazard.seaLevel)
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
            if(scene.els.cam.fly.getAttribute('camera').active ){
                scene.els.cam.fly.setAttribute('camera', {active: false  })
                scene.els.cam.low.setAttribute('camera', {active: true   })
            } else {
                scene.els.cam.fly.setAttribute('camera',   {active: true   })
                scene.els.cam.low.setAttribute('camera',   {active: false   })
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

        changeHour: function(direction, duration = 2000){
            console.log('Moving hour '+direction+' to '+scene.els.misc.sunPos[state.scene.time.hour])
            if(direction === 'forward'){
                state.scene.time.hour = state.scene.time.hour !== (scene.els.misc.sunPos.length - 1) ? state.scene.time.hour + 1 : 0
            } else if(direction === 'back'){
                state.scene.time.hour = state.scene.time.hour !== 0 ? state.scene.time.hour  - 1 :  scene.els.misc.sunPos.length - 1 
            }
            // Resposition sun an sun light
            const newSunPos = document.getElementById(scene.els.misc.sunPos[state.scene.time.hour]).getAttribute('position')
            scene.els.enviro.sun.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
            })  
            scene.els.lights.sun.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newSunPos.x}  ${newSunPos.y}  ${newSunPos.z}`
            })  
            // Resposition moon body
            const newMoonPos = document.getElementById(scene.els.misc.moonPos[state.scene.time.hour]).getAttribute('position')
            scene.els.enviro.moon.setAttribute('animation__position', {
                property: 'position',
                dur: duration,
                to: `${newMoonPos.x}  ${newMoonPos.y}  ${newMoonPos.z}`
            })  
            // Change the hemi ambient light
            scene.els.lights.hemi.setAttribute('animation__light', {
                property: 'light.intensity',
                dur: duration,
                to: settings.lights.hemi.intProp[state.scene.time.season][state.scene.time.hour] * settings.lights.hemi.maxIntensity
            })  
            // Change the environment
            externalEvents.changeEnvironment()

            // Turn lights on/off
            if ((state.scene.time.timeOfDay() === "day" || state.scene.time.timeOfDay() === "morning")){
                if(state.scene.environment.nightLights){
                    console.log(state.scene.time.timeOfDay(), 'TURN LIGHTS OFF')
                    scene.els.scene.removeAttribute('nightlights')
                } else {
                    console.log('KEEP LIGHTS OFF')
                }   
            } else {
                if(!state.scene.environment.nightLights){
                    console.log(state.scene.time.timeOfDay(), 'TURN LIGHTS ON')
                    scene.els.scene.setAttribute('nightlights', null)
                } else {
                    console.log('KEEP LIGHTS ON')
                }
            }

            // Track the solar  
            const solarFarmEls = document.getElementsByClassName('solarRotatable')
            for(let i = 0; i < solarFarmEls.length; i++){
                solarFarmEls[i].setAttribute('animation__rotate', {
                    property:   'rotation',
                    dur:        duration,
                    to:         {x: settings.solarFarm.rotationByHour[state.scene.time.hour] , y: 0, z: 0}
                })            
            }

            // Control key events
            state.ui.enableKeyEvents = false
            setTimeout( ()=> {  state.ui.enableKeyEvents = true    }, duration)

        },

        changeEnvironment: function(name = state.scene.environment.name, duration = 2000, timeOfDay = state.scene.time.timeOfDay()){
            console.log('Changing environment to '+name, timeOfDay)
            // Change the sky colour for time of day and "conditions"
            scene.els.enviro.sky.setAttribute('animation__topColour', {
                property:   'material.topColor',
                dur:        duration,
                to:         settings.days[name][timeOfDay]['sky-top']
            })  
            scene.els.enviro.sky.setAttribute('animation__bottomColour', {
                property:   'material.bottomColor',
                dur:        duration,
                to:         settings.days[name][timeOfDay]['sky-bottom']
            })  
            // Change the hemisphere light colours and ocean colour
            if(settings.days[name][timeOfDay].hemilight){
                scene.els.lights.hemi.setAttribute('animation__skyCol', {
                    property: 'light.color',
                    dur: duration,
                    to: settings.days[name][timeOfDay].hemilight.sky
                })  
                scene.els.lights.hemi.setAttribute('animation__groundCol', {
                    property: 'light.groundColor',
                    dur: duration,
                    to: settings.days[name][timeOfDay].hemilight.ground
                })  

            } else {
                scene.els.lights.hemi.setAttribute('animation__skyCol', {
                    property: 'light.color',
                    dur: duration,
                    to: settings.days.default[timeOfDay].hemilight.sky
                })  
                scene.els.lights.hemi.setAttribute('animation__groundCol', {
                    property: 'light.groundColor',
                    dur: duration,
                    to: settings.days.default[timeOfDay].hemilight.ground
                })  
            }
            // Change the water colour
            if(settings.days[name][timeOfDay].water){
                scene.els.enviro.sea.removeAttribute('ocean')
                scene.els.enviro.sea.setAttribute('ocean', {
                    color:              settings.days[name][timeOfDay].water,
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
            if(settings.days[name][timeOfDay].fog){
                scene.els.scene.setAttribute('fog', {
                    color: settings.days[name][timeOfDay].fog.color,
                    far: settings.days[name][timeOfDay].fog.far
                })  
                scene.els.scene.setAttribute('animation__far', {
                    property: 'fog.far',
                    dur: duration,
                    from: 1000,
                    to: settings.days[name][timeOfDay].fog.far
                })  
            } else {
                scene.els.scene.setAttribute('fog', {
                    color: settings.days.default[timeOfDay].fog.color,
                    far: settings.days.default[timeOfDay].fog.far
                })  
            }
        },

        resetHazards: function(){
            state.scene.hazard.particles = false
            state.scene.hazard.flood = false
            state.scene.hazard.wind = false
            state.scene.hazard.bushfire = false
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
            clearInterval(state.scene.hazard.lightning)
            externalEvents.changeEnvironment(state.scene.environment.name)
            console.log('All hazards reset')
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
