import ForecastResponse from '@/http/open-weather/types/ForecastResponse';
import forecastClient from '@/http/open-weather/forecastClient';

export default async ( location: string ): Promise<ForecastResponse | null> =>
{
    const response = await forecastClient.get<ForecastResponse>( '/', {
        params: {
            q: location,
        },
    } );

    if ( response.status !== 200 ) {
        return null;
    }

    return response.data;
};
