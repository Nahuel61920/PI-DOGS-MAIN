import * as React from "react"

const Remove = (props) => (
    <div className="tooltip">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            height={25}
            width={25}
            {...props}
            className="remove"
        >
            <path
                fill="#6361D9"
                d="M8.788 5.039a.417.417 0 0 1 .295-.122h2.333a.417.417 0 0 1 .417.416v.416H8.666v-.416c0-.11.044-.216.122-.294Zm-1.622.71v-.416a1.917 1.917 0 0 1 1.917-1.916h2.333a1.917 1.917 0 0 1 1.917 1.916v.416H15.5a.75.75 0 0 1 0 1.5h-.49l-.76 7.46a1.916 1.916 0 0 1-1.917 1.874H8.166A1.916 1.916 0 0 1 6.25 14.71L5.49 7.25H5a.75.75 0 0 1 0-1.5h2.167Zm.75 1.501h5.587l-.75 7.34a.744.744 0 0 0-.003.077.417.417 0 0 1-.417.416H8.166a.417.417 0 0 1-.416-.416.75.75 0 0 0-.004-.076l-.75-7.341h.92Z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
        </svg>
    </div>
)

export default Remove