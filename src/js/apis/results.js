// Get Results
axios.get(`${API_FOOTBALL}${RESULTS}`, API_KEY)
.then((response) => {
  const data = response.data.response;
  console.log(data);

  let results = "";

  data.map((result) => {
    let date = new Date(result.fixture.date)
      .toLocaleString("en-GB")
      .slice(0, -3);

    results += `
      <div class="accordion col-md-6 mb-3" id="Accordion${result.fixture.id}">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse${result.fixture.id}">
              <span class="badge bg-dark me-2">GW ${result.league.round.slice(-2)}</span>
              <span class="ms-3"><strong>${result.goals.home}<br>${result.goals.away}</strong></span>
              <span class="ms-auto">${result.teams.home.name}<br>${result.teams.away.name}</span>
            </button>
          </h2>
          <div id="Collapse${result.fixture.id}" class="accordion-collapse collapse" data-bs-parent="#Accordion${result.fixture.id}">
            <div class="accordion-body">
              <div class="row">
                <div class="col-2 text-center">
                  <strong>HT</strong>
                </div>
                <div class="col">
                  ${result.score.halftime.home} - ${result.score.halftime.away}
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-center">
                  <i class="icofont-refree-jersey"></i>
                </div>
                <div class="col">
                  ${result.fixture.referee}
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
                  ${result.fixture.venue.name}, ${result.fixture.venue.city}
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <a class="d-block btn btn-dark" href="./match.html?id=${result.fixture.id}">More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("Results").innerHTML = results;
});
