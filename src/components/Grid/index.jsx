import './style.scss';

const Grid = (props) => {
    const {
        className = '',
        children,
        row = false,
        col = false,
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    } = props;

    const gridRow = row ? 'grid__row' : '';
    const gridCol = col ? 'grid__col' : '';

    const colXs = xs ? `grid__colxs_${xs}` : '';
    const colSm = xs ? `grid__colsm_${sm}` : '';
    const colMd = xs ? `grid__colmd_${md}` : '';
    const colLg = xs ? `grid__collg_${lg}` : '';
    const colXl = xs ? `grid__colxl_${xl}` : '';
    const colXxl = xs ? `grid__colxxl_${xxl}` : '';

    return (
        <div
            className={`${gridRow} ${gridCol} ${colXs} ${colSm} ${colMd} ${colLg} ${colXl} ${colXxl} $ ${className}`}
        >
            {children}
        </div>
    );
};

export default Grid;
