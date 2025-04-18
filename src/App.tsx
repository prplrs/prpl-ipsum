import { useState } from 'react'
import { flattenDeep, slice } from 'lodash'
import { PHRASES } from './inc/word-bank'
import { Copy } from './inc/Copy'

enum ContentType {
  WORDS = 'words',
  SENTENCES = 'sentences',
  PARAGRAPHS = 'paragraphs',
}

/**
 * Get a random item from an array of strings
 * @param arr - Array of strings
 * @returns A random item from the array
 */
const getRandomItem = (arr: string[]): string[] => arr[Math.floor(Math.random() * arr.length)].split(' ')

/**
 * Get a random item from an array of strings
 * @param arr - Array of strings
 * @returns A random item from the array
 */
const getFlattenedItems = (amount: number): string[] => {
  return flattenDeep(Array.from({ length: amount }, () => getRandomItem(PHRASES)))
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Generate content based on the type and amount
 * @param type - Type of content to generate
 * @param amount - Amount of content to generate
 * @returns Generated content
 */
const generateContent = (type: ContentType, amount: number): string => {
  if (type === ContentType.WORDS) {
    return slice(getFlattenedItems(amount), 0, amount).join(' ')
  }

  if (type === ContentType.SENTENCES) {
    return Array.from({ length: amount }, () => {
      const sentenceLength = Math.floor(Math.random() * 8) + 4
      const sentence = ucFirst(getFlattenedItems(sentenceLength).join(' '))
      console.log(sentence)
      return sentence + '.'
    }).join(' ')
  }

  if (type === ContentType.PARAGRAPHS) {
    return Array.from({ length: amount }, () => {
      const paragraphLength = Math.floor(Math.random() * 4) + 3
      return generateContent(ContentType.SENTENCES, paragraphLength)
    }).join('\n\n')
  }

  return ''
}

export default function App() {
  const [amount, setAmount] = useState(5)
  const [type, setType] = useState(ContentType.WORDS)
  const [output, setOutput] = useState('')

  const handleGenerate = () => {
    const content = generateContent(type, amount)
    setOutput(content)
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 p-8 rounded shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">PRPL Ipsum Generator</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="block w-full p-4 text-lg rounded bg-black"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Generate</label>
          <div className="flex gap-4">
            {[ContentType.WORDS, ContentType.SENTENCES, ContentType.PARAGRAPHS].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={option}
                  checked={type === option}
                  onChange={() => setType(option)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
        >
          Generate
        </button>

        <div className="mt-6 block w-full whitespace-pre-wrap bg-black p-4 rounded bg-black relative">
          {/* <Animate className="absolute end-2 top-7 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"> */}
          {output && <Copy text={output} />}
          {/* </Animate> */}

          {output}
        </div>
      </div>
    </div>
  )
}
