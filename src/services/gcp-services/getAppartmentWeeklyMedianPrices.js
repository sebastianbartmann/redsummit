let data;

export async function getWeeklyMedianPrices() {

    const response = await fetch('x');

    data = response.json();
    return data;
}