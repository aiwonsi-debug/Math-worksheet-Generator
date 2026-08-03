// Noto Emoji Clipart Library (Google)
// License: SIL Open Font License 1.1 — Free for commercial use, no attribution required.
// Source: https://github.com/googlefonts/noto-emoji

const e = (code, name) => ({ name, code });

export const clipartCategories = [
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
    name: '🎨 Objects',
    items: [
      e('270f', 'Pencil'),
      e('1f4da', 'Books'),
      e('1f392', 'Backpack'),
      e('1f514', 'Bell'),
      e('1f3b5', 'Music Note'),
      e('1f3a8', 'Palette'),
      e('1f3c6', 'Trophy'),
      e('1f381', 'Gift'),
      e('1f388', 'Balloon'),
      e('1f3c0', 'Basketball'),
    ]
  },
  {
    name: '🎃 Halloween',
    items: [
      e('1f383', 'Jack-o-lantern'),
      e('1f47b', 'Ghost'),
      e('1f987', 'Bat'),
      e('1f577', 'Spider'),
      e('1f578', 'Spider Web'),
      e('1f480', 'Skull'),
      e('1f9d9', 'Witch'),
      e('1f9df', 'Zombie'),
    ]
  },
  {
    name: '➕ Math Symbols',
    items: [
      e('2795', 'Plus'),
      e('2796', 'Minus'),
      e('2716', 'Multiply'),
      e('2797', 'Divide'),
    ]
  },
  {
    name: '👋 Hands',
    items: [
      e('1f44d', 'Thumbs Up'),
      e('1f44b', 'Waving'),
      e('1f44f', 'Clapping'),
      e('270b', 'Raised Hand'),
      e('270c', 'Victory'),
    ]
  },
  {
    name: '✨ Symbols',
    items: [
      e('2764', 'Heart'),
      e('2728', 'Sparkles'),
      e('26a1', 'Lightning'),
      e('1f525', 'Fire'),
      e('1f4a5', 'Boom'),
    ]
  },
  {
    name: '👦 People',
    items: [
      e('1f466', 'Boy'),
      e('1f467', 'Girl'),
      e('1f9d1', 'Person'),
    ]
  },
  {
    name: '🦃 Thanksgiving',
    items: [
      e('1f983', 'Turkey'),
      e('1f33d', 'Corn'),
      e('1f967', 'Pie'),
      e('1f342', 'Fallen Leaf'),
    ]
  },
  {
    name: '❄️ Winter',
    items: [
      e('2603', 'Snowman'),
      e('2744', 'Snowflake'),
      e('1f384', 'Christmas Tree'),
      e('1f385', 'Santa'),
    ]
  },
  {
    name: '💕 Valentine',
    items: [
      e('1f495', 'Two Hearts'),
      e('1f48d', 'Ring'),
      e('1f339', 'Rose'),
    ]
  },
  {
    name: '☘️ St. Patrick\'s',
    items: [
      e('2618', 'Shamrock'),
    ]
  },
  {
    name: '🐣 Easter',
    items: [
      e('1f425', 'Baby Chick'),
      e('1f95a', 'Egg'),
      e('1f337', 'Tulip'),
    ]
  },
  {
    name: '🚀 Summer / 100th Day',
    items: [
      e('1f680', 'Rocket'),
      e('2600', 'Sun'),
      e('1f4af', '100'),
      e('1f389', 'Party Popper'),
    ]
  },
  {
    name: '⚽ Sports',
    items: [
      e('26bd', 'Soccer Ball'),
      e('26be', 'Baseball'),
      e('1f3c8', 'Football'),
      e('1f3c5', 'Medal'),
    ]
  },
  {
    name: '🚗 Vehicles',
    items: [
      e('1f697', 'Car'),
      e('2708', 'Airplane'),
      e('1f686', 'Train'),
      e('1f6b2', 'Bicycle'),
    ]
  },
  {
    name: '☁️ Weather',
    items: [
      e('2601', 'Cloud'),
      e('1f327', 'Rain Cloud'),
      e('2602', 'Umbrella'),
      e('1f32a', 'Tornado'),
    ]
  },
  {
    name: '🎓 Careers',
    items: [
      e('1fa7a', 'Stethoscope'),
      e('1f692', 'Fire Engine'),
      e('1f693', 'Police Car'),
      e('1f393', 'Graduation Cap'),
    ]
  },
];

export default clipartCategories;
