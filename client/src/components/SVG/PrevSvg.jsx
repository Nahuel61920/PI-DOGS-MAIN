import * as React from "react";
import './next_prev.css';

const PrevSvg = (props) => (
    <div className="wrapper btn-slide prev">
        <svg
        width={18}
        height={17}
        viewBox="0 0 18 17"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="svg-arrow"
        {...props}
        >
            <path
                className="arrow-2"
                d="m.625 8.339 8.614 6.968.857-.99-7.387-5.975 7.383-5.914-.852-.992z"
            />
            <path
                className="arrow-fixed"
                d="m.625 8.339 8.614 6.968.857-.99-7.387-5.975 7.383-5.914-.852-.992z"
            />
            <path d="M17 .562v15.63L7.292 8.34 17 .562Zm-1.333 2.74-6.292 5.04 6.292 5.09V3.303Z" />
        </svg>
    </div>
);

export default PrevSvg;
