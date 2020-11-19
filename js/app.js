/**************************************************************************/
/**************************************************************************/
/****              Project: Kingdom of Dreams and Madness              ****/
/****                                                                  ****/
/****  An exploration of building 'dynamic models' in a humane form     ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a    ****/
/****  a completed protoype is released  under a Creative Commons       ****/
/***   4.0 license                                                      ****/
/**************************************************************************/
/****  This app.js file is used to develop configuration logic and     ****/
/****  features outside of the A-Frame canvas, which has script logic  ****/
/****  written as as custom A-Frame components (see comopnent.js)      ****/
/**************************************************************************/


console.log('BUILDING APP...')

// INITIALISE DATA OBJECTS

    const settings = {              // Expected to be initialised from external/editable JSON
        modelTime:       {
            baselineYear: 2020,
            horizonYear: 2050,
            seasonsByMonth: {
                0: 'summer',
                1: 'summer',
                2: 'autumn',
                3: 'autumn',
                4: 'autumn',
                5: 'winter',
                6: 'winter',
                7: 'winter',
                8: 'spring',
                9: 'spring',
                10: 'spring',
                11: 'summer',
            }
        },
        activityBoundary: {        
        },
        environment: {
            sunX: {
                summer: -0,
                spring: -30,
                autumn: -30,
                winter: -50
            },
            timeOfDay: {        // Descriptors for sky settings
                summer: {
                    0: 'night',   
                    1: 'night',    
                    2: 'night',      
                    3: 'night',    
                    4: 'night',   
                    5: 'night',
                    6: 'morning',  
                    7: 'morning', 
                    8: 'morning',   
                    9: 'morning', 
                    10: 'day', 
                    11: 'day',  
                    12: 'day',  
                    13: 'day',  
                    14: 'day',  
                    15: 'day',  
                    16: 'day',  
                    17: 'evening',  
                    18: 'evening',  
                    19: 'evening',  
                    20: 'evening',  
                    21: 'night',  
                    22: 'night',  
                    23: 'night',  
                },
                spring: {
                    0: 'night',   
                    1: 'night',    
                    2: 'night',      
                    3: 'night',    
                    4: 'night',   
                    5: 'night',
                    6: 'morning',  
                    7: 'morning', 
                    8: 'morning',   
                    9: 'morning', 
                    10: 'day', 
                    11: 'day',  
                    12: 'day',  
                    13: 'day',  
                    14: 'day',  
                    15: 'day',  
                    16: 'day',  
                    17: 'evening',  
                    18: 'evening',  
                    19: 'evening',  
                    20: 'evening',  
                    21: 'night',  
                    22: 'night',  
                    23: 'night',  
                },
                autumn: {
                    0: 'night',   
                    1: 'night',    
                    2: 'night',      
                    3: 'night',    
                    4: 'night',   
                    5: 'night',
                    6: 'morning',  
                    7: 'morning', 
                    8: 'morning',   
                    9: 'morning', 
                    10: 'day', 
                    11: 'day',  
                    12: 'day',  
                    13: 'day',  
                    14: 'day',  
                    15: 'day',  
                    16: 'day',  
                    17: 'evening',  
                    18: 'evening',  
                    19: 'evening',  
                    20: 'evening',  
                    21: 'night',  
                    22: 'night',  
                    23: 'night',  
                },
                winter: {
                    0: 'night',   
                    1: 'night',    
                    2: 'night',      
                    3: 'night',    
                    4: 'night',   
                    5: 'night',
                    6: 'morning',  
                    7: 'morning', 
                    8: 'morning',   
                    9: 'morning', 
                    10: 'morning', 
                    11: 'day',  
                    12: 'day',  
                    13: 'day',  
                    14: 'day',  
                    15: 'day',  
                    16: 'day',  
                    17: 'evening',  
                    18: 'evening',  
                    19: 'evening',  
                    20: 'evening',  
                    21: 'night',  
                    22: 'night',  
                    23: 'night',  
                }
            }
        },
    }

    // Model and scene state data
    const state = {
        // User environment data
        user: {
            timeLoaded:             new Date(),         
            time:                   {},
            location:               {},
            weather:                {},
        },
        // Visual state of A-FRAME scene
        scene: {                  
            time: {
                hour:               9,
                season:            'spring',
                timeOfDay:          () => settings.environment.timeOfDay[state.scene.time.season][state.scene.time.hour],
            },
            environment: {
                name:               'default',
                nightLights:        false,
                hazardVisible:      false,
                wind: {
                    speed:          10, 
                    heading:         0,         // Degrees from North
                },
            },            
            hazard: {               // For all hazards, the 'off' state is false or zero
                bushfire:           false,          // false then incremental intensity (0, 0.5 and 1 mapping to position)
                drought:            false,          // false, minor and major; triggering various water, vegetation/ag and ground cover changes
                earthquake:         false,          // false, eartq
                flood:              false,          // false, minor, medium and major (for heights )
                heat:               false,          // false, hotDay, veryHotDay, heatwave
                heatPulse:          false,          // Object for storing/clearing setInterval for heat pulse effect
                lightning:          false,          // Object for storing/clearing setInterval for lightning effect
                oceanAcidification: false,          // false, minor anad major: 
                rain:               false,          // true or false (on of off; likely to change to intensity)
                snow:               false,          // true or false (on of off; likely to change to intensity)
                seaLevel:           0,              // float number (delta) from the starting point, where around 2 initiates coastal inundation
                tornado:            false,          // true or false (on of off)
                treeSway:           false,          // Object for storing/clearing setInterval for wind affected swaying trees
                tropicalStorm:      false,          // true or false (on of off)
                wind:               false,          // false, minor and major (where the windDamage determines the visual)
                winterStorm:        false,          // false, snow, blizard, iceStorm 
                mudslide:          false,           // false, avalanche, mudslide 
            },            
            camera: {
                activeID:           'flycam',
                flyIndex:           0,
                flyHeight:          'high'          // High or low camera for keyboard nav
            },
            animation: {
                planeFlight:        false,
                duckSail:           true,
                windTurbine:        true,
                blockTitleShowing:  false,
            },
            elements: {
                origCol:            {}
            },
            emissions: {
                balloons:           {
                    net: {
                        switches:   false, 
                        sinks:    false, 
                    },      
                    sources:        false,
                    switches:       false,
                    sinks:          false
                }
            }
        },

        // Systems model and simulation state
        model: {
        },

        // HTML User interface 
        ui: {         
            touchMenu:          false,
            enabled:            false,
            displayType:        '',                 // Narrative, Data?
            enableKeyEvents:    true,
            keydown:            '',
        }
    }

    // Modelling simulation
    const simulation = {
        dayLength: 60000
    }

    // Scene settings
    const scene = {
        els:               {},      // A-FRAME Scene element references: set through setup init (component)
        camPos: {                    // Fixed camera positions for views
            overheadRing: [ // Clockwise from north-south
                {  // North-South flyover
                    pos:        {x: 180,    y: 60,      z: 0},
                    rotation:   {x: -10,     y: 90,      z: 0},
                },
                {   // NE-SW flyover
                    pos:        {x: 90 * 1.414,  y: 60,  z: 90 * 1.414},
                    rotation:   {x: -10,     y: 45,      z: 0},
                },
                {   // East-West flyover
                    pos:        {x: 0,      y: 60,      z: 180},
                    rotation:   {x: -10,     y: 0,       z: 0},
                },
                {   // NW-SW flyover
                    pos:        {x: -90 * 1.414,  y: 60,   z: 90 *  1.414},
                    rotation:   {x: -10,     y: -45,     z: 0},
                },
                {   // South-north flyover
                    pos:        {x: -180,    y: 60,      z: 0},
                    rotation:   {x: -10,     y: -90,      z: 0},
                },
                {   // SW-NE
                    pos:        {x: -90 * 1.414,  y: 60,  z: -90 * 1.414},
                    rotation:   {x: -10,     y: -135,      z: 0},
                },
                {   // West-East flyover
                    pos:        {x: 0,      y: 60,      z: -200},
                    rotation:   {x: -10,     y: 180,    z: 0},
                },
                {   // NW-SE flyover
                    pos:        {x: 90 * 1.414,  y: 60,  z: -90 * 1.414},
                    rotation:   {x: -10,     y: 135,     z: 0},
                },
            ],
            residential: {
            }
        }
    }

    // Model 
    const schema = {
        model: {
            years:          [... Array(settings.modelTime.horizonYear - settings.modelTime.baselineYear).keys()].map(d => d + settings.modelTime.baselineYear)
        }
    }

    const modelData = {
        list: {
            seasons:    ['Summmer', 'Autumn', 'Winter', 'Spring'],  
            zones:      ["Urban", "Industrial", "Suburban", "Agriculture", "Periurban", "Outer" ],
            zonesAlias: ["Commercial", "Industrial", "Residential", "Agricultural", "Rural", "Heavy industry"]
        },

        mitigation: {
            actions: {
                households: {

                }
            }    
        }
    }

    const activitySchema = {
        emissionsSector_Source: {
            "Stationary Energy": {
                "Electricity":  {
                    unit:           "MWh",
                    energy:         "GJ",
                    emissionsFactorBytype: {
                        "Grid supplied":                    {Scope1: '',        Scope2: '',      Scope3: '',    Desc: '', Source: ''},
                        "Grid supplied (GreenPower)":       {},
                        "Solar generated on site":          {},
                        "Solar exported":                   {},
                        "Wind generated on site":          {},
                        "Wind exported":                   {},
                        "Wind generated on site":          {},
                        "Wind exported":                   {},
                    }
                },    
                "Natural gas (reticulated)":        {},    
                "Natural gas (bottled)":            {},    
                "Liquified Petroleum Gas":          {},    
            }

        },

        economicSector: {

        }
    }

    const palette = {
        letterBlock:   ['#ff598f', '#fd8a5e', '#784283', '#01dddd', '#00bfaf', '#91aaff', '#ff9e9e', '#ff80c5', '#7afbff', '#8aff9c' ],
        builtEnvScale: ['#00a08f', '#fff', '#fee074', "ff9469", "ff6f61"]
    }

    const visualModel = {
        residential: {

        }, 
        commerical: {

        }, 
        industrial: {

        }
    }



//////////////////////////////////////////
/// LIGHTING AND ENVIRONMENT SETTINGS  ///
//////////////////////////////////////////

    // Environment light intensity and colour settings, by 24hr cycle
    settings.lights = {
        hemi: {
            maxIntensity:   1.0,    
            intProp: {
                summer: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,           // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                autumn: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,           // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                winter: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,           // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                spring: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,           // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
            },
            colour: {
                summer: {
                    color:  [ '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa'],  

                    groundColor: [ '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545']
                }, 
                autumn: {
                    color:  [ '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa'],  

                    groundColor: [ '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545']
                },
                winter: {
                    color:  [ '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa'],  

                    groundColor: [ '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545']
                },
                spring: {
                    color:  [ '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa'],  

                    groundColor: [ '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545']
                }

            }
        },

        ambient: {
            maxIntensity:   1.0,    
            intProp: {
                summer: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.2, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                autumn: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.2, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                winter: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.2, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                spring: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.2, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
            }
        },
    }

    // Environment settings (sky and light colours, and fog) by day "name" and "time part" (i.e. morning, day, evening night)"
    settings.days = {
        default: {
            morning: {          // 
                'sky-top':      '#74f6f6', 
                'sky-bottom':   '#f9f4ae', 
                'water':        '#00fdff',
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                },
                fog: {
                    color:      '#000',
                    far:        1000,
                }
            }, 
            day: {
                'sky-top':      '#07f2ee', 
                'sky-bottom':   '#e0faf9',
                'water':        '#00fdff',
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                },
                fog: {
                    color:      '#000',
                    far:        1000,
                }
            }, 
            evening: {
                'sky-top':      '#ae84bd', 
                'sky-bottom':   '#dbd8b3', 
                'water':        '#00fdff',
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                },
                fog: {
                    color:      '#000',
                    far:        1000,
                }
            }, 
            night: {
                'sky-top':      '#010e0e', 
                'sky-bottom':   '#00444d', 
                'water':        '#00fdff',
                hemilight: {
                    sky:        '#000',
                    ground:     '#fff'
                },
                fog: {
                    color:      '#000',
                    far:        1000,
                }
            }
        },
        
        heat: {
            morning: {          // 
                'sky-top':      '#f8f0e2', 
                'sky-bottom':   '#fffab3', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
                },
                hotDay: {
                    'sky-top':      '#f8df87', 
                    'sky-bottom':   '#a9f8f9', 
                },
                veryHotDay: {
                    'sky-top':      '#ea8334', 
                    'sky-bottom':   '#f8df87', 
                },
                heatwave: {
                    'sky-top':      '#ea8334', 
                    'sky-bottom':   '#f8df87', 
                }
            }, 
            day: {
                'sky-top':      '#02d2ed', 
                'sky-bottom':   '#a9f8f9', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
                },
                hotDay: {
                    'sky-top':      '#02d2ed', 
                    'sky-bottom':   '#804b81', 
                },
                veryHotDay: {
                    'sky-top':      '#02d2ed', 
                    'sky-bottom':   '#b07da0', 
                },
                heatwave: {
                    'sky-top':      '#b07da0', 
                    'sky-bottom':   '#f8df87', 
                }
            }, 
            evening: {
                'sky-top':      '#3e0146', 
                'sky-bottom':   '#fba46a', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
                },
                hotDay: {
                    'sky-top':      '#3e0146', 
                    'sky-bottom':   '#804b81', 
                },
                veryHotDay: {
                    'sky-top':      '#3e0146', 
                    'sky-bottom':   '#b07da0', 
                },
                heatwave: {
                    'sky-top':      '#b07da0', 
                    'sky-bottom':   '#f8df87', 
                }
            }, 
            night: {
                'sky-top':      '#012037', 
                'sky-bottom':   '#004e75', 
                hotDay: {
                    'sky-top':      '#3e0146', 
                    'sky-bottom':   '#817db0', 
                },
                veryHotDay: {
                    'sky-top':      '#3e0146', 
                    'sky-bottom':   '#b07da0', 
                },
                heatwave: {
                    'sky-top':      '#3e0146', 
                    'sky-bottom':   '#db1a1a'
                }
            }
        },

        dry: {
            morning: {          // 
                'sky-top':      '#f8f0e2', 
                'sky-bottom':   '#fffab3', 
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                }
            }, 
            day: {
                'sky-top':      '#02d2ed', 
                'sky-bottom':   '#a9f8f9', 
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                }
            }, 
            evening: {
                'sky-top':      '#3e0146', 
                'sky-bottom':   '#fba46a', 
                hemilight: {
                    sky:        '#f6e3fa',
                    ground:     '#454545'
                }
            }, 
            night: {
                'sky-top':      '#012037', 
                'sky-bottom':   '#004e75', 
            }
        },

        stormFlood: {
            morning: {          // 
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            day: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            evening: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8',
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            night: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#41515d', 
                'water':        '#377b7b',                
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }
        },

        bushfire: {
            morning: {          
                'sky-top':      '#ff2600', 
                'sky-bottom':   '#ff9500', 
                'water':        '#373f3f',
                hemilight: {
                    sky:        '#b25906',
                    ground:     '#ff6f00'
                },
                fog:{
                    far:        300,
                    color:        '#853f0a'
                }
            }, 
            day: {
                'sky-top':      '#0a0400', 
                'sky-bottom':   '#ff9500', 
                'water':        '#373f3f',
                hemilight: {
                    sky:        '#b25906',
                    ground:     '#ff6f00'
                },
                fog:{
                    far:        300,
                    color:        '#853f0a'
                }
            }, 
            evening: {
                'sky-top':      '#0a0400', 
                'sky-bottom':   '#ff6600', 
                'water':        '#373f3f',
                hemilight: {
                    sky:        '#b25906',
                    ground:     '#ff6f00'
                },
                fog:{
                    far:          300,
                    color:        '#853f0a'
                }
            }, 
            night: {
                'sky-top':      '#0a0400', 
                'sky-bottom':   '#a30000',
                'water':        '#373f3f',
                hemilight: {
                    sky:        '#b25906',
                    ground:     '#ff6f00'
                },
                fog:{
                    far:        400,
                    color:       '#853f0a'
                }
            }
        },

        snow: {
            morning: {          // 
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            day: {
                'sky-top':      '#ababab', 
                'sky-bottom':   '#f5f5f5', 
                'water':        '#a3d2d2',
                hemilight: {
                    sky:        '#b2d2d0',
                    ground:     '#ffa8fc'
                },
                fog: {
                    color:      '#9cb0af',
                    far:        400,
                }
            }, 
            evening: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8',
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            night: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',                
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }
        },

        grandBudapest: {
            morning: {          // 
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            day: {
                'sky-top':      '#f082f2', 
                'sky-bottom':   '#f2f0c0', 
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#b2d2d0',
                    ground:     '#ffa8fc'
                },
                fog: {
                    color:      '#9cb0af',
                    far:        400,
                }
            }, 
            evening: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8',
                'water':        '#377b7b',
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }, 
            night: {
                'sky-top':      '#323434', 
                'sky-bottom':   '#9c94a8', 
                'water':        '#377b7b',                
                hemilight: {
                    sky:        '#949494',
                    ground:     '#383838'
                },
                fog: {
                    color:      '#656d72',
                    far:        400,
                }
            }
        },

    }

    // Solar farm rotation angles by hour to track sun
    settings.solarFarm = {
        rotationByHour: [   0, 0, 0, 0, 0, 0,                       // MIDNIGHT TO 5AM
                            -40, -32.5, -25, -17.5, -10 , -2.5,     // 6 AM TO MIDDAY
                            2.5, 10 ,17.5, 25, 32.5, 40,            // MIDDAY TO 5PM
                            40, 40, 40, 0, 0, 0],                   // 6PM TO 11PM
    }




//////////////////////////////////////////
///////  USER SPECIFIC CONDITIONS  ///////
//////////////////////////////////////////

    // Set current user time from internal clock
    state.user.time.year = state.user.timeLoaded.getFullYear()
    state.user.time.month = state.user.timeLoaded.getMonth()
    state.user.time.hour = state.user.timeLoaded.getHours()
    state.user.time.minutes = state.user.timeLoaded.getMinutes()
    state.user.time.season = settings.modelTime.seasonsByMonth[state.user.time.month]

    // Get current location

    // Get current weather
 
    // Set Sun "x" position (based on season)
    state.scene.environment.sunX = settings.environment.sunX[state.user.time.season]


//////////////////////////////////////////
///////  USER INTERFACE CODE       ///////
//////////////////////////////////////////

        const ui = {
            mainMenus: {},
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
                    ui.methods.updateEventDetails(selectedEl)
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

            // Set details close button
            document.getElementById('details-close-right').addEventListener('click', ui.methods.closeDetails)
        };

        // Add Event listeners (generic menu interactions only > to be added to add scene interactivity)
        function addInteraction() {
            document.querySelectorAll('.subMenu-event-container').forEach(el => {
                el.addEventListener('click', function(){
                    ui.methods.selectEvent(this)
                })

            })
        }
