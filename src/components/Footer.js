import React from 'react';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <Container className='footer-wrapper'>
            <a href='https://davidcjwest.tk/' 
                className='author'  
                target='_blank' 
                rel='noopener noreferrer'
                title='David van der Westhuizen Portfolio' >
                &copy; 2020 David van der Westhuizen
            </a>
            <div>
                Icons made by 
                <a href='https://www.flaticon.com/authors/freepik' title='Freepik' target='_blank' rel='noopener noreferrer'> Freepik</a> and 
                <a href='https://www.flaticon.com/authors/dinosoftlabs' title='DinosoftLabs' target='_blank' rel='noopener noreferrer'> DinosoftLabs </a> 
                from <a href='https://www.flaticon.com/' title='Flaticon' target='_blank' rel='noopener noreferrer'> www.flaticon.com</a>
            </div>
        </Container>
    );
}

export default Footer;
