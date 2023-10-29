import { Item } from '../Types/List';

interface ListItemProps {
    item: Item;
    onRemove: (id: string) => void;
    handleCheckboxChange: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, handleCheckboxChange, onRemove }) => {
    const { isCompleted, name, id } = item;

    return (
        <div className='flex items-center justify-between bg-gray-800 p-3 rounded-md mb-2'>
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    checked={isCompleted}
                    onChange={() => handleCheckboxChange(id)}
                    className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                />
                <span
                    className={`ml-2 select-none ${
                        isCompleted ? 'line-through text-gray-400' : 'text-gray-200'
                    }`}
                >
                    {name}
                </span>
            </div>
            <button
                className='bg-red-600 px-3 rounded-full text-white hover:bg-red-400 transition-colors'
                onClick={() => onRemove(id)}
            >
                Remove
            </button>
        </div>
    );
};

export default ListItem;
