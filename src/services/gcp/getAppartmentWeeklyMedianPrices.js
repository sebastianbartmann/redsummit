let medianAppartmentData = [];

export async function getWeeklyMedianPrices() {
  const response = await fetch(
    "https://wohnpreise-gateway-40p1j3v3.ew.gateway.dev/wohnpreise-weekly-median?key=AIzaSyCptUBI9j-AjUgisWjEL7-plOZENTqCons"
  );

  medianAppartmentData = response.json();
  return medianAppartmentData;
}
