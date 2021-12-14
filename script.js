const userInput = document.querySelector('#user-input');
const submitBtn = document.querySelector('button');
const playerResults = document.querySelector('.player-results');
const playerBio = document.querySelector('.player-bio');
const playerStatistics = document.querySelector('.playername-num');
const teamSearch = document.querySelector('.team');
const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const players = `${DOMAIN}players`;
const allTeams = `${DOMAIN}teams`;
const playerStats = `${DOMAIN}season_averages`;
let playerNameId;

// get player info from api
const getPlayerInfo = async (searchInput) => {
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
};

//get player stats from api
async function getPlayerStats(searchInput) {
  try {
    const url = `${playerStats}?player_ids[]=${searchInput}`;
    const res = await axios.get(url);
    const PlayerStats = res.data.data;
    // console.log(playerStats);

    renderPlayerStats(PlayerStats);
  } catch (error) {
    console.error(error);
  }
}

//get team info from api
const getTeam = async (searchInput) => {
  try {
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;
    // console.log(teams);

    // renderTeam(teams);
  } catch (error) {
    showErrorMsg();
    console.error(error);
  }
};

//team info and render to page
function renderTeam(allTeams) {
  allTeams.forEach((team) => {
    // console.log(team.name);
    if (
      userInput.value == team.name ||
      team.city ||
      team.full_name ||
      team.abbreviation
    ) {
      let teamName = document.createElement('h3');
      teamName.innerText = team.full_name;
      teamSearch.appendChild(teamName);

      let teamConf = document.createElement('h5');
      teamConf.innerText = `Conference: ${team.conference}`;
      teamSearch.appendChild(teamConf);

      let teamDiv = document.createElement('h5');
      teamDiv.innerText = `Division: ${team.division}`;
      teamSearch.appendChild(teamDiv);
    }
  });
}

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
    // console.log(playerName);

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

function showErrorMsg() {
  const errorMsg = document.createElement('h3');
  errorMsg.innerText = 'Please enter a valid player or team name';
  playerBio.appendChild(errorMsg);

  const errorImg = document.createElement('img');
  errorImg.src = 'https://media.giphy.com/media/8yfIqHvBX2C0E/giphy.gif';
  errorImg.alt = 'GIF of a missed basketball shot';
  playerBio.appendChild(errorImg);
}

// event handler function
const userSubmit = (e) => {
  e.preventDefault();
  let searchInput = userInput.value;
  console.log(searchInput, ' // user input value');
  userInput.value = '';
  getPlayerInfo(searchInput);
  // getTeam(searchInput);
};

submitBtn.addEventListener('click', userSubmit);
