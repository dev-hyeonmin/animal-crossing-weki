// @ts-ignore
import pageUpImg from '../images/page-up.png';

export const PageUp = () => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="pageUp" onClick={scrollTop}>
            <img src={pageUpImg} />
        </div>
    );
}