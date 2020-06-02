import React from 'react';
import './RelatedItem.css'
import {searchResult} from '../../types'
import { Link } from "react-router-dom";


interface Props {
    Name: string;
    Type: string;
    wTeaser: string;
    wUrl: string;
    yUrl: string;
    yID: string;
}

const RelatedItem: React.FC<searchResult> = (props: Props) => {

    return(
        <section className="related-item">
            <Link to={`${props.Name.split(' ').join('+')}`}>
            <h5 className="related-item-title">{props.Name}</h5>
            <figure className="small-image-placeholder">
            </figure>
            </Link>
        </section>
    )

}

export default RelatedItem;

