// Get Standings
axios.get(`${API_FOOTBALL}${STANDINGS}`, API_KEY)
.then((response) => {
  const data = response.data.response[0].league.standings[0];
  console.log(data);

  let standings = "";

  data.map((standing) => {
    let tr = "";

    if (standing.rank <= 3) {
      tr += `<tr title="${standing.description}">`;
    } else if (standing.rank === 4) {
      tr += `<tr class="border-bottom border-primary" title="${standing.description}">`;
    } else if (standing.rank === 5) {
      tr += `<tr class="border-bottom border-warning" title="${standing.description}">`;
    } else if (standing.rank === 17) {
      tr += `<tr class="border-bottom border-danger">`;
    } else if (standing.rank >= 18) {
      tr += `<tr title="${standing.description}">`;
    } else {
      tr += `<tr>`;
    }

    standings += `
      ${tr}
        <td class="bg-dark text-light"><strong>${standing.rank}</strong></td>
        <td>${standing.team.name}</td>
        <td>${standing.all.played}</td>
        <td>${standing.all.win}</td>
        <td>${standing.all.draw}</td>
        <td>${standing.all.lose}</td>
        <td>${standing.all.goals.for}</td>
        <td>${standing.all.goals.against}</td>
        <td>${standing.goalsDiff}</td>
        <td><strong>${standing.points}</strong></td>
        <td>${standing.form}</td>
      </tr>
    `;
  });

  document.getElementById("Standings").innerHTML = standings;
});
