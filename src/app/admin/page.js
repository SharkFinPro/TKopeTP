import "./stylesheets/index.module.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export default () => {
    return <>
        <div className={wrapperStyles.content}>
            <h1>Admin Panel</h1>
        </div>
    </>
}