const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const players = `${DOMAIN}players`;
const playerStats = `${DOMAIN}season_averages`;
const userInput = document.querySelector('#user-input');
const submitBtn = document.querySelector('#submit-btn');
const playerResults = document.querySelector('.player-results');
const playerBio = document.querySelector('.player-bio');
const playerImage = document.querySelector('.player-image');
const playerStatistics = document.querySelector('.playerName-num');

// get player info from api
async function getPlayerInfo(searchInput) {
  try {
    const url = `${players}?search=${searchInput}`;
    const res = await axios.get(url);
    const playerNames = res.data.data;

    getPlayerStats(playerNames[0].id);
    renderPlayer(playerNames);
  } catch (error) {
    showErrorMsg();
  }
}
// get player stats from api
async function getPlayerStats(searchInput) {
  try {
    const url = `${playerStats}?player_ids[]=${searchInput}`;
    const res = await axios.get(url);
    const playerStatsInfo = res.data.data;

    renderPlayerStats(playerStatsInfo);
  } catch (error) {
    console.error(error);
  }
}

//get player headshots
async function getPlayerHeadshots(searchInput) {
  //reverse search input for headshot API call
  const reverseName = searchInput.split(' ');
  [reverseName[0], reverseName[1]] = [reverseName[1], reverseName[0]];
  const lastName = reverseName[0];
  const firstName = reverseName[1];

  try {
    // API for headshots
    const playerHeadshots = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;

    showPlayerHeadshots(playerHeadshots);
  } catch (error) {
    console.error(error);
  }
}

// player headshots
function showPlayerHeadshots(playerHeadshots) {
  playerImage.innerHTML = '';

  let headshotDiv = document.createElement('div');
  headshotDiv.classList.add('headshot-div');
  playerImage.appendChild(headshotDiv);

  let img = document.createElement('img');
  img.src = playerHeadshots;
  img.alt = 'headshot';
  headshotDiv.appendChild(img);
}

// player info to render to page when user searches a name
function renderPlayer(playerNames) {
  playerBio.innerText = '';

  // checking for 1 result
  if (playerNames.length !== 1) {
    narrowSearchMsg();
    playerImage.style.display = 'none';
  } else {
    playerNames.forEach((playerName) => {
      playerImage.style.display = 'flex';

      let playerDiv = document.createElement('div');
      playerDiv.classList.add('player-div');
      playerBio.appendChild(playerDiv);

      let playerFullName = document.createElement('h2');
      playerFullName.innerText = `${playerName.first_name} ${playerName.last_name}`;
      playerDiv.appendChild(playerFullName);

      let playerTeam = document.createElement('p');
      playerTeam.innerText = `${playerName.team.city} ${playerName.team.name}`;
      playerDiv.appendChild(playerTeam);

      if (playerName.position == '') {
        let playerPosition = document.createElement('p');
        playerPosition.innerText = 'Position: N/A';
        playerDiv.appendChild(playerPosition);
      } else {
        let playerPosition = document.createElement('p');
        playerPosition.innerText = `Position: ${playerName.position}`;
        playerDiv.appendChild(playerPosition);
      }

      if (playerName.height_feet == null && playerName.height_inches == null) {
        let playerHeight = document.createElement('p');
        playerHeight.innerText = 'Height N/A';
        playerDiv.appendChild(playerHeight);
      } else {
        let playerHeight = document.createElement('p');
        playerHeight.innerText = `Height: ${playerName.height_feet}ft. ${playerName.height_inches}in.`;
        playerDiv.appendChild(playerHeight);
      }

      if (playerName.weight_pounds == null) {
        let playerWeight = document.createElement('p');
        playerWeight.innerText = 'Weight N/A';
        playerDiv.appendChild(playerWeight);
      } else {
        let playerWeight = document.createElement('p');
        playerWeight.innerText = `Weight: ${playerName.weight_pounds}lbs.`;
        playerDiv.appendChild(playerWeight);
      }
    });
  }
}

// rendering player stats to page
function renderPlayerStats(playerStats) {
  playerStatistics.innerText = '';
  playerStats.forEach((player) => {
    let statsDiv = document.createElement('div');
    statsDiv.classList.add('stats-div');
    playerStatistics.appendChild(statsDiv);

    let header = document.createElement('h2');
    header.innerText = 'Season Stats';
    statsDiv.appendChild(header);

    let gamesPlayed = document.createElement('p');
    gamesPlayed.innerText = `GP: ${player.games_played}`;
    statsDiv.appendChild(gamesPlayed);

    let min = document.createElement('p');
    min.innerText = `Min: ${player.min}`;
    statsDiv.appendChild(min);

    let pts = document.createElement('p');
    pts.innerText = `PPG: ${player.pts}`;
    statsDiv.appendChild(pts);

    let reb = document.createElement('p');
    reb.innerText = `Reb: ${player.reb}`;
    statsDiv.appendChild(reb);

    let blocks = document.createElement('p');
    blocks.innerText = `Blks: ${player.blk}`;
    statsDiv.appendChild(blocks);

    let assists = document.createElement('p');
    assists.innerText = `Asts: ${player.ast}`;
    statsDiv.appendChild(assists);

    let steals = document.createElement('p');
    steals.innerText = `Stls: ${player.stl}`;
    statsDiv.appendChild(steals);

    let fgPercent = document.createElement('p');
    fgPercent.innerText = `FG%: ${player.fg_pct}`;
    statsDiv.appendChild(fgPercent);

    let turnOvers = document.createElement('p');
    turnOvers.innerText = `TO: ${player.turnover}`;
    statsDiv.appendChild(turnOvers);
  });
}

//error message
function showErrorMsg() {
  playerBio.innerText = '';
  playerStatistics.innerText = '';
  playerImage.style.display = 'none';

  const errDiv = document.createElement('div');
  errDiv.classList.add('error-div');
  playerBio.appendChild(errDiv);

  const errorMsg = document.createElement('h3');
  errorMsg.innerText = 'Please enter a valid player name';
  errDiv.appendChild(errorMsg);

  const errorImg = document.createElement('img');
  errorImg.src = 'https://media.giphy.com/media/8yfIqHvBX2C0E/giphy.gif';
  errorImg.alt = 'GIF of a missed basketball shot';
  errDiv.appendChild(errorImg);
}

// narrow search message
function narrowSearchMsg() {
  playerBio.innerText = '';
  playerStatistics.innerText = '';

  const narrowSearchDiv = document.createElement('div');
  narrowSearchDiv.classList.add('narrow-search');
  playerBio.appendChild(narrowSearchDiv);

  const narrowMsg = document.createElement('h3');
  narrowMsg.innerText = 'Please enter a valid first AND last name';
  narrowMsg.style.color = 'red';
  narrowSearchDiv.appendChild(narrowMsg);
}

//checking for empty input
function check(searchInput) {
  if (searchInput != null && searchInput != '') {
    getPlayerInfo(searchInput);
    getPlayerHeadshots(searchInput);
    return;
  } else {
    showErrorMsg();
    return;
  }
}

// event handler function for player search
const userSubmit = (e) => {
  e.preventDefault();
  let searchInput = userInput.value;

  check(searchInput);

  userInput.value = '';
};

submitBtn.addEventListener('click', userSubmit);
