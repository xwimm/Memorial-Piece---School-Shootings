// Memorial Piece by Xiomara Wimmer
// IS71076C: COMPUTATIONAL ARTS-BASED RESEARCH AND THEORY (2025-26 
//Handpose model: T. Kwok, ml5.js Handpose (Tensorflow.js port of MediaPipe Hands), 2020
// https://learn.ml5js.org/#/reference/handpose
// Original demo code: https://editor.p5js.org/ml5/sketches/handpose_webcam
// Modified by Xiomara Wimmer, 2025
// School Shooting Data from https://github.com/washingtonpost/data-school-shootings/blob/master/school-shootings-data.csv
// Start Camera. Click the canvas for full screen. Move your hand to touch a school to leave a flower. A Soundscape will automatically play for about 2 minutes.
//
const SCHOOL_NAMES = [
 "Columbine High School","Scotlandville Middle School","Heritage High School","John Bartram High School",
  "Dorchester High School","Deming Middle School","Fort Gibson Middle School","Ridgewood High School",
  "Alicia Reyes Elementary School","Duke Ellington Elementary School","Horn Lake High School","Tecumseh High School",
  "Buell Elementary School","Hugo High School","Carmichael Elementary School","Lake Worth Middle School",
  "Dimmitt Middle School","Mount Healthy North Junior High","Carter G. Woodson Middle School","Hueneme High School",
  "Lake Clifton Eastern High School","Pearl C. Anderson Middle School","Santana High School",
  "Bishop Neumann Junior-Senior High","Granite Hills High School","Lew Wallace High School",
  "Monroe City Alternative Center","Ennis High School","Belmont High School","Latonia Elementary School",
  "Redondo Union High School","Caro Learning Center","Martin Luther King, Jr. High School","Gardena High School",
  "Benjamin Tasker Middle School","Lincoln High School","St. James Catholic School","Mount Pleasant High School",
  "Ranum High School","Cardozo High School","John McDonogh High School","Delhi Middle School",
  "Red Lion Area Junior High School","Vicksburg High School","Lewis and Clark High School","Rocori High School",
  "Burns Middle School","Rio Cazadero High School","East Mecklenburg High School","Ballou High School",
  "Columbia High School","T.M. Peirce Elementary School","Castlemont High School","Proviso East High School",
  "Wirt High School","Thurgood Marshall High School","Booker T. Washington High School","Emmanuel Christian Academy",
  "Woodruff High School","Bowen High School","Maplewood Comprehensive High School","Red Lake High School",
  "Canton High School","Highland Elementary School","Maury Middle School","Sojourner Truth High School",
  "Harlan Community Academy High School","Farmington High School","Saginaw High School","Campbell County High School",
  "Central High School","Mary McLeod Bethune Academy","Milwee Middle School","Indian River High School",
  "Will C. Wood High School","Lakeview Centennial High School","Westinghouse High School","Roseburg High School",
  "Pine Middle School","Venice High School","Orange High School","South Hills High School","Platte Canyon High School",
  "Weston High School","West Nickel Mines Amish School","Memorial Middle School","Henry Foss High School",
  "Robert A. Taft Information Technology High School","William L.Sayre High School","Herbert Henry Dow High School",
  "Chicago Vocational Career Academy","Springwater Trail High School","Liberty Memorial Middle School",
  "George S. Middleton High School","SuccessTech Academy","Groves High School","Crossroads Charter High School",
  "Hamilton High School","Notre Dame Elementary School","Mitchell High School","E.O. Green Junior High School",
  "Friends of Children Head Start center","Roosevelt High School","Central High School","Dillard High School",
  "Central High School","John Muir Elementary School","Ribault High School","Larose-Cut Off Middle School",
  "Stamford Academy","Virginia Randolph Community High School","Mattituck Junior-Senior High School",
  "Carolina Forest High School","Booker T. Washington High School","Discovery Middle School","Deer Creek Middle School",
  "Woodrow Wilson High School","South Gate High School","Sullivan Central High School","Socastee High School",
  "Alisal High School","Kelly Elementary School","Marinette High School","Millard South High School","Gardena High School",
  "Louisiana Schnell Elementary School","Martinsville West Middle","Sheeler Charter High School","Ross Elementary School",
  "Cape Fear High School","Cummings Middle School","North Forest High School","Walpole Elementary School",
  "Armin Jahr Elementary School","Chardon High School","Episcopal School of Jacksonville","LeFlore High School",
  "Mary Scroggs Elementary School","Perry Hall High School","Normal Community High School","Sandy Hook Elementary School",
  "Apostolic Revival Center and Christian School","Taft Union High School","Price Middle School","La Salle High School",
  "Redland Middle School","Ronald E. McNair Discovery Learning Academy","Carver High School","Agape Christian Academy",
  "Lanier High School","Sparks Middle School","Newman Elementary School","West Orange High School","Arapahoe High School",
  "Liberty Technology Magnet High School","Berrendo Middle School","King Elementary School",
  "Delaware Valley Charter School","Rebound High School","President Theodore Roosevelt High","Bend High School",
  "Salisbury High School","Success Academy","Benjamin Banneker High School","D. H. Conley High School",
  "Reynolds High School","Stellar Leadership Academy","Fern Creek High School","Albemarle High School",
  "Marysville Pilchuck High School","Hand in Hand Montessori","North Thurston High School",
  "W.S. Hornsby Elementary School","Harrisburg High School","Karen Wagner High School","Vereen School",
  "Lecanto High School","Harmony Grove High School","Benjamin Franklin High School","Independence High School",
  "Madison High School","Huffman High School","Alpine High School","Townville Elementary School","CF Vigor High School",
  "Linden-McKinley STEM Academy","June Jordan High School for Equity","Union Middle School",
  "Bay City Western High School","Mueller Park Jr. High","West Liberty-Salem Middle/High School",
  "Scotlandville Magnet High School","Robert E. Lee High School","North Park Elementary School",
  "Moss Bluff Elementary School","Greensboro High School","Warren Elementary School","Columbus Scioto 6-12",
  "Freeman High School","Mattoon High School","Pattengill Academy","Benjamin Banneker High School",
  "Rancho Tehama Elementary School","Aztec High School","High Point Central High School","Italy High School",
  "The NET Charter High School","Marshall County High School","Murphy High School","Salvador B. Castro Middle School",
  "Marjory Stoneman Douglas High School","Dalton High School","Huffman High School","Seaside High School",
  "Big Sky High School","Douglass Park Elementary School","Great Mills High School","Eupora High School",
  "Jackson High School","Forest High School","Benjamin Elijah Mays High School","Highland High School",
  "Highland High School","Dixon High School","Santa Fe High School","Noblesville West Middle School",
  "Villa Heights Elementary School","Canyon Springs High School","Lawrence Orr Elementary School",
  "Denali Montessori Elementary School","Battle Creek Academy","Paul Laurence Dunbar School","Butler High School",
  "Simonsdale Elementary School","Dennis Intermediate School","Cascade Middle School","North High School",
  "Frederick Douglass High School","V. Sue Cleveland High School","Robert E. Lee High School","Highlands Elementary School",
  "Blountsville Elementary School","Prescott High School","Saint Clair Evans Academy",
  "New Joseph Bonnheim Community Charter School","Flex High School","STEM School Highlands Ranch",
  "Menta Academy North","Hendley Elementary School","Blount Elementary School","Hollenbeck Middle School",
  "South Aiken High School","Aiton Elementary School","Ridgway High School","Achievement Academy",
  "Esteban Torres High School","Saugus High School","Waukesha South High School","Oshkosh West High School",
  "Decatur High School","Sacred Heart School Catholic Academy of New Haven","Bellaire High School",
  "McAuliffe Elementary School","West High School","Antioch High School","Cesar Chavez Community School",
  "Sagemont School","Ribault High School","Lincoln Elementary School","Hendersonville Middle School",
  "Watson Chapel Junior High","Wayne Central Middle School","Achievement First Amistad High School",
  "Edwards Elementary School","Bishop Hartley High School","Selma High School","Austin-East Magnet High",
  "Ply­mouth Middle School","Smyrna Middle School","Urban Dove Team Charter School",
  "Mary Evelyn Castle Elementary School","Ware Shoals High School","Rigby Middle School","North Forest High School",
  "Saint Francis de Sales School","Lithonia High School","Washington Middle School",
  "Orangeburg-Wilkinson High School","New Hanover High School","Mount Tabor High School","LaVergne High School",
  "Tri-County Education Center","Heritage High School","Newton County Elementary School",
  "Cummings K-8 Optional School","YES Prep Southwest Secondary","Timberview High School",
  "Wendell Phillips Academy High School","Little Rock Central High School","James McDade Classical School",
  "Cathedral School","Poughkeepsie High School","P.S. 44","Hinkley High School","Thornton Township High School",
  "Cesar Chavez High School","Oxford High School","Sam Rayburn High School","Great Oaks Charter School",
  "Jesse C. Carson High School","West Charlotte High School","Eau Claire High School","Auburn High School",
  "Seminole High School","Oliver Citywide Academy","Magruder High School","South Education Center",
  "Mount Vernon High School","Liberty Point International School","Jonesboro High School","Olathe East High School",
  "East High School","North Gardens High School","De Anza High School","Eisenhower High School","Mott-Regent School",
  "Rippon Middle School","Western High School","Tanglewood Middle","West Philadelphia Achievement Charter Elementary School",
  "Erie High School","Lowellville Junior/Senior High School","Pine Bluff High School","Edmund Burke School",
  "Aspen Ridge Elementary School","Heights High School","Alexander W. Dreyfoos School of Arts",
  "Walt Disney Magnet School","Mexia High School","Robb Elementary School","Ulysses S. Grant High School",
  "Walnut Park Elementary","John Finney High School","Madison Park Academy",
  "Mergenthaler Vocational Technical High School","Treasure Cost Classical Academy","Mankato West High School",
  "Rudsdale High School","Jeremiah E. Burke High School","James Madison Academic Campus",
  "Central Visual and Performing Arts High School","Ingraham High School","Ball Elementary School",
  "South Vermillion High School","Freedom Preparatory High School","Suitland High School","Cleveland High School",
  "Richneck Elementary School","Fuquay-Varina Middle School","Beechcroft High School","William Penn High School",
  "Taylorsville High School","Gila Ridge High School","Ridgeview Jr. High School","Geary Elementary School",
  "Benjamin Franklin High School","Booker T. Washington High School","Plaza Academy","PS 78","Westinghouse Academy",
  "Palo Duro High School","Lamar High School","East High School","The Covenant School","Anniston High School",
  "Northridge Middle School","George Wythe High School","West High School","International Academy of Flint",
  "E. Washington Rhodes Elementary School","Roosevelt High School","Von Tobel Middle School","Oliver Citywide Academy",
  "St. John's Prep","Michigan Collegiate High School","Josey High School","St. Helena College and Career Academy",
  "Carver Vocational-Technical High School","Edmondson Heights Elementary School","KIPP Indy Legacy High School",
  "Northeast Early College High School","Perry High School","John L Leflore Magnet School","Grant Union High School",
  "Haynes Middle School","McEachern High School","Benjamin E. Mays High School","Willagillespie Elementary School",
  "Saginaw High School","Odessa High School","West Side High School","Charleston Junior/Senior High School",
  "Connally High School","Leflore Magnet School","Springfield High School of Science and Technology",
  "Bolton Elementary School","Wilmer-Hutchins High School","William Wiley Elementary School","Suncoast High School",
  "Bowie High School","Dunbar High School","Mount Horeb Middle School","Parkland High School","Garfield High School",
  "Apalachee High School","Joppatowne High School","Northwest High School","Washington Technology Magnet School",
  "West High School","Feather River School of Seventh-Day Adventists","Cornerstone Prep School","Cessna Elementary School",
  "Islamic School of Portland","Riverview Elementary School","Abundant Life Christian School","Antioch High School",
  "Newburgh Free Academy"
];

let video, handpose, predictions = [];
let words = [];
let flowers = [];
let flowerImg;
let isStarted = false;
let memorialSound;

class SchoolWord {
  constructor() {
    this.text = random(SCHOOL_NAMES);
    this.x = random(width);
    this.y = random(-100, -50);
    this.speed = random(0.5, 1.5);
    this.size = 28;
    this.alpha = 255;
    this.touched = false;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    push();
    fill(255, 255, 255, this.alpha);
    stroke(0, this.alpha * 0.3);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    textFont('Times New Roman');
    textSize(this.size);
    text(this.text, this.x, this.y);
    pop();
  }

  isOffScreen() {
    return this.y > height + 100;
  }

  checkCollision(handX, handY) {
    const r = max(50, this.size * 2);
    return dist(handX, handY, this.x, this.y) < r;
  }

  touch(handX, handY) {
    if (!this.touched) {
      this.touched = true;
      flowers.push({
        x: this.x,
        y: this.y,
        size: 100,
        alpha: 255
      });
    }
  }
}

function preload() {
  flowerImg = loadImage('Flower.png');
  memorialSound = loadSound('MemorialSound.mp3');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  textFont("Times New Roman");

  // Fullscreen when clicking the canvas
  canvas.mousePressed(() => {
    fullscreen(!fullscreen());
  });

  // Stop button click from triggering canvas click
  document.getElementById('startBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    startCamera();
  });
}

function draw() {
  background(20);

  // Draw mirrored video - Edited to remove loadedmetadata check as was causing issues
  if (video) {
    push();
    translate(width, 0);
    scale(-1, 1);
    tint(255, 180);
    // Draw video to fill entire canvas
    let videoAspect = 640 / 480;
    let canvasAspect = width / height;
    let drawWidth, drawHeight, drawX, drawY;
    
    if (canvasAspect > videoAspect) {
      // to get canvas wider and adjust for width
      drawWidth = width;
      drawHeight = width / videoAspect;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * videoAspect;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    }
    
    image(video, drawX, drawY, drawWidth, drawHeight);
    pop();
    
    // Black filter for memorial to create a stone effect
    fill(0, 150);
    rect(0, 0, width, height);
  }

  // Title
  fill(255);
  textAlign(CENTER, TOP);
  textSize(60);
  text('Memorial Piece', width / 2, 60);
  
   fill(255);
  textAlign(CENTER, TOP);
  textSize(25);
  text('Touch The School With Your Hand To Leave a Flower', width / 2, 120);

  // Draw 
  fill(255);
  textSize(18);
  textAlign(CENTER, BOTTOM);
  text('All the school shootings in America with at least one victim since Columbine 1999', width / 2, height - 30);

  if (!isStarted) return;

  // Hand tracking and spacingg the words
  if (predictions.length > 0) {
    for (const hand of predictions) {
      if (!hand.landmarks) continue;

      // Draw hand points for debugging
      drawHandPoints(hand.landmarks);

      // Get index finger tip (landmark 8)
      const f = hand.landmarks[8];
      const handX = map(f[0], 0, 640, width, 0);
      const handY = map(f[1], 0, 480, 0, height);

      // Draw pointer at fingertip
      drawPointer(handX, handY);

      // Check collision with words
      for (const w of words) {
        if (!w.touched && w.checkCollision(handX, handY)) {
          w.touch(handX, handY);
        }
      }
    }
  }

  // Update and display words
  for (let i = words.length - 1; i >= 0; i--) {
    words[i].update();
    words[i].display();
    if (words[i].isOffScreen()) {
      words.splice(i, 1);
    }
  }

  // Add new words periodically
  if (frameCount % 90 === 0 && words.length < 15) {
    words.push(new SchoolWord());
  }

  // Place flowers
  for (let flower of flowers) {
    push();
    imageMode(CENTER);
    tint(255, flower.alpha);
    image(flowerImg, flower.x, flower.y, flower.size, flower.size);
    pop();
  }
}
// Full Screen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startCamera() {
  document.getElementById('startBtn').disabled = true;
  document.getElementById('startBtn').textContent = 'Loading...';

  video = createCapture(VIDEO, () => {
    document.getElementById('startBtn').textContent = 'Camera Active';
  });
  video.size(640, 480);
  video.hide();

  handpose = ml5.handpose(video, () => {
    isStarted = true;
    // Play the memorial sound
    if (memorialSound && !memorialSound.isPlaying()) {
      memorialSound.play();
    }
    // Start with some words on screen
    for (let i = 0; i < 8; i++) {
      const w = new SchoolWord();
      w.y = random(100, height - 200);
      words.push(w);
    }
  });

  handpose.on('predict', (r) => (predictions = r));
}

function keyPressed() {
  if (keyCode === ESCAPE && fullscreen()) fullscreen(false);
}

function drawHandPoints(landmarks) {
  for (let i = 0; i < landmarks.length; i++) {
    let x = map(landmarks[i][0], 0, 640, width, 0);
    let y = map(landmarks[i][1], 0, 480, 0, height);
    fill(255, 80, 80, 150);
    noStroke();
    circle(x, y, 10);
  }
}

function drawPointer(x, y) {
  const pulse = sin(frameCount * 0.1) * 8 + 25;
  fill(0, 255, 0, 100);
  noStroke();
  circle(x, y, pulse);
  fill(0, 255, 0, 200);
  circle(x, y, 15);
}