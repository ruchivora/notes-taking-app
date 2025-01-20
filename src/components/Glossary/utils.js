export async function getGlossaryData(plainText) {

  const apiKey = import.meta.env.VITE_API_KEY;

  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Can you provide a glossary in the following format for the text: "${plainText}" Each glossary entry should be an object with 'term' and 'explanation' keys. Example: [{"term": "exampleTerm", "explanation": "exampleExplanation"}]`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const glossary = JSON.parse(data.choices[0].message.content);
    return glossary;
  } catch (error) {
    console.error('Error fetching glossary:', error);
    return error;
  }
}

export function highlightGlossaryTerms(plainText, glossaryData) {
  let highlightedText = plainText;
  /* Brute force approach */
  for (let i = 0; i < glossaryData.length; i++) {
    const { term, explanation } = glossaryData[i];

    const words = highlightedText.split(' ');

    for (let j = 0; j < words.length; j++) {
      const word = words[j];

      if (word.toLowerCase() === term.toLowerCase() && !explanation.toLowerCase().includes(word.toLowerCase())) {
        words[j] = `<strong title="${explanation}">${word}</strong>`;
      }
    }

    // Join the words back into a string
    highlightedText = words.join(' ');
  }

  return highlightedText;
}


export function convertHTMLStringToText(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};