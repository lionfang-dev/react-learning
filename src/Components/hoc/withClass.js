import React from 'react';

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            {/* we used the spread operator to passed down the props */}
            <WrappedComponent {...props}/> 
        </div>
    );
};

export default withClass;