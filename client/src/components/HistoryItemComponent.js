import {React} from 'react';

export const HistoryItem = (props) => {
    const {data} = props;
    return (
        <div>
            <span>{data}</span>
        </div>
    );
} 