import cl from "./Loader.module.css";

interface LoaderType {
    className?: string;
}

const Loader = ({className}: LoaderType) => {
    const rootClass = [cl.loader]
    if (className !== "" && className !== undefined) {
        rootClass.push(className)
    }

    return <div className={rootClass.join(" ")}></div>;
};

export default Loader;