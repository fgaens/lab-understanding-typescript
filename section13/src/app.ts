import axios from 'axios';


const form = document.querySelector('form')!;
const addressInput = <HTMLInputElement>document.getElementById('address')!;

const GOOGLE_API_KEY = "some_key";

type GoogleGeocodingResponse = {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number
            }
        }
    }[],
    status: string;
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Error getting address');
            }
            const coordinates = response.data.results[0].geometry.location;

            console.log(coordinates);

            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 16
            })

            new google.maps.Marker({
                position: coordinates,
                map: map
            })
        })
        .catch(error => {
            alert(error.message);
            console.log(error);
        });
}

form.addEventListener('submit', searchAddressHandler)