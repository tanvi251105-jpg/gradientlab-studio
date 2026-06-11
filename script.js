const generateBtn = document.getElementById("generateBtn");
const paletteContainer = document.getElementById("paletteContainer");

const createCustomBtn = document.getElementById("createCustomBtn");
const colorPickers = document.getElementById("colorPickers");
const customPaletteContainer = document.getElementById("customPaletteContainer");
const addColorBtn = document.getElementById("addColor");

const presetContainer = document.getElementById("presetContainer");

function getRandomColor() {
    return `rgb(
        ${Math.floor(Math.random()*255)},
        ${Math.floor(Math.random()*255)},
        ${Math.floor(Math.random()*255)}
    )`;
}

function createGradientCard(colors) {

    const angle = Math.floor(Math.random()*360);

    const gradient =
        `linear-gradient(${angle}deg, ${colors.join(",")})`;

    const card = document.createElement("div");
    card.classList.add("gradient-card");

    const preview = document.createElement("div");
    preview.classList.add("gradient-preview");
    preview.style.background = gradient;

    const overlay = document.createElement("div");
    overlay.classList.add("gradient-overlay");
    overlay.textContent = "Click to Copy Gradient CSS";

    preview.appendChild(overlay);

    preview.addEventListener("click", () => {

        navigator.clipboard.writeText(
            `background:${gradient};`
        );

        document.body.style.background = gradient;

        alert("Gradient CSS Copied!");
    });

    const swatches = document.createElement("div");
    swatches.classList.add("color-swatches");

    colors.forEach(color => {

        const swatch = document.createElement("div");
        swatch.classList.add("swatch");
        swatch.style.background = color;

        swatch.addEventListener("click", () => {

            navigator.clipboard.writeText(color);

            alert(`${color} copied`);
        });

        swatches.appendChild(swatch);

    });

    card.appendChild(preview);
    card.appendChild(swatches);

    return card;
}

generateBtn.addEventListener("click", () => {

    paletteContainer.innerHTML = "";

    for(let i=0;i<4;i++){

        const colors = [
            getRandomColor(),
            getRandomColor()
        ];

        paletteContainer.appendChild(
            createGradientCard(colors)
        );
    }

});

createCustomBtn.addEventListener("click", () => {

    const colors = [
        ...colorPickers.querySelectorAll("input")
    ].map(input => input.value);

    customPaletteContainer.innerHTML = "";

    customPaletteContainer.appendChild(
        createGradientCard(colors)
    );
});

addColorBtn.addEventListener("click", () => {

    if(colorPickers.children.length >= 5){
        alert("Maximum 5 colors allowed");
        return;
    }

    const wrapper =
        document.createElement("div");

    wrapper.classList.add(
        "color-picker-wrapper"
    );

    const input =
        document.createElement("input");

    input.type = "color";

    const removeBtn =
        document.createElement("button");

    removeBtn.classList.add("remove-btn");

    removeBtn.textContent = "Remove";

    removeBtn.onclick = () =>
        wrapper.remove();

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);

    colorPickers.appendChild(wrapper);
});

const presets = [

{
name:"Sunset",
gradient:"linear-gradient(45deg,#ff6a00,#ee0979)"
},

{
name:"Ocean",
gradient:"linear-gradient(90deg,#00c6ff,#0072ff)"
},

{
name:"Purple",
gradient:"linear-gradient(60deg,#8e2de2,#4a00e0)"
},

{
name:"Neon",
gradient:"linear-gradient(120deg,#00f260,#0575e6)"
},

{
name:"Pastel",
gradient:"linear-gradient(120deg,#f6d365,#fda085)"
}

];

presets.forEach(preset=>{

const card=document.createElement("div");

card.classList.add("preset-card");

card.style.background=preset.gradient;

card.title=preset.name;

card.onclick=()=>{

navigator.clipboard.writeText(
`background:${preset.gradient};`
);

document.body.style.background=
preset.gradient;

alert(`${preset.name} copied!`);

};

presetContainer.appendChild(card);

});

generateBtn.click();