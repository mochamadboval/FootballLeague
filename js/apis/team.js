//Get ID Team
const ID = new URLSearchParams(window.location.search).get("id");

// Get Team Details
axios.get(`${API_FOOTBALL}${TEAM}${ID}`, API_KEY)
.then((response) => {
  const data = response.data.response[0];
  console.log(data);

  let team = `
    <div class="col-md-4 mb-3">
      <div class="text-center">
        <img src="${data.team.logo}" alt="${data.team.name}">
      </div>
      <h1 class="text-center my-2">${data.team.name}</h1>
      <div class="row my-2">
        <div class="col-2 text-center">
          <strong>Est.</strong>
        </div>
        <div class="col">
          ${data.team.founded}
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 text-center">
          <i class="icofont-location-pin"></i>
        </div>
        <div class="col">
          ${data.venue.name}
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 text-center">
          <i class="icofont-people"></i>
        </div>
        <div class="col">
          ${data.venue.capacity}
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 text-center">
          <i class="icofont-road"></i>
        </div>
        <div class="col">
          ${data.venue.address}, ${data.venue.city}
        </div>
      </div>
    </div>
    <div class="col-md-8 text-center">
      <h2>Results</h2>
      <hr>
      <div id="TeamResults"></div>
      <h2>Fixtures</h2>
      <hr>
      <div id="TeamFixtures"></div>
    </div>
  `;

  document.getElementById("TeamDetails").innerHTML = team;
});

// Get Season Fixtures
axios.get(`${API_FOOTBALL}${TEAM_FIXTURES}${ID}`, API_KEY)
.then((response) => {
  const data = response.data.response;
  console.log(data);

  // Get Results
  let teamResults = "";

  data
    .filter((result) => result.fixture.status.short === "FT")
    .slice(-5)
    .map((result) => {
      teamResults += `
        <div class="row align-items-center">
          <div class="col-5">
            ${result.teams.home.name}
          </div>
          <div class="col-2">
            <strong>${result.goals.home} - ${result.goals.away}</strong>
          </div>
          <div class="col-5">
            ${result.teams.away.name}
          </div>
        </div>
        <hr>
      `;
    });

  // Get Fixtures
  let teamFixtures = "";

  data
    .filter((fixture) => fixture.fixture.status.short === "NS")
    .slice(0, 5)
    .map((fixture) => {
      teamFixtures += `
        <div class="row align-items-center">
          <div class="col-5">
            ${fixture.teams.home.name}
          </div>
          <div class="col-2">
            <span class="badge bg-dark">${fixture.league.round.slice(-2)}</span>
          </div>
          <div class="col-5">
            ${fixture.teams.away.name}
          </div>
        </div>
        <hr>
      `;
    });

  document.getElementById("TeamResults").innerHTML = teamResults;
  document.getElementById("TeamFixtures").innerHTML = teamFixtures;
});
