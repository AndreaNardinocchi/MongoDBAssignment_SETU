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
      { _id: "20001234_m_1" },
      { _id: ObjectId("573a1390f29313caabcd4218") },
      { _id: ObjectId("573a1390f29313caabcd4217") },
    ],
    name: "James Madison",
    email: "james.madison@gmail.com",
    password: "eljamesloco56=",
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
      { _id: "20001234_m_2" },
      { _id: ObjectId("573a1390f29313caabcd41b1") },
      { _id: ObjectId("573a1390f29313caabcd41aa") },
      { _id: ObjectId("573a1390f29313caabcd418c") },
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
      { _id: ObjectId("573a1390f29313caabcd4274") },
      { _id: ObjectId("573a1390f29313caabcd413e") },
      { _id: ObjectId("573a1390f29313caabcd4135") },
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
  { _id: "20001234_m_1" },
  { $set: { "imdb.rating": 10 }, $inc: { "imdb.votes": 1 } }
);

/* Part 3 | Update
Add a new favourite to the array in one of your user documents. */
db.users.updateOne(
  { _id: "20001234_u_1" },
  { $push: { favourites: { _id: ObjectId("573a1390f29313caabcd42ee") } } }
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
