import Input from "../components/UI/Input.tsx";
import Button from "../components/UI/Button.tsx";
import {useState} from "react";
import {userStore} from "../AppContext.ts";

const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function send() {
        try {
            console.log(username, password);
            const data = await userStore.registration(username, password);
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.log('Unknown error. Please try again later.');
            }
            console.error(error);
        }
    }

    return (
        <div className="mt-10 max-w-md mx-auto p-5 rounded-lg shadow">
            <div className="container mx-auto max-w-sm">
                <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                    РЕГИСТРАЦИЯ
                </h1>
                <div className="flex flex-col w-full gap-4">
                    <Input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        name="username"
                    />
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        name="password"
                    />

                    <Button onClick={() => send()}>Регистрация</Button>
                    <h5 className="text-center text-sm font-semibold text-gray-400 mb-6">
                        Еще нет аккаунта ? Регистрация
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Auth;