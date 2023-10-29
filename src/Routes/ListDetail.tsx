import { useState } from 'react';
import ListItem from '../Components/ListItem';
import { List } from '../Types/List';
import { useUser } from '../Providers/UserProvider';
import ListHeader from '../Components/ListHeader';
import useQuery from '../Hooks/useQuery';

const ListDetail: React.FC = () => {
    const [listData, setListData] = useState<List>({
        id: '1',
        name: 'Shopping List',
        items: [
            {
                id: '1',
                name: 'Mouka',
                isCompleted: false,
            },
            {
                id: '2',
                name: 'Mlíko',
                isCompleted: false,
            },
        ],
        users: [
            {
                id: '1',
                name: 'Darek Tunega (owner)',
                isOwner: true,
            },
            {
                id: '2',
                name: 'Timotej Tunega (guest)',
                isOwner: false,
            },
        ],
    });

    const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
    const filteredItems = listData.items.filter((item) => {
        if (filter === 'completed') return item.isCompleted;
        if (filter === 'uncompleted') return !item.isCompleted;
        return true;
    });

    const userContext = useUser();
    const isUserOwner = listData.users.find((user) => user.id === userContext?.user?.id)?.isOwner || false;

    const handleCheckboxChange = (id: string) => {
        const item = listData.items.find((item) => item.id === id);
        if (!item) return;

        item.isCompleted = !item.isCompleted;
        setListData({ ...listData });
    };

    const onRemove = (id: string) => {
        setListData({
            ...listData,
            items: listData.items.filter((item) => item.id !== id),
        });
    };

    const onAddItem = (itemName: string) => {
        const newItem = {
            id: Math.random().toString(),
            name: itemName,
            isCompleted: false,
        };

        setListData({
            ...listData,
            items: [...listData.items, newItem],
        });
    };

    const onAddUser = (userName: string) => {
        const newUser = {
            id: Math.random().toString(),
            name: userName,
            isOwner: false,
        };

        setListData({
            ...listData,
            users: [...listData.users, newUser],
        });
    };

    const onRemoveUser = (userId: string) => {
        setListData({
            ...listData,
            users: listData.users.filter((user) => user.id !== userId),
        });
    };

    const onListNameChange = (listName: string) => {
        if (listName.length === 0) return;

        setListData({
            ...listData,
            name: listName,
        });
    };

    return (
        <div className='max-w-2xl mx-auto bg-gray-800 p-4 shadow-lg rounded-lg mt-5'>
            <ListHeader
                listName={listData.name}
                listUsers={listData.users}
                currentFilter={filter}
                setFilter={setFilter}
                onAddItem={onAddItem}
                onAddUser={onAddUser}
                onRemoveUser={onRemoveUser}
                onListNameChange={onListNameChange}
            />

            {filteredItems.map((item) => (
                <ListItem key={item.id} item={item} onRemove={onRemove} handleCheckboxChange={handleCheckboxChange} />
            ))}
        </div>
    );
};

export default ListDetail;
