const background = document.querySelector("#background");
const photos = resource.photos;

const white = "#ffffff",
  black = "#140a00",
  wb = 255 / 2;

const getRGB = (HEX) => {
  HEX = HEX.indexOf("#") > -1 ? HEX.replace("#", "") : HEX;
  return HEX.match(/.{2}/g)?.map((replacer) => parseInt(replacer, 16) || 0);
};

// const photo = photos[Math.floor(Math.random() * photos.length)];
const photo = photos[Math.floor(Math.random() * 100)];
const mainColor = photo.color,
  secondColor = getRGB(mainColor),
  bgColor = secondColor[0] > wb ? white : black,
  color = bgColor === white ? black : white;

secondColor.forEach((d, i) => {
  secondColor[i] = color === white ? d + wb : d - wb;
});

background.innerHTML = `
<img src=${photo.urls.raw} alt=${photo.alt_description ?? photo.description} />
<div class="background-color" style="background-color:${bgColor};"></div>
`;

document.body.style.color = color;
document.documentElement.style.setProperty("--main-color", mainColor);
document.documentElement.style.setProperty("--second-color",`rgba(${secondColor.join()})`);
document.documentElement.style.setProperty("--bg-color", `${bgColor}80`);
document.documentElement.style.setProperty("--font-color", `${color}`);