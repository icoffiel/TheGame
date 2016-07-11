var rp = require('request-promise');

const TIMEOUT = 600000;
const URL_EFFECTS = 'http://thegame.nerderylabs.com:1337/effects';

const ATTACK_ITEMS = [
  'Banana Peel',
  'Green Shell',
  'SPNKR',
  'Fire Flower',
  'Box of Bees',
  'Red Shell',
  'Fus Ro Dah',
  'Crowbar',
  'Hadouken',
  'Charizard',
  'Rail Gun',
  'Get Over Here',
  'Golden Gun',
  'Holy Water',
  'Buster Sword',
  'Master Sword',
  'Hard Knuckle'
];

const SELF_ITEMS = [
  'UUDDLRLRBA',
  'Wedge',
  'Buffalo',
  'Gold Ring',
  '7777',
  'Pokeball',
  'Pizza',
  'Moogle',
  'Bo Jackson',
  'Mushroom',
  'Treasure Chest'
];

class Effects {

  constructor() {
    // FIXME Either fix or remove completely and rely on manual list
    // this._effects = [];
  }

  getEffect(itemName) {
    // console.log(`Effects size is : ${this._effects.length}`);
    // console.log(`Effects type is : ${Object.prototype.toString.call(this._effects)}`);
    // return this._effects.find(effect => {
    //   return effect.EffectName === itemName;
    // });
  }

  isEffectAttack(itemName) {
    console.log(`Is ${itemName} an attack item?`);
    // return this.getEffect(itemName);
    return ATTACK_ITEMS.includes(itemName);
  }

  retrieveEffects() {
    return rp.get({
      uri: URL_EFFECTS,
      timeout: 60000
    })
    .then(parsedBody => {
      console.log('Retrieved the effects');
      this._effects = parsedBody;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getEffectsRunner() {
    this.retrieveEffects()
    .finally(() => {
      setTimeout(() => this.getEffectsRunner(), TIMEOUT);
    });
  }
}

module.exports = Effects;
