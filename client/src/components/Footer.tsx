// Footer.tsx
// Author: Jun Beom

import React from 'react';
import '../style/components/footer.css';

/**
 * Simple footer component displaying copyright information.
 * 
 * @remarks
 * This component renders a footer with copyright text, including the year and author names. It is designed to be used across the application to maintain a consistent footer.
 */
const Footer: React.FC = () => {
    return (
        <div>
            <footer>
                <p>&copy; 2024 Jun Beom, Brandon Czech, Wonjoon Hwang</p>
            </footer>
        </div>
    );
};

export default Footer;
