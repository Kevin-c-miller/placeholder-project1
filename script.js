const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const players = `${DOMAIN}players`;
const allTeams = `${DOMAIN}teams`;
const playerStats = `${DOMAIN}season_averages`;
const userInput = document.querySelector('#user-input');
const submitBtn = document.querySelector('#submit-btn');
const playerResults = document.querySelector('.player-results');
const playerBio = document.querySelector('.player-bio');
const playerStatistics = document.querySelector('.playerName-num');
const teamSearch = document.querySelector('#team-select');
const teamRoster = document.querySelector('.team-roster');
const teamBtn = document.querySelector('#team-btn');

async function getPlayerInfo(searchInput) {
  try {
    const url = `${players}?search=${searchInput}`;
    const res = await axios.get(url);
    const playerNames = res.data.data;
    // console.log(playerNames);

    getPlayerStats(playerNames[0].id);
    renderPlayer(playerNames);
  } catch (error) {
    showErrorMsg();
    console.error(error);
  }
}

// get player stats from api
async function getPlayerStats(searchInput) {
  try {
    const url = `${playerStats}?player_ids[]=${searchInput}`;
    const res = await axios.get(url);
    const playerStatsInfo = res.data.data;
    // console.log(playerStats);

    renderPlayerStats(playerStatsInfo);
  } catch (error) {
    console.error(error);
  }
}

// get player info from api

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
  for (let i = 0; i < teams.length; i++) {
    // if (teams[i] === teamSelection) {
    let name = document.createElement('h3');
    name.innerText = `Team: ${teamSelection.full_name}`;
    teamRoster.appendChild(name);

    let conference = document.createElement('p');
    conference.innerText = `Conference: ${teamSelection.conference}`;
    teamRoster.appendChild(conference);

    let division = document.createElement('p');
    division.innerText = `Division: ${teamSelection.division}`;
    teamRoster.appendChild(division);

    let abbrv = document.createElement('p');
    abbrv.innerText = `Abbreviation: ${teamSelection.abbreviation}`;
    teamRoster.appendChild(abbrv);
    // }
  }
}

// player info to render to page when user searches a name
function renderPlayer(playerNames) {
  playerNames.forEach((playerName) => {
    // console.log(playerName);
    let playerFullName = document.createElement('h2');
    playerFullName.innerText = `${playerName.first_name} ${playerName.last_name}`;
    playerBio.appendChild(playerFullName);

    let playerTeam = document.createElement('p');
    playerTeam.innerText = `${playerName.team.city} ${playerName.team.name}`;
    playerBio.appendChild(playerTeam);

    if (playerName.position == '') {
      let playerPosition = document.createElement('p');
      playerPosition.innerText = 'Position: N/A';
      playerBio.appendChild(playerPosition);
    } else {
      let playerPosition = document.createElement('p');
      playerPosition.innerText = `Position: ${playerName.position}`;
      playerBio.appendChild(playerPosition);
    }

    if (playerName.height_feet == null && playerName.height_inches == null) {
      let playerHeight = document.createElement('p');
      playerHeight.innerText = 'Height Not Available';
      playerBio.appendChild(playerHeight);
    } else {
      let playerHeight = document.createElement('p');
      playerHeight.innerText = `Height: ${playerName.height_feet}ft. ${playerName.height_inches}in.`;
      playerBio.appendChild(playerHeight);
    }

    if (playerName.weight_pounds == null) {
      let playerWeight = document.createElement('p');
      playerWeight.innerText = 'Weight Not Available';
      playerBio.appendChild(playerWeight);
    } else {
      let playerWeight = document.createElement('p');
      playerWeight.innerText = `Weight: ${playerName.weight_pounds}lbs.`;
      playerBio.appendChild(playerWeight);
    }
  });
}

// rendering player stats to page
function renderPlayerStats(playerStats) {
  playerStats.forEach((player) => {
    console.log(playerStats);

    let header = document.createElement('h2');
    header.innerText = 'Season Stats';
    playerStatistics.appendChild(header);

    let gamesPlayed = document.createElement('p');
    gamesPlayed.innerText = `GP: ${player.games_played}`;
    playerStatistics.appendChild(gamesPlayed);

    let min = document.createElement('p');
    min.innerText = `Min: ${player.min}`;
    playerStatistics.appendChild(min);

    let pts = document.createElement('p');
    pts.innerText = `PPG: ${player.pts}`;
    playerStatistics.appendChild(pts);

    let reb = document.createElement('p');
    reb.innerText = `Reb: ${player.reb}`;
    playerStatistics.appendChild(reb);

    let blocks = document.createElement('p');
    blocks.innerText = `Blks: ${player.blk}`;
    playerStatistics.appendChild(blocks);

    let assists = document.createElement('p');
    assists.innerText = `Asts: ${player.ast}`;
    playerStatistics.appendChild(assists);

    let steals = document.createElement('p');
    steals.innerText = `Stls: ${player.stl}`;
    playerStatistics.appendChild(steals);

    let fgPercent = document.createElement('p');
    fgPercent.innerText = `FG%: ${player.fg_pct}`;
    playerStatistics.appendChild(fgPercent);

    let turnOvers = document.createElement('p');
    turnOvers.innerText = `TO: ${player.turnover}`;
    playerStatistics.appendChild(turnOvers);
  });
}

//error message
function showErrorMsg() {
  const errorMsg = document.createElement('h3');
  errorMsg.innerText = 'Please enter a valid player name';
  playerBio.appendChild(errorMsg);

  const errorImg = document.createElement('img');
  errorImg.src = 'https://media.giphy.com/media/8yfIqHvBX2C0E/giphy.gif';
  errorImg.alt = 'GIF of a missed basketball shot';
  playerBio.appendChild(errorImg);
}

//removing prior search
function removePriorSearch() {
  if (playerResults !== ' ') {
    playerResults.innerText = '';
  }
}

//checking for empty input
function check() {
  if (userInput.value === '') {
    showErrorMsg();
  }
}

// event handler function for player search
const userSubmit = (e) => {
  e.preventDefault();
  let searchInput = userInput.value;
  console.log(searchInput, ' // user input value');
  userInput.value = '';
  getPlayerInfo(searchInput);
  // check();
};

// submitBtn.addEventListener('click', userSubmit);

// event handler for team drop down search
async function teamDropDownSearch() {
  try {
    console.log(teamSearch.value);
    const teamSelection = teamSearch.value;
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;

    displayTeam(teams, teamSelection);
  } catch (error) {
    console.error(error);
  }
}

teamBtn.addEventListener('mouseup', teamDropDownSearch);
