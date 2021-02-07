/**************************************************************************/
/**************************************************************************/
/****              Project: Kingdom of Dreams and Madness              ****/
/****                                                                  ****/
/****  An exploration of building 'dynamic models' in a humane form    ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a   ****/
/****  a completed prototype is released  under a Creative Commons     ****/
/***   4.0 license                                                     ****/
/**************************************************************************/
/****  This app.js file is used to develop configuration logic and     ****/
/****  features outside of the A-Frame canvas, which has script logic  ****/
/****  written as as custom A-Frame components (see component.js)      ****/
/**************************************************************************/


console.log('BUILDING APP...')

// INITIALISE DATA OBJECTS

    const settings = {              // Expected to be initialised from external/editable JSON
        modelTime:       {
            minYear: 1950,
            maxYear: 2100,
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
            sunOffset: {
                summer:         {x:  0,       y: 0,       z: 0},
                autumn:         {x: -30,      y: -10,       z: 0},
                winter:         {x: -50,      y: -20,       z: 0},
                spring:         {x: -30,      y: -10,       z: 0},
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
            effect: {               // For all hazards, the 'off' state is false or zero
                bushfire:           false,          // false then incremental intensity (0, 0.5 and 1 mapping to position)
                desertification:    false,         // false, desertification
                drought:            false,          // false, minor and major; triggering various water, vegetation/ag and ground cover changes
                earthquake:         false,          // false, earth
                flood:              false,          // false, minor, medium and major (for heights )
                heat:               false,          // false, hotDay, veryHotDay, heatwave
                heatPulse:          false,          // Object for storing/clearing setInterval for heat pulse effect
                lightning:          false,          // Object for storing/clearing setInterval for lightning effect
                oceanAcidification: false,          // false, minor and major: 
                rain:               false,          // true or false (on of off; likely to change to intensity)
                snow:               false,          // true or false (on of off; likely to change to intensity)
                seaLevel:           0,              // float number (delta) from the starting point, where around 2 initiates coastal inundation
                tornado:            false,          // true or false (on of off)
                treeSway:           false,          // Object for storing/clearing setInterval for wind affected swaying trees
                tropicalStorm:      false,          // true or false (on of off)
                volcano:            false,          // true or false (on of off)
                wind:               false,          // false, minor and major (where the windDamage determines the visual)
                winterStorm:        false,          // false, snow, blizzard, iceStorm 
                wetMass:            false,          // false, mudslide, avalanche 
            },            
            camera: {
                activeID:           'lowCam',
                flyIndex:           0,
                flyHeight:          'high'          // High or low camera for keyboard nav
            },
            animation: {
                intro:              false,
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
                        sinks:      false, 
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

    // Data Visualisiton
    const vis = {
        scale: {
            emissionsBalloon:         d3.scaleSqrt().domain([0, 30000]).range([0.25, 3]),
            emissionsBalloonString:   d3.scaleSqrt().domain([0, 30000]).range([0.1, 5]),
        }
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
            nav: {
                'tour-zone-urban': {
                    pos:            {x: 10,  y: 20,  z: 0},
                    rotation:       {x: -20,  y: -55,  z: 0}
                },
                'tour-zone-suburban':{
                    pos:            {x: 15,  y: 20,  z: 15},
                    rotation:       {x: -25,  y: 150,  z: 0}
                },
                'tour-zone-food': {
                    pos:            {x: -12,  y: 20,  z: 12},
                    rotation:       {x: -30,  y: 45,  z: 0}
                },
                'tour-zone-industrial': {
                    pos:            {x: 0,  y: 20,  z: 0},
                    rotation:       {x: -10,  y: -5,  z: 0}
                },
                'tour-zone-aquatic': {
                    pos:            {x: 10,   y: 20,  z: 5},
                    rotation:       {x: -20,  y: -120,  z: 0}
                },
                'tour-zone-transport': {
                    pos:            {x: 0,  y: 170,  z: 0},
                    rotation:       {x: -90,  y: 20,  z: 90}
                },
                'tour-zone-extractive': {
                    pos:            {x: -20,  y: 20,  z: -70},
                    rotation:       {x: -20,  y: 50,  z: 0}
                },
                'tour-zone-renewables': {
                    pos:            {x: -10,  y: 20,  z: 5},
                    rotation:       {x: -5,  y: 115,  z: 0}
                },
                'tour-zone-other': {
                    pos:            {x: 0,  y: 20,  z: 0},
                    rotation:       {x: 3,  y: 0,  z: 0}
                },
                'tour-actors-households':{
                    pos:            {x: 5.5,  y: 1.25,  z: 38},
                    rotation:       {x: 0,  y: 210,  z: 0}
                },
                'tour-actors-commercial-business':{
                    pos:            {x: 43,  y: 1.25,  z: -5},
                    rotation:       {x: 5,  y: -30,  z: 0}
                },
                'tour-actors-industrial-business':{
                    pos:            {x: 33,  y: 1.25,  z: -46},
                    rotation:       {x: 5,  y: 70,  z: 0}
                },
                'tour-actors-farmers-fishers':{
                    pos:            {x: -25,  y: 1,  z: -6},
                    rotation:       {x: 5,  y: 50,  z: 0}
                },
                'tour-actors-institutions':{
                    pos:            {x: 10,  y: 2.25,  z: -16},
                    rotation:       {x: 5,  y: -65,  z: 0}
                },
                'tour-actors-mining':{
                    pos:            {x: -37,  y: 10,  z: -64},
                    rotation:       {x: -5,  y: 27,  z: 0}
                },
                'tour-actors-land':{
                    pos:            {x: -36,  y: 1,  z: 30},
                    rotation:       {x: 5,      y: 155,  z: 0}
                },
                // 'tour-misc-dollhouse':{
                //     pos:            {x: -36,  y: 1,  z: 30},
                //     rotation:       {x: 5,      y: 155,  z: 0}
                // },

            },
        },
        hazard: {
            options: {
                bushfire:               ['Major','Extreme','Unprecendented!', 'None'],
                drought:                ['Severe drought', 'Extreme drought', 'None' ],         
                heat:                   ['Hot day', 'Very hot day', 'Heatwave', 'None'],       
                desertification:        ['Desertified land', 'None'],
                acidification:          ['Ocean acidification', 'None'],         
                stormFlood:             ['Minor flood', 'Medium flood', 'Major flood', 'None'],        
                stormWind:              ['Strong winds', 'Extreme wind', 'None'],
                wetMass:                ['Mud and landslides', 'Avalanches', 'None'],       
                tropicalStorm:          ['Tropical storm', 'None'],     
                winterStorm:            ['Snow storm', 'Blizzard', 'Ice storm', 'None'],
                earthquake:             ['Shake!'],        
                tsunami:                ['Tsunami', 'None'],     
                volcano:                ['Volcanic eruption', 'None'],     
                seaLevel:               ['Decrease', 'Increase', 'Reset']            
            },
            stages: {
                rain:                   {},
                tropicalStorm:          {},
                tsunami:                {}
            }
        }
    }

    // Model 
    // schema.model.years = [... Array(settings.modelTime.horizonYear - settings.modelTime.baselineYear).keys()].map(d => d + settings.modelTime.baselineYear)
        

    const modelData = {
        list: {
            seasons:    ['Summer', 'Autumn', 'Winter', 'Spring'],  
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
                        "Grid supplied":                   {Scope1: '',        Scope2: '',      Scope3: '',    Desc: '', Source: ''},
                        "Grid supplied (GreenPower)":      {},
                        "Solar generated on site":         {},
                        "Solar exported":                  {},
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
        builtEnvScale: ['#00a08f', '#fff', '#fee074', "ff9469", "ff6f61"],
        emissions: {
            balloons: {
                sources:        '#282828',      // Charcoal
                sinks:          '#66ff00',      // Green
                switches:       '#ff1dce',     // Magenta
            }
        }
    }

    const helpers= {
        camelize: function(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                return index === 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }, 
        slugify: function (str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
        
            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
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
                summer: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,         // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                autumn: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,         // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                winter: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,         // MIDNIGHT TO 5AM
                            0.25, 0.3, 0.5, 0.75, 0.9, 1.0,         // 6 AM TO MIDDAY
                            1.0, 0.9, 0.75, 0.9, 0.8, 0.6,          // MIDDAY TO 5PM
                            0.5, 0.2, 0.2, 0.15, 0.15, 0.15],       // 6PM TO 11PM
                spring: [ 0.15, 0.15, 0.15, 0.15, 0.2, 0.2,         // MIDNIGHT TO 5AM
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
        rotationByHour: [   
            0, 0, 0, 0, 0, 0,                       // MIDNIGHT TO 5AM
            -40, -32.5, -25, -17.5, -10 , -2.5,     // 6 AM TO MIDDAY
            2.5, 10 ,17.5, 25, 32.5, 40,            // MIDDAY TO 5PM
            40, 40, 40, 0, 0, 0                     // 6PM TO 11PM
        ],
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
 
