from ast import Str
import json
import pandas as pd
import numpy as np

def cleanAirportsWithPandas(path_to_csv: Str=r'airport_db.csv'):
    columns=[
        'icao_code',#0
        'iata_code', #1
        'name'   ,    #2
        'city'  ,    #3
        'country' ,  #4
        # 'lat_deg' ,  #5
        # 'lat_min' ,  #6
        # 'lat_sec' ,  #7
        # 'lat_dir' ,   #8
        # 'lon_deg' ,   #9
        # 'lon_min' ,  #10
        # 'lon_sec' ,  #11
        # 'lon_dir'  , #12
        # 'altitude' , #13
        'lat_decimal',#14
        'lon_decimal', #15
    ]

    rawData = pd.read_csv(path_to_csv
    ,header=None,
    skipinitialspace=True,
    na_filter=False,
    names=columns,
    usecols=[0,1,2,3,4,14,15]
    )
    rawData.replace('N/A',np.nan,inplace=True)
    rawData.replace('KOREA','SOUTH KOREA',inplace=True)
    rawData.replace('NORTH IRELAND','IRELAND',inplace=True)
    rawData.replace('ENGLAND','UNITED KINGDOM',inplace=True)
    rawData.replace('ENGALAND','UNITED KINGDOM',inplace=True)
    rawData.replace('ENGALND','UNITED KINGDOM',inplace=True)

    rawData.replace('UK','UNITED KINGDOM',inplace=True)
    rawData.replace('WALES','UNITED KINGDOM',inplace=True)
    rawData.replace('SCOTLAND','UNITED KINGDOM',inplace=True)
    rawData.replace('FAROE ISL.','FAROE ISLANDS',inplace=True)
    rawData.replace('LUXEMBURG.','LUXEMBOURG',inplace=True)
    rawData.replace('LUXEMBURG','LUXEMBOURG',inplace=True)
    rawData.replace('PALAU ISLAND','PALAU',inplace=True)
    rawData.replace('MARIANA ISLANDS','NORTHERN MARIANA ISLANDS',inplace=True)
    rawData.replace('SURINAM','SURINAME',inplace=True)
    rawData.replace('FRENCH GUYANA','FRENCH GUIANA',inplace=True)
    rawData.replace('VIRGIN ISL','UNITED STATES VIRGIN ISLANDS',inplace=True)
    rawData.replace('VIRGIN ISL.','UNITED STATES VIRGIN ISLANDS',inplace=True)

    rawData.replace('CONGO.','REPUBLIC OF THE CONGO',inplace=True)
    rawData.replace('CONGO','REPUBLIC OF THE CONGO',inplace=True)
    rawData.replace('ZAIRE','DR CONGO',inplace=True)
    rawData.replace('CANARY ISLANDS','SPAIN',inplace=True)
    rawData.replace('CZECH REPUBLIC','CZECHIA',inplace=True)
    rawData.replace('BOSNIA-HERCEGOVINA','BOSNIA AND HERZEGOVINA',inplace=True)

    rawData.replace('GUERNSEY ISLD','GUERNSEY',inplace=True)
    rawData.replace('CENTRAL AFRICAN REP.','CENTRAL AFRICAN REPUBLIC',inplace=True)
    rawData.replace('COMOROS ISLANDS','COMOROS',inplace=True)
    rawData.replace('MAYOTTE ISLAND','MAYOTTE',inplace=True)
    rawData.replace('GUINEA BISSAU','GUINEA-BISSAU',inplace=True)
    rawData.replace('CAPE VERDE ISLANDS','CAPE VERDE',inplace=True)
    rawData.replace('USA','UNITED STATES',inplace=True)
    rawData.replace('ST.VINCENT/GRENADINES','SAINT VINCENT AND THE GRENADINES',inplace=True)
    rawData.replace('VIET NAM','VIETNAM',inplace=True)
    # rawData.replace('&','AND',inplace=True)

    rawData.replace('SAO TOME & PRINCIPE','São Tomé and Príncipe',inplace=True)
    rawData.replace('TRINIDAD & TOBAGO','TRINIDAD AND TOBAGO',inplace=True)
    rawData.replace('WALLIS & FUTUNA','WALLIS AND FUTUNA',inplace=True)
    rawData.replace('GALAPAGOS I. ECUADOR','ECUADOR',inplace=True)



    rawDf= pd.DataFrame(rawData)
    df = rawDf.dropna()
    # print(df.to_json)
    # with open(file='json_airports.json',mode='w') as file:
    #     file.write(json.dumps(df.to_dict('records')))        
    return df.to_dict('records')



def cleanFlightRoutsWithPandas(path_to_csv: Str=r'back\util\db.utils\flight_routes.csv'):
    columns=[
        'airline',#0
        # 'na', #1
        'origin'   ,    #2
        # 'na'  ,    #3
        'destination' ,  #4
        # 'na' ,  #5
        # 'na' ,  #6
        # 'na' ,  #7
        # 'na' ,   #8
        # 'na' ,   #9
    ]

    rawData = pd.read_csv(path_to_csv
    ,header=None,
    skipinitialspace=True,
    na_filter=False,
    names=columns,
    usecols=[0,2,4]
    )
    rawData.replace('N/A',np.nan,inplace=True)
    rawDf= pd.DataFrame(rawData)
    df = rawDf.dropna()
    return df.to_dict('records')