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
     const serializedState = localStorage.getItem('state');
     if (serializedState === null) return undefined;
     let state = JSON.parse(serializedState);
     delete state.visibilityFilter; // Add this line
     return state;
   } catch(e) {
     console.warn(e);
     return undefined;
   }
 }

// export function loadFromLocalStorage() {
//    try {
//       if (localStorage.getItem('state')) {
//          return {
//             ...JSON.parse(localStorage.getItem('state') ?? '{}'),
//             visibilityFilter: 'SHOW_COMPLETED'
//          };
//       }
//    } catch (e) {
//       console.log(e);
//    }
// }