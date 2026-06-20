const sprites = [
    // Fire Sprite
    { name: "Fire Sprite", rarity: "Rare", image: "images/fire.png" },
    { name: "Gold Fire Sprite", rarity: "Legendary", image: "images/gold_fire.png" },
    { name: "Gummy Fire Sprite", rarity: "Epic", image: "images/gummy_fire.png" },
    { name: "Galaxy Fire Sprite", rarity: "Legendary", image: "images/galaxy_fire.png" },

    // Water Sprite
    { name: "Water Sprite", rarity: "Rare", image: "images/water.png" },
    { name: "Gold Water Sprite", rarity: "Legendary", image: "images/gold_water.png" },
    { name: "Gummy Water Sprite", rarity: "Epic", image: "images/gummy_water.png" },
    { name: "Galaxy Water Sprite", rarity: "Legendary", image: "images/galaxy_water.png" },

    // Earth Sprite
    { name: "Earth Sprite", rarity: "Rare", image: "images/earth.png" },
    { name: "Gold Earth Sprite", rarity: "Legendary", image: "images/gold_earth.png" },
    { name: "Gummy Earth Sprite", rarity: "Epic", image: "images/gummy_earth.png" },
    { name: "Galaxy Earth Sprite", rarity: "Legendary", image: "images/galaxy_earth.png" },

    // Dream Sprite
    { name: "Dream Sprite", rarity: "Epic", image: "images/dream.png" },
    { name: "Gold Dream Sprite", rarity: "Legendary", image: "images/gold_dream.png" },
    { name: "Gummy Dream Sprite", rarity: "Epic", image: "images/gummy_dream.png" },
    { name: "Galaxy Dream Sprite", rarity: "Legendary", image: "images/galaxy_dream.png" },

    // Ghost Sprite
    { name: "Ghost Sprite", rarity: "Epic", image: "images/ghost.png" },
    { name: "Gold Ghost Sprite", rarity: "Legendary", image: "images/gold_ghost.png" },
    { name: "Gummy Ghost Sprite", rarity: "Epic", image: "images/gummy_ghost.png" },
    { name: "Galaxy Ghost Sprite", rarity: "Legendary", image: "images/galaxy_ghost.png" },

    // Demon Sprite
    { name: "Demon Sprite", rarity: "Epic", image: "images/demon.png" },
    { name: "Gold Demon Sprite", rarity: "Legendary", image: "images/gold_demon.png" },
    { name: "Gummy Demon Sprite", rarity: "Epic", image: "images/gummy_demon.png" },
    { name: "Galaxy Demon Sprite", rarity: "Legendary", image: "images/galaxy_demon.png" },

    // Duck Sprite
    { name: "Duck Sprite", rarity: "Epic", image: "images/duck.png" },
    { name: "Gold Duck Sprite", rarity: "Legendary", image: "images/gold_duck.png" },
    { name: "Gummy Duck Sprite", rarity: "Epic", image: "images/gummy_duck.png" },
    { name: "Galaxy Duck Sprite", rarity: "Legendary", image: "images/galaxy_duck.png" },

    // King Sprite
    { name: "King Sprite", rarity: "Legendary", image: "images/king.png" },
    { name: "Gold King Sprite", rarity: "Legendary", image: "images/gold_king.png" },
    { name: "Gummy King Sprite", rarity: "Epic", image: "images/gummy_king.png" },
    { name: "Galaxy King Sprite", rarity: "Legendary", image: "images/galaxy_king.png" },

    // Punk Sprite
    { name: "Punk Sprite", rarity: "Legendary", image: "images/punk.png" },
    { name: "Gold Punk Sprite", rarity: "Legendary", image: "images/gold_punk.png" },
    { name: "Gummy Punk Sprite", rarity: "Epic", image: "images/gummy_punk.png" },
    { name: "Galaxy Punk Sprite", rarity: "Legendary", image: "images/galaxy_punk.png" },

    // Zero Point Sprite
    { name: "Zero Point Sprite", rarity: "Legendary", image: "images/zeropoint.png" },
    { name: "Gold Zero Point Sprite", rarity: "Legendary", image: "images/gold_zeropoint.png" },
    { name: "Gummy Zero Point Sprite", rarity: "Epic", image: "images/gummy_zeropoint.png" },
    { name: "Galaxy Zero Point Sprite", rarity: "Legendary", image: "images/galaxy_zeropoint.png" },

    // Burnt Peanut Sprite (regular only)
    { name: "Burnt Peanut Sprite", rarity: "Legendary", image: "images/burntpeanut.png" }
];


const grid = document.getElementById("spriteGrid");

function render() {

    grid.innerHTML = "";

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rarity = document
        .getElementById("rarityFilter")
        .value;

    sprites.forEach((sprite, index) => {

        if (!sprite.name.toLowerCase().includes(search))
            return;

        if (rarity !== "All" && sprite.rarity !== rarity)
            return;

        const collected =
            localStorage.getItem("sprite" + index) === "true";

        const card = document.createElement("div");

        card.className =
            "card" + (collected ? " collected" : "");

        card.innerHTML = `
            <img src="${sprite.image}" alt="${sprite.name}">

            <div class="name">
                ${sprite.name}
            </div>

            <div class="rarity ${sprite.rarity}">
                ${sprite.rarity}
            </div>

            <div class="checkbox">
                <input
                    type="checkbox"
                    ${collected ? "checked" : ""}
                >
                Collected
            </div>
        `;

        const box = card.querySelector("input");

        box.addEventListener("change", () => {

            localStorage.setItem(
                "sprite" + index,
                box.checked
            );

            render();

        });

        grid.appendChild(card);

    });

    updateProgress();

}

function updateProgress() {

    const total = sprites.length;

    let owned = 0;

    sprites.forEach((sprite, index) => {

        if (localStorage.getItem("sprite" + index) === "true") {
            owned++;
        }

    });

    const percent = Math.round((owned / total) * 100);

    document.getElementById("progressFill").style.width = percent + "%";

    document.getElementById("progressText").textContent =
        `${owned}/${total} Collected (${percent}%)`;

}

document
    .getElementById("search")
    .addEventListener("input", render);

document
    .getElementById("rarityFilter")
    .addEventListener("change", render);

render();