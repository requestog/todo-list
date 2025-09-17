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
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-3 gap-2 sm:gap-0">
                <p className="text-sm sm:text-base">{userStore.user.username}</p>
                <Button small onClick={handleLogout}>Выйти</Button>
            </div>
        </div>
    );
};


export default Header;