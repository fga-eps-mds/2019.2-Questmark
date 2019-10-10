import React,{ Component } from 'react';
import '../styles/FormCard.css';
export default class FormCard extends Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="container">
                <p className="titulo">{this.props.title}</p>
                <div className="icons">
                   <img className="edit" src="https://image.flaticon.com/icons/svg/1159/1159876.svg" alt="Editar" />
                   <img className="share" src="https://image.flaticon.com/icons/svg/263/263130.svg" alt="Compartilhar" />
                   <img className="charts" src="https://image.flaticon.com/icons/svg/134/134644.svg" alt="Visualizar Respostas" />
                   <img className="delete" src="https://image.flaticon.com/icons/svg/1214/1214428.svg" alt="Deletar" />
                </div>
            </div>

        )
    }


}