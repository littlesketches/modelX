
/***********************************/
/****
/****
/***********************************/

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
        }
    }

    const state = {
        timeLoaded:         new Date(),
        time:               {},
        modelTime:          {
            hour:           11,
            season:        'spring',
            timeOfDay:      () => settings.environment.timeOfDay[state.modelTime.season][state.modelTime.hour],
        },
        environment: {
            name:           'grandBudapest',
            nightLights:     false
        },
        hazard: {
            storm:          false,
            seaLevel:       0,
            drought:        false
        },
        weather: {
            windSpeed:      10, 
            windDirection:  0,
            temperature:    25
        },
        camera: {
            activeID:       'flycam',
            flyIndex:       0
        },
        enableKeyEvents: true,
        keydown:            '',
        animation: {
            planeFlight:        false,
            duckSail:           true,
            windTurbine:        true,
            blockTitleShowing:  false,

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
    state.time.year = state.timeLoaded.getFullYear()
    state.time.month = state.timeLoaded.getMonth()
    state.time.hour = state.timeLoaded.getHours()
    state.time.minutes = state.timeLoaded.getMinutes()
    state.time.season = settings.time.seasonsByMonth[state.time.month]
    state.environment.sunX = settings.environment.sunX[state.time.season]

// Set Sun "x" position (based on season)

    const modelSchema = {
        modelYears: [... Array(settings.time.horizonYear - settings.time.baselineYear).keys()].map(d => d + settings.time.baselineYear)
    }

    const modelData = {

        actions: {
            households: {

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
        A: {
            '01': 	'#FFA8CB',
            '02': 	'#784283',
            '03': 	'#FFD8EC',
        }
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


    settings.lights = {

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


    }

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
        
        heatwave: {
            morning: {          // 
                'sky-top':      '#f8f0e2', 
                'sky-bottom':   '#fffab3', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
                }
            }, 
            day: {
                'sky-top':      '#02d2ed', 
                'sky-bottom':   '#a9f8f9', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
                }
            }, 
            evening: {
                'sky-top':      '#3e0146', 
                'sky-bottom':   '#fba46a', 
                hemilight: {
                    sky:        '#fff',
                    ground:     '#faf56b'
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



    settings.climate = {
        hazard: {
            heatwave: {            // Wind?
            
            },
            flood: {              // Heavy Rain?

            },
            storm: {            // Wind?
            
            },
            flood: {              // Heavy Rain?

            }
        },

        stress: {
            temperatureRise: {             // Drier?

            },
            seaLevelRise: {              // Polar / snow melting

            },
            drought: {             // Dry land, crops

            },
            ecosystemCollapse: {             

            }
        }
    }

