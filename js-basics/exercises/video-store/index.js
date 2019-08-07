const inquirer = require("inquirer");
const { VideoStore } = require("./video-store");

let ratingArray = [];
const store = new VideoStore();

function allInfoAboutAllMovies() {
  let averageRatings = [
    {
      name: "",
      rating: 0,
      ratingCount: 0
    }
  ];

  for (let i = 0; i < ratingArray.length; i++) {
    for (let j = 0; j < averageRatings.length; j++) {
      let count = averageRatings[j].ratingCount;
      if (averageRatings[j].name === ratingArray[i].name) {
        count++;
        averageRatings[j].rating =
          averageRatings[j].rating + ratingArray[i].rating;
        averageRatings[j].ratingCount = count;
      }
    }
    let filterEqualNames = averageRatings.filter(
      word => word.name === ratingArray[i].name
    );
    if (filterEqualNames.length < 1) {
      averageRatings.push({
        name: ratingArray[i].name,
        rating: ratingArray[i].rating,
        ratingCount: 1
      });
    }
  }

  averageRatings.shift();
  console.log(
    "\n Here you can see a list of all our movies, their status and ratings: \n"
  );

  for (let x = 0; x < averageRatings.length; x++) {
    let availability = " Movie is not available at the moment! ";
    let checkAvalability = store.printContent.split(",");
    for (let n = 0; n < checkAvalability.length; n++) {
      if (checkAvalability[n] === averageRatings[x].name) {
        availability = " Movie is available now! ";
      }
    }
    let average =
      Math.round(
        (averageRatings[x].rating / averageRatings[x].ratingCount) * 100
      ) / 100;
    average = average.toFixed(1);
    console.log(
      "Movie name: " +
        averageRatings[x].name +
        ", average rating: " +
        average +
        ", " +
        averageRatings[x].ratingCount +
        " people rated this movie!" +
        availability
    );
  }
  console.log();
}

const whatOptionsHasUser = user => {
  if (store.moviesToReturnAsChoises(user).length === 0) {
    return [
      { name: "Rent a video", value: "rent" },
      { name: "See all info about our movies", value: "checkMovies" }
    ];
  }
  return [
    { name: "Rent a video", value: "rent" },
    { name: "Return a video", value: "return" },
    { name: "See all info about our movies", value: "checkMovies" }
  ];
};

function percentageOfUsersWhoLikedVideo(movieName) {
  let count = 0;
  let likedVideosCount = 0;
  let allRatingsOfTheMovie = [];
  for (let i = 0; i < ratingArray.length; i++) {
    if (ratingArray[i].name === movieName) {
      allRatingsOfTheMovie.push(ratingArray[i]);
      count++;
    }
  }
  for (let j = 0; j < allRatingsOfTheMovie.length; j++) {
    if (allRatingsOfTheMovie[j].rating >= 6) {
      likedVideosCount++;
    }
  }
  const percantage = Math.floor((likedVideosCount * 100) / count);

  return percantage;
}

async function rentVideo(name) {
  if (store.asChoices.length < 1) {
    console.log("\n Sorry, there are no available movies at the moment!");
    return;
  }
  const { choices } = await inquirer.prompt([
    {
      name: "choices",
      type: "checkbox",
      message: "Which ones do you want?",
      choices: store.asChoices
    }
  ]);

  store.rentMovies(choices, name);

  console.log(
    `Oh, ${name}. ${choices
      .map(c => c.name)
      .join(", ")} is a good choice.\n ${percentageOfUsersWhoLikedVideo(
      choices.map(c => c.name).join(", ")
    )} % of users liked this video`
  );
  console.log("movies: " + store.printContent);
}

async function returnVideo(name) {
  let movieWithRating = {
    name: "",
    rating: 0
  };
  const { movie } = await inquirer.prompt([
    {
      name: "movie",
      type: "list",
      message: "Which one would you like to return?",
      choices: store.moviesToReturnAsChoises(name)
    }
  ]);

  let ratingToCheck = 6;
  do {
    const { rating } = await inquirer.prompt([
      {
        name: "rating",
        type: "input",
        message: "Please rate this movie from 1 to 10: "
      }
    ]);
    ratingToCheck = rating;

    movieWithRating.name = movie.name;
    movieWithRating.rating = parseInt(rating);
  } while (ratingToCheck < 1 || ratingToCheck > 10);

  ratingArray.push(movieWithRating);

  store.returnMovie(movie);
}

async function fillVideoStore() {
  let addMore = true;
  while (addMore) {
    const { movieName, movieRating, more } = await inquirer.prompt([
      { type: "input", name: "movieName", message: "Enter movie name" },
      {
        type: "number",
        name: "movieRating",
        message: "Enter movie rating from 1 to 10"
      },
      { type: "confirm", name: "more", message: "Would you like to add more?" }
    ]);
    addMore = more;
    store.addMovie(movieName, movieRating);
    ratingArray.push({ name: movieName, rating: movieRating });
    console.log("Thanks, heres list with movies: " + store.printContent);
  }
}

async function app() {
  const { user } = await inquirer.prompt([
    {
      type: "list",
      name: "user",
      message: "Welcome to our video store. Who are you?",
      choices: [
        "User",
        "Admin",
        { name: `I don't want to be here. Let me go`, value: false }
      ]
    }
  ]);
  if (user === "Admin") {
    console.log("Hello Admin. I guess you're here to fill our store.");
    await fillVideoStore();
  } else if (user === "User") {
    const { name } = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What is your name?"
      }
    ]);

    console.log("Hello, " + name);
    const { intent } = await inquirer.prompt([
      {
        type: "list",
        name: "intent",
        message: "What do you want to do?",
        choices: whatOptionsHasUser(name)
      }
    ]);

    if (intent === "rent") {
      await rentVideo(name);
    } else if (intent === "return") {
      await returnVideo(name);
    } else if (intent === "checkMovies") {
      allInfoAboutAllMovies();
    }
  } else {
    return;
  }

  console.log("Thanks and Bye!\n");

  // Start from beginning
  app();
}

app();
