// Get Teams
axios.get(`${API_FOOTBALL}${TEAMS}`, API_KEY)
.then((response) => {
  const data = response.data.response;
  data.sort((a, b) => (a.team.name > b.team.name ? 1 : -1));
  console.log(data);

  let teams = "";

  data.map((team) => {
    teams += `
      <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
        <a class="text-decoration-none" href="./team.html?id=${team.team.id}">
          <div class="card bg-light text-dark text-center">
            <div class="card-body">
              <img src="${team.team.logo}" alt="${team.team.name}" height=150>
            </div>
            <div class="card-footer">
              ${team.team.name}
            </div>
          </div>
        </a>
      </div>
    `;
  });

  document.getElementById("Teams").innerHTML = teams;
});
