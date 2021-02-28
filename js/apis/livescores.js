// Get Live Scores
axios.get(`${API_FOOTBALL}${LIVESCORES}`, API_KEY)
.then((response) => {
  const data = response.data.response;
  console.log(data);

  let livescores = "";

  if (data.length === 0) {
    livescores = `<p class="text-center">No matches are being played.</p>`;

    document.getElementById("Livescores").innerHTML = livescores;
  } else {
    // Get Matches
    data.map((livescore) => {
      let date = new Date(livescore.fixture.date)
        .toLocaleString("en-GB")
        .slice(0, -3);

      livescores += `
        <div class="accordion col-md-6 mb-3" id="Accordion${livescore.fixture.id}">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse${livescore.fixture.id}">
                <span class="badge bg-dark me-2">${livescore.fixture.status.short} ${livescore.fixture.status.elapsed}'</span>
                <span class="ms-3"><strong>${livescore.goals.home}<br>${livescore.goals.away}</strong></span>
                <span class="ms-auto">${livescore.teams.home.name}<br>${livescore.teams.away.name}</span>
              </button>
            </h2>
            <div id="Collapse${livescore.fixture.id}" class="accordion-collapse collapse" data-bs-parent="#Accordion${livescore.fixture.id}">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-2 text-center">
                    <strong>HT</strong>
                  </div>
                  <div class="col">
                    ${livescore.score.halftime.home} - ${livescore.score.halftime.away}
                  </div>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <i class="icofont-refree-jersey"></i>
                  </div>
                  <div class="col">
                    ${livescore.fixture.referee}
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
                    ${livescore.fixture.venue.name}, ${livescore.fixture.venue.city}
                  </div>
                </div>
                <div class="row mt-3 mb-2">
                  <div class="col text-center">
                    <strong>Events</strong>
                  </div>
                </div>
                <div id="Events${livescore.fixture.id}" class="row align-items-center"></div>
                <div class="row mt-3">
                  <div class="col-12">
                    <a class="d-block btn btn-dark" href="./match.html?id=${livescore.fixture.id}">More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("Livescores").innerHTML = livescores;
    });

    // Get Events Match
    data.map((livescore, index) => {
      let livescoreEvents = "";

      data[index].events.map((event) => {
        let eventDetail = "";
        let subIconIn = "";
        let subIconOut = "";

        if (event.type === "Goal") {
          if (event.detail === "Normal Goal") {
            eventDetail += "Goal";
            subIconOut += `<i class="icofont-football text-dark"></i>`;
          } else if (event.detail === "Own Goal") {
            eventDetail += "Own Goal";
            subIconOut += `<i class="icofont-football text-danger"></i>`;
          } else if (event.detail === "Penalty") {
            eventDetail += "Penalty Goal";
            subIconOut += `<i class="icofont-football text-dark"></i>`;
          } else if (event.detail === "Missed Penalty") {
            eventDetail += "Penalty Missed";
            subIconOut += `<i class="icofont-close text-danger"></i>`;
          }
        } else if (event.type === "Card") {
          if (event.detail === "Yellow Card") {
            eventDetail += "Yellow";
            subIconOut += `<i class="icofont-penalty-card text-warning"></i>`;
          } else if (event.detail === "Red Card") {
            eventDetail += "Red";
            subIconOut += `<i class="icofont-penalty-card text-danger"></i>`;
          }
        } else if (event.type === "subst") {
          eventDetail += event.assist.name;
          subIconIn += `<i class="icofont-arrow-up text-success"></i>`;
          subIconOut += `<i class="icofont-arrow-down text-danger"></i>`;
        }

        let homeEvent = "";
        let awayEvent = "";
        let minuteEvent = "";

        if (event.team.id === livescore.teams.home.id) {
          homeEvent += `
            <div>${event.player.name} ${subIconIn}</div>
            <div class="text-secondary">${eventDetail} ${subIconOut}</div>
          `;
          minuteEvent += `<span class="badge bg-success text-light">${event.time.elapsed}'</span>`;
        } else if (event.team.id === livescore.teams.away.id) {
          awayEvent += `
            <div>${subIconIn} ${event.player.name}</div>
            <div class="text-secondary">${subIconOut} ${eventDetail}</div>
          `;
          minuteEvent += `<span class="badge bg-dark text-light">${event.time.elapsed}'</span>`;
        }

        livescoreEvents += `
          <div class="col-5 text-end">
            ${homeEvent}
          </div>
          <div class="col-2 text-center text-secondary">
            ${minuteEvent}
          </div>
          <div class="col-5">
            ${awayEvent}
          </div>
          <div class="col-12 my-1"></div>
        `;
      });

      document.getElementById(`Events${livescore.fixture.id}`).innerHTML = livescoreEvents;
    });
  }
});
