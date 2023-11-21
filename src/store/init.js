export function saveToLocalStorage(stateStore) {
   try {
      const serializedState = JSON.stringify(stateStore);
      localStorage.setItem('state', serializedState);
   } catch (e) {
      console.log(e);
   }
}

export function loadFromLocalStorage() {
   try {
      if (localStorage.getItem('state')) {
         return {
            ...JSON.parse(localStorage.getItem('state') ?? '{}'),
            visibilityFilter: 'SHOW_COMPLETED'
         };
      }
   } catch (e) {
      console.log(e);
   }
}