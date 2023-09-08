import './style.scss';

const Mark = (props) => {
    const { mark, radius = 'none' } = props;

    return (
        <div
            className={`mark__wrapper ${
                radius === 'none' ? '' : 'radius-left'
            }`}
        >
            <span>{mark}</span>
        </div>
    );
};

export default Mark;
