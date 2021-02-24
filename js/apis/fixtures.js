// Get Fixtures
axios.get(`${API_FOOTBALL}${FIXTURES}`, API_KEY)
.then((response) => {
  const data = response.data.response;
  console.log(data);

  let fixtures = "";

  data.map((fixture) => {
    let date = new Date(fixture.fixture.date)
      .toLocaleString("en-GB")
      .slice(0, -3);
    let referee = "";

    if (fixture.fixture.referee === null) {
      referee += "TBA";
    } else {
      referee += fixture.fixture.referee;
    }

    fixtures += `
      <div class="accordion col-md-6 mb-3" id="Accordion${fixture.fixture.id}">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse${fixture.fixture.id}">
              <span class="badge bg-dark me-2">GW ${fixture.league.round.slice(-2)}</span>
              <span class="ms-auto">${fixture.teams.home.name}<br>${fixture.teams.away.name}</span>
            </button>
          </h2>
          <div id="Collapse${fixture.fixture.id}" class="accordion-collapse collapse" data-bs-parent="#Accordion${fixture.fixture.id}">
            <div class="accordion-body">
              <div class="row">
                <div class="col-2 text-center">
                  <i class="icofont-refree-jersey"></i>
                </div>
                <div class="col">
                  ${referee}
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-center">
                  <i class="icofont-whistle-alt"></i>
                </div>
                <div class="col">
                  ${date}
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-center">
                  <i class="icofont-location-pin"></i>
                </div>
                <div class="col">
                  ${fixture.fixture.venue.name}, ${fixture.fixture.venue.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("Fixtures").innerHTML = fixtures;
});
