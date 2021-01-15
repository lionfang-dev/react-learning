import React from 'react';
import PropTypes from 'prop-types';
//import classes from './Person.css';
//import styled from 'styled-components'; // Styled-components is installed by running "npm install --save styled-components" on the project
//import Radium from 'radium' // to use Radium
import Auxiliary from '../../hoc/Auxiliary';
import WithClass from '../../hoc/withClass';
import classes from './Person.css'
import AuthContext from '../../../context/auth-context';

//styled-components methods return React components when NOT using CSS modules
// const StyledDiv = styled.div` 
//             width: 60%;
//             margin: 16px auto;
//             border: 1px solid #eeeeee;
//             box-shadow: 0 2px 3px #cccccc;
//             padding: 16px;
//             text-align: center;

//             @media (min-width:500px){
//                 width: 450px;
//             }
// `;

// class Person extends Component{
//     render(){
//         return (
            //Regular JSX
            // <div className="Person" /* Person.css */ 
            //      style={style} >
            //         <p onClick={props.click}>I'm {props.name}. I'm {props.age} years old.</p>
            //         <Children children = {props.children}/>
            //         <input type="text" onChange={props.onChange}  /* two-way binding */ defaultValue ={props.name} />
            // </div>
    
            //Using styled-components and CSS Modules
//             <div className={classes.Person}>
//                 <p onClick={this.props.click}>I'm {this.props.name}. I'm {this.props.age} years old.</p>
//                 <Children children = {this.props.children}/>
//                 <input type="text" onChange={this.props.onChange}  /* two-way binding */ defaultValue ={this.props.name} />
//             </div>
//         )
//     }
// }

//This function-based component can be called from a Component like:
//import Person from './Person/Person';
//<Person name= "Leo".... />
const person = (props) => {
   // This style is used for the regular JSX part 
    // const style ={
    //     '@media (min-width : 500px)': { // this sets a minimum width 
    //         width: '450px'
    //     }
    // }

    return (
        //Regular JSX
        // <div className="Person" /* Person.css */ 
        //      style={style} >
        //         <p onClick={props.click}>I'm {props.name}. I'm {props.age} years old.</p>
        //         <Children children = {props.children}/>
        //         <input type="text" onChange={props.onChange}  /* two-way binding */ defaultValue ={props.name} />
        // </div>

        //Using styled-components and CSS Modules
        //<div className={classes.Person}>
        <Auxiliary> 
            <AuthContext.Consumer>
                { (context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
            </AuthContext.Consumer>
            <p onClick={props.click}>I'm {props.name}. I'm {props.age} years old.</p>
            <Children children = {props.children}/>
            <input 
                type="text"
                onChange={props.onChange}  /* two-way binding */ 
                defaultValue ={props.name} />
         </Auxiliary> 
       // </div>
    );
}

person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    onChange: PropTypes.func
};

const Children = (props) =>
{
    let output = null;
    if(props.children !== undefined)
        output = <p>{props.children}</p>;

    return output;
}

//this allows the use of person in other js files by importing:
//import Person from './Person/Person';
export default WithClass(person,classes.Person);
//export default Radium(person); //If using Radium we have to Wrap the export