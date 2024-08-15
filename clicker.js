let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let autoclicks = parseInt(localStorage.getItem('autoclicks')) || 0;
let clickMultiplier = parseInt(localStorage.getItem('clickMultiplier')) || 1;
let clickUpgradeCost = parseInt(localStorage.getItem('clickUpgradeCost')) || 10;
let cpsUpgradeCost = parseInt(localStorage.getItem('cpsUpgradeCost')) || 20;
function Reset() {
localStorage.clear();
let clicks =0;
updateClickCount();
}

function incrementClicks() {
  clicks += clickMultiplier;
  updateClickCount();
}

function buyClickUpgrade() {
  if (clicks >= clickUpgradeCost) {
    clicks -= clickUpgradeCost;
    clickMultiplier++;
    updateClickCount();
    clickUpgradeCost *= 2;
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('clickUpgradeCost', clickUpgradeCost);
    generateClickUpgradeButton();
    console.log("Clicks Per Click Upgraded!");
  } else {
    console.log("Insufficient clicks to purchase this upgrade.");
  }
}

function buyCPSUpgrade() {
  if (clicks >= cpsUpgradeCost) {
    clicks -= cpsUpgradeCost;
    autoclicks++;
    updateClickCount();
    cpsUpgradeCost *= 2;
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('autoclicks', autoclicks);
    localStorage.setItem('cpsUpgradeCost', cpsUpgradeCost);
    generateCPSUpgradeButton();
    console.log("Clicks Per Second Upgraded!");
  } else {
    console.log("Insufficient clicks to purchase this upgrade.");
  }
}

function updateClickCount() {
  document.getElementById('clickCount').textContent = 'Clicks: ' + clicks;
  localStorage.setItem('clicks', clicks); // Save clicks to local storage
}

function generateClickUpgradeButton() {
  const clickUpgradeSection = document.getElementById('clicksPerClickSection');
  clickUpgradeSection.innerHTML = '';

  const clickUpgradeButton = document.createElement('button');
  clickUpgradeButton.textContent = `Upgrade Clicks Per Click: Cost ${clickUpgradeCost} clicks`;

  clickUpgradeButton.onclick = function() {
    buyClickUpgrade();
  };

  clickUpgradeSection.appendChild(clickUpgradeButton);
}

function generateCPSUpgradeButton() {
  const cpsUpgradeSection = document.getElementById('clicksPerSecondSection');
  cpsUpgradeSection.innerHTML = '';

  const cpsUpgradeButton = document.createElement('button');
  cpsUpgradeButton.textContent = `Upgrade Clicks Per Second: Cost ${cpsUpgradeCost} clicks`;

  cpsUpgradeButton.onclick = function() {
    buyCPSUpgrade();
  };

  cpsUpgradeSection.appendChild(cpsUpgradeButton);
}

function downloadProgress() {
  const progressData = `Clicks: ${clicks}\nAutoclicks: ${autoclicks}\nClick Multiplier: ${clickMultiplier}\nClick Upgrade Cost: ${clickUpgradeCost}\nCPS Upgrade Cost: ${cpsUpgradeCost}`;
  const blob = new Blob([progressData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'progress.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function uploadProgress() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();

  fileInput.onchange = function() {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      const progressData = reader.result.split('\n');
      clicks = parseInt(progressData[0].split(': ')[1]);
      autoclicks = parseInt(progressData[1].split(': ')[1]);
      clickMultiplier = parseInt(progressData[2].split(': ')[1]);
      clickUpgradeCost = parseInt(progressData[3].split(': ')[1]);
      cpsUpgradeCost = parseInt(progressData[4].split(': ')[1]);
      updateClickCount();
      generateClickUpgradeButton();
      generateCPSUpgradeButton();
    };
    reader.readAsText(file);
  }
}

setInterval(function() {
  clicks += autoclicks;
  updateClickCount();
}, 1000); // Autoclick every second

generateClickUpgradeButton();
generateCPSUpgradeButton();
