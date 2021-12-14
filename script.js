const userInput = document.querySelector('#user-input');
const submitBtn = document.querySelector('button');
const playerResults = document.querySelector('.player-results');
const playerBio = document.querySelector('.player-bio');
const DOMAIN = 'https://www.balldontlie.io/api/v1/';
const players = `${DOMAIN}players`;
const allTeams = `${DOMAIN}teams`;

// get player info from api
const getPlayerInfo = async (searchInput) => {
  try {
    const url = `${players}?search=${searchInput}`;
    const res = await axios.get(url);
    const playerNames = res.data.data;
    // console.log(playerNames);

    // renderPlayer(playerNames);
  } catch (error) {
    console.error(error);
  }
};

//get team info from api
const getTeam = async (searchInput) => {
  try {
    const url = `${allTeams}`;
    const res = await axios.get(url);
    const teams = res.data.data;
    console.log(teams);
    renderTeam(teams);
  } catch (error) {
    console.error(error);
  }
};

//team info and render to page
const renderTeam = (allTeams) => {
  allTeams.forEach((team) => {
    console.log(team.name);
  });
};

// player info to render to page when user searches a name
const renderPlayer = (playerNames) => {
  playerNames.forEach((playerName) => {
    console.log(playerName);

    let playerFullName = document.createElement('h3');
    playerFullName.innerText = `${playerName.first_name} ${playerName.last_name}`;
    playerBio.appendChild(playerFullName);

    let playerTeam = document.createElement('h5');
    playerTeam.innerText = `Team: ${playerName.team.city} ${playerName.team.name}`;
    playerBio.appendChild(playerTeam);

    let playerPosition = document.createElement('h6');
    playerPosition.innerText = `Position: ${playerName.position}`;
    playerBio.appendChild(playerPosition);

    let playerHeight = document.createElement('h6');
    playerHeight.innerText = `Height: ${playerName.height_feet}ft. ${playerName.height_inches}in.`;
    playerBio.appendChild(playerHeight);

    let playerWeight = document.createElement('h6');
    playerWeight.innerText = `Weight: ${playerName.weight_pounds}lbs.`;
    playerBio.appendChild(playerWeight);
  });
};

// event handler function
const userSubmit = (e) => {
  e.preventDefault();
  let searchInput = userInput.value;
  console.log(searchInput, ' // user input value');
  userInput.value = '';
  getPlayerInfo(searchInput);
  getTeam(searchInput);
};

submitBtn.addEventListener('click', userSubmit);
