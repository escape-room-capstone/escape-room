import React, { useState, useEffect } from "react";
import '../../../public/CSS/Caesar.css'

export default function CaesarCipher({ setCaesarCipherCompleted }) {
  const [caesarCipher, setCaesarCipher] = useState({
    decrypted: "",
  });
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const cipherKey = alphabet.length;
  const solution = "be careful, elliot will hack your database";
  let problem = "";
  let status = "You must decrypt the message! Time is running out!";

  let cipher = { " ": " ", ",": "," };

  for (let i = 0; i < cipherKey; i++) {
    if (!cipher[alphabet[i]]) {
      let modKey = (i + 4) % cipherKey;
      cipher[alphabet[i]] = alphabet[modKey];
    }
  }

  for (let i = 0; i < solution.length; i++) {
    problem += cipher[solution[i]];
  }

  const handleChange = (event) => {
    setCaesarCipher({ ...caesarCipher, decrypted: event.target.value });
  };

  // Win condition -- user will have to enter integer, if wrong, generate new numbers
  useEffect(() => {
    if (caesarCipher.decrypted.toLowerCase() === solution) {
      setCaesarCipherCompleted(true);
      console.log("passed");
    }
  }, [caesarCipher, setCaesarCipherCompleted]);

  if (caesarCipher.decrypted === solution) {
    status = "Whew! You descrypted the message!";
  }

  return (
    <div id="caesar-game">
      <p>{status}</p>
      <p style={{ fontFamily: 'copperplate' }}>{problem}</p>
      <input
        style={{ width: "30rem" }}
        type="string"
        value={caesarCipher.decrypted}
        onChange={handleChange}
      />
    </div>
  );
}
