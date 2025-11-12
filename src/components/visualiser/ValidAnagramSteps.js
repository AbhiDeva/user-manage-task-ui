
export const generateValidAnagramSteps = (s, t) => {
    const steps = [];

    steps.push({
      description: `Check if "${s}" and "${t}" are anagrams`,
      data: { s: s.split(''), t: t.split(''), count: {}, phase: 'init', current: -1, isAnagram: null }
    });

    if (s.length !== t.length) {
      steps.push({
        description: `Different lengths (${s.length} vs ${t.length}) - not anagrams`,
        data: { s: s.split(''), t: t.split(''), count: {}, phase: 'complete', current: -1, isAnagram: false }
      });
      return steps;
    }

    const count = {};

    steps.push({
      description: `Phase 1: Count characters in "${s}"`,
      data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'counting', current: -1, isAnagram: null }
    });

    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      count[char] = (count[char] || 0) + 1;
      
      steps.push({
        description: `Add '${char}': count['${char}'] = ${count[char]}`,
        data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'counting', current: i, isAnagram: null }
      });
    }

    steps.push({
      description: `Phase 2: Verify characters in "${t}"`,
      data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'verifying', current: -1, isAnagram: null }
    });

    for (let i = 0; i < t.length; i++) {
      const char = t[i];

      steps.push({
        description: `Check '${char}' in t[${i}]`,
        data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'verifying', current: i, isAnagram: null, checking: char }
      });

      if (!count[char]) {
        steps.push({
          description: `'${char}' not found or count exhausted - not anagrams`,
          data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'complete', current: i, isAnagram: false }
        });
        return steps;
      }

      count[char]--;
      steps.push({
        description: `Decrease '${char}': count['${char}'] = ${count[char]}`,
        data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'verifying', current: i, isAnagram: null, decreased: char }
      });
    }

    steps.push({
      description: `All characters match - valid anagrams!`,
      data: { s: s.split(''), t: t.split(''), count: {...count}, phase: 'complete', current: -1, isAnagram: true }
    });

    return steps;
  };
