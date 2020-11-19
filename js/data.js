/**************************************************************************/
/**************************************************************************/
/****              Project: Kingdom of Dreams and Madness              ****/
/****                                                                  ****/
/****  An exploration of building 'dynamic models' in a humane form    ****/
/****  By Little Sketches | Version 0.01 | Copyright applies until a   ****/
/****  a completed protoype is released  under a Creative Commons      ****/
/***   4.0 license                                                     ****/
/**************************************************************************/
/****  This data.js file is used to develop data settings schema that  ****/
/****  configures the A-Frame scene canvas, which has script logic     ****/
/****  written as as custom A-Frame components (see comopnent.js)      ****/
/**************************************************************************/


    const model ={ 

        data: {
            baseline: {
                residential: {
                    "detached-sml":{
                        features:{
                            eletricity: {
                                grid:           1,
                                solar:          0.3,
                                battery:        0.2,
                            },        
                            gas: {
                                reticulated:    0.6,
                                lpg:            0.2         
                            },
                            wood:               0.1,
                        },
                        vehicles: {
                            no:                 1
                        }
                    },
                    "detached-lrg":     {},
                    "townhouse":        {},
                    "apartment":        {},
                }
            },
        },


        scene: {
            builtEnv: {
                dwellings: {
                    "detached-sml": {
                        "home-01": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                            vehicles: {
                                0: {
                                    type:               'passenger',
                                    size:               'small',
                                    age:                4,
                                    fuel:               'petrol'
                                }
                            },              
                            data: {
                                emissions: {
                                    scope1: {
                                        mainsGas:           '',
                                        bottledLPG:         '',
                                        wood:               '',
                                        refrigerants:       '',
                                        petrol:             '',
                                        diesel:             '',
                                    },
                                    scope2: {
                                        gridElectricity:    '',
                                    },
                                    scope3: {
                                        electricityDist:    '',
                                        gasDist:            '',
                                        waterSupply:        '',
                                        wasteDisposal:      '',
                                        wasteWater:         '',
                                    },
                                    offset: {
                                        greenPower:         '',
                                        purchased:          '',
                                        solarExport:        '',
                                    },
                                    switched: {
                                        solar:              '',
                                    },
                                    bySectorSource: {

                                    }
                                },
                                consumption: {
                                    stationatyFuel: {
                                        electricity:            '',
                                        gridElectricity:        '',
                                        solar:                  '',
                                        mainsGas:               '',
                                        bottledLPG:             '',
                                    },
                                    transportFuel: {
                                        petrol:                 '',
                                        diesel:                 '',
                                    },
                                    energyGJ: {
                                        stationary:             '',
                                        transport:             '',
                                    },
                                    waste: {
                                        wasteLandfill:          '',
                                        wasteLRecycled:         '',
                                    }
                                }
                            }
                        },
                        "home-02": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-03": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-04": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-05": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-06": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-07": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-08": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-09": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-10": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-11": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-12": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-14": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-14": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-15": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-16": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-17": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-18": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-19": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-20": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-21": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-22": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-23": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                    },
                    "detached-lrg": {
                        "home-24": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-25": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-26": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-27": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-28": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-29": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-30": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                        "home-31": {
                            occupantType:                 'family',
                            noOccupants:                   4,
                            features: {
                                electricity:                true,
                                solarPV:                    2,
                                battery:                    true,
                                airConditioning:            true,
                                fireplace:                  true,
                                gas:                        'mains',
                            },
                        },
                    }
                }
            },
            balloonScale: {
                // Emission source objects
                sources: {
                    stationaryEnergy: {
                        scope1: {
                            residential:{
                                mainsGas: {
                                    smallDwellings:         {scale: 0.25,  stringLength: 2},
                                    largeDwellings:         {scale: 0.35,  stringLength: 2},
                                    townhouses:             {scale: 0.25,  stringLength: 2},
                                },
                                bottledLPG: {
                                    smallDwellings:         {scale: 0.25,  stringLength: 2},
                                    largeDwellings:         {scale: 0.25,  stringLength: 2},
                                    townhouses:             {scale: 0.25,  stringLength: 2},
                                },
                                wood: {
                                    smallDwellings:         {scale: 0.1,  stringLength: 0.25},
                                    largeDwellings:         {scale: 0.2,  stringLength: 0.25},
                                }
                            },
                            commercial: {
                                mainsGas: {
                                    offices:                {scale: 0.5,  stringLength: 4.5},
                                    retail:                 {scale: 0.5,  stringLength: 2.5},
                                    hospitality:            {scale: 0.5,  stringLength: 4},
                                    accomodation:           {scale: 1.0,  stringLength: 4},
                                },
                                bottledLPG: {
                                    offices:                {scale: 0.5,  stringLength: 4},
                                    retail:                 {scale: 0.5,  stringLength: 4},
                                    hospitality:            {scale: 0.5,  stringLength: 4},
                                    accomodation:           {scale: 1.0,  stringLength: 4},
                                },
                            },
                            industrial: {
                                electricityGeneration: {
                                    coalFired:              {scale: 15.0,  stringLength: 5},
                                    gasFired:              {scale: 2.0,  stringLength: 2},
                                },
                                mainsGas: {
                                    other:                  {scale: 2.0,  stringLength: 4},
                                    mineral:                {scale: 2.0,  stringLength: 4},
                                    chemical:               {scale: 3.0,  stringLength: 4},
                                    metal:                  {scale: 5.0,  stringLength: 4},
                                    electronics:            {scale: 2.0,  stringLength: 4},
                                },
                            },
                            agriculture: {
                                mainsGas: {
                                    farm:                    {scale: 1.0,  stringLength: 2},
                                },
                                bottledLPG:                 {},
                                diesel:                     {},
                            },
                            institutional: {
                                mainsGas: {
                                    government:             {scale: 1.0,  stringLength: 4},
                                    hospital:               {scale: 0.5,  stringLength: 4},
                                    airport:                {scale: 1.0,  stringLength: 4},
                                    school:                 {scale: 1.0,  stringLength: 4},
                                    church:                 {scale: 1.0,  stringLength: 4},
                                },
                                bottledLPG:                 {},
                                diesel:                     {},
                            },
                        },
                        scope2: {                       
                            residential: {
                                gridElectricity: {
                                    smallDwellings:         {scale: 0.8,  stringLength: 1},
                                    largeDwellings:         {scale: 1.0,  stringLength: 1},
                                    townhouses:             {scale: 0.5,  stringLength: 1},
                                }
                            },  
                            commercial:  {
                                gridElectricity: {
                                    offices:               {scale: 2.0,  stringLength: 2},
                                    officeTowers:          {scale: 3.5,  stringLength: 2},
                                    retail:                {scale: 2.0,  stringLength: 2},
                                    hospitality:           {scale: 1.0,  stringLength: 2},
                                    accomodation:          {scale: 1.0,  stringLength: 2},
                                }
                            },   
                            industrial: {
                                gridElectricity: {
                                    other:                  {scale: 2.0,  stringLength: 3},
                                    minerals:               {scale: 1.0,  stringLength: 3},
                                    chemicals:              {scale: 3.0,  stringLength: 3},
                                    metals:                 {scale: 1.0,  stringLength: 3},
                                    electronics:            {scale: 1.0,  stringLength: 3},
                                }
                            },          
                            farming:  {
                                gridElectricity: {
                                    largeFarm:              {scale: 0.8,  stringLength: 2},
                                    smallFarm:              {scale: 0.5,  stringLength: 2},
                                }
                            },          
                            institutional: {
                                gridElectricity: {
                                    government:             {scale: 3.0,  stringLength: 2},
                                    airport:                {scale: 3.0,  stringLength: 4}, 
                                    hospital:               {scale: 3.5,  stringLength: 2},
                                    church:                 {scale: 1.0,  stringLength: 2},
                                    school:                 {scale: 1.5,  stringLength: 2},
                                }  
                            },
                        },
                        scope3: {
                            industrial: {
                                gridElectricity: {
                                    transmission:          {scale: 0.125,  stringLength: 0.5},
                                    distribution:          {scale: 0.125,  stringLength: 0.5}
                                },
                                mainsGas: {
                                    distribution:          {scale: 0.125,  stringLength: 2}
                                }
                            }
                        }
                    },
                    transportEnergy: {
                        scope1: {
                        }
                    },
                    waste: {
                        scope1: {
                            industrial: {
                                landfill: {
                                    MSW:                    {scale: 5.0,  stringLength: 2},
                                    CandI:                  {scale: 3.0,  stringLength: 2},
                                    CandD:                  {scale: 1.0,  stringLength: 2},
                                },
                                incineration:                    {},
                                biologicalTreatment:             {},
                            }
                        },
                        scope3: {
                            residential: {
                                MSW: {    
                                    smallDwellings:         {scale: 0.25,  stringLength: 2},
                                    largeDwellings:         {scale: 0.35,  stringLength: 2},
                                }
                            },
                            commercial: {
                                CandI: {
                                    offices:                {scale: 0.75,  stringLength: 4},
                                }               
                            },  
                            industrial: {
                                CandI: {
                                    other:                  '',
                                    mineral:                '',
                                    chemical:               '',
                                    metal:                  '',
                                    electronics:            ''
                                }               
                            } ,
                            institutional: {
                                CandI: {
                                    government:             '',
                                    hospital:               '',
                                    airport:                ''
                                },
                                MSW: { 
                                    school:                 '',
                                    church:                 ''
                                }
                            }
                        }
                    },
                    wasteWater: {
                        scope1: {
                            industrial: {
                                treatment: {
                                    sewered:                 '',
                                    septics:                 ''
                                }
                            }
                        },
                        scope3: {
                            residential:{
                                sewered: {
                                    smallDwellings:         '',
                                    largeDwellings:         '',
                                    townhouses:             ''
                                }
                            },
                            commercial:{
                                sewered: {
                                    offices:                '',
                                    officeTowers:           '',
                                    retail:                 '',
                                    hospitality:            '',
                                    accomodation:           ''     
                                }
                            },
                            industrial:{
                                sewered: {
                                    other:                  '',
                                    mineral:                '',
                                    chemical:               '',
                                    metal:                  '',
                                    electronics:            ''
                                }
                            },
                            farming:{},
                            institutional:{
                                sewered: {
                                    government:             '',
                                    airport:                '',   
                                    hospital:               '',
                                    church:                 '',
                                    school:                 '',
                                }
                            },
                        },
                    },
                    agriculture: {
                        scope1: {
                            farming: {
                                livestockEnteric: {
                                    cattle:         {scale: 2.0,  stringLength: 2},
                                    pigs:           {scale: 1.0,  stringLength: 2},
                                    sheep:          {scale: 0.5,  stringLength: 2},
                                    poultry:        {scale: 0.25,  stringLength: 2},
                                },
                                livestockManure: {},
                                livestockGrazing: {
                                    cattle:         [],
                                    pigs:           [],
                                    sheep:          [],
                                    poultry:        []
                                },
                                cropping: {
                                    wheat:              {scale: 2.0,  stringLength: 4},
                                    corn:               {scale: 2.0,  stringLength: 4},
                                    other:              {scale: 1.0,  stringLength: 4},
                                },
                                fruitAndVeg: {
                                    apples:             {scale: 1.0,  stringLength: 4},
                                }
                            },
                        },
                        scope3: {

                        }
                    },
                    land: {
                        scope1: {
                            farming: {
                                conversion:             '',
                                clearing:               '',
                                reclearing:             ''
                            },
                            institutional: {
                                conversion:             '',
                                clearing:               '',
                                reclearing:             ''
                            }
                        }
                    },
                    industrialProcesses: {
                        scope1: {
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
                            industrial: {
                                electricityGeneration: {
                                    solar:                  {scale: 1,  stringLength: 2},
                                    wind:                   {scale: 4,  stringLength: 3},
                                    hydro:                  {scale: 4,  stringLength: 4},
                                }
                            }
                        },
                        scope2: {
                            residential: {
                                onSiteSolar: {
                                    smallDwellings:         {scale: 0.5,  stringLength: 1},
                                    largeDwellings:         {scale: 0.5,  stringLength: 1},
                                    townhouses:             []
                                },
                            },
                            commercial:  {
                                onSiteSolar: {
                                    offices:                [],
                                    retail:                 [],
                                    hospitality:            [],
                                    accomodation:           []
                                }
                            },   
                            industrial: {
                                onSiteSolar: {
                                    other:                  [],
                                    mineral:                [],
                                    chemical:               [],
                                    metal:                  [],
                                    electronics:            []
                                }
                            },          
                            agriculture:  {
                                onSiteSolar: {
                                    largeFarm:              [],
                                    smallFarm:              [],
                                    groundMounted:          [],
                                }
                            },          
                            institutional: {
                                onSiteSolar: {
                                    government:             [],
                                    airport:                [],
                                    hospital:               [],
                                    church:                 [],
                                    school:                 {scale: 0.5,  stringLength: 1},
                                }
                            }  
                        },
                        scope3: {}
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
    }   
