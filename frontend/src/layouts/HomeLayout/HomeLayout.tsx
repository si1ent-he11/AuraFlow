import { Outlet } from "react-router-dom";
import AuthProvider from "../../providers/AuthProvider";
import cl from "./HomeLayout.module.css"
import { useUserSpaces } from "../../hooks/space/useUserSpaces";
import useUserStore from "../../state/useUser";
import SpacesList from "../../components/SpacesList/SpacesList";
import Logo from "../../components/Applogo/Logo/Logo";
import Input from "../../ui/TextInput/Input";
import { useMemo, useState } from "react";
import { useModal } from "../../state/useModal";
import ModalRoot from "../../components/modals/ModalRoot/ModalRoot";
import Button from "../../ui/Button/Button";

const HomeLayout = () => {
    const user = useUserStore((state) => state.user)
    const {openModal} = useModal()
    const {data} = useUserSpaces();
    
    const [searchValue, setSearchValue] = useState<string>("");
    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter(v =>
            v.spaceName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue]);
    
    return (
        <AuthProvider>
            <main className={cl.home_container}>
                <ModalRoot />
                <div className={cl.home_space_bar}>
                    <div className={cl.bar_header}>
                            <Logo />
                    </div>
                    <div className={cl.bar_separator}></div>
                    <div className={cl.list_container}>
                        <Input className={cl.search_input} value={searchValue} 
                            onChange={e => setSearchValue(e.target.value)} 
                            placeholder="search... 🔍"
                        />
                        <div className={cl.list_bar}>
                            <div className={cl.list_title}>all spaces</div>
                            <button className={cl.add_space_button} onClick={() => openModal("add", {})}>+</button>
                        </div>
                        <SpacesList className={cl.list} list={filteredData!} />
                    </div>
                    <div className={cl.bar_separator}></div>
                    <div className={cl.profile_container}>
                        <div className={cl.profile_info}>
                            <h1 className={cl.profile_info_title}>{user?.username}</h1>
                            <h4 className={cl.profile_info_email}>{user?.email}</h4>
                        </div>
                        <div>
                            <Button className={cl.setting_button} onClick={() => openModal("setProfile", {})}>Setting</Button>
                        </div>
                    </div>
                </div>
                <div className={cl.home_separator}></div>
                <div className={cl.home_space_info}><Outlet /></div>
            </main>
        </AuthProvider>
    )
}

export default HomeLayout;