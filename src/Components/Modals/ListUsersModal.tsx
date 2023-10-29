import React, { useState } from 'react';
import { User } from '../../Types/User';

interface ListUsersModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    onAddUser: (userName: string) => void;
    onRemoveUser: (userId: string) => void;
}

const ListUsersModal: React.FC<ListUsersModalProps> = ({ isOpen, onClose, users, onAddUser, onRemoveUser }) => {
    const [userName, setUserName] = useState('');

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' id='my-modal'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-900 text-white'>
                <div className='mt-3 text-center'>
                    <h3 className='text-lg leading-6 font-medium'>Users</h3>
                    <div className='mt-2 px-7 py-3'>
                        <input
                            type='text'
                            placeholder='Enter name:'
                            className='mb-3 px-3 py-2 border rounded text-gray-900'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button
                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                onAddUser(userName);
                                setUserName('');
                            }}
                        >
                            Add User
                        </button>
                    </div>
                    <div className='mt-4'>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id} className='flex justify-between items-center py-2'>
                                    <span>{user.name}</span>
                                    {!user.isOwner && (
                                        <button
                                            className='bg-red-500 rounded-full hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs'
                                            onClick={() => onRemoveUser(user.id)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='items-center px-4 py-3'>
                        <button
                            id='ok-btn'
                            className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300'
                            onClick={onClose}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUsersModal;
