import { useRef, useState } from 'react';
import { useUser } from '../Providers/UserProvider';
import ListUsersModal from './Modals/ListUsersModal';
import { User } from '../Types/User';
import EditIcon from '@mui/icons-material/Edit';

interface ListHeaderProps {
    listName: string;
    listUsers: User[];
    currentFilter: 'all' | 'completed' | 'uncompleted';
    setFilter: (filter: 'all' | 'completed' | 'uncompleted') => void;
    onListNameChange: (listName: string) => void;
    onAddItem: (itemName: string) => void;
    onAddUser: (userName: string) => void;
    onRemoveUser: (userId: string) => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
    currentFilter,
    listName,
    listUsers,
    onAddUser,
    onAddItem,
    setFilter,
    onRemoveUser,
    onListNameChange,
}) => {
    const userContext = useUser();
    const ref = useRef<HTMLInputElement>(null);
    const addItemInputRef = useRef<HTMLInputElement>(null);
    const isUserOwner = listUsers.find((user) => user.id === userContext?.user?.id)?.isOwner || false;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='mb-4'>
            <div className='flex items-center'>
                {isUserOwner && (
                    <button onClick={() => ref?.current?.focus()} className='text-white mr-2'>
                        <EditIcon />
                    </button>
                )}
                <input
                    className={`text-xl bg-gray-900 font-bold text-white w-full ${isUserOwner ? '' : 'cursor-not-allowed'}`}
                    defaultValue={listName}
                    disabled={!isUserOwner}
                    ref={ref}
                    onBlur={(e) => onListNameChange(e.currentTarget.value)}
                />
                <div className='flex ml-auto items-center'>
                    {isUserOwner ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Manage Users
                        </button>
                    ) : (
                        <button
                            onClick={() => onRemoveUser(userContext?.user?.id || '')}
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Leave
                        </button>
                    )}

                    <ListUsersModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddUser={onAddUser}
                        onRemoveUser={onRemoveUser}
                        users={listUsers}
                    />
                </div>
            </div>
            <div className='mb-4'>
                <button
                    className={`px-4 py-1 mr-2 ${
                        currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'
                    } rounded-md`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-1 mr-2 ${
                        currentFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'
                    } rounded-md`}
                    onClick={() => setFilter('completed')}
                >
                    Solved
                </button>
                <button
                    className={`px-4 py-1 ${
                        currentFilter === 'uncompleted' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'
                    } rounded-md`}
                    onClick={() => setFilter('uncompleted')}
                >
                    Unsolved
                </button>
            </div>

            <div className='my-4'>
                <input type='text' placeholder='Add new item' className='border p-2 mr-2' ref={addItemInputRef} />
                <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                        onAddItem(addItemInputRef.current?.value || '');
                        addItemInputRef.current!.value = '';
                    }}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default ListHeader;
