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

db.movies.find(
  {
    comments: { $elemMatch: { name: { $in: ["Ygritte", "Hodor"] } } },
  },
  {
    _id: 0,
    title: 1,
  }
);

db.movies.find(
  {
    "tomatoes.viewer.numReviews": { $gte: 100 },
  },
  {
    _id: 0,
    title: 1,
  }
);

// Outcome 576

// Response
// {
//     title: 'Back to the Future',
//     imdb: {
//       rating: 8.5
//     },
//     genres: [
//       'Adventure',
//       'Comedy',
//       'Sci-Fi'
//     ]
//   }
