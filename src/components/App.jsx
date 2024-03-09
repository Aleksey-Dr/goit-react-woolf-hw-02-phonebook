import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.scss';

export class App extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
          ],
        filter: '',
        name: '',
        number: '',
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
            number: this.state.number,
        };

        this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
        }));

        this.reset();
    };

    handlerFilter = () => {

    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };
    // ================== /LOGIC

    render() {
        const { contacts, filter, name, number } = this.state;

        // ==================== FILTER
        const normalizedFilter = filter.toLowerCase();
        const filterContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
        // ==================== /FILTER

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
                                id="name"
                                type="text"
                                name="name"
                                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                                required
                                placeholder=" "
                                className={css['form-input']}
                            />
                            <label htmlFor="name" className={css['form-label']}>
                                Name
                            </label>
                        </div>
                        <div className={css['form-label-wrapper']}>
                            <input
                                onChange={this.handlerInput}
                                value={number}
                                id="phone"
                                type="tel"
                                name="number"
                                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                                required
                                placeholder=" "
                                className={css['form-input']}
                            />
                            <label
                                htmlFor="phone"
                                className={css['form-label']}
                            >
                                Number
                            </label>
                        </div>
                        <button type="submit" className={css['form-button']}>
                            Add contact
                        </button>
                    </form>
                </div>
                <h2 className={css.title}>Contacts</h2>
                <label className={css['filter-label']}>
                    <span>Find contacts by name</span>
                    <input
                        onChange={this.handlerInput}
                        type="text"
                        name="filter"
                        className={css['filter-input']} />
                </label>
                <ul className={css.list}>
                    {filterContacts.map(contact => {
                        return (
                            <li key={contact.id} className={css['list-item']}>
                                <span>{contact.name}:</span>
                                <span className={css['phone']}>
                                    {contact.number}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };
};
