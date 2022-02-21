// DOM Selectors
const formEl = document.querySelector('#user_data_form');
const nameInputEl = document.querySelector('#full_name_input');
const emailInputEl = document.querySelector('#email_input');
const ageInputEl = document.querySelector('#age_input');
const resetButtonEl = document.querySelector('#form-reset-button');
const submitButtonEl = document.querySelector('#form-submit-button');
const nameOutputEl = document.querySelector('#card_full-name-text');
const emailOutputEl = document.querySelector('#card_email-text');
const ageOutputEl = document.querySelector('#card_age-text');
const loginOutputEl = document.querySelector('#card_last-login-text');

// REDUX Initialize the Store
const initialState = {
  fullName: '',
  email: '',
  age: null,
  lastLogin: null,
};
const store = Redux.createStore(reducer, initialState);

// REDUX Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SUBMIT':
      return {
        ...state,
        ...action.payload,
      };
      break;
    case 'RESET':
      return initialState;
      break;
    default:
      return state;
      break;
  }
}

// REDUX Actions
function newSubmission(newValues) {
  store.dispatch({
    type: 'SUBMIT',
    payload: newValues,
  });
}

// REDUX Subscribers
store.subscribe(render);

// Callbacks and functions
function render() {
  const currentState = store.getState();
  console.log(currentState);
  const { fullName, email, age, lastLogin } = currentState;
  nameOutputEl.innerHTML = fullName;
  emailOutputEl.innerHTML = email;
  ageOutputEl.innerHTML = age;
  loginOutputEl.innerHTML = lastLogin;
}

function submitForm() {
  const values = {
    fullName: nameInputEl.value,
    email: emailInputEl.value,
    age: ageInputEl.value,
    lastLogin: getDate(),
  };
  newSubmission(values);
}

function resetForm() {
  store.dispatch({type: 'RESET'});
}

function getDate() {
  const now = new Date();
  const formattedNow = now.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
  return formattedNow;
}

// DOM Event Listeners
submitButtonEl.addEventListener('click', (e)=> {
  e.preventDefault();
  submitForm();
});

resetButtonEl.addEventListener('click', (e)=> {
  e.preventDefault();
  resetForm();
});

/*
  REDUX STATE MANAGEMENT
  A. Create Initial State
    - First, initialize your state. This can be an array or JS object.
  B. Create a Reducer
    - Second, create a reducer function. It is a plain JS function but traditionally takes in 2 arguments:
      (1) - The current state
      (2) - An action
    - In the reducer, create a switch statement where we evaluate the value of (action.type)
    - For each possible value of action.type (these are strings), return what the next state will be from the switch statement
    - You also need a default case which should return the original state
  C. Initialize the Redux Store
    - Next, bring in the createStore() method from Redux
    - In createStore() pass in (1) the reducer, and (2) the initial state you created as arguments
    - Initialize the store to a variable, traditionally called store
  D. Dispatch Actions to Store
    - These are callbacks to some event in your app- often a user event- which dispatches an action to your reducer via the dispatch() method available on your initialized store
  E. (Optional) Create Subscriber
    - Your initialized store has a subscribe() method available which can be used to subscribe to changes in the store
*/