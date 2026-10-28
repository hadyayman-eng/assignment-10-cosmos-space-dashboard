async function solveSectionOne() {
  const imgElement = document.getElementById("apod-image");
  const specficDate = document.getElementById("apod-specfic");
  const calender = document.getElementById("calender");
  const apodDateInfo = document.getElementById("apod-date-info");
  const apodDateDetail = document.getElementById("apod-date-detail");
  const apodExplanation = document.getElementById("apod-explanation");
  const btnRosultion = document.getElementById("btnRosultion");

  let apiLink = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=Wf5cFIER6IhPEmk13NHoufKbpQaVZF84h1ES5eUU",
  );
  let data = await apiLink.json();
  imgElement.setAttribute("src", data.url);
  const formatedDate = new Date(data.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  specficDate.innerHTML = formatedDate;
  apodDateInfo.innerHTML = formatedDate;
  apodDateDetail.innerHTML = formatedDate;
  apodExplanation.innerHTML = data.explanation;
  calender.innerHTML = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  btnRosultion.addEventListener("click", () => {
    window.open(data.hdurl, "_blank");
  });
}

solveSectionOne();



const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.app-section');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(l => {
      l.classList.remove('bg-blue-500/10', 'text-blue-400');
      l.classList.add('text-slate-300', 'hover:bg-slate-800');
    });

    link.classList.add('bg-blue-500/10', 'text-blue-400');
    link.classList.remove('text-slate-300', 'hover:bg-slate-800');

    const targetSectionId = link.getAttribute('data-section');

    sections.forEach(sec => {
      sec.classList.add('hidden');
    });

    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    if (targetSectionId === 'launches') {
      solveLaunches();
    }
    if (targetSectionId === 'planets') {
    solvePlanets();
}
  });
});
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
});
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
    sidebar.classList.remove('sidebar-open');
  }
});
async function solveLaunches() {
  let response = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
  let data = await response.json();
  displayLaunches(data.results);
}

const statusColors = {
  Go: "bg-green-500/90",
  TBC: "bg-yellow-500/90",
  TBD: "bg-blue-500/90",
};

function displayLaunches(list) {
  document.getElementById("launches-count").textContent = list.length + " Launches";
  document.getElementById("launches-count-mobile").textContent = list.length;

  showFeatured(list[0]);

  let cards = "";
  for (let i = 1; i < list.length; i++) {
    const launch = list[i];
    const d = new Date(launch.net);
    const status = launch.status.abbrev;

    cards += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        <div class="relative h-48">
          <img src="${launch.image?.image_url}" alt="${launch.name}" class="w-full h-full object-cover">
          <span class="absolute top-3 right-3 px-3 py-1 ${statusColors[status] || "bg-slate-500/90"} rounded-full text-xs font-semibold">${status}</span>
        </div>
        <div class="p-5">
          <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${launch.name}</h4>
          <p class="text-sm text-slate-400 mb-3"><i class="fas fa-building text-xs"></i> ${launch.launch_service_provider.name}</p>
          <div class="space-y-2 mb-4 text-sm text-slate-300">
            <p><i class="fas fa-calendar text-slate-500 w-4"></i> ${d.toUTCString().slice(5, 16)}</p>
            <p><i class="fas fa-clock text-slate-500 w-4"></i> ${d.toUTCString().slice(17, 22)} UTC</p>
            <p><i class="fas fa-rocket text-slate-500 w-4"></i> ${launch.rocket.configuration.name}</p>
            <p class="line-clamp-1"><i class="fas fa-map-marker-alt text-slate-500 w-4"></i> ${launch.pad.location.name}</p>
          </div>
          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
          </div>
        </div>
      </div>`;
  }
  document.getElementById("launches-grid").innerHTML = cards;
}

function showFeatured(launch) {
  const d = new Date(launch.net);
  const daysLeft = Math.ceil((d - new Date()) / 86400000);

  document.getElementById("featured-launch").innerHTML = `
    <div class="bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold"><i class="fas fa-star"></i> Featured Launch</span>
          <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">${launch.status.abbrev}</span>
        </div>
        <h3 class="text-3xl font-bold mb-3">${launch.name}</h3>
        <div class="flex gap-4 mb-6 text-slate-400">
          <span><i class="fas fa-building"></i> ${launch.launch_service_provider.name}</span>
          <span><i class="fas fa-rocket"></i> ${launch.rocket.configuration.name}</span>
        </div>
        <div class="inline-block px-6 py-3 bg-blue-500/20 rounded-xl mb-6">
          <p class="text-2xl font-bold text-blue-400">${daysLeft}</p>
          <p class="text-xs text-slate-400">Days Until Launch</p>
        </div>
        <div class="grid xl:grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1"><i class="fas fa-calendar"></i> Launch Date</p>
            <p class="font-semibold">${d.toUTCString().slice(5, 16)}</p>
          </div>
          <div class="bg-slate-900/50 rounded-xl p-4">
            <p class="text-xs text-slate-400 mb-1"><i class="fas fa-clock"></i> Launch Time</p>
            <p class="font-semibold">${d.toUTCString().slice(17, 22)} UTC</p>
          </div>
          <div class="bg-slate-900/50 rounded-xl p-4 xl:col-span-2">
            <p class="text-xs text-slate-400 mb-1"><i class="fas fa-map-marker-alt"></i> Location</p>
            <p class="font-semibold text-sm">${launch.pad.location.name}</p>
          </div>
        </div>
        <p class="text-slate-300 mb-6 line-clamp-4">${launch.mission?.description || ""}</p>
        <button class="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold"><i class="fas fa-info-circle"></i> View Full Details</button>
      </div>
      <div class="min-h-[400px] rounded-2xl overflow-hidden">
        <img src="${launch.image?.image_url}" alt="${launch.name}" class="w-full h-full object-cover">
      </div>
    </div>`;
}

let planets = [];

async function solvePlanets() {
  let response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
  let data = await response.json();
  planets = data.bodies;
  showPlanet("earth");
}

document.querySelectorAll(".planet-card").forEach((card) => {
  card.addEventListener("click", () => showPlanet(card.dataset.planetId));
});

function showPlanet(id) {
  const p = planets.find((planet) => planet.englishName.toLowerCase() === id);
  if (!p) return;

  const moons = p.moons ? p.moons.length : 0;
  const temp = p.avgTemp ? (p.avgTemp - 273.15).toFixed(0) + "°C" : "N/A";

  document.getElementById("planet-detail-image").src = `./assets/images/${id}.png`;

  const values = {
    "planet-detail-name": p.englishName,
    "planet-detail-description": p.description,
    "planet-distance": (p.semimajorAxis / 1000000).toFixed(1) + "M km",
    "planet-radius": p.meanRadius.toLocaleString() + " km",
    "planet-mass": p.mass.massValue + " × 10^" + p.mass.massExponent + " kg",
    "planet-density": p.density + " g/cm³",
    "planet-orbital-period": p.sideralOrbit + " days",
    "planet-rotation": p.sideralRotation + " hours",
    "planet-moons": moons,
    "planet-gravity": p.gravity + " m/s²",
    "planet-discoverer": p.discoveredBy || "Known since antiquity",
    "planet-discovery-date": p.discoveryDate || "Ancient",
    "planet-body-type": p.bodyType,
    "planet-volume": p.vol.volValue + " × 10^" + p.vol.volExponent + " km³",
    "planet-perihelion": (p.perihelion / 1000000).toFixed(1) + "M km",
    "planet-aphelion": (p.aphelion / 1000000).toFixed(1) + "M km",
    "planet-eccentricity": p.eccentricity,
    "planet-inclination": p.inclination + "°",
    "planet-axial-tilt": p.axialTilt + "°",
    "planet-temp": temp,
    "planet-escape": (p.escape / 1000).toFixed(1) + " km/s",
  };

  for (const elementId in values) {
    document.getElementById(elementId).textContent = values[elementId];
  }

  document.getElementById("planet-facts").innerHTML = `
    <li class="text-slate-300">✔ Has ${moons} moon(s)</li>
    <li class="text-slate-300">✔ Orbits the Sun every ${p.sideralOrbit} days</li>
    <li class="text-slate-300">✔ Average temperature is ${temp}</li>`;
}