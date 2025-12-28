'use server';

import qs from 'query-string'

const BASE_URL=process.env.COINGECKO_BASE_URL ;
const API_KEY=process.env.COINGECKO_API_KEY ;

if(!BASE_URL){
    throw new Error('Could not get base url');
}
if(!API_KEY){
    throw new Error('Could not get api key');
}
export async function fetcher<T>(
    endpoint:string,
    params?: QueryParams,
    revalidate=60,
):Promise<T>{
    const url= qs.stringifyUrl({
        url:`${BASE_URL}/${endpoint}`,
        query:params,
    },{skipEmptyString: true, skipNull: true});
    const response= await fetch(url,{

        headers:{
            'Content-Type':'application/json',
            'X-CG-Pro-API-Key':API_KEY,
        } as Record<string,string>,
        next:{
            revalidate,
        },
    });
    if(!response.ok){
        throw new Error(`Error fetching data from CoinGecko: ${response.status} ${response.statusText}`);
    }
    const data= await response.json();
    return data as T;
}

interface QueryParams{
    [key:string]: string | number | boolean | undefined | null;
}   