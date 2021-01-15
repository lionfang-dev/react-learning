import React,{useEffect, useRef} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null); //useRef imported as a react hook

    //This executes everytime the component gets re-rendered
    //UseEffect has two params: 1st: arrow function to execute, 2nd components which changes will trigger the execution of first parameter.
    useEffect(() => {
            console.log('[Cockpit.js] useEffect');
            // const timer = setTimeout(() =>{
            //     alert('Saved to Cloud!');
            // },1000);
            toggleBtnRef.current.click(); // calls the click event using Refs
            return () =>{
             //   clearTimeout(timer); //removes the timer when component is unmounted
                console.log('[Cockpit.js] useEffect return');
                
            } // if we return this function, it will run before the main eseEffect function but after the first render cycle
        }, []); // only executes when props.persons change if we put [props.persons] and if props.person is sent as a param. If we use [] as a second argument then useEffect will run only one time

    useEffect(() => {
        console.log('[[Cockpit.js] 2nd useEffect');
        return () =>{
            console.log('[[Cockpit.js] 2nd useEffect return');
            
        }
    });


    //Dinamically adding classes
    const assignedClasses = [];
    let btnClasses = '';
    if(props.showPeople)
        btnClasses = classes.Red;

    if(props.personsLength <= 2)
    assignedClasses.push(classes.red);
    
    if(props.personsLength <= 1)
    assignedClasses.push(classes.bold);

    

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')} /* We use join to create a string*/>It's working</p> 
        
            {/* Regular JSX Button */}
            {/* sending params using bind. THIS IS THE PREFERRED WAY rather than an arrow function*/}
            {/* <button style={style}
            // onClick={this.switchNameHandler.bind(this,'Leonardo')} >Switch Name</button> 
            //shor or display people
            onClick={this.tooglePeopleHandler}>            
            { // we change the text of the button depending on the state
                this.state.showPeople ? "Hide People" : "Show People" 
            }
            </button>   */}
            

            {/* Button using Styled-components */}
            <button ref={toggleBtnRef} className={btnClasses}
            // onClick={this.switchNameHandler.bind(this,'Leonardo')} /* sending params using bind. THIS IS THE PREFERRED WAY rather than an arrow function*/>Switch Name</button> 
            //shor or display people
            onClick={props.clicked}>            
            { // we change the text of the button depending on the state
                props.showPeople ? "Hide People" : "Show People" 
            }
            </button> 
            <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer>

        </div>

    );
};

export default React.memo(cockpit); //React.memo checks if the component changed, if so then the component re-renders