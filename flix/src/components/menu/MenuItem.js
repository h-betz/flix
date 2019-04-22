import React from 'react';

const MenuItem = ({choice, onMenuItemSelect}) => {
    return (
        <a className="item" href="" onClick={() => onMenuItemSelect(choice)}>
            <h1>{choice.title}</h1>
        </a>
    );
};

export default MenuItem;