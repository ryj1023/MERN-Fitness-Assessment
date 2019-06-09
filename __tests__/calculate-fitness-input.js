import calculateFitnessInput from '../client/app/calculations/calculate-fitness-input'

describe('calculate fitness input', () => {
    it('should return valid values', () => {
        expect(
            calculateFitnessInput({
                age: 26,
                heightInFeet: 8,
                currentWeight: 140,
                targetWeight: 150,
            })
        ).toEqual({
            calories: 2700,
            carbs: 450,
            fat: 15,
            protein: 150,
        })
    })
})
