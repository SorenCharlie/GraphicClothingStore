import { useState } from 'react'
import reactLogo from './assets/react.svg'
import GraphicClothingShop from './pages/clothing';
import './App.css'
import React from 'react';
import ImageSelector from './pages/graphicImages';
import ClothingSelector from './pages/clothing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { themeOptions } from './themes/ThemeOptions';
import { ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={themeOptions}>
      <div className="App">
        <div>
          <Outlet />
          {/* <ClothingSelector /> */}
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              About Us
            </AccordionSummary>
            <AccordionDetails>
              <ClothingSelector />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              How it works
            </AccordionSummary>
            <AccordionDetails>
              <ImageSelector />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Checkout
            </AccordionSummary>
            <AccordionDetails>
              <h2>Pick your Clothing!</h2>
            </AccordionDetails>
            <Outlet />
          </Accordion> */}
        </div>
      </div>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App