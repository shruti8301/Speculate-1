class Node {
  constructor(value) {
    this.data = value;
    this.children = {};
    this.isWord = false;
    this.prefixes = 0;
  }
}

class Trie {
  constructor(value) {
    this.root = new Node("");
  }

  add(value) {
    if (!this.root) {
      return null;
    } else {
      this._addValue(this.root, value);
    }
  }

  _addValue(node, value) {
    node.prefixes++;
    let char = value[0];
    let child = node.children[char];
    if (!child) {
      child = new Node(char);
      node.children[char] = child;
    }
    let remainder = value.substring(1);
    if (remainder) {
      this._addValue(child, remainder);
    } else {
      child.isWord = true;
    }
  }

  isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  predict(value) {
    if (!this.root) {
      return null;
    } else {
      return this._predict(this.root, value);
    }
  }
  getValue(node, value) {
    let arr = [];
    let str = value;
    let _getValue = function (newNode, value) {
      for (let key in newNode.children) {
        let child = newNode.children[key];
        str = value + key;
        if (child.isWord) {
          arr.push(str);
        }
        _getValue(child, str);
      }
    };

    _getValue(node, value);

    return arr;
  }
  _predict(node, value) {
    //debugger;
    let count = 0;
    let char = value[count];
    let child = node.children[char];
    while (child) {
      count++;
      node = node.children[char];
      char = value[count];
      if (!char) {
        return this.getValue(node, value);
      }
      child = node.children[char];
    }
  }
}

word = document.getElementById("word");
answer = document.getElementById("answer");
addbtn = document.getElementById("add");
predictbtn = document.getElementById("predict");

var mydata = JSON.parse(data);
var dictionary = [];

mydata.forEach((data) => {
  dictionary.push(data.word);
  entry = dictionary[dictionary.length - 1];
  var element = document.createElement("li");
  element.appendChild(document.createTextNode(entry));
  document.getElementById("dictitems").appendChild(element);
});

console.log(dictionary);
function heard() {
  let trie = new Trie();
  trie.add("America");
  trie.add("Australia");
  trie.add("Austria");
  trie.add("Butterfly");
  trie.add("Baseball");
  trie.add("Box");
  trie.add("Car");
  trie.add("Cat");
  trie.add("Chocolate");
  trie.add("Coin");
  trie.add("Deer");
  trie.add("Dog");
  trie.add("Door");
  trie.add("Drum");
  trie.add("Elephant");
  trie.add("Egg");
  trie.add("Flower");
  trie.add("Fan");
  trie.add("Goat");
  trie.add("Garlic");
  trie.add("Horse");
  trie.add("Hat");
  trie.add("Iron");
  trie.add("Igloo");
  trie.add("Jam");
  trie.add("Jellyfish");
  trie.add("Kettle");
  trie.add("Kite");
  trie.add("Lion");
  trie.add("Lamp");
  trie.add("Moon");
  trie.add("Man");
  trie.add("Needle");
  trie.add("Night");
  trie.add("Oven");
  trie.add("Ocean");
  trie.add("Pan");
  trie.add("Paper");
  trie.add("Pine");
  trie.add("Queen");
  trie.add("Rat");
  trie.add("Right");
  trie.add("Sand");
  trie.add("Sea");
  trie.add("Tea");
  trie.add("Time");
  trie.add("Umbrella");
  trie.add("Utensils");
  trie.add("Van");
  trie.add("Void");
  trie.add("Wind");
  trie.add("Work");
  trie.add("Year");
  trie.add("Yeast");
  trie.add("Zebra");
  if (trie.predict(word.value)) {
    x = trie.predict(word.value);
    word.value = x;
    dictionary = [...dictionary, ...x];
    console.log(dictionary);
  }
}

function addtodict() {
  if (word.value != "undefined" || word.value != "") {
    var regex = /^[A-Za-z0-9 ]+$/;
    var isValid = regex.test(word.value);
    if (!isValid) {
      entry1 = dictionary[dictionary.length - 1];
      entry2 = dictionary[dictionary.length - 2];
      var element1 = document.createElement("li");
      element1.appendChild(document.createTextNode(entry1));
      var element2 = document.createElement("li");
      element2.appendChild(document.createTextNode(entry2));
      document.getElementById("dictitems").appendChild(element1);
      document.getElementById("dictitems").appendChild(element2);
      answer.style.display = "none";
      alert("Successfully Added");
    } 
    else {
      entry = dictionary[dictionary.length - 1];
      var element = document.createElement("li");
      element.appendChild(document.createTextNode(entry));
      document.getElementById("dictitems").appendChild(element);
      answer.style.display = "none";
      alert("Successfully Added");
    }
  }

  word.value = "";
}
