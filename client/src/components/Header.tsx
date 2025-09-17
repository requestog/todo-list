import Button from "./UI/Button.tsx";
import {Context} from "../AppContext.ts";
import {useContext} from "react";

interface HeaderProps {
    clearCheckedTodos: () => void;
}

const Header: React.FC<HeaderProps> = ({ clearCheckedTodos }) => {
    const { userStore } = useContext(Context);

    const handleLogout = async () => {
        await userStore.logout();
        clearCheckedTodos();
    };

    return (
        <div className="border-2 dark:border-gray-100 rounded-lg shadow">
            <div className="container mx-auto flex items-center justify-between p-3">
                <div className="header-item text-lg ml-auto flex items-center pr-2 pl-2">
                    <p className="text-sm mr-2">{userStore.user.username}</p>
                    <Button small onClick={handleLogout}>Выйти</Button>
                </div>
            </div>
        </div>
    );
};


export default Header;