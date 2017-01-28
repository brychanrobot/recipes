import Fraction from 'fraction.js'

const noise = ['a', 'of']
const amountConnectors = ['to', 'or']

const units = {
	tablespoon: ['T', 'tbs', 'tbsp'],
	teaspoon: ['t', 'tsp'],
	cup: ['c'],
	pint: ['pt'],
	quart: ['qt'],
	gallon: ['gal'],
	pinch: [],
	little: [],
	dash: [],
	ounce: ['oz'],
	milliliter: ['ml'],
	liter: ['l'],
	inch: ['"', 'in'],
	millimeter: ['mm'],
	centimeter: ['cm'],
	whole: [],
	half: [],
	can: [],
	bottle: [],
	large: ['lg'],
	package: ['pkg'],
	pound: ['lb']
}

const unitLookup = {}
for (let k in units) {
	unitLookup[k] = k;
	for (let abbreviation of units[k]) {
		unitLookup[abbreviation] = k;
	}
}

const ingredientParser = ingredientString => {
	let ingredient = {}

	let words = ingredientString.trim().replace('.','').split(/\s+/)

	let min = true
	let max = false
	let unit = false
	let name = false
	
	for (let word of words ) {
		if (min) {
			if (word.match(/^\d/)) {
				ingredient.amount = ingredient.amount || {}
				ingredient.amount.min = (ingredient.amount.min || 0) + Fraction(word)
			} else if (amountConnectors.includes(word.toLowerCase())) {
				min = false
				max = true
				continue //move on because we're done with this word
			} else {
				min = false
				unit = true
			}
		}

		if (max) {
			if (word.match(/^\d/)) {
				ingredient.amount = ingredient.amount || {}
				ingredient.amount.max = (ingredient.amount.max || 0) + Fraction(word)
			} else {
				max = false
				unit = true
			}
		}

		if (unit) {
			let testWord = word.replace(/s\b/, '') //remove s from end of word (getting rid of plural)
			if (testWord !== 't' && testWord !== 'T') {
				testWord = testWord.toLowerCase()
			}
			if (testWord in unitLookup) {
				ingredient.unit = unitLookup[testWord]
			} else {
				unit = false
				name = true
			}
		}

		if (name) {
			word = word.toLowerCase()
			if (!noise.includes(word)) {
				ingredient.name = (ingredient.name || '') + ' ' + word
			}
		}
	}

	ingredient.name = ingredient.name.trim()

	if (ingredient.name.endsWith(':')) {
		ingredient.isSubHeading = true
	}

	return ingredient
}

export default ingredientParser