const ip = window.location.hostname;
export async function fetchPizzaData() {
  const address = "http://" + ip + ":5000/api/pizzas";
  const response = await fetch(address);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch pizza data.");
  }

  return resData;
}

export async function postOrder(order) {
  const address = "http://" + ip + ":5000/api/add-order";
  let ok = false;
  try {
    const response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });
    ok = response['ok'];
  } catch (error) {
    console.log("Failed to add order", error);
  }
  return ok;
}

export function getIp() {
  return ip;
}
