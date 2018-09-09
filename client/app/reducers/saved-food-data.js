const savedFoodData = (state = [], action) => {
   console.log('action.payload', action.payload)
   if (action.payload) {
      return [...state, ...action.payload];
   }
      // return [state, ...action.payload];
      return state;
}

export default savedFoodData;