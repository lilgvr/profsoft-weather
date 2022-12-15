import { IWeatherResponse } from "../models";

export const stateMock: IWeatherResponse = {
    resolvedAddress: "Саратов, Приволжский федеральный округ, Россия",
    days: [
        {
            "datetime": "2022-12-15",
            "temp": -7,
            "feelslike": -9,
            "humidity": 93,
            "windspeed": 9,
            "winddir": 322,
            "pressure": 1029,
            "sunrise": "08:55:13",
            "sunset": "16:46:47",
            "conditions": "Partially cloudy",
            "icon": "partly-cloudy-day",
            "hours": [
                {
                    "datetime": "12:00:00",
                    "temp": -6,
                    "feelslike": -6,
                    "humidity": 90,
                    "windspeed": 3,
                    "winddir": 346,
                    "pressure": 1030,
                    "conditions": "Partially cloudy",
                    "icon": "partly-cloudy-day",
                },
                {
                    "datetime": "13:00:00",
                    "temp": -5,
                    "feelslike": -5,
                    "humidity": 89,
                    "windspeed": 3,
                    "winddir": 24,
                    "pressure": 1030,
                    "conditions": "Overcast",
                    "icon": "cloudy",
                }
            ]
        },
        {
            "datetime": "2022-12-16",
            "temp": -7,
            "feelslike": -9,
            "humidity": 93,
            "windspeed": 9,
            "winddir": 323,
            "pressure": 1029,
            "sunrise": "08:55:13",
            "sunset": "16:46:47",
            "conditions": "Partially cloudy",
            "icon": "partly-cloudy-day",
            "hours": [
                {
                    "datetime": "12:00:00",
                    "temp": -6,
                    "feelslike": -6,
                    "humidity": 90,
                    "windspeed": 3,
                    "winddir": 346,
                    "pressure": 1030,
                    "conditions": "Partially cloudy",
                    "icon": "partly-cloudy-day",
                },
                {
                    "datetime": "13:00:00",
                    "temp": -5,
                    "feelslike": -5,
                    "humidity": 89,
                    "windspeed": 3,
                    "winddir": 24,
                    "pressure": 1030,
                    "conditions": "Overcast",
                    "icon": "cloudy",
                }
            ]
        }
    ]
}
