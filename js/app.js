
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
            hour:           10,
            season:        'spring',
            timeOfDay:      () => settings.environment.timeOfDay[state.modelTime.season][state.modelTime.hour],
        },
        environment: {
            windSpeed:      10, 
            windDirection:  0,
            temperature:    25
        },
        camera: {
            activeID:       'flycam',
            flyIndex:       0
        },
        enableKeyEvents: true
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
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                autumn: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                winter: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                spring: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
            }
        },

        hemi: {
            maxIntensity:   1.0,    
            intProp: {
                summer: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                autumn: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                winter: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
                spring: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,           // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM
            }
        },

        byHour: {
            sunIntensity: [ 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                            0.8, 0.8, 0.8, 0.8, 0.8, 0.8],

            ambientIntensityPct: [ 0.0, 0.0, 0.0, 0.05, 0.1, 0.15,  // MIDNIGHT TO 5AM
                            0.15, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.15, 0.1, 0.05, 0.0],       // 6PM TO 11PM

            color:        [ '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', 
                            '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa', '#f6e3fa'],  

            groundColor: [ '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545', 
                            '#454545', '#454545', '#454545', '#454545', '#454545', '#454545']
        }
    }

    settings.evironment = {
        morning: {
            everyday: {          // 
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            }, 

           cold: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },
            foggy: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },
        },

        daytime: {
            everyday: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            }, 

            apocalyptic: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },
            bright: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },
            grandBudapest: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },
        },

        evening: {
            everyday: {
                'sky-top':      '#fff', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            }, 
            hot: {
                'sky-top': '#f99058', 
                'sky-bottom': '#f4fdaf',
                'fog-type':'linear', 
                'fog-density': 0, 
                'fog-col': '#fff',
                'water-col': 'aqua',
            },
        },

        night: {
            everyyday: {
                'sky-top':      '#000', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },

            balmyBlue: {
                'sky-top':      '#000', 
                'sky-bottom':   '#d78d37', 
                'fog-type':     'exponetial', 
                'fog-density':  0.01, 
                'fog-col':      '#8c4a0d',
                'fog-far':      200,
                'fog-near':     0,
            },

        }
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


