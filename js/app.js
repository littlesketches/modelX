
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
    environment: {
        windSpeed:      10, 
        windDirection:  0,
        temperature:    25
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
