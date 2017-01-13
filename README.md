# Cadenza.js
A JavaScript framework for testing performance

## Install
```
npm install cadenza
```

## Usage
``` js
let coach = new Coach()
    .setup(() => {
        value1 = 1;
        value2 = 2;
    })
    .teardown(() => {
        value1 = null;
        value2 = null;
    });

let numberOfTimesToRunTest = 10;
coach.test(sut.function, numberOfTimesToRunTest);

assert(coach.medianRunTimeMS <= 50);
```