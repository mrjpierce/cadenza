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

coach.test(sut.function, 10);

assert(coach.medianRunTimeMS <= 50);
```