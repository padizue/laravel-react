import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let axios = require('axios');

import { EventEmitter } from 'events';
import Axios from 'axios';

let gEvent = new EventEmitter;

class AddGenre extends Component{

     constructor(props){
       super(props);

       this.state = {
          id:'',
          name:'',
          image:'',
          edit:false,
          label:'Add'
       };

       gEvent.on('LIST_ITEM',(data)=>{
           this.setState({
               id:data.id,
               name:data.name,
               image:data.image,
               edit:true,
               message:'',
               label:'Save'
           });
       });


     }

    previewFile(e){
        e.persist();
        console.log(e);
        // var preview = document.querySelector('img'); //selects the query named img
        let file    = e.target.files[0]; // document.querySelector('input[type=file]').files[0]; //sames as here
        let reader  = new FileReader();

        reader.onloadend=()=>{
            this.setState({
                image: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            // preview.src = "";
        }
    }


     captureInput(e){
        e.persist();
        // console.log(this);
        this.setState({
            name:e.target.value
        });
     }

     save(e){

       let old = this.state.label;

        this.setState({
            label:'Saving...'
        });

        if (this.state.edit){
        //    ()
        // Axios.post()
        Axios.post('/api/genre/' + this.state.id,{
                 name:this.state.name,
                 image:this.state.image
           }).then(res=>res.data)
           .then(res=>{
               this.setState({
                   message:res.message,
                   label:old
               });
               gEvent.emit('FETCH_LIST');
           });
        }else{ //create
            Axios.post('/api/genre',{
                  name:this.state.name,
                  image:this.state.image
            }).then(res=>res.data)
            .then(res=>{
                this.setState({
                    message:res.message,
                    label:old
                });
                gEvent.emit('FETCH_LIST');
            });

        }
     }


     render(){

        let rr = [];

        if (this.state.edit){
           rr.push((
              <span key="cancel">
                <input type="button" className="btn btn-danger" onClick={()=>this.setState({edit:false,
                name:'',
                image:'',
                label:'Add',
                message:''
                })} value="Cancel" />
              </span>
           ));
        }


         return (
            <div style={{
                border: '1px solid #bbb',
                padding: '11px',
                marginRight: '23px'
             }}>
             <div>{this.state.message}</div>
             <div>
                 <b>Add Genre</b>
             </div>
             <div>
                 <label>
                     Name: <br />
                     <input className="col-xs-6 form-control" onChange={(e)=>{this.captureInput(e)} } value={this.state.name} />
                     &nbsp;{this.state.name.length} {this.state.name.length > 0? ' Letters' : ''}
                 </label>
             </div>
             <div>
                 <label>
                     Image: <br />
                     <input type="file" style={{
    marginRight: '11px',
    width: '187px' }}
    className="col-xs-6 form-control" onChange={(e)=>{this.previewFile(e)} } />
                     <br />
                     <img style={{ width: '128px' }} src={this.state.image} />
                 </label>
             </div>
             <div>
                 <label>
                     <input type="button" onClick={(e)=>{this.save(e)}} className="col-xs-6 btn btn-success" value={this.state.label} />
                 </label>
                 {rr}
             </div>


            </div>
         );
     }

}

class GenreList extends Component{


    constructor(props){
      super(props);
      this.state = {
          list:[]
      };

      gEvent.on('FETCH_LIST',()=>{
        this.fetchList();
      });

      gEvent.emit('FETCH_LIST');

    }

    fetchList(){
       fetch('/api/genre')
       .then(res=>res.json())
       .then(res=>{
           this.setState({
               list:res.data
           });
       });
    }

    render(){

        let rr = [];
        this.state.list.forEach((ele)=>{
            rr.push(
                (<div key={ele.id} style={{ display: 'inline-block' , padding: '11px' }}>
                    {ele.name}<br />
                    <img style={{ width: '128px' }} src={ele.image} /><br />
                    <a href="#" onClick={(e)=>{ gEvent.emit('LIST_ITEM',ele)}}>Edit</a>
                </div>)
            );
        });


        return (

                 <div className="row">
                 <div>
                     <b>Genre List</b>

                 <div style={{ clear: 'both' }}></div>

                     {rr}
                 </div>
                 </div>


        );
    }
}



export default class CrudGenre extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center" style={{ width: '100%' }}>
                    <div className="col-xs-12" style={{ width: '88%' }}>
                        <div className="row">
                    <div className="col-xs-4" style={{  width: '31%'  }}>
<h4>
    Manage Genre
</h4>
<AddGenre />


                    </div>

                    <div className="col-xs-4" style={{  width: '52%'  }}>
                       <GenreList />
                    </div>

                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

// if (document.getElementById('example')) {
    // ReactDOM.render(<CrudGenre />, document.getElementById('example'));
// }
