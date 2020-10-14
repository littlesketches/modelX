
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
            0: 'Summer',
            1: 'Summer',
            2: 'Summer',
            3: 'Autumn',
            4: 'Autumn',
            5: 'Autumn',
            6: 'Winter',
            7: 'Winter',
            8: 'Winter',
            9: 'Spring',
            10: 'Spring',
            11: 'Spring',
        }
    },
    activityBoundary: {
        

    },
    environment: {
        sunX: {
            Summer: -0,
            Spring: -30,
            Autumn: -30,
            Sinter: -50
        }
    }
}

const state = {
    timeLoaded:         new Date(),
    time:               {},
    modelTime:          {
        hour: 0
    },
    environment: {
        windSpeed:      10, 
        windDirection:  0,
        temperature:    25
    }
}

const simulation = {
    dayLength: 60000
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


////////////


settings.lights = {
    intensity: {
        ambientIntensity: {
            midday: 1.2,
            midnight: 0
        }
    },

    byHour: {
        sunIntensity: [ 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                        0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                        0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 
                        0.8, 0.8, 0.8, 0.8, 0.8, 0.8],

        hemiIntensity:[ 0.0, 0.0, 0.0, 0.0, 0.2, 0.4, 
                        0.6, 0.8, 0.8, 0.8, 0.8, 0.8, 
                        0.8, 0.8, 0.8, 0.8, 0.8, 0.6, 
                        0.4, 0.2, 0.0, 0.0, 0.0, 0.0],

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
    hotEvening: {
            'sky-top': '#f99058', 
            'sky-bottom': '#f4fdaf',
            'fog-type':'linear', 
            'fog-density': 0, 
            'fog-col': '#fff',
            'water-col': 'aqua',
        },
        desert: {
            'sky-top':      '#fff', 
            'sky-bottom':   '#d78d37', 
            'fog-type':     'exponetial', 
            'fog-density':  0.01, 
            'fog-col':      '#8c4a0d',
            'fog-far':      200,
            'fog-near':     0,
        },

    }



function initDOMsettings(){

document.getElementById('sunriseMixin').getAttribute('animation__sunrise')
// document.getElementById('sunriseMixin').setAttribute('animation__sunrise', "property: light.intensity; from: 0; to: 1.5; dur: 15000; autoplay: false")
    // document.getElementById('sunriseMixin').setAttribute('animation__sunrise', {
    //     from:       settings.lights.intensity.ambientIntensity.midnight,
    //     to:         settings.lights.intensity.ambientIntensity.midday,  
    //     dur:        simulation.dayLength , 
    //     autoplay:   false
    // })


    // document.getElementById('sunsetMixin').setAttribute('animation__sunrise', {
    //     to:         settings.lights.intensity.ambientIntensity.midnight,
    //     from:       settings.lights.intensity.ambientIntensity.midday,  
    //     dur:        simulation.dayLength,
    //     autoplay:   false
    // })

}

