// JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const loveButton = document.getElementById('loveButton');
  console.log(loveButton); // Check if loveButton is null or not

  // Add an event listener to the submit button
  loveButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the input fields
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
	
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
	
    // Check if the input values are valid
    if (name1 === "" || name2 === "") {
      window.alert("Please enter two names.");
      return;
    }
    if (name1 === name2) {
      window.alert("Please enter two different names.");
      return;
    }
    if (!date1 || !date2) {
      window.alert("Please enter birth dates for both persons.");
      return;
    }

    const today = new Date();
    const enteredDate1 = new Date(date1);
    const enteredDate2 = new Date(date2);

    if (enteredDate1.toDateString() === today.toDateString() || enteredDate2.toDateString() === today.toDateString()) {
      window.alert("Please enter the birth date of the person, not today's date.");
      return;
    }

    // Call the displayLoveLevel function with the input values
    displayLoveLevel(name1, name2);
  });
});


// Get the submit button element
const loveButton = document.getElementById('loveButton');
console.log(loveButton);

function displayLoveLevel(name1, name2) {
	
  const loveScore = calculateWordLove(name1, name2);
  const loveLevel = Math.round(loveScore / 3);
  
  const LoveFinal = (loveLevel*calculateZodiacScore(date1, date2))/100;
  
  alert(`Love level: ${LoveFinal}/100`);
}


function calculateNumerologyLove(name1, name2) {
  const pythagoreanNumbers = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8};
  const chaldeanNumbers = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2, 'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7};

  const pythagoreanScore = [...name1.toUpperCase(), ...name2.toUpperCase()].reduce((sum, char) => sum + (pythagoreanNumbers[char] || 0), 0);
  const chaldeanScore = [...name1.toUpperCase(), ...name2.toUpperCase()].reduce((sum, char) => sum + (chaldeanNumbers[char] || 0), 0);

  const loveScore = pythagoreanScore * 0.6 + chaldeanScore * 0.4;
  return loveScore;
}

function calculateTrueLoveCount(name1, name2) {
  const combinedNames = (name1 + name2).toUpperCase();
  let trueLoveCount = 0;

  for (const char of combinedNames) {
    if (['L', 'O', 'V', 'E'].includes(char)) {
      trueLoveCount++;
    }
  }

  return trueLoveCount;
}

function calculateNameCompatibility(name1, name2) {
  const syllablesCount = (name) => {
    return name.toLowerCase().split(/[aeiouy]+/).filter((s) => s !== "").length;
  };

  const name1Syllables = syllablesCount(name1);
  const name2Syllables = syllablesCount(name2);

  const syllablesCompatibility = Math.abs(name1Syllables - name2Syllables) * 10;

  return syllablesCompatibility;
}

function syllablesCount(name) {
  // This is a very basic implementation of a syllable counter, and may not be accurate for all names
  const vowels = "aeiouy";
  let count = 0;

  // Count syllables by iterating over each letter in the name
  for (let i = 0; i < name.length; i++) {
    let char = name.charAt(i).toLowerCase();

    // If the letter is a vowel, and is not at the beginning of the name, and is not two vowels in a row, it is likely the start of a new syllable
    if (vowels.includes(char) && i > 0 && !vowels.includes(name.charAt(i - 1).toLowerCase())) {
      count++;
    }
  }

  // If the name ends in a silent "e", subtract one syllable
  if (name.endsWith("e") && !name.endsWith("le")) {
    count--;
  }

  // Return the syllable count, with a minimum of 1
  return Math.max(1, count);
}

function calculateWordLove(name1, name2) {
  const numerologyLove = calculateNumerologyLove(name1, name2);
  const trueLoveCount = calculateTrueLoveCount(name1, name2);
  const nameCompatibility = calculateNameCompatibility(name1, name2);

  const combinedScore = numerologyLove + trueLoveCount + nameCompatibility;
  return combinedScore;
}

function calculateZodiacCompatibility(date1, date2){
	
	const zodiac1 = getZodiacSign(date1);
	const zodiac2 = getZodiacSign(date2);
	
	return calculateZodiacScore(zodiac1, zodiac2)
}

function getZodiacSign(birthdate) {
  const month = birthdate.getMonth() + 1; // Add 1 because the month is zero-indexed
  const day = birthdate.getDate();
  let sign = '';

  if (month === 1) {
    if (day <= 20) {
      sign = 'Capricorn';
    } else {
      sign = 'Aquarius';
    }
  } else if (month === 2) {
    if (day <= 19) {
      sign = 'Aquarius';
    } else {
      sign = 'Pisces';
    }
  } else if (month === 3) {
    if (day <= 20) {
      sign = 'Pisces';
    } else {
      sign = 'Aries';
    }
  } else if (month === 4) {
    if (day <= 20) {
      sign = 'Aries';
    } else {
      sign = 'Taurus';
    }
  } else if (month === 5) {
    if (day <= 21) {
      sign = 'Taurus';
    } else {
      sign = 'Gemini';
    }
  } else if (month === 6) {
    if (day <= 21) {
      sign = 'Gemini';
    } else {
      sign = 'Cancer';
    }
  } else if (month === 7) {
    if (day <= 22) {
      sign = 'Cancer';
    } else {
      sign = 'Leo';
    }
  } else if (month === 8) {
    if (day <= 23) {
      sign = 'Leo';
    } else {
      sign = 'Virgo';
    }
  } else if (month === 9) {
    if (day <= 23) {
      sign = 'Virgo';
    } else {
      sign = 'Libra';
    }
  } else if (month === 10) {
    if (day <= 23) {
      sign = 'Libra';
    } else {
      sign = 'Scorpio';
    }
  } else if (month === 11) {
    if (day <= 22) {
      sign = 'Scorpio';
    } else {
      sign = 'Sagittarius';
    }
  } else if (month === 12) {
    if (day <= 21) {
      sign = 'Sagittarius';
    } else {
      sign = 'Capricorn';
    }
  }

  return sign;
}

function calculateZodiacScore(zodiac1, zodiac2) {
  const baseScore = 100;

  const elementCompatibility = getElementCompatibility(zodiac1, zodiac2);
  const elementScore = calculateScore(elementCompatibility, baseScore);

  const modalityCompatibility = getModalityCompatibility(zodiac1, zodiac2);
  const modalityScore = calculateScore(modalityCompatibility, baseScore);

  const genderCompatibility = getGenderCompatibility(zodiac1, zodiac2);
  const genderScore = calculateScore(genderCompatibility, baseScore);

  const polarityCompatibility = getPolarityCompatibility(zodiac1, zodiac2);
  const polarityScore = calculateScore(polarityCompatibility, baseScore);

  const totalScore = (elementScore + modalityScore + genderScore + polarityScore) / 4;
  return Math.round(totalScore);
}


function getElementCompatibility(zodiac1, zodiac2) {
  const elements = {
    'Aries': 'Fire',
    'Leo': 'Fire',
    'Sagittarius': 'Fire',
    'Taurus': 'Earth',
    'Virgo': 'Earth',
    'Capricorn': 'Earth',
    'Gemini': 'Air',
    'Libra': 'Air',
    'Aquarius': 'Air',
    'Cancer': 'Water',
    'Scorpio': 'Water',
    'Pisces': 'Water',
  };

  if (elements[zodiac1] === elements[zodiac2]) {
    return 100;
  } else if (elements[zodiac1] === 'Fire' && elements[zodiac2] === 'Earth') {
    return 50;
  } else if (elements[zodiac1] === 'Fire' && elements[zodiac2] === 'Water') {
    return 25;
  } else if (elements[zodiac1] === 'Fire' && elements[zodiac2] === 'Air') {
    return 75;
  } else if (elements[zodiac1] === 'Earth' && elements[zodiac2] === 'Fire') {
    return 50;
  } else if (elements[zodiac1] === 'Earth' && elements[zodiac2] === 'Water') {
    return 25;
  } else if (elements[zodiac1] === 'Earth' && elements[zodiac2] === 'Air') {
    return 75;
  } else if (elements[zodiac1] === 'Water' && elements[zodiac2] === 'Fire') {
    return 25;
  } else if (elements[zodiac1] === 'Water' && elements[zodiac2] === 'Earth') {
    return 25;
  } else if (elements[zodiac1] === 'Water' && elements[zodiac2] === 'Air') {
    return 50;
  } else if (elements[zodiac1] === 'Air' && elements[zodiac2] === 'Fire') {
    return 75;
  } else if (elements[zodiac1] === 'Air' && elements[zodiac2] === 'Earth') {
    return 75;
  } else if (elements[zodiac1] === 'Air' && elements[zodiac2] === 'Water') {
    return 50;
  }
}

function getModalityCompatibility(zodiac1, zodiac2) {
  const modalityMap = {
    'Cardinal': ['Aries', 'Cancer', 'Libra', 'Capricorn'],
    'Fixed': ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
    'Mutable': ['Gemini', 'Virgo', 'Sagittarius', 'Pisces']
  };

  const modality1 = getZodiacModality(zodiac1);
  const modality2 = getZodiacModality(zodiac2);

  if (modality1 === modality2) {
    return 1;
  } else if (modalityMap[modality1].includes(zodiac2)) {
    return 0.75;
  } else if (modalityMap[modality2].includes(zodiac1)) {
    return 0.75;
  } else {
    return 0.5;
  }
}

function getZodiacModality(zodiac) {
  const modalities = {
    'Aries': 'Cardinal',
    'Taurus': 'Fixed',
    'Gemini': 'Mutable',
    'Cancer': 'Cardinal',
    'Leo': 'Fixed',
    'Virgo': 'Mutable',
    'Libra': 'Cardinal',
    'Scorpio': 'Fixed',
    'Sagittarius': 'Mutable',
    'Capricorn': 'Cardinal',
    'Aquarius': 'Fixed',
    'Pisces': 'Mutable'
  };
  return modalities[zodiac];
}

function getGenderCompatibility(zodiac1, zodiac2) {
  const compatibility = {
    Aries: { male: ['Leo', 'Sagittarius'], female: ['Leo', 'Sagittarius', 'Aquarius'] },
    Taurus: { male: ['Virgo', 'Capricorn'], female: ['Cancer', 'Virgo', 'Capricorn', 'Pisces'] },
    Gemini: { male: ['Libra', 'Aquarius'], female: ['Gemini', 'Leo', 'Libra', 'Aquarius'] },
    Cancer: { male: ['Scorpio', 'Pisces'], female: ['Taurus', 'Scorpio', 'Pisces'] },
    Leo: { male: ['Aries', 'Sagittarius'], female: ['Aries', 'Gemini', 'Libra', 'Sagittarius'] },
    Virgo: { male: ['Taurus', 'Capricorn'], female: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'] },
    Libra: { male: ['Gemini', 'Aquarius'], female: ['Gemini', 'Leo', 'Sagittarius', 'Aquarius'] },
    Scorpio: { male: ['Cancer', 'Pisces'], female: ['Virgo', 'Scorpio', 'Pisces'] },
    Sagittarius: { male: ['Aries', 'Leo'], female: ['Aries', 'Gemini', 'Leo', 'Libra', 'Aquarius'] },
    Capricorn: { male: ['Taurus', 'Virgo'], female: ['Taurus', 'Cancer', 'Virgo', 'Pisces'] },
    Aquarius: { male: ['Gemini', 'Libra'], female: ['Gemini', 'Libra', 'Sagittarius', 'Aquarius'] },
    Pisces: { male: ['Cancer', 'Scorpio'], female: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'] }
  };

  if (!compatibility[zodiac1] || !compatibility[zodiac2]) {
    return 0;
  }

  const zodiac1Gender = compatibility[zodiac1].female.includes(zodiac2) ? 'female' : 'male';
  const zodiac2Gender = compatibility[zodiac2].female.includes(zodiac1) ? 'female' : 'male';

  if (zodiac1Gender === zodiac2Gender) {
    return 100;
  } else {
    return 50;
  }
}

function getPolarityCompatibility(zodiac1, zodiac2) {
  const polarities = {
    'Aries': 'Masculine',
    'Taurus': 'Feminine',
    'Gemini': 'Masculine',
    'Cancer': 'Feminine',
    'Leo': 'Masculine',
    'Virgo': 'Feminine',
    'Libra': 'Masculine',
    'Scorpio': 'Feminine',
    'Sagittarius': 'Masculine',
    'Capricorn': 'Feminine',
    'Aquarius': 'Masculine',
    'Pisces': 'Feminine'
  };

  const polarity1 = polarities[zodiac1];
  const polarity2 = polarities[zodiac2];

  if (polarity1 === polarity2) {
    return 100;
  } else if ((polarity1 === 'Masculine' && polarity2 === 'Feminine') || (polarity1 === 'Feminine' && polarity2 === 'Masculine')) {
    return 50;
  } else {
    return 0;
  }
}

function calculateScore(compatibility, baseScore) {
  const weightedCompatibility = compatibility * 0.01; // Convert compatibility percentage to decimal
  const weightedScore = weightedCompatibility * baseScore;
  return weightedScore;
}








