
// npm install --prefix docker_node keypress

const { spawn } = require('child_process');
const readline = require('readline');

// Spawn the nextui process
const nextui = spawn('/usr/local/bin/nextui', ['init', '-t', 'app', '-p', 'npm', 'my-nextui-app']);

// Emit keypress events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Map key names to their string representations
const keyMap = {
  up: '\u001b[A',
  down: '\u001b[B',
  right: '\u001b[C',
  left: '\u001b[D',
  newline: '\n',
  carriageReturn: '\r'
};

// Listen for keypress events
// process.stdin.on('keypress', (character, key) => {
//   console.log(`You pressed: ${character}`);
//   console.log(key);
//
//   // Convert keypress to string if it's an arrow key
//   let input = character;
//   if (key && key.name in keyMap) {
//     input = keyMap[key.name];
//   }
//
//   // Write the keypress to the stdin of the nextui process
//   nextui.stdin.write(input);
//
//   // Exit on Ctrl+C
//   if (key && key.ctrl && key.name === 'c') {
//     process.exit();
//   }
// });

const sendKeypresses = (keys, delay) => {
  keys.forEach((key, index) => {
    setTimeout(() => {
      let input = key;
      if (key in keyMap) {
        input = keyMap[key];
      }
      nextui.stdin.write(input);
      console.log(`Sent: ${input}`);
    }, index * delay);
  });
};

function delay(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {
        // Busy-wait loop
    }
}

console.log('Wait for it...');
delay(5000); // Delay for 5 seconds
console.log("delay over");

// Example keypress sequence
const keySequence = ['carriageReturn', 'carriageReturn', 'carriageReturn'];

// Send keypresses with 1-second delay
sendKeypresses(keySequence, 1000);

// Capture and output stdout from the nextui process
nextui.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Capture and output stderr from the nextui process
nextui.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle process exit
nextui.on('close', (code) => {
  console.log(`nextui process exited with code ${code}`);
});

