import wrapperStyles from "../../stylesheets/wrapper.module.css";

export default function Header() {
    return (
        <div className={wrapperStyles.header}>
            <h1>Products</h1>
        </div>
    );
}