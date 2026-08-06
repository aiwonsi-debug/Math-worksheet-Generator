// Noto Emoji Clipart Library (Google)
// License: SIL Open Font License 1.1 — Free for commercial use, no attribution required.
// Source: https://github.com/googlefonts/noto-emoji

const e = (code, name, ext = 'svg') => ({ name, code, ext });

export const clipartCategories = [
  {
    name: '👻 AI Halloween Special',
    items: [
      e('ai_ghost', 'AI Ghost & Pumpkin', 'png'),
      e('ai_cauldron', 'AI Potion Cauldron', 'png'),
      e('ai_witch_hat', 'AI Magic Witch Hat', 'png'),
      e('ai_pumpkin_cat', 'AI Pumpkin Cat', 'png'),
    ]
  },
  {
    name: '🎒 AI Back to School Special',
    items: [
      e('ai_school_bus', 'AI School Bus', 'png'),
      e('ai_backpack', 'AI School Backpack', 'png'),
      e('ai_pencil_character', 'AI Pencil Character', 'png'),
      e('ai_apple_books', 'AI Apple & Books', 'png'),
    ]
  },
  {
    name: '🐶 AI Cute Animals Special',
    items: [
      e('ai_cute_puppy', 'AI Cute Puppy', 'png'),
    ]
  },
  {
    name: '🎒 Back to School (10)',
    items: [
      e('1f34e', 'Apple'),
      e('1f392', 'Backpack'),
      e('270f', 'Pencil'),
      e('1f4da', 'Books'),
      e('1f68c', 'School Bus'),
      e('1f4d0', 'Triangular Ruler'),
      e('1f4cf', 'Ruler'),
      e('2702', 'Scissors'),
      e('1f393', 'Graduation Cap'),
      e('1f3eb', 'School'),
    ]
  },
  {
    name: '🎃 Halloween (10)',
    items: [
      e('1f383', 'Jack-o-lantern'),
      e('1f47b', 'Ghost'),
      e('1f987', 'Bat'),
      e('1f577', 'Spider'),
      e('1f578', 'Spider Web'),
      e('1f36c', 'Candy'),
      e('1f480', 'Skull'),
      e('26b0', 'Coffin'),
      e('1f9d9', 'Witch/Mage'),
      e('1f9df', 'Zombie'),
    ]
  },
  {
    name: '💯 100th Day of School (10)',
    items: [
      e('2b50', 'Star'),
      e('1f389', 'Party Popper'),
      e('1f388', 'Balloon'),
      e('1f4af', '100 Mark'),
      e('1f3c6', 'Trophy'),
      e('1f3c5', 'Medal'),
      e('1f451', 'Crown'),
      e('2728', 'Sparkles'),
      e('1f382', 'Birthday Cake'),
      e('1f387', 'Sparkler Ribbon'),
    ]
  },
  {
    name: '🦃 Thanksgiving (10)',
    items: [
      e('1f983', 'Turkey'),
      e('1f967', 'Pie'),
      e('1f342', 'Fallen Leaf'),
      e('1f33d', 'Ear of Corn'),
      e('1f35e', 'Bread'),
      e('1f357', 'Poultry Leg'),
      e('1f330', 'Chestnut'),
      e('1f360', 'Sweet Potato'),
      e('1f34e', 'Red Apple'),
      e('1f33e', 'Ear of Wheat'),
    ]
  },
  {
    name: '❄️ Winter (10)',
    items: [
      e('2603', 'Snowman'),
      e('2744', 'Snowflake'),
      e('26f8', 'Ice Skate'),
      e('1f9e3', 'Scarf'),
      e('1f9e4', 'Gloves'),
      e('1f6f7', 'Sled'),
      e('2615', 'Hot Cocoa'),
      e('1f328', 'Snow Cloud'),
      e('1f9ca', 'Ice Cube'),
      e('1f9e2', 'Winter Cap'),
    ]
  },
  {
    name: '🎄 Christmas (10)',
    items: [
      e('1f384', 'Christmas Tree'),
      e('1f385', 'Santa Claus'),
      e('1f381', 'Wrapped Gift'),
      e('1f514', 'Bell'),
      e('1f56f', 'Candle'),
      e('1f98c', 'Deer'),
      e('1f9e6', 'Stocking'),
      e('2b50', 'Star'),
      e('1f36a', 'Cookie'),
      e('2603', 'Snowman'),
    ]
  },
  {
    name: '💕 Valentine (10)',
    items: [
      e('1f495', 'Two Hearts'),
      e('1f339', 'Rose'),
      e('1f48c', 'Love Letter'),
      e('1f49d', 'Heart Ribbon'),
      e('1f9c1', 'Cupcake'),
      e('1f36b', 'Chocolate Bar'),
      e('1f9fa', 'Teddy Bear'),
      e('1f48d', 'Ring'),
      e('1f496', 'Sparkling Heart'),
      e('1f337', 'Tulip'),
    ]
  },
  {
    name: '☘️ St. Patrick\'s (10)',
    items: [
      e('2618', 'Shamrock'),
      e('1f340', 'Four Leaf Clover'),
      e('1f308', 'Rainbow'),
      e('1f4b0', 'Money Bag'),
      e('1f451', 'Crown'),
      e('1f37a', 'Beer Mug'),
      e('1f3a9', 'Top Hat'),
      e('2728', 'Sparkles'),
      e('1f4b8', 'Money with Wings'),
      e('1f343', 'Fluttering Leaf'),
    ]
  },
  {
    name: '🐣 Easter (10)',
    items: [
      e('1f95a', 'Egg'),
      e('1f430', 'Rabbit'),
      e('1f425', 'Baby Chick'),
      e('1f423', 'Hatching Chick'),
      e('1f337', 'Tulip'),
      e('1f338', 'Blossom'),
      e('1f955', 'Carrot'),
      e('1f98b', 'Butterfly'),
      e('2600', 'Sun'),
      e('1f33a', 'Hibiscus'),
    ]
  },
  {
    name: '🚀 Summer & Space (10)',
    items: [
      e('1f680', 'Rocket'),
      e('2600', 'Sun'),
      e('1fa90', 'Ringed Planet'),
      e('1f6f8', 'UFO'),
      e('2b50', 'Star'),
      e('1f52d', 'Telescope'),
      e('1f47d', 'Alien'),
      e('1f6f0', 'Satellite'),
      e('1f319', 'Crescent Moon'),
      e('1f308', 'Rainbow'),
    ]
  },
  {
    name: '⚽ Sports (10)',
    items: [
      e('26bd', 'Soccer Ball'),
      e('26be', 'Baseball'),
      e('1f3c8', 'Football'),
      e('1f3c0', 'Basketball'),
      e('1f3be', 'Tennis'),
      e('1f3d0', 'Volleyball'),
      e('1f3c6', 'Trophy'),
      e('1f3c5', 'Sports Medal'),
      e('1f3b3', 'Bowling'),
      e('1f3d2', 'Ice Hockey'),
    ]
  },
  {
    name: '🚗 Vehicles (10)',
    items: [
      e('1f697', 'Car'),
      e('2708', 'Airplane'),
      e('1f686', 'Train'),
      e('1f6b2', 'Bicycle'),
      e('1f68c', 'Bus'),
      e('1f681', 'Helicopter'),
      e('1f692', 'Fire Engine'),
      e('1f693', 'Police Car'),
      e('1f680', 'Rocket'),
      e('1f6a2', 'Ship'),
    ]
  },
  {
    name: '☁️ Weather (10)',
    items: [
      e('2601', 'Cloud'),
      e('1f327', 'Rain Cloud'),
      e('2602', 'Umbrella'),
      e('26a1', 'Lightning'),
      e('2600', 'Sun'),
      e('2744', 'Snowflake'),
      e('1f32a', 'Tornado'),
      e('1f308', 'Rainbow'),
      e('1f321', 'Thermometer'),
      e('26c5', 'Sun Behind Cloud'),
    ]
  },
  {
    name: '🎓 Community Helpers & Careers (10)',
    items: [
      e('1fa7a', 'Stethoscope'),
      e('1f692', 'Fire Engine'),
      e('1f693', 'Police Car'),
      e('1f393', 'Graduation Cap'),
      e('1f4da', 'Books'),
      e('1f3a8', 'Artist Palette'),
      e('1f373', 'Chef Utensils'),
      e('1f4bc', 'Briefcase'),
      e('1f52c', 'Microscope'),
      e('1f9af', 'Helper Tool'),
    ]
  },
  {
    name: '😀 Faces',
    items: [
      e('1f600', 'Grinning'),
      e('1f603', 'Smiley'),
      e('1f60a', 'Blush'),
      e('1f60d', 'Heart Eyes'),
      e('1f60e', 'Cool'),
      e('1f618', 'Kiss'),
      e('1f917', 'Hugging'),
      e('1f914', 'Thinking'),
      e('1f929', 'Star Struck'),
      e('1f970', 'Smiling Hearts'),
      e('1f973', 'Party'),
      e('1f92a', 'Zany'),
      e('1f644', 'Eye Roll'),
      e('1f622', 'Crying'),
      e('1f62d', 'Sobbing'),
      e('1f621', 'Angry'),
      e('1f62e', 'Surprised'),
      e('1f631', 'Screaming'),
      e('1f634', 'Sleeping'),
      e('1f47b', 'Ghost'),
    ]
  },
  {
    name: '🐱 Animals',
    items: [
      e('1f431', 'Cat'),
      e('1f436', 'Dog'),
      e('1f430', 'Rabbit'),
      e('1f43b', 'Bear'),
      e('1f438', 'Frog'),
      e('1f98b', 'Butterfly'),
      e('1f41f', 'Fish'),
      e('1f426', 'Bird'),
      e('1f422', 'Turtle'),
      e('1f41d', 'Bee'),
      e('1f427', 'Penguin'),
      e('1f43c', 'Panda'),
      e('1f981', 'Lion'),
      e('1f984', 'Unicorn'),
      e('1f40c', 'Snail'),
      e('1f42c', 'Dolphin'),
      e('1f433', 'Whale'),
      e('1f419', 'Octopus'),
      e('1f982', 'Scorpion'),
      e('1f98a', 'Fox'),
    ]
  },
  {
    name: '🍎 Fruits',
    items: [
      e('1f34e', 'Apple'),
      e('1f34c', 'Banana'),
      e('1f34a', 'Orange'),
      e('1f353', 'Strawberry'),
      e('1f347', 'Grapes'),
      e('1f349', 'Watermelon'),
      e('1f351', 'Peach'),
      e('1f352', 'Cherry'),
      e('1f350', 'Pear'),
      e('1f95d', 'Kiwi'),
    ]
  },
  {
    name: '🍕 Food',
    items: [
      e('1f9c1', 'Cupcake'),
      e('1f382', 'Birthday Cake'),
      e('1f355', 'Pizza'),
      e('1f369', 'Donut'),
      e('1f36a', 'Cookie'),
      e('1f36c', 'Candy'),
      e('1f354', 'Hamburger'),
      e('1f32e', 'Taco'),
      e('1f366', 'Ice Cream'),
      e('1f370', 'Cake Slice'),
    ]
  },
  {
    name: '🌸 Nature',
    items: [
      e('1f338', 'Cherry Blossom'),
      e('1f33b', 'Sunflower'),
      e('1f333', 'Tree'),
      e('1f340', 'Four Leaf Clover'),
      e('1f308', 'Rainbow'),
      e('2b50', 'Star'),
      e('1f319', 'Crescent Moon'),
      e('1f30d', 'Earth'),
      e('1f335', 'Cactus'),
      e('1f332', 'Evergreen'),
    ]
  },
  {
    name: '🦖 Dinosaurs',
    items: [
      e('1f996', 'T-Rex'),
    ]
  },
  {
    name: '🐮 Farm Animals',
    items: [
      e('1f404', 'Cow'),
      e('1f437', 'Pig'),
      e('1f411', 'Sheep'),
      e('1f414', 'Chicken'),
    ]
  },
  {
    name: '🦈 Ocean Life',
    items: [
      e('1f988', 'Shark'),
      e('1f980', 'Crab'),
      e('1f419', 'Octopus'),
      e('1f433', 'Whale'),
      e('1f42c', 'Dolphin'),
    ]
  },
  {
    name: '📐 Math & Tools',
    items: [
      e('1f4d0', 'Triangular Ruler'),
      e('1f4cf', 'Ruler'),
      e('1f552', 'Clock'),
      e('1f9ee', 'Abacus'),
      e('1f4b8', 'Money'),
    ]
  },
  {
    name: '🍿 Snacks & Treats',
    items: [
      e('1f37f', 'Popcorn'),
      e('1f9c7', 'Waffle'),
    ]
  },
];

export default clipartCategories;
