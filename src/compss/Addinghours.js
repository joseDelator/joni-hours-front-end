import React, { Fragment, Component } from 'react'
import './css/addinghours.css'
export class Addinghours extends Component {
    state={
        time:"",
        name:"",
        date: this.ToDate(), 
        start: "12:00",
        end: "12:00",

        output: [],
        show:false 
      };
     
      onChange1= (e) => {
        
        this.setState( { [e.target.name]: e.target.value});
     };
    
      onSubmitForm = async e => {
        
       e.preventDefault();
        try {
          
         
          const response =  await fetch("https://jonis-google-sheet.herokuapp.com/addhours/"+this.state.name+'/'+this.state.date.toString()+"/"+this.state.start.toString()+"/"+this.state.end.toString())
          
          const jsonData =  await response.json();
          this.setState({output: jsonData})
          this.setState({time:"",time:"",  start:"", end:"",name:"", show: true})
          console.log(jsonData)
          
        } catch (err) {
          console.error(err.message);
        }
      };
      
      ToDate () {
        
      
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
      return today
        
          
          
        } 
    render(){
      
       const conditional= ()=> {
           if(this.state.show){
          return <h2>Time has Been Added</h2>
         }
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
               <h3>Date/dia</h3>
                <input type="date"
                placeholder="hours"
                name="date"
                value={this.state.date}
                onChange={this.onChange1}
                required
               />
                
                <h3>start hour</h3>
                   <input type="time"
                    value={this.state.start}
                    onChange={this.onChange1}
                    name="start"
                    placeholder="Start"
                    required/>
                  <h3>Endhour</h3>
                  <input type="time"
                    value={this.state.end}
                    onChange={this.onChange1}
                    name="end"
                    placeholder="End"
                    required/>
                  
                   <button>ADD</button>    
              </form>
              
              </div>
        </Fragment>
    
      
      )
  }
    
}

export default Addinghours

