let game = {
  techs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],
  cards: null,
  firstCard: null,
  secondCard: null,
  lockMode: false,

  createCards: function () {
    this.cards = [];

    this.techs.forEach((tech) => {
      this.cards.push(this.createPair(tech));
    });

    this.cards = this.cards.flat();
    this.shuffleCards();
    return this.cards;
  },

  createPair: function (tech) {
    return [
      {
        id: this.createID(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createID(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },

  createID: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffleCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    
    if (card.flipped || this.lockMode) {
      return false;
    }
    
    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipedCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length === 0;
  },
};