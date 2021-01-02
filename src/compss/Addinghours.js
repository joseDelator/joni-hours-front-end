import React, { Fragment, Component } from 'react'
import './css/addinghours.css'
export class Addinghours extends Component {
    state={
        time:"",
        name:"",
        date:"", 

        output: [],
        show:false 
      };
      onChange1= (e) => {
        
        this.setState( { [e.target.name]: e.target.value});
     };
    
      onSubmitForm = async e => {
        
       e.preventDefault();
        try {
          
         
          const response = await fetch("https://jonis-google-sheet.herokuapp.com/addhours/"+this.state.name+'/'+this.state.time.toString()+'/'+this.state.date.toString())
          
          const jsonData = await response.json();
          this.setState({output: jsonData})
          this.setState({time:"", date:"",  name:"", show: true})
          console.log(jsonData)

        } catch (err) {
          console.error(err.message);
        }
      };
      
    render(){
       var output= this.state.output
       const conditional= ()=> {
           //if(this.state.show){
          return <h2>{output}</h2>
         //  }
       }
        
              

      


      return (
          <Fragment>
             {conditional()}
             <div className="container">
              <form onSubmit={this.onSubmitForm}>
                <input 
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange1}
                required
               />
                <input type="date"
                placeholder="hours"
                name="date"
                value={this.state.date}
                onChange={this.onChange1}
                required
               />
                
                <input 
                  type="number"
                  min ="1"
                  max="20"
                  name="time"
                 
                  placeholder="hours"
                  value={this.state.time}
                  onChange={this.onChange1}
                  required/>
                  
                   <button >add</button>    
              </form>
              
              </div>
        </Fragment>
    
      
      )
  }
    
}

export default Addinghours

