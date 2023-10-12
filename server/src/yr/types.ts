export type WeatherForecast = {
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number, number];
    };
    properties: {
        meta: {
            updated_at: string;
            units: {
                air_pressure_at_sea_level: string;
                air_temperature: string;
                cloud_area_fraction: string;
                precipitation_amount?: string;  // This is optional since it doesn't appear in every 'units' object
                relative_humidity: string;
                wind_from_direction: string;
                wind_speed: string;
            };
        };
        timeseries: TimeSeriesEntry[];
    };
};

type TimeSeriesEntry = {
    time: string;
    data: {
        instant: {
            details: InstantDetails;
        };
        next_12_hours: {
            summary: {
                symbol_code: string;
            };
        };
        next_1_hours?: {
            summary: {
                symbol_code: string;
            };
            details?: {
                precipitation_amount: number;
            };
        };
        next_6_hours?: {
            summary: {
                symbol_code: string;
            };
            details?: {
                precipitation_amount: number;
            };
        };
    };
};

type InstantDetails = {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    relative_humidity: number;
    wind_from_direction: number;
    wind_speed: number;
    // ... add more properties if needed
};
