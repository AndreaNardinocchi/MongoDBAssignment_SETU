//Part 1, Query 1
//This query shows all 2010 movies starring Tom Hanks
db.movies.find();

// {
//     _id: ObjectId('573a1390f29313caabcd42bf'),
//     title: 'Jack and the Beanstalk',
//     year: 1902,
//     runtime: 10,
//     released: 1902-07-15T00:00:00.000Z,
//     cast: [
//       'Thomas White'
//     ],
//     poster: 'http://ia.media-imdb.com/images/M/MV5BMjAzNTI3MzI0Nl5BMl5BanBnXkFtZTcwMzQ1MTYzMw@@._V1_SX300.jpg',
//     plot: "Porter's sequential continuity editing links several shots to form a narrative of the famous fairy tale story of Jack and his magic beanstalk. Borrowing on cinematographic methods ...",
//     fullplot: "Porter's sequential continuity editing links several shots to form a narrative of the famous fairy tale story of Jack and his magic beanstalk. Borrowing on cinematographic methods reminiscent of 'Georges Melies', Porter uses animation, double exposure, and trick photography to illustrate the fairy's apparitions, Jack's dream, and the fast growing beanstalk.",
//     lastupdated: '2015-08-29 00:25:25.360000000',
//     type: 'movie',
//     languages: [
//       'English'
//     ],
//     directors: [
//       'George S. Fleming',
//       'Edwin S. Porter'
//     ],
//     imdb: {
//       rating: 6.2,
//       votes: 442,
//       id: 399
//     },
//     countries: [
//       'USA'
//     ],
//     genres: [
//       'Short',
//       'Fantasy'
//     ]
//   }

// Part 1, Query 1
// This query shows the first 10 Documentaries sorted by imdb rating ascendentally whose rate is
// neither 'G' or 'PG', and whose rating is less then or equal to '8'
db.movies
  .find(
    {
      genres: "Documentary",
      rated: { $nin: ["G", "PG"] },
      "imdb.rating": { $lte: 8 },
    },
    { _id: 0, title: 1, directors: 1, genres: 1, "imdb.rating": 1 }
  )
  .sort({ "imdb.rating": 1 })
  .limit(10);

// Part 1, Query 2
// This query counts how many reviews were left by 'Ygritte' and 'Hodor' altogether before 2018,
db.movies
  .find({
    comments: {
      $elemMatch: {
        name: { $in: ["Ygritte", "Hodor"] },
        date: { $lt: new ISODate("2018-01-01T00:00:00Z") },
      },
    },
  })
  .count();

// Part 1, Query 3
// This query shows the first 10 Documentaries ascendentally whose gernres is both 'Short' and 'Horror'
// The projection will show title, year, directors, imdb rating, and countries.
db.movies
  .find(
    {
      genres: { $all: ["Short", "Horror"] },
    },
    { _id: 0, title: 1, year: 1, directors: 1, "imdb.rating": 1, countries: 1 }
  )
  .sort({ year: 1 })
  .limit(10);

// Part 1, Query 4
// This query shows movies made after 2015 whose language neither 'English' nor 'Spanish', descendently sorted by year.
// The projection will show title, year, directors, imdb rating, countries, and languages. It also skip the first 2 documents.
db.movies
  .find(
    {
      $and: [{ languages: { $exists: true, $nin: ["English", "Spanish"] } }],
      year: { $gt: 2015 },
    },
    {
      _id: 0,
      title: 1,
      year: 1,
      directors: 1,
      "imdb.rating": 1,
      countries: 1,
      languages: 1,
    }
  )
  .sort({ year: -1 })
  .skip(2);

// Part 1, Query 5
// This query shows the number of movies made in 'USA. or 'UK' before 1990 whose numOfReviews under the 'tomatoes.viewer' fields is greater than
// 10000, and whose genres is 'Short' and 'Comedy'
db.movies
  .find(
    {
      "tomatoes.viewer.numReviews": { $gte: 10000 },
      genres: { $all: ["Short", "Comedy"] },
      countries: { $in: ["USA", "UK"] },
      year: { $lt: 1990 },
    },
    {
      _id: 0,
      title: 1,
      genres: 1,
      year: 1,
      countries: 1,
    }
  )
  .count();

// Part 1, Query 6
// This query shows a list of movies whose "tomatoes.viewer.ratings" is withing a 2-4 range, whose genres
// include "Short", "Comedy", "Animation", whose language is 'English' and that have not been made before 2000.
// The list is sorted by "tomatoes.viewer.ratings" in ascendent order.
db.movies
  .find(
    {
      $and: [
        { "tomatoes.viewer.rating": { $gte: 2 } },
        { "tomatoes.viewer.rating": { $lte: 4 } },
      ],
      genres: { $all: ["Short", "Comedy", "Animation"] },
      languages: "English",
      year: { $gte: 2000 },
    },
    {
      _id: 0,
      title: 1,
      directors: 1,
      genres: 1,
      languages: 1,
      year: 1,
      countries: 1,
      "tomatoes.viewer.rating": 1,
    }
  )
  .sort({ "tomatoes.viewer.rating": 1 });

// Part 2, Movies
// Add two movies you like that were released between 2017 and 2024.
db.movies.insertMany([
  {
    _id: "20001234_m_1",
    title: "Wonder Woman",
    year: 2017,
    runtime: 2,
    cast: [
      "Gal Gadot",
      "Chris Pine",
      "Robin Wright",
      "Lucy Davis",
      "Connie Nielsen",
      "Danny Huston",
    ],
    plot: "Diana, princess of the Amazons, trained to be an unconquerable warrior. Raised on a sheltered island paradise, when a pilot crashes on their shores and tells of a massive conflict raging in the outside world, Diana leaves her home, convinced she can stop the threat. Fighting alongside man in a war to end all wars, Diana will discover her full powers and her true destiny.",
    genres: ["Action", "Adventure", "Fantasy", "Sci-Fi", "War"],
    imdb: {
      rating: 7.3,
      votes: 712000,
    },
  },
  {
    _id: "20001234_m_2",
    title: "Still: A Michael J. Fox Movie",
    year: 2023,
    runtime: 1.35,
    cast: ["Michael J. Fox", "Davis Guggenheim", "Tracy Pollan", "Sam Fox"],
    plot: "Follows the life of beloved actor and advocate Michael J. Fox, exploring his personal and professional triumphs and travails, and what happens when an incurable optimist confronts an incurable disease.",
    genres: ["Documentary", "Biography"],
    imdb: {
      rating: 8.1,
      votes: 16000,
    },
  },
]);

// Part 2, Users
// Create a users collection with three user documents.
db.users.insertMany([
  {
    _id: "20001234_u_1",
    favourites: [
      {
        movie_id: ObjectId("573a1390f29313caabcd413e"),
        title: "Tables Turned on the Gardener",
        rating: 7
      },
      {
        movie_id: ObjectId("573a1390f29313caabcd4136"),
        title: "Pauvre Pierrot",
        rating: 6
      },
      { movie_id: ObjectId("573a13daf29313caabdadb64"), title: 'Ma vie de courgette', rating: 9 },
      { movie_id: ObjectId("573a13ddf29313caabdb4565"), title: 'Les Visiteurs 3: la Terreur', rating: 10 },
      { movie_id: ObjectId("573a13d8f29313caabda716c"), title: 'La route des lacs', rating: 7 },
      { movie_id: ObjectId("573a13e2f29313caabdbdbef"), title: 'The Serious Game', rating: 4.5 },
      { movie_id: ObjectId("573a13f2f29313caabdddb88"), title: 'Mohenjo Daro', rating: 7.5 },
      { movie_id: ObjectId("573a13f1f29313caabddc0ab"), title: 'From the Land of the Moon', rating: 9 },
      { movie_id: ObjectId("573a13e2f29313caabdbe0c7"), title: 'On the Milky Road', rating: 4 },
      { movie_id: ObjectId("573a1390f29313caabcd4274"), title: 'Let Me Dream Again', rating: 6 },
      { movie_id: ObjectId("573a13eff29313caabdd8b51"), title: 'Dhishoom', rating: 5 },
      { movie_id: ObjectId("573a13e3f29313caabdc02a4"), title: 'Ip Man 3', rating: 2 },
      { movie_id: ObjectId("573a13f4f29313caabde1612"), title: 'Sekai kara neko ga kietanara', rating: 7.5 },
      { movie_id: ObjectId("573a13cbf29313caabd7f7f8"), title: 'The Big Short', rating: 8 },
      { movie_id: ObjectId("573a1390f29313caabcd4217"), title: 'Cinderella', rating: 8 }
    ],
    name: "Amanda Tanner",
    email: "amanda_tanner@fakegmail.com",
    password: "laamandaloca56=",
    phone: "353 090807060",
    imdb_membership_year: 2010,
    subscription: {
      type: "6 month",
      price_per_month: 35,
    },
    shipping_address: "2 Rose Church, Whiterock, Corkyan, Irelandia",
    paymentDetails: {
      card_type: "Visa Credit",
      card_name: "James Madison",
      card_number: "0091 1242 0578 1157",
      card_expiry: "09/25",
    },
  },
  {
    _id: "20001234_u_2",
    favourites: [
      {
        movie_id: ObjectId("573a1390f29313caabcd446f"),
        title: "A Corner in Wheat",
        rating: 5.5
      },
      {
        movie_id: ObjectId("573a1390f29313caabcd4ad2"),
        title: "The Life and Death of King Richard III",
        rating: 10
      },
      { movie_id: ObjectId("573a1390f29313caabcd4217"), title: 'Cinderella', rating: 9 },
      { movie_id: ObjectId("573a1390f29313caabcd413e"), title: 'Tables Turned on the Gardener', rating: 7 },
      { movie_id: ObjectId("573a13eff29313caabdd8b51"), title: 'Dhishoom', rating: 4.5 },
      { movie_id: ObjectId("573a13f1f29313caabddc0ab"), title: 'From the Land of the Moon', rating: 8.5 },
      { movie_id: ObjectId("573a13d8f29313caabda716c"), title: 'La route des lacs', rating: 10 },
      { movie_id: ObjectId("573a13e2f29313caabdbe0c7"), title: 'On the Milky Road', rating: 9 },
      { movie_id: ObjectId("573a13e3f29313caabdc02a4"), title: 'Ip Man 3', rating: 4 },
      { movie_id: ObjectId("573a13f4f29313caabde1612"), title: 'Sekai kara neko ga kietanara', rating: 6.5 },
      { movie_id: ObjectId("573a13ddf29313caabdb4565"), title: 'Les Visiteurs 3: la Terreur', rating: 5 },
      { movie_id: ObjectId("573a13cbf29313caabd7f7f8"), title: 'The Big Short', rating: 9 },
      { movie_id: ObjectId("573a13daf29313caabdadb64"), title: 'Ma vie de courgette', rating: 6 },
      { movie_id: ObjectId("573a13e2f29313caabdbdbef"), title: 'The Serious Game', rating: 7.5 },
      { movie_id: ObjectId("573a1390f29313caabcd4274"), title: 'Let Me Dream Again', rating: 4 },
      { movie_id: ObjectId("573a1390f29313caabcd4136"), title: 'Pauvre Pierrot', rating: 9 },
      { movie_id: ObjectId("573a13f2f29313caabdddb88"), title: 'Mohenjo Daro', rating: 8.5 }
    ],
    name: "Andy Nard",
    email: "andy.nard@gmail.com",
    password: "andynard76=",
    phone: "353 908070605",
    imdb_membership_year: 2020,
    subscription: {
      type: "annual",
      price_per_month: 25,
    },
    shipping_address: "33 Day of Reckon, Horrorhill, Terrorland, King of Fear",
    paymentDetails: {
      card_type: "Visa Debit",
      card_name: "Loren Haley",
      card_number: "1021 9007 0578 1244",
      card_expiry: "06/27",
    },
  },
  {
    _id: "20001234_u_3",
    favourites: [
      {
        movie_id: ObjectId("573a1390f29313caabcd428d"),
        title: "The India Rubber Head",
        rating: 7
      },
      {
        movie_id: ObjectId("573a1390f29313caabcd4292"),
        title: "Panorama of Esplanade by Night",
        rating: 4
      },
      { movie_id: ObjectId("573a13f2f29313caabdddb88"), title: 'Mohenjo Daro', rating: 4.5 },
      { movie_id: ObjectId("573a1390f29313caabcd4274"), title: 'Let Me Dream Again', rating: 5 },
      { movie_id: ObjectId("573a1390f29313caabcd4136"), title: 'Pauvre Pierrot', rating: 7 },
      { movie_id: ObjectId("573a13daf29313caabdadb64"), title: 'Ma vie de courgette', rating: 9 },
      { movie_id: ObjectId("573a13f1f29313caabddc0ab"), title: 'From the Land of the Moon', rating: 6.5 },
      { movie_id: ObjectId("573a13eff29313caabdd8b51"), title: 'Dhishoom', rating: 6 },
      { movie_id: ObjectId("573a13e2f29313caabdbdbef"), title: 'The Serious Game', rating: 3.5 },
      { movie_id: ObjectId("573a13e3f29313caabdc02a4"), title: 'Ip Man 3', rating: 5 },
      { movie_id: ObjectId("573a13cbf29313caabd7f7f8"), title: 'The Big Short', rating: 10 },
      { movie_id: ObjectId("573a13d8f29313caabda716c"), title: 'La route des lacs', rating: 9 },
      { movie_id: ObjectId("573a13e2f29313caabdbe0c7"), title: 'On the Milky Road', rating: 2 },
      { movie_id: ObjectId("573a1390f29313caabcd4217"), title: 'Cinderella', rating: 7 },
      { movie_id: ObjectId("573a13ddf29313caabdb4565"), title: 'Les Visiteurs 3: la Terreur', rating: 8 },
      { movie_id: ObjectId("573a13f4f29313caabde1612"), title: 'Sekai kara neko ga kietanara', rating: 7.5 }
    ],
    name: "Yolanda Marcucci",
    email: "yolanda.marcucci@gmail.com",
    password: "yolemarcucci66=",
    phone: "353 89101112",
    imdb_membership_year: 2001,
    subscription: {
      type: "3 month",
      price_per_month: 40,
    },
    shipping_address: "56 Fortress Road, Terranova, Gynland",
    paymentDetails: {
      card_type: "Mastercard Credit",
      card_name: "Yolanda Marcucci",
      card_number: "9999 1347 2255 9980",
      card_expiry: "06/28",
    },
  },
]);

/* Part 3 | Update
On one of your movie documents (whichever you choose), update the IMDB rating to a new value 
and increase the number of votes by 1. */

db.movies.updateOne(
  { movie_id: "20001234_m_1" },
  { $set: { "imdb.rating": 10 }, $inc: { "imdb.votes": 1 } }
);

/* Part 3 | Update
Add a new favourite to the array in one of your user documents. */
db.users.updateOne(
  { _id: "20001234_u_3" },
  {
    $push: 
    {favourites:
    
        { movie_id: ObjectId("573a1390f29313caabcd413e"), title: 'Tables Turned on the Gardener', rating: 9.8 },
      
      
    }
    },
  
);

/* Part 3 | Update 
We are adding an 'additional payment method and details', while changing password too */
db.users.updateOne(
  { _id: "20001234_u_2" },
  {
    $set: {
      second_paymentDetails: {
        card_type: "Mastercard credit",
        card_name: "Andy Nard",
        card_number: "3452 1889 2009 9876",
        card_expiry: "08/02",
      },
      password: "andynardisgreat1976=",
    },
  }
);

/* Part 3 | Update 
Email, phone number and subscription price is being change through the below update */
db.users.updateOne(
  { _id: "20001234_u_3" },
  {
    $set: {
      email: "yolanda.marcucci66@yahoo.com",
      phone: "353 862361777",
      subscription: { price: 45 },
    },
  }
);

/* Part 3 | Delete
Write the code to delete one of the movies you added.*/
db.movies.deleteOne({ movie_id: "20001234_m_1" });

/* Part 4 * | Aggregation Pipeline 1 
The below pipeline uses $lookup to combine information from 'movies', and 'users' collections. 
It, then, $project(s) several relevant fields.
$unwind: to unwind the 'favourites', and 'favourites.rating', which is a rating assigned to the movies 
by the user themselves.
$group: it groups movies based on their title, reports their 'min', and 'max' rating, and calculate the average 
rating for each movie
$match: all 'favourites' whose rating is less than '6'
$sort: sort by average rating (ascending order)
/* https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/ */

db.users.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "favourites.title",
      foreignField: "title",
      as: "favouriteMovies_details",
    },
  },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        imdb_membership_year: 1,
        "favourites": 1,
        "favouriteMovies_details.genres": 1,
        "favouriteMovies_details.title": 1,
        "favouriteMovies_details.cast": 1,
        "favouriteMovies_details.directors": 1,
        "favouriteMovies_details.imdb.rating": 1,
        "favouriteMovies_details.year": 1,
      },
    },
    {
      $unwind: "$favourites",
    },
    {
      $unwind: "$favourites.rating",
    },
    {
      $group: {
        _id: {
        title: "$favourites.title",
      },
        minFavouritesRating: { $min: "$favourites.rating" },
        maxFavouritesRating: { $max: "$favourites.rating" },
        avgFavouritesRating: { $avg: "$favourites.rating" },
      },
    },
    { 
      $match: {
        avgFavouritesRating: { $lt: 6 }
    }
  },
    {
      $sort: { avgFavouritesRating: 1 },
    }
  ]);
  

























################################################
db.movies.aggregate([
  { $match: { year: { $gte: 2015 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "favourites.movie_id",
      as: "movies_details",
    },
  },
  {
    $project: {
      _id: 1,
      title: 1,
      cast: 1,
      directors: 1,
      year: 1,
      "subscription.type": 1,
      "imdb.rating": 1,
      "movies_details.name": 1,
      "movies_details.favourites.movie_id": 1,
      "movies_details.favourites.rating": 1,
    },
  },
  {
    $unwind: "$movies_details",
  },
  {
    $unwind: "$movies_details.favourites",
  },
  {
    $unwind: "$movies_details.favourites.rating",
  },
  // {
  //   $group: {
  //     _id: "$movies_details.favourites.movie_id",
  //     minMoviesDetailsRating: { $min: "$movies_details.favourites.rating" },
  //     maxMoviesDetailsRating: { $max: "$movies_details.favourites.rating" },
  //     avgMoviesDetailsRating: { $avg: "$movies_details.favourites.rating" },
  //   },
  // },
  // {
  // $project: {
  //   _id: 1,
  //   // title: 1,
  //   // cast: 1,
  //   // directors: 1,
  //   // year: 1,
  //   // "imdb.rating": 1,
  //   // "movies_details.name": 1,
  //   // "movies_details.favourites.movie_id": 1,
  //   // "movies_details.favourites.rating": 1,
  // },
  // },

  {
    $sort: { avgMoviesDetailsRating: 1 },
  },
]);

// {
//   $group: {
//     _id: null,
//     favouritesMinRating: { $min: "$movies_details.favourites.rating" },
//     favouritesMaxRating: { $max: "$movies_details.favourites.rating" },
//   },
// },

/* Part 4 * | Aggregation Pipeline 2

*/
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gt: 5 },
      year: { $gte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: {
        year: "$year",
        genre: "$genres",
        countries: "$countries",
      },
      min_rating: { $min: "$imdb.rating" },
      max_rating: { $max: "$imdb.rating" },
      avg_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { "_id.year": -1, average_rating: -1 },
  },
  {
    $group: {
      _id: "$_id.year",
      genre: { $first: "$_id.genre" },
      average_rating: { $first: "$avg_rating" },
    },
  },
  {
    $sort: { year: -1 },
  },
]);

db.movies.aggregate([
  {
    $match: {
      $and: [{ year: { $gte: 1960, $lte: 2020 } }],
    },
  },
  {
    $lookup: {
      from: "users",
      foreignField: "_id",
      localField: "favourites._id",
      as: "movies_details",
    },
  },
  {
    $unwind: "$imdb.rating",
  },
  // {
  //   $group: {
  //     _id: null,
  //     imdbAverageRating: { $avg: "$imdb.rating"}
  //   }
  // },
]);

// {
//     _id: ObjectId('573a1390f29313caabcd42bf'),
//     title: 'Jack and the Beanstalk',
//     year: 1902,
//     runtime: 10,
//     released: 1902-07-15T00:00:00.000Z,
//     cast: [
//       'Thomas White'
//     ],
//     poster: 'http://ia.media-imdb.com/images/M/MV5BMjAzNTI3MzI0Nl5BMl5BanBnXkFtZTcwMzQ1MTYzMw@@._V1_SX300.jpg',
//     plot: "Porter's sequential continuity editing links several shots to form a narrative of the famous fairy tale story of Jack and his magic beanstalk. Borrowing on cinematographic methods ...",
//     fullplot: "Porter's sequential continuity editing links several shots to form a narrative of the famous fairy tale story of Jack and his magic beanstalk. Borrowing on cinematographic methods reminiscent of 'Georges Melies', Porter uses animation, double exposure, and trick photography to illustrate the fairy's apparitions, Jack's dream, and the fast growing beanstalk.",
//     lastupdated: '2015-08-29 00:25:25.360000000',
//     type: 'movie',
//     languages: [
//       'English'
//     ],
//     directors: [
//       'George S. Fleming',
//       'Edwin S. Porter'
//     ],
//     imdb: {
//       rating: 6.2,
//       votes: 442,
//       id: 399
//     },
//     countries: [
//       'USA'
//     ],
//     genres: [
//       'Short',
//       'Fantasy'
//     ]
//   }

db.classes.insertMany([
  {
    _id: 1,
    title: "Reading is ...",
    enrollmentlist: ["giraffe2", "pandabear", "artie"],
    days: ["M", "W", "F"],
  },
  {
    _id: 2,
    title: "But Writing ...",
    enrollmentlist: ["giraffe1", "artie"],
    days: ["T", "F"],
  },
]);

db.members.insertMany([
  { _id: 1, name: "artie", joined: new Date("2016-05-01"), status: "A" },
  { _id: 2, name: "giraffe", joined: new Date("2017-05-01"), status: "D" },
  { _id: 3, name: "giraffe1", joined: new Date("2017-10-01"), status: "A" },
  { _id: 4, name: "panda", joined: new Date("2018-10-11"), status: "A" },
  { _id: 5, name: "pandabear", joined: new Date("2018-12-01"), status: "A" },
  { _id: 6, name: "giraffe2", joined: new Date("2018-12-01"), status: "D" },
]);

db.classes.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "enrollmentlist",
      foreignField: "name",
      as: "enrollee_info",
    },
  },
]);
