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
	if (units.hasOwnProperty(k)) {
		unitLookup[k] = k;
		for (let abbreviation of units[k]) {
			unitLookup[abbreviation] = k;
		}
	}
}

export function toPrettyString(ingredient, scale) {
	if (!ingredient instanceof Object) {
		return 'invalid ingredient : not an object'
	}
	if (!scale instanceof Fraction) {
		return 'invalid scale : not instance of fraction'
	}

	let amount = '' //this.props.scale.mul(this.props.ingredient.amount)
	let pluralizer = ''
	if(ingredient.amount && ingredient.amount.min !== 0) {
		amount += scale.mul(ingredient.amount.min).toFraction(true)
		if (ingredient.amount.max) {
			amount += ' to ' + scale.mul(ingredient.amount.max).toFraction(true)
		}

		pluralizer = ingredient.amount.min > 1 || ingredient.amount.max > 1 ? 's' : ''
	}

	let prettyString = amount
	prettyString += ingredient.unit ? ' ' + ingredient.unit + pluralizer : ''
	prettyString += ' ' + ingredient.name

	return prettyString
}

const ingredientParser = ingredientString => {
	let ingredient = {}

	let words = ingredientString.trim().split(/\s+/)

	let min = true
	let max = false
	let unit = false
	let name = false
	
	for (let word of words ) {
		if (min) {
			if (word.match(/^\d/)) {
				ingredient.amount = ingredient.amount || {}
				ingredient.amount.min = (ingredient.amount.min || 0) + Fraction(word.replace('-', ' '))
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
				ingredient.amount.max = (ingredient.amount.max || 0) + Fraction(word.replace('-', ' '))
			} else {
				max = false
				unit = true
			}
		}

		if (unit) {
			unit = false
			name = true

			let testWord = word.replace(/s\b/, '') //remove s from end of word (getting rid of plural)
			testWord = testWord.replace(/\./g, '') //remove decimals (because people have to let us know they're abbreviating)
			if (testWord !== 't' && testWord !== 'T') {
				testWord = testWord.toLowerCase()
			}

			if (testWord in unitLookup) {
				ingredient.unit = unitLookup[testWord]
				continue
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