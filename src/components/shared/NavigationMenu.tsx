import {Link} from 'react-router-dom'
const NavigationMenu = () => {
    return (
        <div className={'flex flex-row gap-2'}>
            <Link to={'/'} >Home</Link>
            <Link to={'/users'} >Users</Link>
            <Link to={'/books'} >Books</Link>
        </div>
    );
};

export default NavigationMenu;