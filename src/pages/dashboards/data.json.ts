import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ request }) => {

    const requestURL = "https://randomuser.me/api/?inc=name";

    const response = await fetch(requestURL, {
        method: "GET"
    });
    
    const responseData = await response.json();

    return new Response(JSON.stringify(responseData), { status: 200 });
}