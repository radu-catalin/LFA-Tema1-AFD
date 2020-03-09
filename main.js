const fs = require('fs');
const { ReadStream, fillArray } = require('./utility');

const f = new ReadStream('./afd2.in');

// numarul de stari
const n = parseInt(f.getLine());
// vectorul caracteristic al starilor
const ch = [...f.getLine()].filter((num) => num !== ' ').map((num) => parseInt(num));
// alfabetul utilizat
const alphabet = f.getLine();
// vectorul de stari
const states = [...f.getLine()].filter((num) => num !== ' ').map((num) => parseInt(num));
// numarul de relatii adiacente intre doua stari
const k = f.getLine();
// matricea de adiacenta intre doua stari
let v = fillArray('', n, n);

// introducem datele in matricea v
for (let i = 0; i < k; i++) {
  let data = f.getLine().split(' ').filter((num) => num !== ' ');
  data[1] = parseInt(data[1]);
  data[2] = parseInt(data[2]);

  if (alphabet.includes(data[0])) {
    v[data[1]][data[2]] += data[0];
  } else {
    console.log('Datele din fisierul de intrare sunt invalide!');
    process.exit();
  }
}

const m = f.getLine();
let list = [];

// citim m cuvinte
for (i = 0; i < m; i++) {
  list.push(f.getLine());
}

// stergem obiectul f
delete f;

// golim fisierul
fs.writeFileSync('./afd.out', '');

list.forEach((cuv) => {
  let state = 0;

  outer_loop: for (var i = 0; i < cuv.length; i++) {
    for (let q = 0; q < n; q++) {
      if (v[state][q].includes(cuv[i])) {
        state = q;
        break;
      } else if (q === n - 1) {
        fs.appendFileSync('./afd.out', cuv + ' 0\n');
        break outer_loop;
      }
    }
  }
  if (ch[state] === 1) {
    fs.appendFileSync('./afd.out', cuv + ' 1\n');
  } else if(i === cuv.length) {
    fs.appendFileSync('./afd.out', cuv + ' 0\n');
  }
});
