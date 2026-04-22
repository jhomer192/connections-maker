/**
 * Filler groups: ready-made category templates a creator can drop into a
 * puzzle when they need one more group to round things out. Each template
 * has a title, exactly 4 words, and a suggested difficulty -- but the
 * creator can reassign the color at will, so "suggested" is just a hint.
 *
 * The CreatePanel exposes these via a "🎲" button on each group slot that
 * swaps in a random filler, avoiding any template whose words collide with
 * the user's other groups. Creators can keep rolling until they find one
 * they like, edit it freely, or use it as-is.
 *
 * The pool leans heavily on straightforward list-categories (easy/medium)
 * because that's where filler actually helps. Harder wordplay groups are
 * usually the whole point of a puzzle, not something you outsource.
 */

import type { Difficulty } from '../types/puzzle'

export interface FillerGroup {
  title: string
  words: [string, string, string, string]
  difficulty: Difficulty
}

// ─── YELLOW (0): easiest, most literal category lists ───────────────────

const YELLOW: FillerGroup[] = [
  { title: 'Types of cutting boards', words: ['Wood', 'Plastic', 'Bamboo', 'Glass'], difficulty: 0 },
  { title: 'Citrus fruits', words: ['Lemon', 'Lime', 'Orange', 'Grapefruit'], difficulty: 0 },
  { title: 'Breakfast foods', words: ['Pancakes', 'Waffles', 'Bacon', 'Omelet'], difficulty: 0 },
  { title: 'Pizza toppings', words: ['Pepperoni', 'Mushroom', 'Olive', 'Sausage'], difficulty: 0 },
  { title: 'Dog breeds', words: ['Poodle', 'Beagle', 'Husky', 'Bulldog'], difficulty: 0 },
  { title: 'Cat breeds', words: ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll'], difficulty: 0 },
  { title: 'Primary colors', words: ['Red', 'Blue', 'Yellow', 'Green'], difficulty: 0 },
  { title: 'Days of the week', words: ['Monday', 'Tuesday', 'Friday', 'Sunday'], difficulty: 0 },
  { title: 'Months', words: ['January', 'March', 'July', 'November'], difficulty: 0 },
  { title: 'Planets', words: ['Mars', 'Venus', 'Jupiter', 'Saturn'], difficulty: 0 },
  { title: 'Continents', words: ['Asia', 'Europe', 'Africa', 'Antarctica'], difficulty: 0 },
  { title: 'Oceans', words: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], difficulty: 0 },
  { title: 'Kitchen appliances', words: ['Blender', 'Toaster', 'Oven', 'Microwave'], difficulty: 0 },
  { title: 'Bedroom furniture', words: ['Bed', 'Dresser', 'Nightstand', 'Lamp'], difficulty: 0 },
  { title: 'Office supplies', words: ['Stapler', 'Pen', 'Notebook', 'Scissors'], difficulty: 0 },
  { title: 'Ball sports', words: ['Soccer', 'Basketball', 'Tennis', 'Baseball'], difficulty: 0 },
  { title: 'Musical instruments', words: ['Piano', 'Guitar', 'Drums', 'Violin'], difficulty: 0 },
  { title: 'Pizza chains', words: ['Domino\u2019s', 'Papa John\u2019s', 'Pizza Hut', 'Little Caesars'], difficulty: 0 },
  { title: 'Coffee drinks', words: ['Espresso', 'Latte', 'Cappuccino', 'Americano'], difficulty: 0 },
  { title: 'Sandwich breads', words: ['Sourdough', 'Rye', 'Ciabatta', 'Focaccia'], difficulty: 0 },
  { title: 'Leafy greens', words: ['Spinach', 'Kale', 'Arugula', 'Romaine'], difficulty: 0 },
  { title: 'Root vegetables', words: ['Carrot', 'Beet', 'Radish', 'Turnip'], difficulty: 0 },
  { title: 'Types of pasta', words: ['Spaghetti', 'Penne', 'Rigatoni', 'Fusilli'], difficulty: 0 },
  { title: 'Cheeses', words: ['Cheddar', 'Gouda', 'Brie', 'Feta'], difficulty: 0 },
  { title: 'Berries', words: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry'], difficulty: 0 },
  { title: 'Seasons', words: ['Spring', 'Summer', 'Autumn', 'Winter'], difficulty: 0 },
  { title: 'Kitchen knives', words: ['Chef', 'Paring', 'Bread', 'Santoku'], difficulty: 0 },
  { title: 'Things on a desk', words: ['Monitor', 'Keyboard', 'Mouse', 'Mug'], difficulty: 0 },
  { title: 'Yoga poses', words: ['Warrior', 'Tree', 'Cobra', 'Bridge'], difficulty: 0 },
  { title: 'Card game tools', words: ['Deck', 'Chips', 'Table', 'Dealer'], difficulty: 0 },
  { title: 'Board games', words: ['Monopoly', 'Scrabble', 'Clue', 'Risk'], difficulty: 0 },
  { title: 'Fast food chains', words: ['McDonald\u2019s', 'Wendy\u2019s', 'Burger King', 'Chick-fil-A'], difficulty: 0 },
  { title: 'Types of coffee beans', words: ['Arabica', 'Robusta', 'Liberica', 'Excelsa'], difficulty: 0 },
  { title: 'Beach things', words: ['Umbrella', 'Towel', 'Sunscreen', 'Bucket'], difficulty: 0 },
  { title: 'Baby animals', words: ['Puppy', 'Kitten', 'Calf', 'Cub'], difficulty: 0 },
  { title: 'Tree types', words: ['Oak', 'Maple', 'Pine', 'Birch'], difficulty: 0 },
  { title: 'Flowers', words: ['Rose', 'Tulip', 'Daisy', 'Lily'], difficulty: 0 },
  { title: 'Weather', words: ['Rain', 'Snow', 'Hail', 'Fog'], difficulty: 0 },
  { title: 'Room types', words: ['Kitchen', 'Bathroom', 'Bedroom', 'Garage'], difficulty: 0 },
  { title: 'Chess pieces', words: ['King', 'Queen', 'Rook', 'Knight'], difficulty: 0 },
  { title: 'Ice cream flavors', words: ['Vanilla', 'Chocolate', 'Strawberry', 'Mint'], difficulty: 0 },
  { title: 'Shoe types', words: ['Sneaker', 'Boot', 'Sandal', 'Loafer'], difficulty: 0 },
  { title: 'Fruits with pits', words: ['Peach', 'Cherry', 'Plum', 'Apricot'], difficulty: 0 },
  { title: 'Baking tools', words: ['Whisk', 'Spatula', 'Rolling Pin', 'Sifter'], difficulty: 0 },
  { title: 'Sushi types', words: ['Nigiri', 'Maki', 'Sashimi', 'Temaki'], difficulty: 0 },
  { title: 'Hot sauce brands', words: ['Tabasco', 'Cholula', 'Sriracha', 'Tapat\u00EDo'], difficulty: 0 },
  { title: 'Taco fillings', words: ['Carnitas', 'Barbacoa', 'Al Pastor', 'Carne Asada'], difficulty: 0 },
  { title: 'Breakfast cereals', words: ['Cheerios', 'Frosted Flakes', 'Lucky Charms', 'Raisin Bran'], difficulty: 0 },
  { title: 'Nuts', words: ['Almond', 'Walnut', 'Cashew', 'Pistachio'], difficulty: 0 },
  { title: 'Spices', words: ['Cumin', 'Paprika', 'Turmeric', 'Cinnamon'], difficulty: 0 },
]

// ─── GREEN (1): list-categories that need a beat of thought ─────────────

const GREEN: FillerGroup[] = [
  { title: 'Shades of blue', words: ['Navy', 'Teal', 'Cobalt', 'Azure'], difficulty: 1 },
  { title: 'Shades of red', words: ['Crimson', 'Scarlet', 'Ruby', 'Maroon'], difficulty: 1 },
  { title: 'U.S. states', words: ['Texas', 'Oregon', 'Maine', 'Nevada'], difficulty: 1 },
  { title: 'European capitals', words: ['Paris', 'Madrid', 'Rome', 'Berlin'], difficulty: 1 },
  { title: 'NBA teams', words: ['Lakers', 'Celtics', 'Bulls', 'Warriors'], difficulty: 1 },
  { title: 'NFL teams', words: ['Cowboys', 'Patriots', 'Packers', 'Eagles'], difficulty: 1 },
  { title: 'Chess openings', words: ['Italian', 'Sicilian', 'French', 'Caro-Kann'], difficulty: 1 },
  { title: 'Poker hands', words: ['Flush', 'Straight', 'Full House', 'Pair'], difficulty: 1 },
  { title: 'Shakespeare plays', words: ['Hamlet', 'Macbeth', 'Othello', 'Tempest'], difficulty: 1 },
  { title: 'Disney princesses', words: ['Ariel', 'Belle', 'Jasmine', 'Moana'], difficulty: 1 },
  { title: 'Pixar films', words: ['Up', 'Cars', 'Brave', 'Coco'], difficulty: 1 },
  { title: 'Harry Potter houses', words: ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'], difficulty: 1 },
  { title: 'Monopoly railroads', words: ['Reading', 'Pennsylvania', 'B. & O.', 'Short Line'], difficulty: 1 },
  { title: 'Wizard of Oz characters', words: ['Dorothy', 'Scarecrow', 'Tin Man', 'Lion'], difficulty: 1 },
  { title: 'Types of triangles', words: ['Equilateral', 'Isosceles', 'Scalene', 'Right'], difficulty: 1 },
  { title: 'Martial arts', words: ['Karate', 'Judo', 'Aikido', 'Taekwondo'], difficulty: 1 },
  { title: 'Dance styles', words: ['Tango', 'Salsa', 'Waltz', 'Ballet'], difficulty: 1 },
  { title: 'Pasta sauces', words: ['Marinara', 'Alfredo', 'Pesto', 'Carbonara'], difficulty: 1 },
  { title: 'Cuts of steak', words: ['Ribeye', 'Filet', 'Sirloin', 'T-Bone'], difficulty: 1 },
  { title: 'Wine varietals', words: ['Merlot', 'Cabernet', 'Pinot', 'Syrah'], difficulty: 1 },
  { title: 'Cocktails with vodka', words: ['Martini', 'Bloody Mary', 'Moscow Mule', 'Cosmo'], difficulty: 1 },
  { title: 'Bread types', words: ['Baguette', 'Brioche', 'Naan', 'Pita'], difficulty: 1 },
  { title: 'Mushroom varieties', words: ['Shiitake', 'Portobello', 'Oyster', 'Cremini'], difficulty: 1 },
  { title: 'Things with stripes', words: ['Zebra', 'Tiger', 'Flag', 'Candy Cane'], difficulty: 1 },
  { title: 'Video game consoles', words: ['Switch', 'Xbox', 'PlayStation', 'Atari'], difficulty: 1 },
  { title: 'Social media platforms', words: ['Twitter', 'Instagram', 'TikTok', 'Reddit'], difficulty: 1 },
  { title: 'Streaming services', words: ['Netflix', 'Hulu', 'Disney+', 'Max'], difficulty: 1 },
  { title: 'Yoga traditions', words: ['Vinyasa', 'Hatha', 'Ashtanga', 'Bikram'], difficulty: 1 },
  { title: 'Types of clouds', words: ['Cirrus', 'Cumulus', 'Stratus', 'Nimbus'], difficulty: 1 },
  { title: 'Zodiac signs', words: ['Aries', 'Leo', 'Virgo', 'Pisces'], difficulty: 1 },
  { title: 'Elements (ancient)', words: ['Earth', 'Water', 'Fire', 'Air'], difficulty: 1 },
  { title: 'Greek gods', words: ['Zeus', 'Apollo', 'Ares', 'Hermes'], difficulty: 1 },
  { title: 'Roman gods', words: ['Jupiter', 'Mars', 'Venus', 'Neptune'], difficulty: 1 },
  { title: 'Dinosaur types', words: ['T-Rex', 'Triceratops', 'Velociraptor', 'Stegosaurus'], difficulty: 1 },
  { title: 'Big cats', words: ['Lion', 'Leopard', 'Cheetah', 'Jaguar'], difficulty: 1 },
  { title: 'Apple products', words: ['iPhone', 'iPad', 'MacBook', 'AirPods'], difficulty: 1 },
  { title: 'Pokemon starters', words: ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu'], difficulty: 1 },
  { title: 'Candy bars', words: ['Snickers', 'Twix', 'KitKat', 'Milky Way'], difficulty: 1 },
  { title: 'Soda brands', words: ['Coke', 'Pepsi', 'Sprite', 'Fanta'], difficulty: 1 },
  { title: 'Beer styles', words: ['IPA', 'Stout', 'Lager', 'Pilsner'], difficulty: 1 },
  { title: 'Whiskey types', words: ['Bourbon', 'Scotch', 'Rye', 'Irish'], difficulty: 1 },
  { title: 'Car brands', words: ['Toyota', 'Ford', 'Honda', 'Tesla'], difficulty: 1 },
  { title: 'Motorcycle brands', words: ['Harley', 'Ducati', 'Kawasaki', 'Yamaha'], difficulty: 1 },
  { title: 'Olympic sports', words: ['Swimming', 'Gymnastics', 'Fencing', 'Archery'], difficulty: 1 },
  { title: 'Desserts', words: ['Tiramisu', 'Cheesecake', 'Brownie', 'Eclair'], difficulty: 1 },
  { title: 'Gems', words: ['Ruby', 'Emerald', 'Sapphire', 'Topaz'], difficulty: 1 },
  { title: 'Metals', words: ['Gold', 'Silver', 'Copper', 'Iron'], difficulty: 1 },
  { title: 'Mountain ranges', words: ['Alps', 'Andes', 'Himalayas', 'Rockies'], difficulty: 1 },
  { title: 'Rivers', words: ['Nile', 'Amazon', 'Thames', 'Danube'], difficulty: 1 },
  { title: 'Cocktail garnishes', words: ['Lime', 'Cherry', 'Olive', 'Mint'], difficulty: 1 },
]

// ─── BLUE (2): tighter themes, often require specific knowledge ─────────

const BLUE: FillerGroup[] = [
  { title: 'Things with keys', words: ['Piano', 'Lock', 'Keyboard', 'Map'], difficulty: 2 },
  { title: 'Things that can be broken', words: ['Promise', 'Record', 'Heart', 'Egg'], difficulty: 2 },
  { title: 'Things with rings', words: ['Saturn', 'Boxer', 'Tree', 'Phone'], difficulty: 2 },
  { title: 'Things with wings', words: ['Plane', 'Angel', 'Butterfly', 'Building'], difficulty: 2 },
  { title: 'Things that fall', words: ['Rain', 'Leaves', 'Stocks', 'Night'], difficulty: 2 },
  { title: 'Words that precede "house"', words: ['Green', 'Light', 'Court', 'Dog'], difficulty: 2 },
  { title: 'Words that follow "fire"', words: ['Place', 'Fly', 'Works', 'Arm'], difficulty: 2 },
  { title: 'Words meaning "steal"', words: ['Swipe', 'Nick', 'Pilfer', 'Lift'], difficulty: 2 },
  { title: 'Words meaning "tired"', words: ['Beat', 'Spent', 'Drained', 'Wiped'], difficulty: 2 },
  { title: 'Words meaning "small"', words: ['Tiny', 'Petite', 'Minute', 'Wee'], difficulty: 2 },
  { title: 'Words meaning "happy"', words: ['Glad', 'Jolly', 'Merry', 'Elated'], difficulty: 2 },
  { title: 'Words meaning "difficult"', words: ['Tough', 'Hard', 'Tricky', 'Thorny'], difficulty: 2 },
  { title: 'Things you pitch', words: ['Tent', 'Idea', 'Ball', 'Fit'], difficulty: 2 },
  { title: 'Things you shoot', words: ['Film', 'Hoops', 'Arrow', 'Pool'], difficulty: 2 },
  { title: 'Things you draw', words: ['Card', 'Conclusion', 'Breath', 'Blood'], difficulty: 2 },
  { title: 'Types of bars', words: ['Candy', 'Snack', 'Sand', 'Crow'], difficulty: 2 },
  { title: 'Types of banks', words: ['River', 'Blood', 'Food', 'Memory'], difficulty: 2 },
  { title: 'Famous ___ Smiths', words: ['Will', 'Sam', 'Adam', 'Maggie'], difficulty: 2 },
  { title: 'Famous Michaels', words: ['Jordan', 'Jackson', 'Douglas', 'Phelps'], difficulty: 2 },
  { title: 'Famous Toms', words: ['Hanks', 'Cruise', 'Brady', 'Holland'], difficulty: 2 },
  { title: 'British sitcoms', words: ['Blackadder', 'Fawlty Towers', 'Peep Show', 'IT Crowd'], difficulty: 2 },
  { title: 'Seinfeld characters', words: ['Jerry', 'George', 'Elaine', 'Kramer'], difficulty: 2 },
  { title: 'Friends characters', words: ['Ross', 'Rachel', 'Chandler', 'Phoebe'], difficulty: 2 },
  { title: 'Beatles albums', words: ['Revolver', 'Abbey Road', 'Help!', 'Let It Be'], difficulty: 2 },
  { title: 'Bond films', words: ['Goldfinger', 'Skyfall', 'Casino Royale', 'Dr. No'], difficulty: 2 },
  { title: 'Quentin Tarantino films', words: ['Kill Bill', 'Pulp Fiction', 'Reservoir Dogs', 'Jackie Brown'], difficulty: 2 },
  { title: 'Classic sitcoms', words: ['Cheers', 'Frasier', 'Seinfeld', 'MASH'], difficulty: 2 },
  { title: 'Herbs for pesto', words: ['Basil', 'Parsley', 'Cilantro', 'Arugula'], difficulty: 2 },
  { title: 'Types of cuts (hair)', words: ['Bob', 'Pixie', 'Fade', 'Mullet'], difficulty: 2 },
  { title: 'Types of jackets', words: ['Bomber', 'Parka', 'Blazer', 'Windbreaker'], difficulty: 2 },
  { title: 'Parts of a ship', words: ['Bow', 'Stern', 'Hull', 'Mast'], difficulty: 2 },
  { title: 'Parts of a car', words: ['Hood', 'Trunk', 'Bumper', 'Muffler'], difficulty: 2 },
  { title: 'Parts of a book', words: ['Spine', 'Cover', 'Index', 'Glossary'], difficulty: 2 },
  { title: 'Chess grandmasters', words: ['Kasparov', 'Carlsen', 'Fischer', 'Karpov'], difficulty: 2 },
  { title: 'Tennis majors', words: ['Wimbledon', 'Australian', 'French', 'U.S.'], difficulty: 2 },
  { title: 'Golf majors', words: ['Masters', 'U.S. Open', 'Open', 'PGA'], difficulty: 2 },
  { title: 'Paul McCartney bands', words: ['Beatles', 'Wings', 'Quarrymen', 'Fireman'], difficulty: 2 },
  { title: 'Sharks', words: ['Great White', 'Hammerhead', 'Tiger', 'Bull'], difficulty: 2 },
  { title: 'Constellations', words: ['Orion', 'Lyra', 'Cassiopeia', 'Ursa Major'], difficulty: 2 },
  { title: 'Types of dumplings', words: ['Pierogi', 'Gyoza', 'Samosa', 'Ravioli'], difficulty: 2 },
  { title: 'Things with "bubble" before', words: ['Gum', 'Wrap', 'Tea', 'Bath'], difficulty: 2 },
  { title: 'Things that can be "loud"', words: ['Noise', 'Color', 'Mouth', 'Speaker'], difficulty: 2 },
  { title: 'Ways to say "goodbye"', words: ['Farewell', 'Ciao', 'Adios', 'Peace'], difficulty: 2 },
  { title: 'Types of hugs', words: ['Bear', 'Side', 'Group', 'Hugger'], difficulty: 2 },
  { title: 'Nintendo franchises', words: ['Mario', 'Zelda', 'Metroid', 'Kirby'], difficulty: 2 },
  { title: 'Famous mountains', words: ['Everest', 'K2', 'Kilimanjaro', 'Fuji'], difficulty: 2 },
  { title: 'Greek philosophers', words: ['Socrates', 'Plato', 'Aristotle', 'Epicurus'], difficulty: 2 },
  { title: 'Impressionists', words: ['Monet', 'Renoir', 'Degas', 'Pissarro'], difficulty: 2 },
  { title: 'Rock climbing grades', words: ['5.9', '5.10', '5.11', '5.12'], difficulty: 2 },
  { title: 'Cooking techniques', words: ['Braise', 'Sear', 'Poach', 'Roast'], difficulty: 2 },
]

// ─── PURPLE (3): wordplay, hidden themes, tricky ────────────────────────

const PURPLE: FillerGroup[] = [
  { title: '___ Simpson', words: ['Homer', 'Bart', 'Jessica', 'O.J.'], difficulty: 3 },
  { title: 'Things with hidden animals', words: ['Catastrophe', 'Dogma', 'Rampage', 'Bearing'], difficulty: 3 },
  { title: 'Homophones of colors', words: ['Bleu', 'Rouge', 'Read', 'Pink'], difficulty: 3 },
  { title: 'Words that rhyme with orange', words: ['Door-hinge', 'Sporange', 'Blorenge', 'Binge'], difficulty: 3 },
  { title: 'Hidden body parts', words: ['Kneedle', 'Sheart', 'Scarm', 'Fleg'], difficulty: 3 },
  { title: 'Starts with silent letter', words: ['Gnome', 'Knight', 'Pneumonia', 'Wrist'], difficulty: 3 },
  { title: 'Anagrams of "listen"', words: ['Silent', 'Tinsel', 'Enlist', 'Inlets'], difficulty: 3 },
  { title: 'Anagrams of "stop"', words: ['Pots', 'Tops', 'Spot', 'Opts'], difficulty: 3 },
  { title: 'Palindromes', words: ['Racecar', 'Kayak', 'Level', 'Rotor'], difficulty: 3 },
  { title: 'Words meaning "okay"', words: ['Fine', 'Alright', 'Cool', 'Sure'], difficulty: 3 },
  { title: 'Things that follow "paper"', words: ['Back', 'Weight', 'Work', 'Plane'], difficulty: 3 },
  { title: 'Things that precede "boat"', words: ['Row', 'House', 'Speed', 'Sail'], difficulty: 3 },
  { title: 'Hidden NBA teams', words: ['Sunglasses', 'Bullion', 'Heathen', 'Jazzy'], difficulty: 3 },
  { title: 'Hidden countries', words: ['Iranian', 'Chilean', 'Peruse', 'Cuban'], difficulty: 3 },
  { title: 'Homophones of numbers', words: ['Won', 'Too', 'Fore', 'Ate'], difficulty: 3 },
  { title: 'Types of "bass"', words: ['Sea', 'Bass Drum', 'Double', 'Largemouth'], difficulty: 3 },
  { title: '"Head" compounds', words: ['Strong', 'Light', 'Hot', 'Egg'], difficulty: 3 },
  { title: '"Board" compounds', words: ['Key', 'Card', 'Sur', 'Star'], difficulty: 3 },
  { title: '"Light" compounds', words: ['House', 'Weight', 'Bulb', 'Year'], difficulty: 3 },
  { title: '"Water" compounds', words: ['Fall', 'Melon', 'Color', 'Shed'], difficulty: 3 },
  { title: 'Precedes "fly"', words: ['Butter', 'Dragon', 'House', 'May'], difficulty: 3 },
  { title: 'Precedes "ball"', words: ['Foot', 'Base', 'Meat', 'Eye'], difficulty: 3 },
  { title: 'Precedes "work"', words: ['Home', 'Net', 'Frame', 'Art'], difficulty: 3 },
  { title: 'Follows "black"', words: ['Jack', 'Board', 'Out', 'Belt'], difficulty: 3 },
  { title: 'Follows "moon"', words: ['Light', 'Shine', 'Walk', 'Stone'], difficulty: 3 },
  { title: 'Follows "sun"', words: ['Rise', 'Set', 'Flower', 'Dial'], difficulty: 3 },
  { title: 'Homophones of "flower"', words: ['Flour', 'Flora', 'Flier', 'Floor'], difficulty: 3 },
  { title: 'Double letters', words: ['Bookkeeper', 'Committee', 'Address', 'Accommodate'], difficulty: 3 },
  { title: 'Types of "blue"', words: ['Navy', 'Royal', 'Sky', 'Baby'], difficulty: 3 },
  { title: 'Types of "green"', words: ['Lime', 'Forest', 'Sea', 'Kelly'], difficulty: 3 },
  { title: 'Can be "cracked"', words: ['Code', 'Nut', 'Egg', 'Smile'], difficulty: 3 },
  { title: 'Things you "kick"', words: ['Habit', 'Bucket', 'Butt', 'Off'], difficulty: 3 },
  { title: 'Things you "hit"', words: ['Road', 'Books', 'Bullseye', 'Snooze'], difficulty: 3 },
  { title: 'Things you "run"', words: ['Errand', 'Marathon', 'Late', 'Business'], difficulty: 3 },
  { title: 'Synonyms for "dude"', words: ['Guy', 'Bro', 'Pal', 'Fella'], difficulty: 3 },
  { title: 'Synonyms for "maybe"', words: ['Perhaps', 'Possibly', 'Could Be', 'Iffy'], difficulty: 3 },
  { title: 'Words in "elephant"', words: ['Eel', 'Pant', 'Hat', 'Ant'], difficulty: 3 },
  { title: 'Rhymes with "cat"', words: ['Hat', 'Bat', 'Rat', 'Mat'], difficulty: 3 },
  { title: '"Nice" in other languages', words: ['Bueno', 'Bien', 'Gut', 'Bom'], difficulty: 3 },
  { title: '"Thanks" in other languages', words: ['Gracias', 'Merci', 'Danke', 'Arigato'], difficulty: 3 },
  { title: 'Country + capital anagrams', words: ['Iran', 'Peru', 'Chad', 'Mali'], difficulty: 3 },
  { title: 'Words with 3 vowels in a row', words: ['Queue', 'Beau', 'Adieu', 'Ciao'], difficulty: 3 },
  { title: 'Ends in silent "e"', words: ['Bike', 'Gate', 'Flame', 'Rope'], difficulty: 3 },
  { title: '"Snake" synonyms', words: ['Serpent', 'Viper', 'Asp', 'Cobra'], difficulty: 3 },
]

/** All filler groups, pooled. */
export const FILLER_GROUPS: FillerGroup[] = [...YELLOW, ...GREEN, ...BLUE, ...PURPLE]

/** Pool segmented by difficulty, for targeted rolls. */
export const FILLER_BY_DIFFICULTY: Record<Difficulty, FillerGroup[]> = {
  0: YELLOW,
  1: GREEN,
  2: BLUE,
  3: PURPLE,
}

/**
 * Pick a random filler group, preferring templates that share no words with
 * the provided `existingWords` set (case-insensitive). If no collision-free
 * option exists in the targeted pool, falls back to any random template so
 * the user always gets *something* on click.
 *
 * `difficulty` optional: if passed, rolls from that color's pool; otherwise
 * rolls from the full pool.
 */
export function pickRandomFiller(
  existingWords: Set<string>,
  difficulty?: Difficulty | null,
): FillerGroup {
  const pool = difficulty != null ? FILLER_BY_DIFFICULTY[difficulty] : FILLER_GROUPS
  const lowerUsed = new Set([...existingWords].map((w) => w.trim().toLowerCase()).filter(Boolean))

  const noCollision = pool.filter(
    (g) => !g.words.some((w) => lowerUsed.has(w.toLowerCase())),
  )
  const source = noCollision.length > 0 ? noCollision : pool
  return source[Math.floor(Math.random() * source.length)]
}
