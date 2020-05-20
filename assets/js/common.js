import mapStyles from './mapStyles.js';

// Google Maps Config
const $map = document.querySelector('#map');
const map = new window.google.maps.Map($map, {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 3,
  styles: mapStyles,
});

// API Get Data
const getData = async () => {
  const response = await fetch(
    'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest'
  );
  const data = await response.json();
  return data;
};

// Render data
const popup = new window.google.maps.InfoWindow();

const renderExtraData = ({
  confirmed,
  deaths,
  recovered,
  provincestate,
  countryregion,
}) => {
  return `
  <div>
    <p><strong> ${provincestate && provincestate + ' - '} 
    ${countryregion} </strong></p>
    <p> Confirmados:  ${confirmed} </p>
    <p> Muertes:  ${deaths} </p>
    <p> Recuperados:  ${recovered} </p>
  </div>
  `;
};

const renderData = async () => {
  const data = await getData();
  console.log(data);
  data.forEach((item) => {
    const marker = new window.google.maps.Marker({
      position: {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      map,
      icon: './assets/images/icon.png',
    });
    marker.addListener('click', () => {
      popup.setContent(renderExtraData(item));
      popup.open(map, marker);
    });
  });
};
renderData();
