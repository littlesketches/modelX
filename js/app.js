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

    const settings = {
        time:       {
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

    const state = {
        model: {
            timeLoaded:             new Date(),
            time:                   {},
        },
        visual: {
            modelTime: {
                hour:               10,
                season:            'spring',
                timeOfDay:          () => settings.environment.timeOfDay[state.visual.modelTime.season][state.visual.modelTime.hour],
            },
            environment: {
                name:               'default',
                nightLights:        false
            },
            hazard: {               // For all hazards, the 'off' state is null or zero
                bushfire:           null,           // null then incremental intensity (0, 0.5 and 1 mapping to position)
                drought:            'none',         // none, minor and major; triggering various water, vegetation/ag and ground cover changes
                earthquake:         null,          // none, eartq
                flood:              'none',         // none, minor, medium and major (for heights )
                heat:               null,           // null, hotDay, veryHotDay, heatwave
                heatPulse:          null,           // Object for storing/clearing setInterval for heat pulse effect
                lightning:          null,           // Object for storing/clearing setInterval for lightning effect
                oceanAcidification: 'none',         // none, minor anad major: 
                rain:               false,          // true or false (on of off; likely to change to intensity)
                snow:               false,          // true or false (on of off; likely to change to intensity)
                seaLevel:           0,              // float number (delta) from the starting point, where around 2 initiates coastal inundation
                tornado:            false,          // true or false (on of off)
                treeSway:           null,           // Object for storing/clearing setInterval for wind affected swaying trees
                tropicalStorm:      false,          // true or false (on of off)
                wind:               'none',         // none, minor and major (where the windDamage determines the visual)
                windDamage:         'none',         // none then incremental propotion (0 to 1) of felled to trees
                winterStorm:       'none',          // none, snow, blizard, iceStorm 
            },
            weather: {
                windSpeed:          10, 
                windDirection:      0,
                temperature:        25
            },
            camera: {
                activeID:           'flycam',
                flyIndex:           0,
                flyHeight:          'high'          // High or low camera
            },
            animation: {
                planeFlight:        false,
                duckSail:           true,
                windTurbine:        true,
                blockTitleShowing:  false,
            },
            elements: {
                origCol:            {}
            }
        },

        ui: {
            enableKeyEvents:    true,
            keydown:            '',
        }
    }

    const simulation = {
        dayLength: 60000
    }

    const sceneEls = {}


    const view = {
        cam: {
            fly: [ // Clockwise from north-south
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


// Set current time to now
    state.model.time.year = state.model.timeLoaded.getFullYear()
    state.model.time.month = state.model.timeLoaded.getMonth()
    state.model.time.hour = state.model.timeLoaded.getHours()
    state.model.time.minutes = state.model.timeLoaded.getMinutes()
    state.model.time.season = settings.time.seasonsByMonth[state.model.time.month]

    state.visual.environment.sunX = settings.environment.sunX[state.model.time.season]

// Set Sun "x" position (based on season)
    const modelSchema = {
        modelYears: [... Array(settings.time.horizonYear - settings.time.baselineYear).keys()].map(d => d + settings.time.baselineYear)
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