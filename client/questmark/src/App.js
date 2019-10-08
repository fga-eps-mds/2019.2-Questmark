import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import FormCard from './components/FormCard';

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
            forms.map(item => 
              <FormCard title={item.name} />
            )

          }
        </div>

      </div>
    );
  }

}
