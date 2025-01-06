let textContent = "My days still linger, slow and rough, Each moment multiplies the sadness Within the heart of hapless love And drives my yearning into madness. I’m silent; I don’t dare to breathe. I weep, my tears are my salvation. My soul, held captive in this grief, In tears alone finds consolation. No longer do I care if life goes by, Its empty ghost will lastly set me free; The sorrow of my love is dear to me — If I die loving, then I pray let die!";
let words = textContent.split(" "); // Split text into words
let baseTextSize = 20; // Base font size
let maxTextSize = 30; // Maximum font size when zoomed
let lerpSpeed = 0.1; // Speed of the lerp effect

// Array to store the current text size for each word
let wordSizes = [];

// Variable to store the index of the currently hovered word
let hoveredWordIndex = -1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(baseTextSize);
    textAlign(LEFT, TOP);
    noStroke();
    fill(0); // Text color

    // Initialize wordSizes array with baseTextSize
    for (let i = 0; i < words.length; i++) {
        wordSizes[i] = baseTextSize;
    }
}

function draw() {
    background(255); // White background

    let x = 50; // Starting x position
    let y = 50; // Starting y position
    let lineHeight = baseTextSize * 1.1; // Line height

    // Reset hoveredWordIndex at the start of each frame
    hoveredWordIndex = -1;
    let minDistance = Infinity; // Initialize with a large value

    // Calculate the closest word to the mouse
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let wordWidth = textWidth(word);

        // Calculate the center of the word
        let wordCenterX = x + wordWidth / 2;
        let wordCenterY = y + baseTextSize / 2;

        // Calculate the distance between the mouse and the word's center
        let distance = dist(mouseX, mouseY, wordCenterX, wordCenterY);

        // Check if this word is the closest to the mouse
        if (distance < minDistance) {
            minDistance = distance;
            hoveredWordIndex = i;
        }

        // Update x position for the next word
        x += wordWidth + 10; // Add spacing between words

        // Move to the next line if the word goes beyond the canvas width
        if (x + textWidth(word) > width - 50) {
            x = 50;
            y += lineHeight;
        }
    }

    // Reset x and y for rendering
    x = 50;
    y = 50;

    // Render all words
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let wordWidth = textWidth(word);

        // Target text size based on whether this word is the closest to the mouse
        let targetTextSize = (i === hoveredWordIndex) ? maxTextSize : baseTextSize;

        // Smoothly interpolate the text size using lerp
        wordSizes[i] = lerp(wordSizes[i], targetTextSize, lerpSpeed);

        // Set the text size
        textSize(wordSizes[i]);

        // Calculate the new width of the word after resizing
        let newWordWidth = textWidth(word);

        // Adjust the x position to keep the text centered
        if (i === hoveredWordIndex) {
            x -= (newWordWidth - wordWidth) / 2; // Shift left to center the hovered word
        }

        // Draw the word
        fill(i === hoveredWordIndex ? color(0, 0, 255) : color(0)); // Blue if hovered, black otherwise
        text(word, x, y);

        // Update x position for the next word
        x += newWordWidth + 10; // Add spacing between words

        // Move to the next line if the word goes beyond the canvas width
        if (x + textWidth(word) > width - 50) {
            x = 50;
            y += lineHeight;
        }
    }
}