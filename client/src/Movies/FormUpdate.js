import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {useParams} from 'react-router-dom';

const FormUpdate=()=>{
    const [movieList,setMovieList]=useState([]);

    useEffect(()=>{
        axios
        .get("http://localhost:5000/api/movies")
        .then(res=>setMovieList(res.data))
        .catch(err=> console.error(err))}, [])

    
    const params= useParams();
    const movie= movieList.filter(movie=> movie.id === parseInt(params.id))
    console.log(params.id);
    console.log(movie);
    console.log(movieList);
    

    return (
        <Form className='form'>
            <FormGroup>
                <Label>id:</Label>
                <Input type='number'></Input>
            </FormGroup>
            <FormGroup>
                <Label>Title: </Label>
                <Input  type='text'   ></Input>
            </FormGroup>
            <FormGroup>
                <Label>director:</Label>
                <Input  type='text'  ></Input>
            </FormGroup>
            <FormGroup>
                <Label>metascore:</Label>
                <Input  type='number' ></Input>
            </FormGroup>
            <FormGroup>
                <Label>stars:</Label>
                <Input  type='text' ></Input>
            </FormGroup>
            <Button color='primary'> Submit </Button>
            <Button > Clear</Button>
        </Form>
    );
}

export default FormUpdate;