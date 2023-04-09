async function getWeeklyMedianPrices() {
  const response = await fetch(
    "https://wohnpreise-gateway-40p1j3v3.ew.gateway.dev/wohnpreise-weekly-median?key=AIzaSyCptUBI9j-AjUgisWjEL7-plOZENTqCons"
  );

  data = response.json();
  return data;
}

module.exports = getWeeklyMedianPrices;
