import { useState } from 'react';
import './contactForm.css';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert('Datos incompletos. Por favor, completa todos los campos');
      return;
    }

    setLoading(true);

    // Crear un FormData para enviar los datos correctamente
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('message', form.message);

    const resp = await fetch(
      'https://formsubmit.co/ajax/michaelvega46@gmail.com',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (resp.ok) {
      setLoading(false);
      setResponse(true);
      setTimeout(() => setResponse(false), 4000);
      handleReset();
    } else {
      alert('Error al enviar el mensaje, intenta de nuevo...');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  return (
    <>
      <form className='contact__form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChange}
          value={form.name}
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={form.email}
        />
        <textarea
          name='message'
          placeholder='Comments'
          rows={7}
          onChange={handleChange}
          value={form.message}
        ></textarea>
        <input type='submit' value='Enviar' />
      </form>
      {loading && <img src='./spinning-circles.svg' className='loader' />}
      {response && (
        <p className='response'>
          Gracias por ponerte en contacto, pronto te responderé!!
        </p>
      )}
    </>
  );
};

export default ContactForm;
