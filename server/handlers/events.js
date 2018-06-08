const events = require('events');
const emitterObject = new events.EventEmitter();

const handleGrenade = () => console.log("Fire in the hole!");

emitterObject.on("grenade", handleGrenade);

setTimeout(() => {
  emitterObject.emit('grenade')
}, 5000)