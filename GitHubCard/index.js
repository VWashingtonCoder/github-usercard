/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from "axios";

// axios.get('https://api.github.com/users/VWashingtonCoder')
// .then(resp =>{
//   console.log(resp.data)
// })
// .catch(err => {
//   console.error(err);
// });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

axios.get('https://api.github.com/users/VWashingtonCoder')
.then(resp =>{
  let apiObj = resp.data;
  const profileCard = cardMaker(apiObj);
  document.querySelector(".cards").appendChild(profileCard);
})
.catch(err => {
  console.error(err);
  alert(`Sorry. Site is down`);
});

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["jeremylong", "stevejgordon", "antfu", "patrick-kidger", "Neo23x0"];

followersArray.forEach(elem => {
  axios.get(`https://api.github.com/users/${elem}`)
    .then(resp =>{
      let apiObj = resp.data;
      const profileCard = cardMaker(apiObj);
      document.querySelector(".cards").appendChild(profileCard);
    })
    .catch(err => {
      console.error(err);
      alert(`Sorry. Site is Down Momentarily`)
    });
})
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(apiObj){
  //Institate elements
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const urlAddress = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  // form element structure
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(urlAddress);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  //add className & textContent
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");
  image.src = apiObj.avatar_url;
  name.textContent = apiObj.name;
  username.textContent = apiObj.login;
  location.textContent = `Location: ${apiObj.location}`;
  profile.textContent = `Profile:`;
  urlAddress.href = apiObj.html_url;
  urlAddress.textContent = apiObj.html_url;
  followers.textContent = `Followers: ${apiObj.followers}`;
  following.textContent = `Following: ${apiObj.following}`;
  bio.textContent = `Bio: ${apiObj.bio}`
  //always return
  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
