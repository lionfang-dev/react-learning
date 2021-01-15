import React,{PureComponent} from 'react'; //PureComponent does the checking automatically of all props so it's not necessary to override shouldComponentUpdate
import Person from './Person/Person'


class Persons extends PureComponent{
    //Lifecycle methods *********
    // static getDerivedStateFromProps(props, state){
    //     console.log('[Persons.js] getDerivedStateFromProps')
        
    //     return state;
    // }

    

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate')
    //     //In this method we can set logic to check if we need to render this component
    //     return nextProps.persons!== this.props.persons; // if state is different then render
    //    // return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message:'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        console.log('[Persons.js] componentDidUpdate');
        console.log(this.props, prevProps)
        console.log(snapshot);
    }
    //************************* */

    render(){
        console.log('[Persons.js] rendering....')
        return  this.props.persons.map((person, index) => 
                {
                    return <Person name={person.name} 
                                age={person.age}
                                click={() => this.props.clicked(index)}
                                key={person.id}// needs to have a "key" prop to avoid React warning
                                onChange={(event) => this.props.changed(event, person.id)}/>
                })
           

    }
}
// const persons = props => props.persons.map((person, index) => {
//         return <Person name={person.name} 
//                       age={person.age}
    //                   click={() => props.clicked(index)}
    //                   key={person.id}// needs to have a "key" prop to avoid React warning
    //                   onChange={(event) => props.changed(event, person.id)}
    //                   />
    //   });


export default Persons;