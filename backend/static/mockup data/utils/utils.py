from ast import Str

import pandas as pd


def airports_csv_to_json(path_to_csv: Str = r"mockup data/airports.csv"):
    # columns = [
    #     # "id", #0
    #     "ident",  # 1
    #     "type",  # 2
    #     "name",  # 3
    #     "latitude_deg",  # 4
    #     "longitude_deg",  # 5
    #     # "elevation_ft", #6
    #     # "continent", #7
    #     "iso_country",  # 8
    #     # "iso_region", #9
    #     "municipality",  # 10
    #     # "scheduled_service", # 11
    #     # "gps_code", # 12
    #     "iata_code",  # 13
    #     # "local_code",  # 14
    #     # "home_link", # 15
    #     # "wikipedia_link", # 16
    #     # "keywords", # 17
    # ]

    raw_data = pd.read_csv(
        path_to_csv, na_filter=False, header=0, usecols=[1, 2, 3, 4, 5, 8, 10, 13]
    )

    raw_df = pd.DataFrame(raw_data)

    # replace empty field for municipality with a default string
    raw_df.municipality.replace("", "No municipality", inplace=True)

    # include only medium and large airports in json
    df = raw_df.loc[raw_df["type"].isin(["large_airport", "medium_airport"])]

    df.to_json(r"mockup data/airports.json", orient="records")


def airlines_csv_to_json(
    path_to_csv: Str = r"mockup data/airlines.csv",
):

    columns = [
        "id",  # 0
        "Name",  # 1
        "Alias",  # 2
        "IATA",  # 3
        "ICAO",  # 4
        "Callsign",  # 5
        "Country",  # 6
        "Active",  # 7
    ]

    raw_data = pd.read_csv(path_to_csv, names=columns, usecols=[1, 3, 4, 6, 7])
    raw_df = pd.DataFrame(raw_data)
    # print(raw_df)
    raw_df.drop(raw_df[raw_df.Active == "N"].index, inplace=True)
    df = raw_df.dropna()
    # print(raw_df)
    df.to_json(r"mockup data/airlines.json", orient="records")


def flight_route_csv_to_json(path_to_csv: Str = r"mockup data/flightroutes.csv"):
    columns = [
        "airline",  # 0
        # 'na', #1
        "origin",  # 2
        # 'na'  ,    #3
        "target",  # 4
        # 'na' ,  #5
        # 'na' ,  #6
        # 'na' ,  #7
        # 'na' ,   #8
        # 'na' ,   #9
    ]

    raw_data = pd.read_csv(
        path_to_csv,
        header=None,
        skipinitialspace=True,
        names=columns,
        usecols=[0, 2, 4],
    )

    # get IATA codes from airports.json and make data frame
    airports = pd.read_json(r"mockup data/airports.json")
    airports_df = pd.DataFrame(airports)
    iata_df = airports_df.iata_code
    # print(iata_df)
    raw_df = pd.DataFrame(raw_data)

    # get Airline codes from airlines.json and make data frame

    airlines = pd.read_json(r"mockup data/airlines.json")
    airlines_df = pd.DataFrame(airlines)
    airline_Code_df = airlines_df.IATA
    print(airline_Code_df)

    raw_df = pd.DataFrame(raw_data)
    raw_df.drop(
        raw_df.loc[
            ~raw_df.origin.isin(iata_df)
            | ~raw_df.target.isin(iata_df)
            | ~raw_df.airline.isin(airline_Code_df)
        ].index,
        inplace=True,
    )
    print(raw_df)
    # drop routes from and to same location
    raw_df.drop(raw_df.loc[raw_df.origin == raw_df.target].index, inplace=True)

    # Finally write df to json
    df = raw_df
    df.to_json(r"mockup data/flight_routes.json", orient="records")
    # print(df)


# airports_csv_to_json()
# airlines_csv_to_json()
flight_route_csv_to_json()
