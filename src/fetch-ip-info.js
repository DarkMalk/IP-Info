const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com',
  },
}

const fetchIpInfo = (ip) => {
  return fetch(
    `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
    OPTIONS
  )
    .then((response) => response.json())
    .catch((err) => console.log(err))
}

export default fetchIpInfo