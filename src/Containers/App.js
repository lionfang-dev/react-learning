import React, { Component } from 'react';
//import React, { useState } from 'react'; // for React hooks

//Regular import for css styles from App.css
//import './App.css';

//This is the way we import css classes after tweaking the config files  in the webpack config files.
import classes from './App.css';

//import Person from '../Components/Persons/Person/Person';
import Persons from '../Components/Persons/Persons';

import Cockpit from '../Components/Cockpit/Cockpit';

import withClass from '../Components/hoc/withClass';
import Auxiliary from '../Components/hoc/Auxiliary';
import AuthContext from '../context/auth-context';

//import Radium, {StyleRoot} from 'radium' // Radium is installed by opening a cmd windown (or terminal in VS Code [View/Terminal]) and entering "npm install --save Radium". This will install the Radium package so we can add extra inline styling or pseudo-selectors (ex. button:hover)
//import styled from 'styled-components';



//Note: for styled-components we must use CSS sintax, no "'"s and use dashes when needed (background-color instead of backgroundColor). For the hover add the "&".
//'Props' work because when we call the StyledButton component, we sent the props.
//THIS IS COMMENTED OUT BECAUSE WE ARE USING NOW CSS FILE
// const StyledButton = styled.button`
//       background-color : ${props => props.showPeople ? 'green': 'red'};
//       color: white;
//       font: inherit;
//       border: 1px solid black;
//       padding: 8px;
//       cursor: pointer;
//       &:hover {
//         background-color: ${props => props.showPeople ? 'lightgreen': 'salmon'};
//         color: black;
//       }
// `;


//Normal React
class App extends Component {
  //any change done to this state property will trigger React to re-draw the page
  // (only this state property. Any other property does not.)
  //Also, any changes on props (params) will cause re-drawing too
  state = {
    persons: [
      {id:'0',name: "Leo", age: 40},
      {id:'1',name: "Padme", age: 26},
      {id:'2',name: "Anakin", age: 33},
      {id:'3',name: "Ikki", age: 0.2}
    ],
    otherState: "Some other state",
    showPeople: true,
    showCockpit: true,
    changeCounter:0,
    authenticated: false
  }

  // not used anymore
  // switchNameHandler = (newName) =>  {
  //   console.log(newName);
  //   // DON'T do this: this.state.persons[0].name = "Leonardo";
  //   this.setState({
  //     persons: [
  //       {name: newName, age: 40},
  //       {name: "Padme", age: 26},
  //       {name: "Vader", age: 33},
  //       {name: "Ikki", age: 0.2}
  //     ]
  //   })
  // };

  deletePersonHandler = index =>
  {
    //We call the slice method to create a copy of persons in the state. We do this so we don't mutate the original data because it is considered to be bad practice, it can cause problems.
    const persons = this.state.persons.slice();// Slice method with no arguments simply creates a copy of the array so we don't mutate the original

    //Another option is to use the spread operator for creating a copy
    // const persons = [...this.state.persons];
    persons.splice(index,1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => 
  {
    const personIndex = this.state.persons.findIndex( p => {
        return p.id === id;
    });

    const person = {...this.state.persons[personIndex]}; // create copy so we dont mutate state directly
    person.name = event.target.value; // get the new value from the input
    const newPersons = [...this.state.persons]; // create copy of the state
    newPersons[personIndex] = person; // update the copy
    this.setState( (prevState, props) => {
      return {persons : newPersons, changeCounter: prevState.changeCounter + 1}; // update the state
    });

   // console.log(event.target.value);
    // this.setState({
    //   persons: [
    //     {name: "Leonardo", age: 40},
    //     {name: event.target.value, age: 26},
    //     {name: "Vader", age: 33},
    //     {name: "Ikki", age: 0.2}
    //   ]
    // })
  }

  tooglePeopleHandler = () =>
  {
    this.setState({
      showPeople: !this.state.showPeople
    })
  }

loginHandler = () =>{
  this.setState({authenticated: true});
}


  render() {
    // this Style is used for the regular JSX button 
    // const style = {
    //   backgroundColor : this.state.showPeople ? 'green': 'red',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid black',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: this.state.showPeople ? 'lightgreen':'salmon',
    //     color: 'black'
    //   }
    // };

    //Option 1: use a variable to render the content depending on the state
    let people = null;    
    


    if(this.state.showPeople)
    {
        people = <Persons persons={this.state.persons}
                     clicked={this.deletePersonHandler}
                     changed={this.nameChangedHandler}
                />
             
            /* {
              this.state.persons.map((person, index) => {
                return <Person name={person.name} 
                              age={person.age}
                              click={() => this.deletePersonHandler(index)}
                              key={person.id}// needs to have a "key" prop to avoid React warning
                              onChange={(event) => this.nameChangedHandler(event, person.id)}
                              />
              }) */
            

            /* <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
            <Person 
              name = {this.state.persons[1].name} 
              age ={this.state.persons[1].age}
              click = {() => this.switchNameHandler('Sunrider')} // Method reference in Components and using arrow functions for sending params
              onChange = {this.nameChangedHandler} //
              > My hobbies are saving people</Person>
            <Person name = {this.state.persons[2].name} age = {this.state.persons[2].age } >My hobbies are killing younglings</Person>
            <Person name={this.state.persons[3].name} age = {this.state.persons[3].age}/> */
        
    } 

   

    return (
     // (if using radium) <StyleRoot /*we need to wrap the whole app component in StyleRoot so we avoid a Radium plugin error when using "@media" in the Persons Component*/> 
        <Auxiliary>
            <button onClick={() =>{this.setState({showCockpit: !this.state.showCockpit})}}>Toggle Cockpit</button>
            <AuthContext.Provider 
               value= {{authenticated:this.state.authenticated,
                        login: this.
               }}>
              {this.state.showCockpit ?
              <Cockpit title={this.props.appTitle}
                      showPeople={this.state.showPeople}
                      personsLength={this.state.persons.length}   
                      clicked={this.tooglePeopleHandler}
                      login={this.loginHandler}
              /> : null
              } 
              {/*Option 1: use a variable to render content*/}  
              {people}
            </AuthContext.Provider>
            {/*Option 2: Use a ternary operator for rendering content*/}
            {  /*we use the ternary expression ("?") to decide if we display people or not depending on the state*/}
            {/* {this.state.showPeople ? 
              <div>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person 
                  name = {this.state.persons[1].name} 
                  age ={this.state.persons[1].age}
                  click = {() => this.switchNameHandler('Sunrider')} // Method reference in Components and using arrow functions for sending params
                  onChange = {this.nameChangedHandler} //
                  > My hobbies are saving people</Person>
                <Person name = {this.state.persons[2].name} age = {this.state.persons[2].age } >My hobbies are killing younglings</Person>
                <Person name={this.state.persons[3].name} age = {this.state.persons[3].age}/>
              </div> : null // the ": null" is the false part of the ternary expression
            }   */}

        </Auxiliary>
      // (if using Radium) </StyleRoot>
      );
      // return React.createElement('div',{className: 'App'},React.createElement('h1', null,'My first React App!!!'))
  }
}

//React Hooks  *************************
// const app = props => {
 
//   //useState is imported from React (line number 2), and it returns an array
//   //with exactly and always two elements. First element is the current state and second element is a function that allows modifying the state
//   const [personState, setPersonState] = useState({
//         persons: [
//           {name: "Leo", age: 40},
//           {name: "Padme", age: 26},
//           {name: "Anakin", age: 33}
//         ],
//         otherState: 'some other value'
//       });

//   const switchNameHandler = () =>  {
//         //console.log("was clicked");
//         // DON'T do this: this.state.persons[0].name = "Leonardo";
//         setPersonState({
//           persons: [
//             {name: "Leonardo", age: 40},
//             {name: "Padme", age: 26},
//             {name: "Vader", age: 33}
//           ]
//         })
//       };

//   return (
//     <div className="App">
//         <h1>My first React App</h1>
//         <p>It's working</p>
//         <button onClick={switchNameHandler}>Switch Name</button>
//         <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
//         <Person name = {personState.persons[1].name} age ={personState.persons[1].age}> My hobbies are saving people</Person>
//         <Person name = {personState.persons[2].name} age = {personState.persons[2].age}>My hobbies are killing younglings</Person>
//     </div>
//     );}

//******************************************* */

export default withClass(App,classes.App);
//export default Radium(App); // need to wrap the component using Radium so we can have extra styling options
//export default app; // for React hooks we used const "app"
