const charitiesCards = [
  {
    name: "American Red Cross",
    link: "images/redcross.svg",
  },
  {
    name: "The Salvation Army",
    link: "images/salvation.svg",
  },
  {
    name: "Team Rubicon",
    link: "images/rubicon.svg",
  },
  {
    name: "Doctors Without Borders",
    link: "images/doctors.svg",
  },
];

//variables for cards on Charities section//
const cardTemplate = document.querySelector("#charities__card-template");
const cardsList = document.querySelector(".charities__cards-list");

//functions for Charities cards template and buttons//
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".charities__card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".charities__card-title");
  cardNameElement.textContent = data.name;

  const cardImageElement = cardElement.querySelector(".charities__card-image");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

charitiesCards.forEach((item) => {
  renderCard(item, "append");
});

//functions for Charities modals opening and closing//
const charitiesModal = document.querySelector("#charities__modal");
const charitiesModalImage = document.querySelector(".charities__modal-image");
const charitiesModalCaption = document.querySelector(
  ".charities__modal-caption"
);
const charitiesModalCloseBtn = document.querySelector(
  ".charities__modal-close-btn"
);

cardImageElement.addEventListener("click", () => {
  openModal(previewModal);
  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewModalCaption.textContent = data.name;
});
