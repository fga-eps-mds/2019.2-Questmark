import React, { Component } from 'react';
import '../styles/Header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <header className="mainHeader">
                Questmark
                <div className="options">
                    {this.props.ordernar === true ?
                    <select name="ordernar">
                    <option value="" selected>Ordenar por :</option>
                        <option value="alfabetica">Ordem Alfabética [A-Z]</option>
                        <option value="criacao">Data de criação</option>
                        <option value="edicao">Data de modificação</option>
                    </select>
                    :
                    <div/>
                    }
                    <p>Ajuda</p>
                    <p>Opções</p>
                    <p>Log Out</p>
                </div>
            </header>

        )
    }

}