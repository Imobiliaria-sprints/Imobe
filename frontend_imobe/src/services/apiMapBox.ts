const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAP_BOX}`;

export const fetchLocalMapBox =  async (local: string): Promise<any> => {
   const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`);

   return response.json();
}