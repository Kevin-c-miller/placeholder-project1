const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const userInput = document.querySelector('#user-input');
const submitBtn = document.querySelector('#submit-btn');
const playerResults = document.querySelector('.player-results');
const playerBio = document.querySelector('.player-bio');
const playerStatistics = document.querySelector('.playerName-num');
const teamSearch = document.querySelector('#team-select');
const teamRoster = document.querySelector('.team-roster');
const teamBtn = document.querySelector('#team-btn');

const players = `${DOMAIN}players`;
const allTeams = `${DOMAIN}teams`;
const playerStats = `${DOMAIN}season_averages`;

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
// getTeam();

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

//grabbing team info for display function
async function displaySelectedTeam() {
  try {
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;
    displayTeam(teams);
  } catch (error) {
    console.error(error);
  }
}

//siaplaying team info to page
function displayTeam(teams) {
  teams.forEach((team) => {
    let name = document.createElement('h3');
    name.innerText = `Team: ${team.full_name}`;
    teamRoster.appendChild(name);

    let conference = document.createElement('p');
    conference.innerText = `Conference: ${team.conference}`;
    teamRoster.appendChild(conference);

    let division = document.createElement('p');
    division.innerText = `Division: ${team.division}`;
    teamRoster.appendChild(division);

    let abbrv = document.createElement('p');
    abbrv.innerText = `Abbreviation: ${team.abbreviation}`;
    teamRoster.appendChild(abbrv);
  });
}

// rendering player stats to page
function renderPlayerStats(playerStats) {
  playerStats.forEach((player) => {
    // console.log(player);

    let gamesPlayed = document.createElement('p');
    gamesPlayed.innerText = `Games Played: ${player.games_played}`;
    playerStatistics.appendChild(gamesPlayed);

    let min = document.createElement('p');
    min.innerText = `Minutes: ${player.min}`;
    playerStatistics.appendChild(min);

    let pts = document.createElement('p');
    pts.innerText = `Points: ${player.pts}`;
    playerStatistics.appendChild(pts);

    let reb = document.createElement('p');
    reb.innerText = `Rebounds: ${player.reb}`;
    playerStatistics.appendChild(reb);

    let blocks = document.createElement('p');
    blocks.innerText = `Blocks: ${player.blk}`;
    playerStatistics.appendChild(blocks);

    let assists = document.createElement('p');
    assists.innerText = `Assists: ${player.ast}`;
    playerStatistics.appendChild(assists);

    let steals = document.createElement('p');
    steals.innerText = `Steals: ${player.stl}`;
    playerStatistics.appendChild(steals);

    let fgPercent = document.createElement('p');
    fgPercent.innerText = `FG%: ${player.fg_pct}`;
    playerStatistics.appendChild(fgPercent);

    let turnOvers = document.createElement('p');
    turnOvers.innerText = `Turnovers: ${player.turnover}`;
    playerStatistics.appendChild(turnOvers);
  });
}

// player info to render to page when user searches a name
function renderPlayer(playerNames) {
  playerNames.forEach((playerName) => {
    let playerFullName = document.createElement('h2');
    playerFullName.innerText = `${playerName.first_name} ${playerName.last_name}`;
    playerBio.appendChild(playerFullName);

    let playerTeam = document.createElement('p');
    playerTeam.innerText = `Team: ${playerName.team.city} ${playerName.team.name}`;
    playerBio.appendChild(playerTeam);

    let playerPosition = document.createElement('p');
    playerPosition.innerText = `Position: ${playerName.position}`;
    playerBio.appendChild(playerPosition);

    let playerHeight = document.createElement('p');
    playerHeight.innerText = `Height: ${playerName.height_feet}ft. ${playerName.height_inches}in.`;
    playerBio.appendChild(playerHeight);

    let playerWeight = document.createElement('p');
    playerWeight.innerText = `Weight: ${playerName.weight_pounds}lbs.`;
    playerBio.appendChild(playerWeight);
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
function removePriorSearch() {}

//checking for empty input
function check() {
  if (userInput.value === '') {
    showErrorMsg();
  }
}

// event handler function
const userSubmit = (e) => {
  e.preventDefault();
  let searchInput = userInput.value;
  console.log(searchInput, ' // user input value');
  userInput.value = '';
  getPlayerInfo(searchInput);
  // check();
};

submitBtn.addEventListener('click', userSubmit);
// teamBtn.addEventListener('click', displaySelectedTeam);

////////////////////////////////////////
// async function setRosterApiCall() {
//   try {
//     const url = players;
//     const res = await axios.get(url);
//     const allPlayers = res.data.data;
//     displayTeamRoster(allPlayers);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function displayTeamRoster(allPlayers) {
//   allPlayers.forEach((player) => {
//     if (player.team.full_name === teams.full_name) {
//       let player = document.createElement('h5');
//       player.innerText = player.name;
//       teamRoster.appendChild(player);

//       let position = document.createElement('p');
//       position.innerText = player.position;
//       teamRoster.appendChild(position);
//     }
//   });
// }
