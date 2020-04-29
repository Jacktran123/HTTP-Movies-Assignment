import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {useParams, useHistory} from 'react-router-dom';

const FormUpdate=()=>{
    const [movieList,setMovieList]=useState([]);
    const params= useParams();
    const history=useHistory();
    const movie= movieList.filter(movie=> movie.id === parseInt(params.id))
    

    useEffect(()=>{
        axios
        .get("http://localhost:5000/api/movies")
        .then(res=>setMovieList(res.data))
        .catch(err=> console.error(err))}, [])
        
    const [updateMovieList,setUpdateMovieList]= useState({ 
        id: movie[0] ? movie[0].id : 0,
        title:  movie[0] ? movie[0].title : '',
        director:  movie[0] ? movie[0].director : '',
        metascore: movie[0] ? movie[0].metascore : 300,
        stars:  movie[0] ? movie[0].stars : [],
    }); 
    

    useEffect(()=>
         setUpdateMovieList({
            id: movie[0] ? movie[0].id : 0,
            title:  movie[0] ? movie[0].title : '',
            director:  movie[0] ? movie[0].director : '',
            metascore: movie[0] ? movie[0].metascore : 300,
            stars:  movie[0] ? movie[0].stars : [],})
    , [movieList]);


    const submitForm=(e)=>{
        e.preventDefault();
        console.log(updateMovieList);
        axios.put(`http://localhost:5000/api/movies/${params.id}`,updateMovieList)
        .then(res=> console.log(res));
        history.push('/');
        
        
    }
    return (
    
        <Form className='form' onSubmit={submitForm} >
            <FormGroup>
                <Label>id:</Label>
                <Input type='number' defaultValue={movie.map(each=>each.id)} onChange={(e)=>setUpdateMovieList({...updateMovieList,id: parseInt(e.target.value) })} ></Input>
            </FormGroup>  
            <FormGroup>
                <Label>Title: </Label>
                <Input  type='text'  defaultValue={movie.map(each=>each.title)}  onChange={(e)=>setUpdateMovieList({...updateMovieList,title: e.target.value })} ></Input>
            </FormGroup>
            <FormGroup>
                <Label>director:</Label>
                <Input  type='text'  defaultValue={movie.map(each=>each.director)} onChange={(e)=>setUpdateMovieList({...updateMovieList,director: e.target.value })}></Input>
            </FormGroup>
            <FormGroup>
                <Label>metascore:</Label>
                <Input  type='number' defaultValue={movie.map(each=>each.metascore)} onChange={(e)=>setUpdateMovieList({...updateMovieList,metascore: parseInt(e.target.value) })}></Input>
            </FormGroup>
            <FormGroup>
                <Label>stars:</Label>
                <Input  type='text' defaultValue={movie.map(each=>each.stars)} onChange={(e)=>setUpdateMovieList({...updateMovieList,stars: [e.target.value]  })}></Input>
            </FormGroup>
            <Button color='primary' type='submit'> Submit </Button>
            <Button > Clear</Button>
        </Form> 
    );
}

export default FormUpdate;