var instance = createData();

var result = {
  getFromServerSide: function(predicate) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (predicate instanceof Function) {
          resolve(predicate(createData()));
        } else {
          resolve(createData());
        }
      }, 700);
    });
  },
  get: function() {
    return instance;
  },
  getRandom: function(count) {
    let places = instance.map(x => x.placeOfResidence);

    let people = [];

    for (let i = 0; i < count; i++) {
      people.push({
        firstName: firstNames[getRandomInt(0, instance.length - 1)],
        lastName: lastNames[getRandomInt(0, instance.length - 1)],
        placeOfResidence: places[getRandomInt(0, instance.length - 1)],
        age: getRandomInt(1, 100),
        children: getRandomInt(0, 4)
      });
    }

    return people;
  }
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createData() {
  return [
    {
      age: 28,
      firstName: 'Noah',
      lastName: 'Smith',
      placeOfResidence: 'London',
      children: 0
    }, {
      age: 30,
      firstName: 'William',
      lastName: 'Smith',
      placeOfResidence: 'London',
      children: 1
    }, {
      age: 21,
      firstName: 'Mason',
      lastName: 'Johnson',
      placeOfResidence: 'Los Angeles',
      children: 1
    }, {
      age: 63,
      firstName: 'William',
      lastName: 'Jones',
      placeOfResidence: 'London',
      children: 3
    }, {
      age: 28,
      firstName: 'James',
      lastName: 'Williams',
      placeOfResidence: 'Manchester',
      children: 0
    }, {
      age: 30,
      firstName: 'James',
      lastName: 'Jones',
      placeOfResidence: 'Dortmund',
      children: 1
    }, {
      age: 49,
      firstName: 'Mark',
      lastName: 'Davis',
      placeOfResidence: 'Berlin',
      children: 0
    }, {
      age: 10,
      firstName: 'Jacob',
      lastName: 'Davis',
      placeOfResidence: 'Berlin',
      children: 0
    }, {
      age: 10,
      firstName: 'Max',
      lastName: 'Wilson',
      placeOfResidence: 'Paris',
      children: 10
    }, {
      age: 57,
      firstName: 'Michael',
      lastName: 'Miller',
      placeOfResidence: 'Warsaw',
      children: 0
    }, {
      age: 45,
      firstName: 'Max',
      lastName: 'Brown',
      placeOfResidence: 'Chicago',
      children: 1
    }, {
      age: 12,
      firstName: 'Hugo',
      lastName: 'Brown',
      placeOfResidence: 'London',
      children: 0
    }, {
      age: 4,
      firstName: 'Kate',
      lastName: 'Moore',
      placeOfResidence: 'London',
      children: 0
    }, {
      age: 34,
      firstName: 'Caroline',
      lastName: 'Zane',
      placeOfResidence: 'Los Angeles',
      children: 1
    }, {
      age: 24,
      firstName: 'Richard',
      lastName: 'Moore',
      placeOfResidence: 'London',
      children: 3
    }, {
      age: 87,
      firstName: 'David',
      lastName: 'Moore',
      placeOfResidence: 'Manchester',
      children: 0
    }, {
      age: 6,
      firstName: 'Michael',
      lastName: 'Jones',
      placeOfResidence: 'Dortmund',
      children: 0
    }, {
      age: 61,
      firstName: 'Markus',
      lastName: 'Jones',
      placeOfResidence: 'Berlin',
      children: 2
    }, {
      age: 58,
      firstName: 'Jeremy',
      lastName: 'Hoebierg',
      placeOfResidence: 'Berlin',
      children: 5
    }, {
      age: 4,
      firstName: 'Ethan',
      lastName: 'Murphy',
      placeOfResidence: 'Paris',
      children: 0
    }, {
      age: 4,
      firstName: 'Alexander',
      lastName: 'Sanchez',
      placeOfResidence: 'Warsaw',
      children: 0
    }, {
      age: 4,
      firstName: 'Alexander',
      lastName: 'Sanchez',
      placeOfResidence: 'Warsaw',
      children: 0
    }, {
      age: 4,
      firstName: 'Liam',
      lastName: 'Murphy',
      placeOfResidence: 'Warsaw',
      children: 0
    }];
}

let firstNames =
  [
    "Noah",
    "Liam",
    "Mason",
    "Jacob",
    "William",
    "Ethan",
    "Michael",
    "Alexander",
    "James",
    "Daniel",
    "Elijah",
    "Benjamin",
    "Logan",
    "Aiden",
    "Jayden",
    "Matthew",
    "Jackson",
    "David",
    "Lucas",
    "Joseph",
    "Anthony",
    "Andrew",
    "Samuel",
    "Gabriel",
    "Joshua",
    "John",
    "Carter",
    "Luke",
    "Dylan",
    "Christopher",
    "Isaac",
    "Oliver",
    "Henry",
    "Sebastian",
    "Caleb",
    "Owen",
    "Ryan",
    "Nathan",
    "Wyatt",
    "Hunter",
    "Jack",
    "Christian",
    "Landon",
    "Jonathan",
    "Levi",
    "Jaxon",
    "Julian",
    "Isaiah",
    "Eli",
    "Aaron",
    "Charles",
    "Connor",
    "Cameron",
    "Thomas",
    "Jordan",
    "Jeremiah",
    "Nicholas",
    "Evan",
    "Adrian",
    "Gavin",
    "Robert",
    "Brayden",
    "Grayson",
    "Josiah",
    "Colton",
    "Austin",
    "Angel",
    "Jace",
    "Dominic",
    "Kevin",
    "Brandon",
    "Tyler",
    "Parker",
    "Ayden",
    "Jason",
    "Jose",
    "Ian",
    "Chase",
    "Adam",
    "Hudson",
    "Nolan",
    "Zachary",
    "Easton",
    "Blake",
    "Jaxson",
    "Cooper",
    "Lincoln",
    "Xavier",
    "Bentley",
    "Kayden",
    "Carson",
    "Brody",
    "Asher",
    "Nathaniel",
    "Ryder",
    "Justin",
    "Leo",
    "Juan",
    "Luis",
    "Camden",
    "Emma",
    "Olivia",
    "Sophia",
    "Isabella",
    "Ava",
    "Mia",
    "Emily",
    "Abigail",
    "Madison",
    "Charlotte",
    "Harper",
    "Sofia",
    "Avery",
    "Elizabeth",
    "Amelia",
    "Evelyn",
    "Ella",
    "Chloe",
    "Victoria",
    "Aubrey",
    "Grace",
    "Zoey",
    "Natalie",
    "Addison",
    "Lillian",
    "Brooklyn",
    "Lily",
    "Hannah",
    "Layla",
    "Scarlett",
    "Aria",
    "Zoe",
    "Samantha",
    "Anna",
    "Leah",
    "Audrey",
    "Ariana",
    "Allison",
    "Savannah",
    "Arianna",
    "Camila",
    "Penelope",
    "Gabriella",
    "Claire",
    "Aaliyah",
    "Sadie",
    "Riley",
    "Skylar",
    "Nora",
    "Sarah",
    "Hailey",
    "Kaylee",
    "Paisley",
    "Kennedy",
    "Ellie",
    "Peyton",
    "Annabelle",
    "Caroline",
    "Madelyn",
    "Serenity",
    "Aubree",
    "Lucy",
    "Alexa",
    "Alexis",
    "Nevaeh",
    "Stella",
    "Violet",
    "Genesis",
    "Mackenzie",
    "Bella",
    "Autumn",
    "Mila",
    "Kylie",
    "Maya",
    "Piper",
    "Alyssa",
    "Taylor",
    "Eleanor",
    "Melanie",
    "Naomi",
    "Faith",
    "Eva",
    "Katherine",
    "Lydia",
    "Brianna",
    "Julia",
    "Ashley",
    "Khloe",
    "Madeline",
    "Ruby",
    "Sophie",
    "Alexandra",
    "London",
    "Lauren",
    "Gianna",
    "Isabelle",
    "Alice",
    "Vivian",
    "Hadley",
    "Jasmine"
  ];

let lastNames =
  [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Lewis",
    "Lee",
    "Walker",
    "Hall",
    "Allen",
    "Young",
    "Hernandez",
    "King",
    "Wright",
    "Lopez",
    "Hill",
    "Scott",
    "Green",
    "Adams",
    "Baker",
    "Gonzalez",
    "Nelson",
    "Carter",
    "Mitchell",
    "Perez",
    "Roberts",
    "Turner",
    "Phillips",
    "Campbell",
    "Parker",
    "Evans",
    "Edwards",
    "Collins",
    "Stewart",
    "Sanchez",
    "Morris",
    "Rogers",
    "Reed",
    "Cook",
    "Morgan",
    "Bell",
    "Murphy",
    "Bailey",
    "Rivera",
    "Cooper",
    "Richardson",
    "Cox",
    "Howard",
    "Ward",
    "Torres",
    "Peterson",
    "Gray",
    "Ramirez",
    "James",
    "Watson",
    "Brooks",
    "Kelly",
    "Sanders",
    "Price",
    "Bennett",
    "Wood",
    "Barnes",
    "Ross",
    "Henderson",
    "Coleman",
    "Jenkins",
    "Perry",
    "Powell",
    "Long",
    "Patterson",
    "Hughes",
    "Flores",
    "Washington",
    "Butler",
    "Simmons",
    "Foster",
    "Gonzales",
    "Bryant",
    "Alexander",
    "Russell",
    "Griffin",
    "Diaz",
    "Hayes"
  ];


export default result;