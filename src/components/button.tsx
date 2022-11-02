interface IButtonProps {
    loading?: boolean;
    canClick?: boolean;
    actionText: string;
    onClick?: any;
}

export const Button:React.FC<IButtonProps> = ({ canClick, loading, actionText, onClick }) => {
    return (
        <button
            role="button"
            className={canClick ? "active" : ""}
            onClick={onClick}
        >
            {loading ? "Loading..." : actionText}
        </button>
    );
};