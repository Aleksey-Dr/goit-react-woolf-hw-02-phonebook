import ContactListItem from 'components/ContactList/ContactListItem';

import css from './ContactList.module.scss';

const ContactList = ({ contacts }) => {
    return (
        <ul className={css.list}>
            {contacts.map(contact => {
                return (
                    <ContactListItem key={contact.id} contact={contact} />
                );
            })}
        </ul>
    );
};

export default ContactList;
