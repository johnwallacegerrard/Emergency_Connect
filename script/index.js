const charitiesCards = [
  {
    name: "American Red Cross",
    link: "images/redcross.svg",
    text: "The American Red Cross is an organization that specializes in natural disaster relief, blood donations, military and veteran assistance, and international volunteerism. Since 1881, their goal has been to work proactively to prevent suffering, and they respond to an average of 65,000 disasters a year (AMR). They also offer training and certifications for First Aid, CPR, AED, babysitting, lifeguarding, and more. Learn about how you can give back to communities and volunteer with the American Red Cross.",
  },
  {
    name: "The Salvation Army",
    link: "images/salvation.svg",
    text: "Since 1865, The Salvation Army has helped 27 million people in 135 countries around the world. This organization believes serving others is the core mission, whether that is with disaster relief, advocacy for those affected by trafficking, and services for all groups in society including the youth, elderly, military, veterans, and incarcerated. Find out how you can help volunteer with The Salvation Army.",
  },
  {
    name: "Team Rubicon",
    link: "images/rubicon.svg",
    text: "Team Rubicon was founded in 2010 by Jake Wood, a United States Marine Corps veteran who wanted to help those affected by the devastating earthquake in Haiti. Since then, Team Rubicon has been helping before, during, and after disasters happening around the world. Their goal is to build resilience in communities internationally, and they provide ways to volunteer with disaster relief, donation centers, building homes, cleaning affected areas, and providing medical services.",
  },
  {
    name: "Doctors Without Borders",
    link: "images/doctors.svg",
    text: "Doctors Without Borders has been providing emergency medical assistance internationally since 1971. Their goal is to provide medical aid based solely on need, and never any discriminatory factors. These are the people who are on the front lines of natural disasters and disease outbreaks. You can donate to Doctors Without Borders to help mobilize their medical teams effectively and efficiently to disaster relief areas, or bring awareness about the organization to your local area via speaker events, fundraisers, and chapters in schools or neighborhoods.",
  },
];

//variables for cards on Charities section//
const cardTemplate = document.querySelector("#charities__card-template");
const cardsList = document.querySelector(".charities__cards-list");

const charitiesImageBtn = document.querySelector(".charities__image-btn");
const charitiesModal = document.querySelector("#charities-modal");

//variables for donation section
// this 'volunteerWork' needs be assigned in charity section
// const volunteerWork = document.querySelector("#volunteer-work");

const volunteerWorkModal = document.querySelector("#volunteer-work-modal");

const donationForm = document.querySelector("#donation-form");
const volunteerForm = volunteerWorkModal.querySelector("#volunteer-form");

// the block name for this 'volunteerWorkBtn' needs to be assgin to the charity class
// const volunteerWorkBtn = volunteerWork.querySelector(".charities__form-modal-open-btn")
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

// volunteerWorkBtn.addEventListener("click", () => {
//   resetValidation(volunteerForm, settings);
//   openModal(volunteerWorkModal);
// });

donationForm.addEventListener("submit", handleDonationFormSubmit);
// volunteerForm.addEventListener("submit", handleVolunteerFormSubmit);

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
