import { Link } from 'react-router-dom';
import { useUser } from '../Providers/UserProvider';

const HomePage: React.FC = () => {
    const userContext = useUser();

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Darek Tunega (owner)' });
    };

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Timotej Tunega (guest)' });
    };

    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-4xl font-bold text-indigo-600 mb-4 text-center'>
                Shopping Lists
            </h1>

            <Link
                to='/listDetail/1'
                className='text-xl text-indigo-600 hover:text-indigo-800 transition-colors block mt-4'
            >
                Example List
            </Link>

            <div className="flex justify-center space-x-4 mt-4">
                <button className='bg-indigo-600 rounded p-2 text-white' onClick={loginAsOwner}>
                    Login - Owner
                </button>
                <button className='bg-indigo-400 rounded p-2 text-white' onClick={loginAsMember}>
                    Login - Member
                </button>
            </div>
        </div>
    );
};

export default HomePage;
