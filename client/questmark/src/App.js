import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import FormCard from './components/FormCard';
import { Button } from '@material-ui/core';

export default class App extends Component {



  render() {
    const forms = [
      { name: 'Pesquisa de escolaridade' },
      { name: 'Usuários de redes sociais' },
      { name: 'Formulário 2' },
      { name: 'Formulário 3' },
      { name: 'Formulário 1' },
    ]
    return (
      <div>
        <Header></Header>
        <div className="mainContainer">

          {
            (forms === '' ? <div className="noForms"> Sem formulários cadastrados </div> :
              forms.map(item =>
                <FormCard title={item.name} />
              )
            )
          }
        </div>
        <div className="createForm">
          <Button variant={'contained'} size={'large'} color={"primary"}>Criar formulário</Button>
        </div>
      </div>
    );
  }

}
