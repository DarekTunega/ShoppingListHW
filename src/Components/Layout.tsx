import { Link } from 'react-router-dom';
import { useUser } from '../Providers/UserProvider';

const Layout: React.FC = () => {
    const userContext = useUser();

    return (
        <nav className='bg-gray-900 text-white p-4 flex justify-between'>
            <div>
                <Link to='/' className='text-white px-3 py-2 rounded-md text-sm font-medium'>
                    Main Page
                </Link>
            </div>
            <div>
                {userContext?.user ? (
                    <span className='pr-4'>{userContext.user.name}</span>
                ) : (
                    <span>No User</span>
                )}
            </div>
        </nav>
    );
};

export default Layout;
