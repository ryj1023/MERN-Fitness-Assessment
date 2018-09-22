const savedFoodData = (state = [], action) => {
   if (action.payload) {
      return [...state, ...action.payload];
   }
      // return [state, ...action.payload];
      return state;
}

export default savedFoodData;