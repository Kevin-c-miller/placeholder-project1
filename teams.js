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
  teamInfo.innerText = '';
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

      teamLogos(team);
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

function teamLogos(team) {
  let logoDiv = document.createElement('div');
  logoDiv.classList.add('logos');
  teamInfo.appendChild(logoDiv);

  if (team.full_name === 'Atlanta Hawks') {
    let hawks = document.createElement('img');
    hawks.src = 'https://media.giphy.com/media/NhwWTJaYif1viUvrn9/giphy.gif';
    hawks.alt = 'hawks logo';
    logoDiv.appendChild(hawks);
  } else if (team.full_name === 'Boston Celtics') {
    let celtics = document.createElement('img');
    celtics.src = 'https://media.giphy.com/media/7IYAdxJOj59g259bnb/giphy.gif';
    celtics.alt = 'celtics logo';
    logoDiv.appendChild(celtics);
  } else if (team.full_name === 'Brooklyn Nets') {
    let nets = document.createElement('img');
    nets.src = 'https://media.giphy.com/media/l1J9r8h5KUdDDLAJO/giphy.gif';
    nets.alt = 'nets logo';
    logoDiv.appendChild(nets);
  } else if (team.full_name === 'Charlotte Hornets') {
    let hornets = document.createElement('img');
    hornets.src = 'https://media.giphy.com/media/3ohhwm6JFtJqsqMq88/giphy.gif';
    hornets.alt = 'hornets logo';
    logoDiv.appendChild(hornets);
  } else if (team.full_name === 'Chicago Bulls') {
    let bulls = document.createElement('img');
    bulls.src = 'https://media.giphy.com/media/3ohhwu5iOLP6IoeKQw/giphy.gif';
    bulls.alt = 'bulls logo';
    logoDiv.appendChild(bulls);
  } else if (team.full_name === 'Cleveland Cavaliers') {
    let cavs = document.createElement('img');
    cavs.src = 'https://media.giphy.com/media/3ohhwoDUuwy9Yf6QI8/giphy.gif';
    cavs.alt = 'cavs logo';
    logoDiv.appendChild(cavs);
  } else if (team.full_name === 'Dallas Mavericks') {
    let mavs = document.createElement('img');
    mavs.src = 'https://media.giphy.com/media/l1J9J1ViuXzPHQTpC/giphy.gif';
    mavs.alt = 'mavs logo';
    logoDiv.appendChild(mavs);
  } else if (team.full_name === 'Denver Nuggets') {
    let nuggets = document.createElement('img');
    nuggets.src = 'https://media.giphy.com/media/uV6wkm2a10CUgay7rD/giphy.gif';
    nuggets.alt = 'nuggets logo';
    logoDiv.appendChild(nuggets);
  } else if (team.full_name === 'Detroit Pistons') {
    let pistons = document.createElement('img');
    pistons.src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pistons_logo17.svg/1200px-Pistons_logo17.svg.png';
    pistons.alt = 'pistons logo';
    logoDiv.appendChild(pistons);
  } else if (team.full_name === 'Golden State Warriors') {
    let warriors = document.createElement('img');
    warriors.src = 'https://media.giphy.com/media/xUPGcmMzwk2xgCy39S/giphy.gif';
    warriors.alt = 'warriors logo';
    logoDiv.appendChild(warriors);
  } else if (team.full_name === 'Houston Rockets') {
    let rockets = document.createElement('img');
    rockets.src = 'https://media.giphy.com/media/26FmRF7cOABiwroac/giphy.gif';
    rockets.alt = 'rockets logo';
    logoDiv.appendChild(rockets);
  } else if (team.full_name === 'Indiana Pacers') {
    let pacers = document.createElement('img');
    pacers.src = 'https://media.giphy.com/media/eX4FFL3Nms3mm1M5st/giphy.gif';
    pacers.alt = 'pacers logo';
    logoDiv.appendChild(pacers);
  } else if (team.full_name === 'LA Clippers') {
    let clippers = document.createElement('img');
    clippers.src = 'https://media.giphy.com/media/3tNxqXgyxNMaPl4KEH/giphy.gif';
    clippers.alt = 'clippers logo';
    logoDiv.appendChild(clippers);
  } else if (team.full_name === 'Los Angeles Lakers') {
    let lakers = document.createElement('img');
    lakers.src = 'https://media.giphy.com/media/l1J9IDr5QO6064jgk/giphy.gif';
    lakers.alt = 'lakers logo';
    logoDiv.appendChild(lakers);
  } else if (team.full_name === 'Memphis Grizzlies') {
    let grizzlies = document.createElement('img');
    grizzlies.src =
      'https://media.giphy.com/media/gfff9va26yPe5WHP21/giphy.gif';
    grizzlies.alt = 'grizzlies logo';
    logoDiv.appendChild(grizzlies);
  } else if (team.full_name === 'Miami Heat') {
    let heat = document.createElement('img');
    heat.src = 'https://media.giphy.com/media/d7qwzzCazqrQFIiqVS/giphy.gif';
    heat.alt = 'heat logo';
    logoDiv.appendChild(heat);
  } else if (team.full_name === 'Milwaukee Bucks') {
    let bucks = document.createElement('img');
    bucks.src = 'https://media.giphy.com/media/cmf5ZKf79oOCIaYrAe/giphy.gif';
    bucks.alt = 'bucks logo';
    logoDiv.appendChild(bucks);
  } else if (team.full_name === 'Minnesota Timberwolves') {
    let wolves = document.createElement('img');
    wolves.src = 'https://media.giphy.com/media/3ohhwhcofOL76Ko5lS/giphy.gif';
    wolves.alt = 'wolves logo';
    logoDiv.appendChild(wolves);
  } else if (team.full_name === 'New Orleans Pelicans') {
    let pelicans = document.createElement('img');
    pelicans.src = 'https://media.giphy.com/media/3ohhwCaAPbZUCRacJG/giphy.gif';
    pelicans.alt = 'pelicans logo';
    logoDiv.appendChild(pelicans);
  } else if (team.full_name === 'New York Knicks') {
    let knicks = document.createElement('img');
    knicks.src = 'https://media.giphy.com/media/l1J9yCPeaCquGxius/giphy.gif';
    knicks.alt = 'knicks logo';
    logoDiv.appendChild(knicks);
  } else if (team.full_name === 'Oklahoma City Thunder') {
    let thunder = document.createElement('img');
    thunder.src = 'https://media.giphy.com/media/LrLamsFRWJ6zvjsbRq/giphy.gif';
    thunder.alt = 'thunder logo';
    logoDiv.appendChild(thunder);
  } else if (team.full_name === 'Orlando Magic') {
    let magic = document.createElement('img');
    magic.src = 'https://media.giphy.com/media/idG0nkkEzU7X5us9t1/giphy.gif';
    magic.alt = 'magic logo';
    logoDiv.appendChild(magic);
  } else if (team.full_name === 'Philadelphia 76ers') {
    let sixers = document.createElement('img');
    sixers.src = 'https://media.giphy.com/media/f9ShyS5huvsW23cVbf/giphy.gif';
    sixers.alt = 'sixers logo';
    logoDiv.appendChild(sixers);
  } else if (team.full_name === 'Phoenix Suns') {
    let suns = document.createElement('img');
    suns.src = 'https://media.giphy.com/media/l1J9MDXvL4gkebHyg/giphy.gif';
    suns.alt = 'suns logo';
    logoDiv.appendChild(suns);
  } else if (team.full_name === 'Portland Trail Blazers') {
    let blazers = document.createElement('img');
    blazers.src = 'https://media.giphy.com/media/l1J9LIYS6BK0PqNk4/giphy.gif';
    blazers.alt = 'blazers logo';
    logoDiv.appendChild(blazers);
  } else if (team.full_name === 'Sacramento Kings') {
    let kings = document.createElement('img');
    kings.src = 'https://media.giphy.com/media/IbCoMq0zeUD3zAmEC1/giphy.gif';
    kings.alt = 'kings logo';
    logoDiv.appendChild(kings);
  } else if (team.full_name === 'San Antonio Spurs') {
    let spurs = document.createElement('img');
    spurs.src = 'https://media.giphy.com/media/3ohhwzXZnNmDAWE812/giphy.gif';
    spurs.alt = 'spurs logo';
    logoDiv.appendChild(spurs);
  } else if (team.full_name === 'Toronto Raptors') {
    let raptors = document.createElement('img');
    raptors.src = 'https://media.giphy.com/media/834kiCPisP9HC1LUxI/giphy.gif';
    raptors.alt = 'raptors logo';
    logoDiv.appendChild(raptors);
  } else if (team.full_name === 'Utah Jazz') {
    let jazz = document.createElement('img');
    jazz.src = 'https://media.giphy.com/media/l1J9LcRO0IWWpsawE/giphy.gif';
    jazz.alt = 'jazz logo';
    logoDiv.appendChild(jazz);
  } else if (team.full_name === 'Washington Wizards') {
    let wizards = document.createElement('img');
    wizards.src = 'https://media.giphy.com/media/3ohhwKWrdg3LDFMP7i/giphy.gif';
    wizards.alt = 'wizards logo';
    logoDiv.appendChild(wizards);
  }
}
