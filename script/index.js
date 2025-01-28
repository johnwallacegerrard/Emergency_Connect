const charitiesCards = [
  {
    name: "American Red Cross",
    link: "images/redcross.svg",
    text: "",
  },
  {
    name: "The Salvation Army",
    link: "images/salvation.svg",
    text: "",
  },
  {
    name: "Team Rubicon",
    link: "images/rubicon.svg",
    text: "",
  },
  {
    name: "Doctors Without Borders",
    link: "images/doctors.svg",
    text: "",
  },
];

//variables for cards on Charities section//
const cardTemplate = document.querySelector("#charities__card-template");
const cardsList = document.querySelector(".charities__cards-list");

const charitiesImageBtn = document.querySelector(".charities__image-btn");
const charitiesModal = document.querySelector("#charities-modal");

//variables for donation section
const cashDonation = document.querySelector("#cash-donation");
const volunteerWork = document.querySelector("#volunteer-work");

const cashDonationModal = document.querySelector("#cash-donation-modal");
const volunteerWorkModal = document.querySelector("#volunteer-work-modal");

const donationForm = cashDonationModal.querySelector("#donation-form");
const volunteerForm = volunteerWorkModal.querySelector("#volunteer-form");

const cashDonationBtn = cashDonation.querySelector(".donation__button");
const volunteerWorkBtn = volunteerWork.querySelector(".donation__button");

//global functions
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_open");
    closeModal(activePopup);
  }
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
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

// Reusable function to display and fade out the message
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

  const firstName = evt.target["first-name"].value;
  const lastName = evt.target["last-name"].value;
  const email = evt.target["email"].value;
  const phoneNumber = evt.target["phone-number"].value;
  const address = evt.target["address"].value;
  const donationAmount = evt.target["price"].value;

  const buttonElement = evt.target.querySelector(".modal__button");
  disableButton(buttonElement, settings);

  closeModal(cashDonationModal);
  evt.target.reset();
  showThankYouMessage("Thank you for your donation!");
}

function handleVolunteerFormSubmit(evt) {
  evt.preventDefault();

  const firstName = evt.target["first-name"].value;
  const lastName = evt.target["last-name"].value;
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
cashDonationBtn.addEventListener("click", () => {
  resetValidation(donationForm, settings);
  openModal(cashDonationModal);
});

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
  const modalTitleEl = document.querySelector(".charities__modal-title");
  const modalImgEl = document.querySelector(".charities__modal-image");
  const modalCaptionEl = document.querySelector(".charities__modal-caption");

  modalTitleEl.textContent = data.name;
  modalImgEl.src = data.link;
  modalCaptionEl.textContent = data.text;

  openModal(charitiesModal);
}

charitiesCloseBtn.addEventListener("click", () => {
  closeModal(charitiesModal);
});
