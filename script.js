
// Initialize the map and set its view to the coordinates of India
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Add a black-and-white tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
}).addTo(map);

// Define an array of locations with their data
var locations = [
  {
    name: "Ajanta Caves",
    coords: [20.5521, 75.7033],
    image: "images/ajanta.jpg",
    description: "The Ajanta Caves are famous for their ancient Buddhist murals and sculptures, dating back to the 2nd century BCE."
  },
  {
    name: "Kalamkari Art",
    coords: [15.8281, 80.0034],
    image: "images/kalamkari.jpg",
    description: "Kalamkari is a traditional Indian art form that involves hand-painting or block printing on fabric, predominantly found in Andhra Pradesh."
  },
  {
    name: "Madhubani Paintings",
    coords: [26.3700, 86.4794],
    image: "images/madhubani.jpg",
    description: "Madhubani paintings are known for their vibrant colors and intricate patterns, originating from Bihar."
  },
  {
    name: "Warli Art",
    coords: [19.4221, 72.8330],
    image: "images/warli.jpg",
    description: "Warli art is a tribal art form from Maharashtra that uses simple geometric shapes to depict the daily life of the Warli tribe."
  },
  {
    name: "Pattachitra Paintings",
    coords: [20.9517, 86.1627],
    image: "images/pattachitra.jpg",
    description: "Pattachitra is a traditional scroll painting from Odisha, known for its intricate details and mythological narratives."
  },
  {
    name: "Tanjore Paintings",
    coords: [10.7867, 79.1378],
    image: "images/tanjore.jpg",
    description: "Tanjore paintings are a classical South Indian art form known for their rich colors, surface richness, and compact composition."
  },
  {
    name: "Miniature Paintings",
    coords: [26.9124, 75.7873],
    image: "images/miniature.jpg",
    description: "Rajasthan is famous for its miniature paintings, characterized by their fine brushwork, vibrant colors, and detailed storytelling."
  },
  {
    name: "Khajuraho Temples",
    coords: [24.8318, 79.9195],
    image: "images/khajuraho.jpg",
    description: "The Khajuraho Group of Monuments are known for their stunning erotic sculptures and intricate stone carvings."
  },
  {
    name: "Mughal Paintings",
    coords: [28.6139, 77.2090],
    image: "images/mughal.jpg",
    description: "Mughal paintings flourished in the courts of Mughal emperors and are known for their detailed portrayal of court life, battles, and nature."
  },
  {
    name: "Kalighat Paintings",
    coords: [22.5726, 88.3639],
    image: "images/kalighat.jpg",
    description: "Kalighat paintings are a style of Indian painting originating in the 19th century Bengal, known for their bold lines and vibrant depiction of mythological themes."
  }
];

// Populate the dropdown menu
var locationSelect = document.getElementById('locationSelect');
locations.forEach(function(location, index) {
  var option = document.createElement('option');
  option.value = index;
  option.text = location.name;
  locationSelect.appendChild(option);
});

// Loop through the locations and add markers to the map
locations.forEach(function(location) {
  var marker = L.marker(location.coords).addTo(map);
  var popupContent = `
    <h3>${location.name}</h3>
    <img src="${location.image}" alt="${location.name}" style="width:100%; height:auto; border-radius: 8px;">
    <p>${location.description}</p>`;
  marker.bindPopup(popupContent).on('click', function() {
    this.openPopup();
    addPopupAnimation();
  });
});

// Add event listener to the dropdown menu
locationSelect.addEventListener('change', function() {
  var selectedIndex = locationSelect.value;
  if (selectedIndex !== "") {
    var selectedLocation = locations[selectedIndex];
    map.setView(selectedLocation.coords, 10);
    L.popup()
      .setLatLng(selectedLocation.coords)
      .setContent(`
        <h3>${selectedLocation.name}</h3>
        <img src="${selectedLocation.image}" alt="${selectedLocation.name}" style="width:100%; height:auto; border-radius: 8px;">
        <p>${selectedLocation.description}</p>
      `)
      .openOn(map);
    addPopupAnimation();
  }
});

// Function to add animation class to popup
function addPopupAnimation() {
  const popup = document.querySelector('.leaflet-popup');
  if (popup) {
    popup.classList.add('animated-popup');
    setTimeout(() => popup.classList.remove('animated-popup'), 1000);
  }
}
