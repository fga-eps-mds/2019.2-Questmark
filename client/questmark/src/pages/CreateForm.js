import React, { Component } from 'react';
import Header from '../components/Header';
import './CreateForm.css';


export default class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (

            <div>
                <Header />
                <div className="formContainer">
                    <form id="form_registro">
                        <div>
                            <label for='name_form'>Nome do formulário :</label>

                            <input type="text" id="name_quest" name="name_quest" placeholder=" Nome do Questionário"
                                class="textBoxName" />
                        </div>
                        <div className="formsField">
                            <div className="inputMD">
                                <textarea id="notes" name="copy_markdown" placeholder="Formulário em Markdown" class="textBox"></textarea>
                            </div>
                            <div >
                                <div class="textBox" id="notes-preview"></div>
                            </div>
                            <div className="outputHTML">
                                <textarea type="text" id="copy_html" name="copy_html" class="form-control" placeholder="Saída em HTML">
                                </textarea>
                            </div>
                        </div>


                    </form>

                </div>
            </div>

        )
    }
}