/*
    Protein: 4 calories per gram
    Carbs: 4 calories per grams
    Fats: 9 calories per gram
*/

export const getMacros = (dietType, totalCalories) => {
    switch (dietType) {
        case 'zone':
            return {
                protein: (totalCalories * 0.3) / 4,
                carbs: (totalCalories * 0.4) / 4,
                fats: (totalCalories * 0.3) / 9,
            }
        case 'atkins':
            return {
                protein: (totalCalories * 0.22) / 4,
                carbs: (totalCalories * 0.32) / 4,
                fats: (totalCalories * 0.46) / 9,
            }
        case 'ketogenic':
            return {
                protein: (totalCalories * 0.15) / 4,
                carbs: (totalCalories * 0.05) / 4,
                fats: (totalCalories * 0.8) / 9,
            }
        case 'mediterranean':
            return {
                protein: (totalCalories * 0.2) / 4,
                carbs: (totalCalories * 0.4) / 4,
                fats: (totalCalories * 0.4) / 9,
            }
        case 'default':
            return {
                protein: (totalCalories * 0.3) / 4,
                carbs: (totalCalories * 0.5) / 4,
                fats: (totalCalories * 0.2) / 9,
            }
        default:
            return {
                protein: (totalCalories * 0.3) / 4,
                carbs: (totalCalories * 0.5) / 4,
                fats: (totalCalories * 0.2) / 9,
            }
    }
}
