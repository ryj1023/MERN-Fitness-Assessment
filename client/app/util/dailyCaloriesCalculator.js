const getBMR = (gender, weightInPounds, heightInInches, age) => {
    console.log('gender', gender)
    if (gender === 'man') {
        return 4.536 * weightInPounds + 15.88 * heightInInches - 5 * age + 5
    }
    return 4.536 * weightInPounds + 15.88 * heightInInches - 4.7 * age - 161
}

export const dailyCaloriesCalculator = ({
    age,
    targetWeight,
    heightInFeet,
    heightInInches,
    gender,
    activityLevel,
}) => {
    // https://www.thecalculatorsite.com/articles/health/bmr-formula.php
    const totalHeightInInches = heightInFeet * 12 + heightInInches
    const BMR = getBMR(gender, targetWeight, totalHeightInInches, age)
    switch (activityLevel) {
        case 'sedentary':
            return Number(BMR * 1.2).toFixed()
        case 'moderate':
            return Number(BMR * 1.55).toFixed()
        case 'heavy':
            return Number(BMR * 1.725).toFixed()
    }
}
