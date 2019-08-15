import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// import { alert, buttons, jumbotron , card , dropdown} from 'bootstrap-css'
import { EventEmitter } from 'events';

let gEvent = new EventEmitter;


class Genre extends React.Component{

   constructor(props){
     super(props);
     this.state = {
        list:[]
     };

     fetch('/api/genre').then(res=>res.json())
     .then(res=>{
       this.setState({
         list:res.data
       });
      //  r = res.data;
     });

    }

    loadMovies(e){
      e.persist();
      console.log(e.target.value);
       gEvent.emit('GENRE_SELECTED',e.target.value);
    }
  
   render(){
  
     return (
       <div>
       <select onChange={this.loadMovies} className="form-control">
         <option value="">-- Select Genre --</option>
       { this.state.list.map((el)=>{
         return (<option key={el.id} value={el.id}>{el.name}</option>);
       }) }
       </select>
       </div>
     );
   }

}

class Movie extends React.Component{
  
  constructor(props){
    super(props);
    
    this.state = {
      list:[]
    };

    gEvent.on('GENRE_SELECTED',(id)=>{
        // alert('Triggered');
       gEvent.emit('RESET_DETAIL'); 
        console.log(id);
        fetch('/api/genre/' + id + '/movies')
        .then(res=>res.json())
        .then(res=>{
          this.setState({
            list:res.data
          });
        });
    });
  }

  detailSelected(data){
    // e.preventDefault();
    // console.log(data);
    gEvent.emit('MOVIE_DETAIL',data);
  }


  render(){
    return (
      <div className="row">
        {this.state.list.map((ele)=>{
          return (
            <div className="col-sm-6" key={ele.id}>
              {ele.name}<br />
              <img style={{height: '100px'}} src={ele.image} /><br />
              <a onClick={()=>{this.detailSelected(ele)}} className="btn btn-default" href="#">Detail</a>
            </div>
          );
        })}
      </div>
    );
  }



}

class MovieDetail extends React.Component{


  constructor(props){
     super(props);
     this.state = {
       data:null
     };

     gEvent.on('MOVIE_DETAIL',(data)=>{
       this.setState({
         data:data
       });
     });

     gEvent.on('RESET_DETAIL',()=>{
       this.setState({
         data:null 
       });
     });
  }
  
  render(){
    let rr = [];

    if (this.state.data == null){
      rr.push('Please select a movie.');
    }else{
      rr.push(
        <div key="0">
          
          <div>
            {this.state.data.name}
          </div>

          <div>
            <img style={{height: '100px'}} src={this.state.data.image} />
            <br />
            <b>Detail:</b><br />
            <p>{this.state.data.description}</p>
          </div>

        </div>
      );
    }



    return (
        
       <div>
        <b>Detail</b><br />
        <div>{rr}</div>
       </div>

    );
  }

}

function MovieList() {
  return (
       
<div className="container">
  <div className="row">
    <div className="col-sm-4 offset-sm-2 cont" >
      <h3>Movie - Genre - Selector</h3>
      <div>
        <Genre />
        <Movie />
      </div>
      {/* <p>Lorem ipsum dolor..</p> */}
    </div>

    <div className="col-sm-4 cont cont2" >
       <MovieDetail />
    </div>

  </div>
</div>

    );
}

export default MovieList;
