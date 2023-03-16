let binary = '';

function translate(code) {
  // Translate code to build binary
  codeToBinary(code);
  console.log('BINARY:', binary);

  // Return status
  if (binary.length === 7) {
    // Translate binary to character
    const char = binaryToCharacter[binary];
    binary = ''; // Reset for next sequence
    return char;
  } else {
    const possibilities = suggestions();
    if (possibilities.length > 0) return possibilities;
    // No possibilities - reset binary sequence
    console.log('INVALID: Restarting binary sequence');
    binary = '';
    return [];
  }
}

function codeToBinary(code) {
  if (code === '3') binary += '1'
  else if (code === '2') binary += '0';
}

function suggestions() {
  const regex = new RegExp(`^${binary}`);
  const nextChar = binary.length;
  return Object
    .entries(binaryToCharacter)
    .reduce((prev, curr) => {
      const [key, value] = curr;
      if (regex.test(key)) prev.push(`${value} -> ${key[nextChar]}`);
      return prev;
    }, []);
}

const binaryToCharacter = {
  '0100001': 'A',
  '0100010': 'B',
  '0100011': 'C',
  '0100100': 'D',
  '0100101': 'E',
  '0100110': 'F',
  '0100111': 'G',
  '0101000': 'H',
  '0101001': 'I',
  '0101010': 'J',
  '0101011': 'K',
  '0101100': 'L',
  '0101101': 'M',
  '0101110': 'N',
  '0101111': 'O',
  '0110000': 'P',
  '0110001': 'Q',
  '0110010': 'R',
  '0110011': 'S',
  '0110100': 'T',
  '0110101': 'U',
  '0110110': 'V',
  '0110111': 'W',
  '0111000': 'X',
  '0111001': 'Y',
  '0111010': 'Z',
  '1000001': 'a',
  '1000010': 'b',
  '1000011': 'c',
  '1000100': 'd',
  '1000101': 'e',
  '1000110': 'f',
  '1000111': 'g',
  '1001000': 'h',
  '1001001': 'i',
  '1001010': 'j',
  '1001011': 'k',
  '1001100': 'l',
  '1001101': 'm',
  '1001110': 'n',
  '1001111': 'o',
  '1010000': 'p',
  '1010001': 'q',
  '1010010': 'r',
  '1010011': 's',
  '1010100': 't',
  '1010101': 'u',
  '1010110': 'v',
  '1010111': 'w',
  '1011000': 'x',
  '1011001': 'y',
  '1011010': 'z',
  '0010000': '0',
  '0010001': '1',
  '0010010': '2',
  '0010011': '3',
  '0010100': '4',
  '0010101': '5',
  '0010110': '6',
  '0010111': '7',
  '0011000': '8',
  '0011001': '9',
  '0000001': '!',
  '0000010': '"',
  '0000011': '#',
  '0000100': '$',
  '0000101': '%',
  '0000110': '&',
  '0000111': '\'',
  '0001000': '(',
  '0001001': ')',
  '0001010': '*',
  '0001011': '+'
};

module.exports = translate;
