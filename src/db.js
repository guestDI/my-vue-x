const currentUser = {
  recordId: "60959239-a936-481b-9b6c-cc8f49aa3cd5",
  name: "Chris Evans",
  username: "steverodgers",
  image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  following: [],
  followers: ["ffc8e891-719e-4d9e-a034-8b6468c6c173"]
};

const authors = [
  {
    recordId: "ffc8e891-719e-4d9e-a034-8b6468c6c173",
    name: "J.K. Rowling",
    username: "jkrowling",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    following: [],
    followers: []
  },
  {
    recordId: "3d0ebbb1-bc93-406a-9695-d2ebc2638cd4",
    name: "Stephen King",
    username: "sking",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    following: [],
    followers: []
  },
  {
    recordId: "60959239-a936-481b-9b6c-cc8f99aa6cd9",
    name: "Haruki Murakami",
    username: "hmurakami",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    following: [],
    followers: []
  },
  currentUser,
];

const tweets = [
  {
    tweetId: "55e64441-b94a-4dc7-bfe5-55ec2c138f9a",
    authorId: "ffc8e891-719e-4d9e-a034-8b6468c6c173",
    text: "Just tried the new vegan burger at GreenBites! 🌱 Absolutely delicious! #VeganLife #FoodieFinds #HealthyEating",
  },
  {
    tweetId: "2772549e-fbe0-47fa-89f1-939d5814bc5c",
    authorId: "ffc8e891-719e-4d9e-a034-8b6468c6c173",
    text: "Exploring the hidden gems of Kyoto today. This city is a perfect blend of tradition and modernity. 🏯✨ #TravelDiaries #Kyoto #JapanAdventures",
  },
  {
    tweetId: "b488b29a-6734-4ea8-92e1-bbb85fcca671",
    authorId: "3d0ebbb1-bc93-406a-9695-d2ebc2638cd4",
    text: "Apple's latest update brings some cool features to the table, but is it worth the hype? Let's dive in. 🍏💻 #TechTalk #AppleUpdate #GadgetGeek",
  },
  {
    tweetId: "4d1115e0-e577-46ff-85ab-b80b4734887e",
    authorId: "60959239-a936-481b-9b6c-cc8f99aa6cd9",
    text: "What a game last night! The final buzzer-beater had me on the edge of my seat. 🏀🔥 #NBAPlayoffs #EpicWin #BasketballLove",
  },
  {
    tweetId: "3489b5a1-39b3-4772-ad35-4d82deacb90f",
    authorId: "3d0ebbb1-bc93-406a-9695-d2ebc2638cd4",
    text: "Just finished 'The Silent Patient' by Alex Michaelides. A gripping thriller that keeps you guessing till the end! 📚🔍 #BookReview #ThrillerReads #ReadingGoals",
  },
  {
    tweetId: "b5b9316c-2698-41eb-9d2c-83c62b439fd4",
    authorId: "60959239-a936-481b-9b6c-cc8f99aa6cd9",
    text: "Did you know recycling one ton of paper saves 17 trees? Let's do our part to protect the planet. 🌍♻️ #EcoTips #Sustainability #GreenLiving",
  },
  {
    tweetId: "56d225fa-1c79-43fe-9b69-077048363fb5",
    authorId: "ffc8e891-719e-4d9e-a034-8b6468c6c173",
    text: "Currently jamming to the new album by The Weeknd. Every track is a hit! 🎧🎶 #NowPlaying #MusicMonday #TheWeeknd",
  },
];

const db = {
  authors,
  tweets,
  currentUser,
};

export default db;
