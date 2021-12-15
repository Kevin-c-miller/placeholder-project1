const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const allTeams = `${DOMAIN}teams`;
const teamSearch = document.querySelector('#team-select');
const teamInfo = document.querySelector('.team-info');
const teamBtn = document.querySelector('#team-btn');

//get team info from api
const getTeam = async () => {
  try {
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;
    // console.log(teams);

    setTeamsDropDown(teams);
  } catch (error) {
    console.error(error);
  }
};
getTeam();

//team info and render to page
function setTeamsDropDown(teams) {
  teams.forEach((team) => {
    // console.log(team);

    let option = document.createElement('option');
    option.value = team.name;
    option.textContent = team.full_name;
    teamSearch.appendChild(option);
  });
}

//displaying team info to page
function displayTeam(teams, teamSelection) {
  teams.forEach((team) => {
    // console.log(team, teamSelection);
    if (team.name == teamSelection) {
      let teamDiv = document.createElement('div');
      teamDiv.classList.add('team-div');
      teamInfo.appendChild(teamDiv);

      let name = document.createElement('h3');
      name.innerText = `Team: ${team.full_name}`;
      teamDiv.appendChild(name);

      let city = document.createElement('p');
      city.innerText = `City: ${team.city}`;
      teamDiv.appendChild(city);

      let conference = document.createElement('p');
      conference.innerText = `Conference: ${team.conference}`;
      teamDiv.appendChild(conference);

      let division = document.createElement('p');
      division.innerText = `Division: ${team.division}`;
      teamDiv.appendChild(division);

      let abbrv = document.createElement('p');
      abbrv.innerText = `Abbreviation: ${team.abbreviation}`;
      teamDiv.appendChild(abbrv);
    } else {
      // console.log('invalid');
    }
  });
}

// event handler for team drop down search
async function teamDropDownSearch() {
  try {
    console.log(teamSearch.value);
    const teamSelection = teamSearch.value;
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;
    // console.log(teams);

    displayTeam(teams, teamSelection);
  } catch (error) {
    console.error(error);
  }
}

teamBtn.addEventListener('mouseup', teamDropDownSearch);
