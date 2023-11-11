import { FaPhoneAlt, FaUserTimes } from 'react-icons/fa';
import { ContactItem, ContactNumber, DeleteBtn } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';

import { selectContacts, selectFilter } from 'components/redux/selectors';
import { deleteContact } from 'components/redux/operations';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => (
        <ContactItem key={id}>
          <h3>{name}</h3>
          <ContactNumber>
            <p>
              <FaPhoneAlt /> {phone}
            </p>
            <DeleteBtn onClick={() => dispatch(deleteContact(id))}>
              Delete <FaUserTimes />
            </DeleteBtn>
          </ContactNumber>
        </ContactItem>
      ))}
    </ul>
  );
};
