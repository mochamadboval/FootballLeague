//Get ID Match
const ID = new URLSearchParams(window.location.search).get("id");

// Get Match Details
axios.get(`${API_FOOTBALL}${MATCH}${ID}`, API_KEY)
.then((response) => {
  const data = response.data.response[0];
  console.log(data);

  // Get Match Result
  const date = new Date(data.fixture.date).toLocaleString("en-GB").slice(0, -3);

  const match = `
    <div class="col-4 text-end">
      <img src="${data.teams.home.logo}" alt="${data.teams.home.name}" height=75>
    </div>
    <div class="col-4 text-center">
      <div class="text-secondary">${data.score.halftime.home} - ${data.score.halftime.away}</div>
      <div class="h1">${data.goals.home} - ${data.goals.away}</div>
    </div>
    <div class="col-4">
      <img src="${data.teams.away.logo}" alt="${data.teams.away.name}" height=75>
    </div>
    <div class="col-12 text-center text-secondary my-3">
      <div><i class="icofont-refree-jersey"></i> ${data.fixture.referee}</div>
      <div><i class="icofont-whistle-alt"></i> ${date}</div>
      <div><i class="icofont-location-pin"></i> ${data.fixture.venue.name}, ${data.fixture.venue.city}</div>
    </div>
  `;

  document.getElementById("Match").innerHTML = match;

  // Get Match Events
  let matchEvents = "";

  data.events.map((event) => {
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

    if (event.team.id === data.teams.home.id) {
      homeEvent += `
        <div>${event.player.name} ${subIconIn}</div>
        <div class="text-secondary">${eventDetail} ${subIconOut}</div>
      `;
      minuteEvent += `<span class="badge bg-success text-light">${event.time.elapsed}'</span>`;
    } else if (event.team.id === data.teams.away.id) {
      awayEvent += `
        <div>${subIconIn} ${event.player.name}</div>
        <div class="text-secondary">${subIconOut} ${eventDetail}</div>
      `;
      minuteEvent += `<span class="badge bg-dark text-light">${event.time.elapsed}'</span>`;
    }

    matchEvents += `
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

  document.getElementById("Events").innerHTML = matchEvents;

  // Get Match Stats
  let matchStats = "";

  for (let i = 0; i < data.statistics[0].statistics.length; i++) {
    let homeStat = parseInt(data.statistics[0].statistics[i].value);
    let awayStat = parseInt(data.statistics[1].statistics[i].value);
    let totalStat = homeStat + awayStat;
    let homeStatPercent = (homeStat / totalStat) * 100;
    let awayStatPercent = (awayStat / totalStat) * 100;

    if (data.statistics[0].statistics[i].value === null) {
      if (data.statistics[1].statistics[i].value === null) {
        homeStat = 0;
        awayStat = 0;
        homeStatPercent = 50;
        awayStatPercent = 50;
      } else {
        homeStat = 0;
        homeStatPercent = 0;
        awayStatPercent = 100;
      }
    } else if (data.statistics[1].statistics[i].value === null) {
      awayStat = 0;
      awayStatPercent = 0;
      homeStatPercent = 100;
    }

    matchStats += `
      <div class="text-center mt-1">${data.statistics[0].statistics[i].type}</div>
      <div class="col-2 text-end">
        ${homeStat}
      </div>
      <div class="col-8">
        <div class="progress" style="height: .5rem;">
          <div class="progress-bar bg-success" style="width: ${homeStatPercent}%"></div>
          <div class="progress-bar bg-dark" style="width: ${awayStatPercent}%"></div>
        </div>
      </div>
      <div class="col-2">
        ${awayStat}
      </div>
    `;
  }

  document.getElementById("Stats").innerHTML = matchStats;

  // Get Match Lineups
  let matchLineups = "";
  let homeLineup = "";
  let awayLineup = "";

  // Get XI
  matchLineups += `<div class="text-center mb-3">XI</div>`;

  for (let i = 0; i < data.lineups[0].startXI.length; i++) {
    homeLineup = data.lineups[0].startXI[i];
    awayLineup = data.lineups[1].startXI[i];

    matchLineups += `
      <div class="col-5 text-end">
        ${homeLineup.player.name}
      </div>
      <div class="col-1 d-flex justify-content-center bg-success text-light rounded-start">
        ${homeLineup.player.number}
      </div>
      <div class="col-1 d-flex justify-content-center bg-dark text-light rounded-end">
        ${awayLineup.player.number}
      </div>
      <div class="col-5">
        ${awayLineup.player.name}
      </div>
      <div class="col-12 my-1"></div>
    `;
  }

  // Get Subs
  matchLineups += `<div class="text-center mt-2 mb-3">Subs</div>`;

  let subsLength = data.lineups[0].substitutes.length;
  if (subsLength < data.lineups[1].substitutes.length) {
    subsLength = data.lineups[1].substitutes.length;
  }

  for (let i = 0; i < subsLength; i++) {
    let subNone = {
      player: {
        id: "-",
        name: "-",
        number: "-",
        pos: "-",
      },
    };

    homeLineup = data.lineups[0].substitutes[i];
    awayLineup = data.lineups[1].substitutes[i];

    if (homeLineup === undefined) {
      homeLineup = subNone;
    } else if (awayLineup === undefined) {
      awayLineup = subNone;
    }

    matchLineups += `
      <div class="col-5 text-end text-secondary">
        ${homeLineup.player.name}
      </div>
      <div class="col-1 d-flex justify-content-center bg-success text-light rounded-start">
        ${homeLineup.player.number}
      </div>
      <div class="col-1 d-flex justify-content-center bg-dark text-light rounded-end">
        ${awayLineup.player.number}
      </div>
      <div class="col-5 text-secondary">
        ${awayLineup.player.name}
      </div>
      <div class="col-12 my-1"></div>
    `;
  }

  // Get Coach and Formation
  matchLineups += `
    <div class="col-5 text-end mt-2">
      ${data.lineups[0].coach.name} <br>
      <span class="text-secondary">${data.lineups[0].formation}</span>
    </div>
    <div class="col-2 text-center mt-2">
      <i class="icofont-match-review"></i>
    </div>
    <div class="col-5 mt-2">
      ${data.lineups[1].coach.name} <br>
      <span class="text-secondary">${data.lineups[1].formation}</span>
    </div>
  `;

  document.getElementById("Lineups").innerHTML = matchLineups;
});
