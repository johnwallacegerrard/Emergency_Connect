const charitiesCards = [
  {
    name: "American Red Cross",
    link: "images/redcross.svg",
    text: "The American Red Cross is an organization that specializes in natural disaster relief, blood donations, and international volunteerism. Learn about how you can give back to communities and volunteer with the American Red Cross.",
  },
  {
    name: "The Salvation Army",
    link: "images/salvation.svg",
    text: "The Salvation Army has helped 27 million people in 135 countries around the world. Find out how you can help volunteer with The Salvation Army.",
  },
  {
    name: "Team Rubicon",
    link: "images/rubicon.svg",
    text: "Team Rubicon was founded in 2010. They provide ways to volunteer with disaster relief, donation centers, building homes, cleaning affected areas, and providing medical services.",
  },
  {
    name: "Doctors Without Borders",
    link: "images/doctors.svg",
    text: "Doctors Without Borders operates on the front lines of natural disasters and disease outbreaks. You can donate to Doctors Without Borders to help mobilize their medical teams to disaster relief areas.",
  },
];

//variables for cards on Charities section//
const cardTemplate = document.querySelector("#charities__card-template");
const cardsList = document.querySelector(".charities__cards-list");

const charitiesImageBtn = document.querySelector(".charities__image-btn");
const charitiesModal = document.querySelector("#charities-modal");

//variables for donation section
const volunteerWorkModal = document.querySelector("#volunteer-work-modal");

const donationForm = document.querySelector("#donation-form");
const volunteerForm = volunteerWorkModal.querySelector("#volunteer-form");

const volunteerWorkBtn = document.querySelector(
  ".charities__form-modal-open-btn"
);
//global functions
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_open");
    closeModal(activePopup);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal_open")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_open");
  modal.addEventListener("mousedown", handleOverlay);
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  modal.removeEventListener("mousedown", handleOverlay);
  document.removeEventListener("keyup", handleEscape);
}

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// Grab the thank-you div from the DOM
const thankYouMessage = document.getElementById("thankYouMessage");

function showThankYouMessage(message) {
  thankYouMessage.textContent = message;

  thankYouMessage.hidden = false;

  setTimeout(() => {
    thankYouMessage.classList.add("fade-out");
  }, 2000);

  setTimeout(() => {
    thankYouMessage.hidden = true;
    thankYouMessage.classList.remove("fade-out");
  }, 4000);
}

function handleDonationFormSubmit(evt) {
  evt.preventDefault();

  const fullName = evt.target["full-name"].value;
  const email = evt.target["email"].value;
  const donationAmount = evt.target["price"].value;

  const buttonElement = evt.target.querySelector(".donation__button");
  disableButton(buttonElement, settings);

  evt.target.reset();
  showThankYouMessage("Thank you for your donation!");
}

function handleVolunteerFormSubmit(evt) {
  evt.preventDefault();

  const fullName = evt.target["full-name"].value;
  const age = evt.target["age"].value;
  const email = evt.target["email"].value;
  const phoneNumber = evt.target["phone-number"].value;
  const availability = evt.target["availability"].value;

  const buttonElement = evt.target.querySelector(".modal__button");
  disableButton(buttonElement, settings);

  closeModal(volunteerWorkModal);
  evt.target.reset();
  showThankYouMessage("Thank you for volunteering!");
}

//functions to bring up modals

volunteerWorkBtn.addEventListener("click", () => {
  resetValidation(volunteerForm, settings);
  openModal(volunteerWorkModal);
});

donationForm.addEventListener("submit", handleDonationFormSubmit);
volunteerForm.addEventListener("submit", handleVolunteerFormSubmit);

//functions for Charities cards template and buttons//
const charitiesCloseBtn = document.querySelector(".charities__modal-close-btn");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".charities__card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".charities__card-title");
  cardNameElement.textContent = data.name;

  const cardImageElement = cardElement.querySelector(".charities__card-image");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardImageElement.addEventListener("click", () => {
    handleCharitiesModal(data);
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

charitiesCards.forEach((item) => {
  renderCard(item, "append");
});

//function for Charities modal//
function handleCharitiesModal(data) {
  const modalImgEl = document.querySelector(".charities__modal-image");
  const modalCaptionEl = document.querySelector(".charities__modal-caption");

  modalImgEl.src = data.link;
  modalCaptionEl.textContent = data.text;

  openModal(charitiesModal);
}

charitiesCloseBtn.addEventListener("click", () => {
  closeModal(charitiesModal);
});
