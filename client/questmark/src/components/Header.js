import React, { Component } from 'react';
import './Header.css';

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
                    <select name="ordernar">
                    <option value="" selected>Ordenar por :</option>
                        <option value="alfabetica">Ordem Alfabética [A-Z]</option>
                        <option value="criacao">Data de criação</option>
                        <option value="edicao">Data de modificação</option>
                    </select>
                    <p>Ajuda</p>
                    <p>Opções</p>
                    <p>Log Out</p>
                </div>
            </header>

        )
    }

}