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

function handleDonationFormSubmit(evt) {
  evt.preventDefault();

  const firstName = evt.target["first-name"].value;
  const lastName = evt.target["last-name"].value;
  const email = evt.target["email"].value;
  const phoneNumber = evt.target["phone-number"].value;
  const address = evt.target["address"].value;
  const donationAmount = evt.target["price"].value;
  closeModal(cashDonationModal);
  evt.target.reset();
}

function handleVolunteerFormSubmit(evt) {
  evt.preventDefault();

  const firstName = evt.target["first-name"].value;
  const lastName = evt.target["last-name"].value;
  const age = evt.target["age"].value;
  const email = evt.target["email"].value;
  const phoneNumber = evt.target["phone-number"].value;
  const address = evt.target["address"].value;
  const availability = evt.target["availability"].value;
  closeModal(volunteerWorkModal);
  evt.target.reset();
}

//functions to bring up modals
cashDonationBtn.addEventListener("click", () => {
  // resetValidation(editProfileForm, settings);
  openModal(cashDonationModal);
});

volunteerWorkBtn.addEventListener("click", () => {
  openModal(volunteerWorkModal);
});

donationForm.addEventListener("submit", handleDonationFormSubmit);
volunteerForm.addEventListener("submit", handleVolunteerFormSubmit);

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

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
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
