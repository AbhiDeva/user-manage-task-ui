 export const generateTrieSteps = (words, search) => {
    const steps = [];
    const trie = { children: {}, isEnd: false };

    steps.push({
      description: `Initialize Trie and insert words: [${words.join(', ')}]`,
      data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'init', current: null }
    });

    // Insert words
    for (let word of words) {
      let node = trie;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!node.children[char]) {
          node.children[char] = { children: {}, isEnd: false };
        }
        node = node.children[char];
        
        steps.push({
          description: `Insert '${word}': add char '${char}' (progress: "${word.slice(0, i + 1)}")`,
          data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'insert', current: word, path: word.slice(0, i + 1) }
        });
      }
      node.isEnd = true;
      steps.push({
        description: `Mark end of word '${word}'`,
        data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'insert', current: word, marked: true }
      });
    }

    // Search
    steps.push({
      description: `Search for '${search}'`,
      data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'search', current: search, path: '' }
    });

    let node = trie;
    let found = true;
    for (let i = 0; i < search.length; i++) {
      const char = search[i];
      
      steps.push({
        description: `Search '${search}': check char '${char}'`,
        data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'search', current: search, path: search.slice(0, i + 1), checking: char }
      });

      if (!node.children[char]) {
        found = false;
        steps.push({
          description: `Char '${char}' not found - word doesn't exist`,
          data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'search', current: search, path: search.slice(0, i + 1), found: false }
        });
        break;
      }
      node = node.children[char];
    }

    if (found) {
      found = node.isEnd;
      steps.push({
        description: found ? `'${search}' found in Trie!` : `'${search}' is a prefix, not a complete word`,
        data: { trie: JSON.parse(JSON.stringify(trie)), words, search, phase: 'search', current: search, path: search, found }
      });
    }

    return steps;
  };