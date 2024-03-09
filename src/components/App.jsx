import React from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.scss';

export class App extends React.Component {
    state = {
        contacts: [],
        name: '',
    };

    // ================== LOGIC
    handlerInput = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        const contact = {
            id: nanoid(),
            name: this.state.name,
        };

        console.log(contact);

        this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
        }));

        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
        });
    };
    // ================== /LOGIC

    render() {
        const { contacts, name } = this.state;

        return (
            <div className={css.container}>
                <h1 className={css.title}>Phonebook</h1>
                <div className={css['form-wrapper']}>
                    <form
                        onSubmit={this.handleSubmit}
                        name="contact-form"
                        className={css.form}
                    >
                        <div className={css['form-label-wrapper']}>
                            <input
                                onChange={this.handlerInput}
                                value={name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder=" "
                                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                                required
                                className={css["form-input"]}
                            />
                            <label htmlFor="name" className={css["form-label"]}>Name</label>
                        </div>
                        <button type="submit" className={css["form-button"]}>Add contact</button>
                    </form>
                </div>
                <h2 className={css.title}>Contacts</h2>
                <ul className={css.list}>
                    {contacts.map(contact => {
                        return (
                            <li
                                key={contact.id}
                                className={css["list-item"]}
                            >
                                <p className={css.paragraph}>{contact.name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
